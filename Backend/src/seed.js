require('dotenv').config();
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const db = require('./database');

async function seedDatabase() {
  console.log('🌱 Starting database seed...');

  try {
    // Wait for database initialization
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Clear existing data (ignore errors if tables don't exist)
    try { await db.run('DELETE FROM sessions'); } catch (e) {}
    try { await db.run('DELETE FROM work_orders'); } catch (e) {}
    try { await db.run('DELETE FROM housekeeping_tasks'); } catch (e) {}
    try { await db.run('DELETE FROM inventory'); } catch (e) {}
    try { await db.run('DELETE FROM reservations'); } catch (e) {}
    try { await db.run('DELETE FROM rooms'); } catch (e) {}
    try { await db.run('DELETE FROM users'); } catch (e) {}

    console.log('✓ Cleared existing data');

    // Seed users
    const users = [
      {
        id: 'user_guest_001',
        name: 'John Guest',
        email: 'guest@hotel.com',
        password: 'guest123',
        role: 'guest',
        phone: '+1 (555) 123-4567'
      },
      {
        id: 'user_reception_001',
        name: 'Sarah Reception',
        email: 'reception@hotel.com',
        password: 'reception123',
        role: 'receptionist',
        phone: '+1 (555) 234-5678'
      },
      {
        id: 'user_housekeeping_001',
        name: 'Maria Cleaning',
        email: 'housekeeping@hotel.com',
        password: 'house123',
        role: 'housekeeping',
        phone: '+1 (555) 345-6789'
      },
      {
        id: 'user_maintenance_001',
        name: 'Tom Fix',
        email: 'maintenance@hotel.com',
        password: 'maint123',
        role: 'maintenance',
        phone: '+1 (555) 456-7890'
      },
      {
        id: 'user_admin_001',
        name: 'Alex Admin',
        email: 'admin@hotel.com',
        password: 'admin123',
        role: 'admin',
        phone: '+1 (555) 567-8901'
      }
    ];

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 12);
      await db.run(
        'INSERT INTO users (id, name, email, password, role, phone) VALUES (?, ?, ?, ?, ?, ?)',
        [user.id, user.name, user.email, hashedPassword, user.role, user.phone]
      );
      console.log(`✓ Created user: ${user.email}`);
    }

    // Seed rooms
    const rooms = [
      { id: '101', number: '101', type: 'Standard', status: 'occupied', occupants: 2, guest_name: 'John Smith', floor: 1, cleaning_status: 'clean', amenities: ['WiFi', 'TV'], base_rate: 150, current_rate: 180 },
      { id: '102', number: '102', type: 'Standard', status: 'cleaning', floor: 1, cleaning_status: 'in-progress', amenities: ['WiFi', 'TV'], base_rate: 150, current_rate: 180 },
      { id: '103', number: '103', type: 'Deluxe', status: 'available', floor: 1, cleaning_status: 'clean', amenities: ['WiFi', 'TV', 'Mini Bar'], base_rate: 200, current_rate: 234 },
      { id: '104', number: '104', type: 'Standard', status: 'occupied', occupants: 1, guest_name: 'Sarah Johnson', floor: 1, cleaning_status: 'clean', amenities: ['WiFi', 'TV'], base_rate: 150, current_rate: 180 },
      { id: '201', number: '201', type: 'Suite', status: 'occupied', occupants: 3, guest_name: 'Davis Family', floor: 2, cleaning_status: 'clean', amenities: ['WiFi', 'TV', 'Mini Bar', 'Jacuzzi'], base_rate: 350, current_rate: 420 },
      { id: '202', number: '202', type: 'Deluxe', status: 'occupied', occupants: 2, guest_name: 'Mike & Lisa Chen', floor: 2, cleaning_status: 'clean', amenities: ['WiFi', 'TV', 'Mini Bar'], base_rate: 200, current_rate: 234 },
      { id: '203', number: '203', type: 'Standard', status: 'maintenance', floor: 2, cleaning_status: 'dirty', amenities: ['WiFi', 'TV'], base_rate: 150, current_rate: 180 },
      { id: '204', number: '204', type: 'Deluxe', status: 'occupied', occupants: 1, guest_name: 'Emma Wilson', floor: 2, cleaning_status: 'clean', amenities: ['WiFi', 'TV', 'Mini Bar'], base_rate: 200, current_rate: 234 },
      { id: '301', number: '301', type: 'Suite', status: 'cleaning', floor: 3, cleaning_status: 'in-progress', amenities: ['WiFi', 'TV', 'Mini Bar', 'Jacuzzi'], base_rate: 350, current_rate: 420 },
      { id: '302', number: '302', type: 'Executive', status: 'available', floor: 3, cleaning_status: 'clean', amenities: ['WiFi', 'TV', 'Mini Bar', 'Office'], base_rate: 300, current_rate: 360 },
      { id: '303', number: '303', type: 'Deluxe', status: 'occupied', occupants: 2, guest_name: 'Robert & Jane', floor: 3, cleaning_status: 'clean', amenities: ['WiFi', 'TV', 'Mini Bar'], base_rate: 200, current_rate: 234 },
      { id: '304', number: '304', type: 'Suite', status: 'occupied', occupants: 4, guest_name: 'Anderson Family', floor: 3, cleaning_status: 'clean', amenities: ['WiFi', 'TV', 'Mini Bar', 'Jacuzzi'], base_rate: 350, current_rate: 420 },
      { id: '401', number: '401', type: 'Penthouse', status: 'occupied', occupants: 2, guest_name: 'VIP Guest', floor: 4, cleaning_status: 'clean', amenities: ['WiFi', 'TV', 'Mini Bar', 'Jacuzzi', 'Kitchen'], base_rate: 500, current_rate: 600 },
      { id: '402', number: '402', type: 'Executive', status: 'available', floor: 4, cleaning_status: 'clean', amenities: ['WiFi', 'TV', 'Mini Bar', 'Office'], base_rate: 300, current_rate: 360 },
      { id: '403', number: '403', type: 'Suite', status: 'occupied', occupants: 1, guest_name: 'Dr. Martinez', floor: 4, cleaning_status: 'clean', amenities: ['WiFi', 'TV', 'Mini Bar', 'Jacuzzi'], base_rate: 350, current_rate: 420 },
      { id: '404', number: '404', type: 'Deluxe', status: 'available', floor: 4, cleaning_status: 'clean', amenities: ['WiFi', 'TV', 'Mini Bar'], base_rate: 200, current_rate: 234 }
    ];

    for (const room of rooms) {
      await db.run(
        `INSERT INTO rooms (
          id, number, type, status, floor, occupants, guest_name, 
          cleaning_status, amenities, base_rate, current_rate
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          room.id, room.number, room.type, room.status, room.floor,
          room.occupants || 0, room.guest_name || null, room.cleaning_status,
          JSON.stringify(room.amenities), room.base_rate, room.current_rate
        ]
      );
      console.log(`✓ Created room: ${room.number}`);
    }

    // Seed reservations
    const reservations = [
      {
        id: 'BK-2025-001',
        guest_id: 'user_guest_001',
        guest_name: 'John Smith',
        guest_email: 'john.smith@email.com',
        room_id: '101',
        room_number: '101',
        room_type: 'Standard',
        check_in: '2025-01-27',
        check_out: '2025-01-31',
        status: 'checked-in',
        total_amount: 720,
        currency: 'USD',
        payment_status: 'partial',
        number_of_guests: 2,
        special_requests: ['Late checkout']
      },
      {
        id: 'BK-2025-002',
        guest_id: 'user_guest_001',
        guest_name: 'Emma Wilson',
        guest_email: 'emma.w@email.com',
        room_id: '204',
        room_number: '204',
        room_type: 'Deluxe',
        check_in: '2025-01-28',
        check_out: '2025-02-01',
        status: 'confirmed',
        total_amount: 936,
        currency: 'USD',
        payment_status: 'pending',
        number_of_guests: 1,
        special_requests: ['Non-smoking']
      }
    ];

    for (const reservation of reservations) {
      await db.run(
        `INSERT INTO reservations (
          id, guest_id, guest_name, guest_email, room_id, room_number, room_type,
          check_in, check_out, status, total_amount, currency, payment_status,
          number_of_guests, special_requests
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          reservation.id, reservation.guest_id, reservation.guest_name, reservation.guest_email,
          reservation.room_id, reservation.room_number, reservation.room_type,
          reservation.check_in, reservation.check_out, reservation.status,
          reservation.total_amount, reservation.currency, reservation.payment_status,
          reservation.number_of_guests, JSON.stringify(reservation.special_requests)
        ]
      );
      console.log(`✓ Created reservation: ${reservation.id}`);
    }

    // Seed housekeeping tasks
    const tasks = [
      {
        id: 'task_001',
        room_number: '102',
        type: 'Deep Clean',
        priority: 'high',
        status: 'in-progress',
        assignee: 'user_housekeeping_001',
        assignee_name: 'Maria Cleaning',
        estimated_time: 45
      },
      {
        id: 'task_002',
        room_number: '301',
        type: 'Standard Clean',
        priority: 'medium',
        status: 'pending',
        assignee: 'user_housekeeping_001',
        assignee_name: 'Maria Cleaning',
        estimated_time: 30
      },
      {
        id: 'task_003',
        room_number: '405',
        type: 'Turndown Service',
        priority: 'low',
        status: 'pending',
        estimated_time: 15
      }
    ];

    for (const task of tasks) {
      await db.run(
        `INSERT INTO housekeeping_tasks (
          id, room_number, type, priority, status, assignee, assignee_name, estimated_time
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          task.id, task.room_number, task.type, task.priority,
          task.status, task.assignee, task.assignee_name, task.estimated_time
        ]
      );
      console.log(`✓ Created task: ${task.id}`);
    }

    // Seed inventory
    const inventory = [
      { id: 'inv_001', name: 'Towels', stock: 45, minimum: 30, unit: 'pieces', status: 'good', category: 'Linens', last_restocked: '2025-01-25' },
      { id: 'inv_002', name: 'Bed Linens', stock: 28, minimum: 25, unit: 'sets', status: 'good', category: 'Linens', last_restocked: '2025-01-24' },
      { id: 'inv_003', name: 'Toiletries', stock: 18, minimum: 20, unit: 'sets', status: 'low', category: 'Amenities', last_restocked: '2025-01-20' },
      { id: 'inv_004', name: 'Cleaning Supplies', stock: 12, minimum: 15, unit: 'units', status: 'low', category: 'Supplies', last_restocked: '2025-01-21' }
    ];

    for (const item of inventory) {
      await db.run(
        `INSERT INTO inventory (
          id, name, stock, minimum, unit, status, category, last_restocked
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          item.id, item.name, item.stock, item.minimum,
          item.unit, item.status, item.category, item.last_restocked
        ]
      );
      console.log(`✓ Created inventory item: ${item.name}`);
    }

    // Seed work orders
    const workOrders = [
      {
        id: 'WO-2025-145',
        room_number: '203',
        issue: 'AC not working',
        description: 'Guest reported AC not cooling properly',
        priority: 'high',
        status: 'in-progress',
        assignee: 'user_maintenance_001',
        assignee_name: 'Tom Fix',
        reported_by: 'user_reception_001',
        category: 'HVAC',
        estimated_cost: 150
      },
      {
        id: 'WO-2025-146',
        room_number: '512',
        issue: 'Leaking faucet',
        description: 'Bathroom sink faucet has a slow drip',
        priority: 'medium',
        status: 'pending',
        reported_by: 'user_housekeeping_001',
        category: 'Plumbing',
        estimated_cost: 50
      }
    ];

    for (const workOrder of workOrders) {
      await db.run(
        `INSERT INTO work_orders (
          id, room_number, issue, description, priority, status,
          assignee, assignee_name, reported_by, category, estimated_cost
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          workOrder.id, workOrder.room_number, workOrder.issue, workOrder.description,
          workOrder.priority, workOrder.status, workOrder.assignee, workOrder.assignee_name,
          workOrder.reported_by, workOrder.category, workOrder.estimated_cost
        ]
      );
      console.log(`✓ Created work order: ${workOrder.id}`);
    }

    console.log('✅ Database seeded successfully!');
    console.log('\n📋 Demo Login Credentials:');
    console.log('Admin: admin@hotel.com / admin123');
    console.log('Receptionist: reception@hotel.com / reception123');
    console.log('Housekeeping: housekeeping@hotel.com / house123');
    console.log('Maintenance: maintenance@hotel.com / maint123');
    console.log('Guest: guest@hotel.com / guest123');

  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase().then(() => {
    console.log('\n🎉 Setup complete! Run "npm run dev" to start the server.');
    process.exit(0);
  }).catch(err => {
    console.error('❌ Setup failed:', err.message);
    process.exit(1);
  });
}

module.exports = { seedDatabase };