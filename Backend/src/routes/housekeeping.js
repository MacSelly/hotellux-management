const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../database');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// Get all housekeeping tasks
router.get('/tasks', authenticateToken, requireRole(['housekeeping', 'admin']), async (req, res) => {
  try {
    const { status, priority } = req.query;
    
    let sql = 'SELECT * FROM housekeeping_tasks WHERE 1=1';
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

    const tasks = await db.all(sql, params);

    res.json({
      success: true,
      data: tasks
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'GET_TASKS_ERROR',
        message: 'Failed to fetch tasks'
      }
    });
  }
});

// Get single task by ID
router.get('/tasks/:id', authenticateToken, requireRole(['housekeeping', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    
    const task = await db.get('SELECT * FROM housekeeping_tasks WHERE id = ?', [id]);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'TASK_NOT_FOUND',
          message: 'Task not found'
        }
      });
    }

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'GET_TASK_ERROR',
        message: 'Failed to fetch task'
      }
    });
  }
});

// Create new housekeeping task
router.post('/tasks', authenticateToken, requireRole(['housekeeping', 'receptionist', 'admin']), async (req, res) => {
  try {
    const {
      room_number,
      type,
      priority = 'medium',
      assignee,
      assignee_name,
      estimated_time
    } = req.body;

    if (!room_number || !type) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_FIELDS',
          message: 'Room number and task type are required'
        }
      });
    }

    const taskId = uuidv4();

    await db.run(
      `INSERT INTO housekeeping_tasks (
        id, room_number, type, priority, assignee, assignee_name, estimated_time
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [taskId, room_number, type, priority, assignee, assignee_name, estimated_time]
    );

    const newTask = await db.get('SELECT * FROM housekeeping_tasks WHERE id = ?', [taskId]);

    res.status(201).json({
      success: true,
      data: newTask
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'CREATE_TASK_ERROR',
        message: 'Failed to create task'
      }
    });
  }
});

// Update housekeeping task
router.put('/tasks/:id', authenticateToken, requireRole(['housekeeping', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if task exists
    const existingTask = await db.get('SELECT * FROM housekeeping_tasks WHERE id = ?', [id]);
    if (!existingTask) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'TASK_NOT_FOUND',
          message: 'Task not found'
        }
      });
    }

    // Build update query dynamically
    const allowedFields = ['status', 'priority', 'assignee', 'assignee_name', 'estimated_time'];
    const updateFields = [];
    const params = [];

    Object.keys(updates).forEach(key => {
      if (allowedFields.includes(key)) {
        updateFields.push(`${key} = ?`);
        params.push(updates[key]);
      }
    });

    // Handle status changes
    if (updates.status === 'in-progress' && existingTask.status === 'pending') {
      updateFields.push('started_at = datetime("now")');
    }

    if (updates.status === 'completed' && existingTask.status !== 'completed') {
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

    // Add updated_at and task id
    updateFields.push('updated_at = datetime("now")');
    params.push(id);

    const sql = `UPDATE housekeeping_tasks SET ${updateFields.join(', ')} WHERE id = ?`;
    await db.run(sql, params);

    // Get updated task
    const updatedTask = await db.get('SELECT * FROM housekeeping_tasks WHERE id = ?', [id]);

    res.json({
      success: true,
      data: updatedTask
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'UPDATE_TASK_ERROR',
        message: 'Failed to update task'
      }
    });
  }
});

// Get inventory
router.get('/inventory', authenticateToken, requireRole(['housekeeping', 'admin']), async (req, res) => {
  try {
    const inventory = await db.all('SELECT * FROM inventory ORDER BY category, name');

    res.json({
      success: true,
      data: inventory
    });
  } catch (error) {
    console.error('Get inventory error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'GET_INVENTORY_ERROR',
        message: 'Failed to fetch inventory'
      }
    });
  }
});

// Update inventory item
router.put('/inventory/:id', authenticateToken, requireRole(['housekeeping', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if item exists
    const existingItem = await db.get('SELECT * FROM inventory WHERE id = ?', [id]);
    if (!existingItem) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'ITEM_NOT_FOUND',
          message: 'Inventory item not found'
        }
      });
    }

    // Build update query dynamically
    const allowedFields = ['stock', 'minimum', 'status', 'last_restocked'];
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

    // Add updated_at and item id
    updateFields.push('updated_at = datetime("now")');
    params.push(id);

    const sql = `UPDATE inventory SET ${updateFields.join(', ')} WHERE id = ?`;
    await db.run(sql, params);

    // Get updated item
    const updatedItem = await db.get('SELECT * FROM inventory WHERE id = ?', [id]);

    res.json({
      success: true,
      data: updatedItem
    });
  } catch (error) {
    console.error('Update inventory error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'UPDATE_INVENTORY_ERROR',
        message: 'Failed to update inventory item'
      }
    });
  }
});

module.exports = router;