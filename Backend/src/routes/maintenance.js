const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../database');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// Get all work orders
router.get('/work-orders', authenticateToken, requireRole(['maintenance', 'admin']), async (req, res) => {
  try {
    const { status, priority } = req.query;
    
    let sql = 'SELECT * FROM work_orders WHERE 1=1';
    const params = [];

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }

    if (priority) {
      sql += ' AND priority = ?';
      params.push(priority);
    }

    sql += ' ORDER BY created_at DESC';

    const workOrders = await db.all(sql, params);

    res.json({
      success: true,
      data: workOrders
    });
  } catch (error) {
    console.error('Get work orders error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'GET_WORK_ORDERS_ERROR',
        message: 'Failed to fetch work orders'
      }
    });
  }
});

// Get single work order by ID
router.get('/work-orders/:id', authenticateToken, requireRole(['maintenance', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    
    const workOrder = await db.get('SELECT * FROM work_orders WHERE id = ?', [id]);

    if (!workOrder) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'WORK_ORDER_NOT_FOUND',
          message: 'Work order not found'
        }
      });
    }

    res.json({
      success: true,
      data: workOrder
    });
  } catch (error) {
    console.error('Get work order error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'GET_WORK_ORDER_ERROR',
        message: 'Failed to fetch work order'
      }
    });
  }
});

// Create new work order
router.post('/work-orders', authenticateToken, requireRole(['maintenance', 'receptionist', 'housekeeping', 'admin']), async (req, res) => {
  try {
    const {
      room_number,
      issue,
      description,
      priority = 'medium',
      category,
      estimated_cost,
      assignee,
      assignee_name
    } = req.body;

    if (!room_number || !issue || !category) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_FIELDS',
          message: 'Room number, issue, and category are required'
        }
      });
    }

    const workOrderId = `WO-${new Date().getFullYear()}-${Date.now()}`;

    await db.run(
      `INSERT INTO work_orders (
        id, room_number, issue, description, priority, category,
        estimated_cost, assignee, assignee_name, reported_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        workOrderId,
        room_number,
        issue,
        description,
        priority,
        category,
        estimated_cost,
        assignee,
        assignee_name,
        req.user.id
      ]
    );

    const newWorkOrder = await db.get('SELECT * FROM work_orders WHERE id = ?', [workOrderId]);

    res.status(201).json({
      success: true,
      data: newWorkOrder
    });
  } catch (error) {
    console.error('Create work order error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'CREATE_WORK_ORDER_ERROR',
        message: 'Failed to create work order'
      }
    });
  }
});

// Update work order
router.put('/work-orders/:id', authenticateToken, requireRole(['maintenance', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if work order exists
    const existingWorkOrder = await db.get('SELECT * FROM work_orders WHERE id = ?', [id]);
    if (!existingWorkOrder) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'WORK_ORDER_NOT_FOUND',
          message: 'Work order not found'
        }
      });
    }

    // Build update query dynamically
    const allowedFields = [
      'status', 'priority', 'assignee', 'assignee_name', 
      'estimated_cost', 'actual_cost', 'description'
    ];
    const updateFields = [];
    const params = [];

    Object.keys(updates).forEach(key => {
      if (allowedFields.includes(key)) {
        updateFields.push(`${key} = ?`);
        params.push(updates[key]);
      }
    });

    // Handle status changes
    if (updates.status === 'in-progress' && existingWorkOrder.status === 'pending') {
      updateFields.push('started_at = datetime("now")');
    }

    if (updates.status === 'completed' && existingWorkOrder.status !== 'completed') {
      updateFields.push('completed_at = datetime("now")');
    }

    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'NO_VALID_FIELDS',
          message: 'No valid fields to update'
        }
      });
    }

    // Add updated_at and work order id
    updateFields.push('updated_at = datetime("now")');
    params.push(id);

    const sql = `UPDATE work_orders SET ${updateFields.join(', ')} WHERE id = ?`;
    await db.run(sql, params);

    // Get updated work order
    const updatedWorkOrder = await db.get('SELECT * FROM work_orders WHERE id = ?', [id]);

    res.json({
      success: true,
      data: updatedWorkOrder
    });
  } catch (error) {
    console.error('Update work order error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'UPDATE_WORK_ORDER_ERROR',
        message: 'Failed to update work order'
      }
    });
  }
});

// Delete work order
router.delete('/work-orders/:id', authenticateToken, requireRole(['maintenance', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;

    // Check if work order exists
    const workOrder = await db.get('SELECT * FROM work_orders WHERE id = ?', [id]);
    if (!workOrder) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'WORK_ORDER_NOT_FOUND',
          message: 'Work order not found'
        }
      });
    }

    // Delete the work order
    await db.run('DELETE FROM work_orders WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Work order deleted successfully'
    });
  } catch (error) {
    console.error('Delete work order error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'DELETE_WORK_ORDER_ERROR',
        message: 'Failed to delete work order'
      }
    });
  }
});

module.exports = router;