const express = require('express');
const db = require('../database');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// Get all rooms with optional filtering
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, floor, type } = req.query;
    
    let sql = 'SELECT * FROM rooms WHERE 1=1';
    const params = [];

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }

    if (floor) {
      sql += ' AND floor = ?';
      params.push(parseInt(floor));
    }

    if (type) {
      sql += ' AND type = ?';
      params.push(type);
    }

    sql += ' ORDER BY number';

    const rooms = await db.all(sql, params);

    // Parse amenities JSON string back to array
    const roomsWithAmenities = rooms.map(room => ({
      ...room,
      amenities: room.amenities ? JSON.parse(room.amenities) : []
    }));

    res.json({
      success: true,
      data: roomsWithAmenities
    });
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'GET_ROOMS_ERROR',
        message: 'Failed to fetch rooms'
      }
    });
  }
});

// Get single room by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const room = await db.get('SELECT * FROM rooms WHERE id = ?', [id]);

    if (!room) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'ROOM_NOT_FOUND',
          message: 'Room not found'
        }
      });
    }

    // Parse amenities JSON string back to array
    room.amenities = room.amenities ? JSON.parse(room.amenities) : [];

    res.json({
      success: true,
      data: room
    });
  } catch (error) {
    console.error('Get room error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'GET_ROOM_ERROR',
        message: 'Failed to fetch room'
      }
    });
  }
});

// Update room status
router.put('/:id/status', authenticateToken, requireRole(['receptionist', 'housekeeping', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if room exists
    const existingRoom = await db.get('SELECT * FROM rooms WHERE id = ?', [id]);
    if (!existingRoom) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'ROOM_NOT_FOUND',
          message: 'Room not found'
        }
      });
    }

    // Build update query dynamically
    const allowedFields = ['status', 'occupants', 'guest_name', 'cleaning_status'];
    const updateFields = [];
    const params = [];

    Object.keys(updates).forEach(key => {
      if (allowedFields.includes(key)) {
        updateFields.push(`${key} = ?`);
        params.push(updates[key]);
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

    // Add updated_at and room id
    updateFields.push('updated_at = datetime("now")');
    params.push(id);

    const sql = `UPDATE rooms SET ${updateFields.join(', ')} WHERE id = ?`;
    await db.run(sql, params);

    // Get updated room
    const updatedRoom = await db.get('SELECT * FROM rooms WHERE id = ?', [id]);
    updatedRoom.amenities = updatedRoom.amenities ? JSON.parse(updatedRoom.amenities) : [];

    res.json({
      success: true,
      data: updatedRoom
    });
  } catch (error) {
    console.error('Update room error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'UPDATE_ROOM_ERROR',
        message: 'Failed to update room'
      }
    });
  }
});

// Get room statistics
router.get('/statistics', authenticateToken, async (req, res) => {
  try {
    const rooms = await db.all('SELECT * FROM rooms');

    const stats = {
      totalRooms: rooms.length,
      availableRooms: rooms.filter(r => r.status === 'available').length,
      occupiedRooms: rooms.filter(r => r.status === 'occupied').length,
      cleaningRooms: rooms.filter(r => r.status === 'cleaning').length,
      maintenanceRooms: rooms.filter(r => r.status === 'maintenance').length,
      totalGuests: rooms.reduce((sum, r) => sum + (r.occupants || 0), 0),
      occupancyRate: rooms.length > 0 ? (rooms.filter(r => r.status === 'occupied').length / rooms.length) * 100 : 0,
      avgDailyRate: rooms.length > 0 ? rooms.reduce((sum, r) => sum + r.current_rate, 0) / rooms.length : 0,
      totalRevenue: 284590, // This would come from actual billing data
      activeGuests: rooms.filter(r => r.status === 'occupied').reduce((sum, r) => sum + (r.occupants || 0), 0)
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'GET_STATS_ERROR',
        message: 'Failed to fetch statistics'
      }
    });
  }
});

module.exports = router;