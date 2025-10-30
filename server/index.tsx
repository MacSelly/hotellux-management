import { Hono } from 'npm:hono@4';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

// Error handler
app.onError((err, c) => {
  console.error('Server error:', err);
  return c.json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: err.message || 'An error occurred',
    },
  }, 500);
});

// ============ AUTHENTICATION ENDPOINTS ============

app.post('/make-server-31e4cd2a/auth/login', async (c) => {
  try {
    const { email, password } = await c.req.json();

    // Get user from KV store
    const usersData = await kv.get('users') || {};
    const user = Object.values(usersData).find((u: any) => u.email === email);

    if (!user || user.password !== password) {
      return c.json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password',
        },
      }, 401);
    }

    // Generate simple token (in production, use JWT)
    const token = btoa(`${user.id}:${Date.now()}`);
    const refreshToken = btoa(`refresh:${user.id}:${Date.now()}`);

    // Store session
    await kv.set(`session:${token}`, {
      userId: user.id,
      createdAt: new Date().toISOString(),
    });

    // Update last login
    user.lastLogin = new Date().toISOString();
    await kv.set(`user:${user.id}`, user);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return c.json({
      success: true,
      data: {
        token,
        refreshToken,
        user: userWithoutPassword,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return c.json({
      success: false,
      error: {
        code: 'LOGIN_ERROR',
        message: error.message,
      },
    }, 500);
  }
});

app.post('/make-server-31e4cd2a/auth/register', async (c) => {
  try {
    const { name, email, password, role = 'guest' } = await c.req.json();

    // Check if user exists
    const usersData = await kv.get('users') || {};
    const existingUser = Object.values(usersData).find((u: any) => u.email === email);

    if (existingUser) {
      return c.json({
        success: false,
        error: {
          code: 'USER_EXISTS',
          message: 'User with this email already exists',
        },
      }, 400);
    }

    // Create new user
    const userId = `user_${Date.now()}`;
    const newUser = {
      id: userId,
      name,
      email,
      password, // In production, hash this!
      role,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`user:${userId}`, newUser);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    return c.json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return c.json({
      success: false,
      error: {
        code: 'REGISTRATION_ERROR',
        message: error.message,
      },
    }, 500);
  }
});

app.post('/make-server-31e4cd2a/auth/logout', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (token) {
      await kv.del(`session:${token}`);
    }

    return c.json({ success: true });
  } catch (error: any) {
    return c.json({
      success: false,
      error: { code: 'LOGOUT_ERROR', message: error.message },
    }, 500);
  }
});

app.get('/make-server-31e4cd2a/auth/me', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return c.json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'No token provided' },
      }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session) {
      return c.json({
        success: false,
        error: { code: 'INVALID_SESSION', message: 'Invalid or expired session' },
      }, 401);
    }

    const user = await kv.get(`user:${session.userId}`);
    if (!user) {
      return c.json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: 'User not found' },
      }, 404);
    }

    const { password: _, ...userWithoutPassword } = user;
    return c.json({ success: true, data: userWithoutPassword });
  } catch (error: any) {
    return c.json({
      success: false,
      error: { code: 'AUTH_ERROR', message: error.message },
    }, 500);
  }
});

// ============ ROOMS ENDPOINTS ============

app.get('/make-server-31e4cd2a/rooms', async (c) => {
  try {
    const status = c.req.query('status');
    const floor = c.req.query('floor');
    const type = c.req.query('type');

    let rooms = await kv.getByPrefix('room:') || [];

    // Filter rooms
    if (status) {
      rooms = rooms.filter((room: any) => room.status === status);
    }
    if (floor) {
      rooms = rooms.filter((room: any) => room.floor === parseInt(floor));
    }
    if (type) {
      rooms = rooms.filter((room: any) => room.type === type);
    }

    return c.json({ success: true, data: rooms });
  } catch (error: any) {
    return c.json({
      success: false,
      error: { code: 'GET_ROOMS_ERROR', message: error.message },
    }, 500);
  }
});

