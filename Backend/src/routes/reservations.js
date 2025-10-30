const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../database');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// Get all reservations with optional filtering
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, guestId } = req.query;
    
    let sql = 'SELECT * FROM reservations WHERE 1=1';
    const params = [];

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }

    if (guestId) {
      sql += ' AND guest_id = ?';
      params.push(guestId);
    }

    sql += ' ORDER BY created_at DESC';

    const reservations = await db.all(sql, params);

    // Parse special_requests JSON if it exists
    const reservationsWithRequests = reservations.map(reservation => ({
      ...reservation,
      special_requests: reservation.special_requests ? JSON.parse(reservation.special_requests) : []
    }));

    res.json({
      success: true,
      data: reservationsWithRequests
    });
  } catch (error) {
    console.error('Get reservations error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'GET_RESERVATIONS_ERROR',
        message: 'Failed to fetch reservations'
      }
    });
  }
});

// Get single reservation by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const reservation = await db.get('SELECT * FROM reservations WHERE id = ?', [id]);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'RESERVATION_NOT_FOUND',
          message: 'Reservation not found'
        }
      });
    }

    // Parse special_requests JSON if it exists
    reservation.special_requests = reservation.special_requests ? JSON.parse(reservation.special_requests) : [];

    res.json({
      success: true,
      data: reservation
    });
  } catch (error) {
    console.error('Get reservation error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'GET_RESERVATION_ERROR',
        message: 'Failed to fetch reservation'
      }
    });
  }
});

// Create new reservation
router.post('/', authenticateToken, requireRole(['receptionist', 'admin']), async (req, res) => {
  try {
    const {
      guest_name,
      guest_email,
      room_id,
      room_number,
      room_type,
      check_in,
      check_out,
      total_amount,
      currency = 'USD',
      number_of_guests = 1,
      special_requests = []
    } = req.body;

    // Validate required fields
    if (!guest_name || !guest_email || !room_id || !check_in || !check_out || !total_amount) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_FIELDS',
          message: 'Required fields: guest_name, guest_email, room_id, check_in, check_out, total_amount'
        }
      });
    }

    // Check if room exists and is available
    const room = await db.get('SELECT * FROM rooms WHERE id = ?', [room_id]);
    if (!room) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'ROOM_NOT_FOUND',
          message: 'Room not found'
        }
      });
    }

    // Generate reservation ID
    const reservationId = `BK-${new Date().getFullYear()}-${Date.now()}`;

    // Create reservation
    await db.run(
      `INSERT INTO reservations (
        id, guest_name, guest_email, room_id, room_number, room_type,
        check_in, check_out, total_amount, currency, number_of_guests, special_requests
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        reservationId,
        guest_name,
        guest_email.toLowerCase(),
        room_id,
        room_number || room.number,
        room_type || room.type,
        check_in,
        check_out,
        total_amount,
        currency,
        number_of_guests,
        JSON.stringify(special_requests)
      ]
    );

    // Get created reservation
    const newReservation = await db.get('SELECT * FROM reservations WHERE id = ?', [reservationId]);
    newReservation.special_requests = JSON.parse(newReservation.special_requests || '[]');

    res.status(201).json({
      success: true,
      data: newReservation
    });
  } catch (error) {
    console.error('Create reservation error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'CREATE_RESERVATION_ERROR',
        message: 'Failed to create reservation'
      }
    });
  }
});

// Update reservation
router.put('/:id', authenticateToken, requireRole(['receptionist', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if reservation exists
    const existingReservation = await db.get('SELECT * FROM reservations WHERE id = ?', [id]);
    if (!existingReservation) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'RESERVATION_NOT_FOUND',
          message: 'Reservation not found'
        }
      });
    }

    // Build update query dynamically
    const allowedFields = [
      'guest_name', 'guest_email', 'check_in', 'check_out', 'status',
      'total_amount', 'payment_status', 'number_of_guests', 'special_requests'
    ];
    const updateFields = [];
    const params = [];

    Object.keys(updates).forEach(key => {
      if (allowedFields.includes(key)) {
        updateFields.push(`${key} = ?`);
        if (key === 'special_requests' && Array.isArray(updates[key])) {
          params.push(JSON.stringify(updates[key]));
        } else {
          params.push(updates[key]);
        }
      }
    });

    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'NO_VALID_FIELDS',
          message: 'No valid fields to update'
        }
      });
    }

    // Add updated_at and reservation id
    updateFields.push('updated_at = datetime("now")');
    params.push(id);

    const sql = `UPDATE reservations SET ${updateFields.join(', ')} WHERE id = ?`;
    await db.run(sql, params);

    // Get updated reservation
    const updatedReservation = await db.get('SELECT * FROM reservations WHERE id = ?', [id]);
    updatedReservation.special_requests = JSON.parse(updatedReservation.special_requests || '[]');

    res.json({
      success: true,
      data: updatedReservation
    });
  } catch (error) {
    console.error('Update reservation error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'UPDATE_RESERVATION_ERROR',
        message: 'Failed to update reservation'
      }
    });
  }
});

// Cancel reservation
router.delete('/:id', authenticateToken, requireRole(['receptionist', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;

    // Check if reservation exists
    const reservation = await db.get('SELECT * FROM reservations WHERE id = ?', [id]);
    if (!reservation) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'RESERVATION_NOT_FOUND',
          message: 'Reservation not found'
        }
      });
    }

    // Update status to cancelled instead of deleting
    await db.run(
      'UPDATE reservations SET status = ?, updated_at = datetime("now") WHERE id = ?',
      ['cancelled', id]
    );

    res.json({
      success: true,
      message: 'Reservation cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel reservation error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'CANCEL_RESERVATION_ERROR',
        message: 'Failed to cancel reservation'
      }
    });
  }
});

module.exports = router;