app.get('/make-server-31e4cd2a/rooms/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const room = await kv.get(`room:${id}`);

    if (!room) {
      return c.json({
        success: false,
        error: { code: 'ROOM_NOT_FOUND', message: 'Room not found' },
      }, 404);
    }

    return c.json({ success: true, data: room });
  } catch (error: any) {
    return c.json({
      success: false,
      error: { code: 'GET_ROOM_ERROR', message: error.message },
    }, 500);
  }
});

app.put('/make-server-31e4cd2a/rooms/:id/status', async (c) => {
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();

    const room = await kv.get(`room:${id}`);
    if (!room) {
      return c.json({
        success: false,
        error: { code: 'ROOM_NOT_FOUND', message: 'Room not found' },
      }, 404);
    }

    const updatedRoom = {
      ...room,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`room:${id}`, updatedRoom);

    return c.json({ success: true, data: updatedRoom });
  } catch (error: any) {
    return c.json({
      success: false,
      error: { code: 'UPDATE_ROOM_ERROR', message: error.message },
    }, 500);
  }
});

app.get('/make-server-31e4cd2a/rooms/statistics', async (c) => {
  try {
    const rooms = await kv.getByPrefix('room:') || [];

    const stats = {
      totalRooms: rooms.length,
      availableRooms: rooms.filter((r: any) => r.status === 'available').length,
      occupiedRooms: rooms.filter((r: any) => r.status === 'occupied').length,
      cleaningRooms: rooms.filter((r: any) => r.status === 'cleaning').length,
      maintenanceRooms: rooms.filter((r: any) => r.status === 'maintenance').length,
      totalGuests: rooms.reduce((sum: number, r: any) => sum + (r.occupants || 0), 0),
      occupancyRate: (rooms.filter((r: any) => r.status === 'occupied').length / rooms.length) * 100,
      avgDailyRate: rooms.reduce((sum: number, r: any) => sum + r.currentRate, 0) / rooms.length,
      totalRevenue: 284590, // This would come from billing data
      activeGuests: 156,
    };

    return c.json({ success: true, data: stats });
  } catch (error: any) {
    return c.json({
      success: false,
      error: { code: 'GET_STATS_ERROR', message: error.message },
    }, 500);
  }
});

// ============ RESERVATIONS ENDPOINTS ============

app.get('/make-server-31e4cd2a/reservations', async (c) => {
  try {
    const status = c.req.query('status');
    const guestId = c.req.query('guestId');

    let reservations = await kv.getByPrefix('reservation:') || [];

    if (status) {
      reservations = reservations.filter((r: any) => r.status === status);
    }
    if (guestId) {
      reservations = reservations.filter((r: any) => r.guestId === guestId);
    }

    return c.json({ success: true, data: reservations });
  } catch (error: any) {
    return c.json({
      success: false,
      error: { code: 'GET_RESERVATIONS_ERROR', message: error.message },
    }, 500);
  }
});

app.post('/make-server-31e4cd2a/reservations', async (c) => {
  try {
    const data = await c.req.json();

    const reservationId = `BK-2025-${Date.now()}`;
    const reservation = {
      id: reservationId,
      ...data,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    await kv.set(`reservation:${reservationId}`, reservation);

    return c.json({ success: true, data: reservation }, 201);
  } catch (error: any) {
    return c.json({
      success: false,
      error: { code: 'CREATE_RESERVATION_ERROR', message: error.message },
    }, 500);
  }
});

app.put('/make-server-31e4cd2a/reservations/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();

    const reservation = await kv.get(`reservation:${id}`);
    if (!reservation) {
      return c.json({
        success: false,
        error: { code: 'RESERVATION_NOT_FOUND', message: 'Reservation not found' },
      }, 404);
    }

    const updatedReservation = {
      ...reservation,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`reservation:${id}`, updatedReservation);

    return c.json({ success: true, data: updatedReservation });
  } catch (error: any) {
    return c.json({
      success: false,
      error: { code: 'UPDATE_RESERVATION_ERROR', message: error.message },
    }, 500);
  }
});

// ============ HOUSEKEEPING ENDPOINTS ============

app.get('/make-server-31e4cd2a/housekeeping/tasks', async (c) => {
  try {
    const status = c.req.query('status');
    const priority = c.req.query('priority');

    let tasks = await kv.getByPrefix('task:') || [];

    if (status) {
      tasks = tasks.filter((t: any) => t.status === status);
    }
    if (priority) {
      tasks = tasks.filter((t: any) => t.priority === priority);
    }

    return c.json({ success: true, data: tasks });
  } catch (error: any) {
    return c.json({
      success: false,
      error: { code: 'GET_TASKS_ERROR', message: error.message },
    }, 500);
  }
});

app.put('/make-server-31e4cd2a/housekeeping/tasks/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();

    const task = await kv.get(`task:${id}`);
    if (!task) {
      return c.json({
        success: false,
        error: { code: 'TASK_NOT_FOUND', message: 'Task not found' },
      }, 404);
    }

    const updatedTask = {
      ...task,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    if (updates.status === 'completed') {
      updatedTask.completedAt = new Date().toISOString();
    }

    await kv.set(`task:${id}`, updatedTask);

    return c.json({ success: true, data: updatedTask });
  } catch (error: any) {
    return c.json({
      success: false,
      error: { code: 'UPDATE_TASK_ERROR', message: error.message },
    }, 500);
  }
});

app.get('/make-server-31e4cd2a/housekeeping/inventory', async (c) => {
  try {
    const inventory = await kv.getByPrefix('inventory:') || [];
    return c.json({ success: true, data: inventory });
  } catch (error: any) {
    return c.json({
      success: false,
      error: { code: 'GET_INVENTORY_ERROR', message: error.message },
    }, 500);
  }
});

// ============ MAINTENANCE ENDPOINTS ============

app.get('/make-server-31e4cd2a/maintenance/work-orders', async (c) => {
  try {
    const status = c.req.query('status');
    const priority = c.req.query('priority');

    let workOrders = await kv.getByPrefix('work-order:') || [];

    if (status) {
      workOrders = workOrders.filter((wo: any) => wo.status === status);
    }
    if (priority) {
      workOrders = workOrders.filter((wo: any) => wo.priority === priority);
    }

    return c.json({ success: true, data: workOrders });
  } catch (error: any) {
    return c.json({
      success: false,
      error: { code: 'GET_WORK_ORDERS_ERROR', message: error.message },
    }, 500);
  }
});

app.post('/make-server-31e4cd2a/maintenance/work-orders', async (c) => {
  try {
    const data = await c.req.json();

    const workOrderId = `WO-2025-${Date.now()}`;
    const workOrder = {
      id: workOrderId,
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    await kv.set(`work-order:${workOrderId}`, workOrder);

    return c.json({ success: true, data: workOrder }, 201);
  } catch (error: any) {
    return c.json({
      success: false,
      error: { code: 'CREATE_WORK_ORDER_ERROR', message: error.message },
    }, 500);
  }
});

app.put('/make-server-31e4cd2a/maintenance/work-orders/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();

    const workOrder = await kv.get(`work-order:${id}`);
    if (!workOrder) {
      return c.json({
        success: false,
        error: { code: 'WORK_ORDER_NOT_FOUND', message: 'Work order not found' },
      }, 404);
    }

    const updatedWorkOrder = {
      ...workOrder,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    if (updates.status === 'completed') {
      updatedWorkOrder.completedAt = new Date().toISOString();
    }

    await kv.set(`work-order:${id}`, updatedWorkOrder);

    return c.json({ success: true, data: updatedWorkOrder });
  } catch (error: any) {
    return c.json({
      success: false,
      error: { code: 'UPDATE_WORK_ORDER_ERROR', message: error.message },
    }, 500);
  }
});

// Health check
app.get('/make-server-31e4cd2a/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

Deno.serve(app.fetch);
