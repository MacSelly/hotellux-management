// Database seeder - Run this to populate initial data
import * as kv from './kv_store.tsx';

export async function seedDatabase() {
  console.log('🌱 Starting database seed...');

  // Seed users
  const users = [
    {
      id: 'user_guest_001',
      name: 'John Guest',
      email: 'guest@hotel.com',
      password: 'guest123',
      role: 'guest',
      phone: '+1 (555) 123-4567',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'user_reception_001',
      name: 'Sarah Reception',
      email: 'reception@hotel.com',
      password: 'reception123',
      role: 'receptionist',
      phone: '+1 (555) 234-5678',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'user_housekeeping_001',
      name: 'Maria Cleaning',
      email: 'housekeeping@hotel.com',
      password: 'house123',
      role: 'housekeeping',
      phone: '+1 (555) 345-6789',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'user_maintenance_001',
      name: 'Tom Fix',
      email: 'maintenance@hotel.com',
      password: 'maint123',
      role: 'maintenance',
      phone: '+1 (555) 456-7890',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'user_admin_001',
      name: 'Alex Admin',
      email: 'admin@hotel.com',
      password: 'admin123',
      role: 'admin',
      phone: '+1 (555) 567-8901',
      createdAt: new Date().toISOString(),
    },
  ];

  for (const user of users) {
    await kv.set(`user:${user.id}`, user);
    console.log(`✓ Created user: ${user.email}`);
  }

  // Seed rooms
  const rooms = [
    { number: '101', type: 'Standard', status: 'occupied', occupants: 2, guestName: 'John Smith', floor: 1, cleaningStatus: 'clean', amenities: ['WiFi', 'TV'], baseRate: 150, currentRate: 180 },
    { number: '102', type: 'Standard', status: 'cleaning', floor: 1, cleaningStatus: 'in-progress', amenities: ['WiFi', 'TV'], baseRate: 150, currentRate: 180 },
    { number: '103', type: 'Deluxe', status: 'available', floor: 1, cleaningStatus: 'clean', amenities: ['WiFi', 'TV', 'Mini Bar'], baseRate: 200, currentRate: 234 },
    { number: '104', type: 'Standard', status: 'occupied', occupants: 1, guestName: 'Sarah Johnson', floor: 1, cleaningStatus: 'clean', amenities: ['WiFi', 'TV'], baseRate: 150, currentRate: 180 },
    { number: '201', type: 'Suite', status: 'occupied', occupants: 3, guestName: 'Davis Family', floor: 2, cleaningStatus: 'clean', amenities: ['WiFi', 'TV', 'Mini Bar', 'Jacuzzi'], baseRate: 350, currentRate: 420 },
    { number: '202', type: 'Deluxe', status: 'occupied', occupants: 2, guestName: 'Mike & Lisa Chen', floor: 2, cleaningStatus: 'clean', amenities: ['WiFi', 'TV', 'Mini Bar'], baseRate: 200, currentRate: 234 },
    { number: '203', type: 'Standard', status: 'maintenance', floor: 2, cleaningStatus: 'dirty', amenities: ['WiFi', 'TV'], baseRate: 150, currentRate: 180 },
    { number: '204', type: 'Deluxe', status: 'occupied', occupants: 1, guestName: 'Emma Wilson', floor: 2, cleaningStatus: 'clean', amenities: ['WiFi', 'TV', 'Mini Bar'], baseRate: 200, currentRate: 234 },
    { number: '301', type: 'Suite', status: 'cleaning', floor: 3, cleaningStatus: 'in-progress', amenities: ['WiFi', 'TV', 'Mini Bar', 'Jacuzzi'], baseRate: 350, currentRate: 420 },
    { number: '302', type: 'Executive', status: 'available', floor: 3, cleaningStatus: 'clean', amenities: ['WiFi', 'TV', 'Mini Bar', 'Office'], baseRate: 300, currentRate: 360 },
    { number: '303', type: 'Deluxe', status: 'occupied', occupants: 2, guestName: 'Robert & Jane', floor: 3, cleaningStatus: 'clean', amenities: ['WiFi', 'TV', 'Mini Bar'], baseRate: 200, currentRate: 234 },
    { number: '304', type: 'Suite', status: 'occupied', occupants: 4, guestName: 'Anderson Family', floor: 3, cleaningStatus: 'clean', amenities: ['WiFi', 'TV', 'Mini Bar', 'Jacuzzi'], baseRate: 350, currentRate: 420 },
    { number: '401', type: 'Penthouse', status: 'occupied', occupants: 2, guestName: 'VIP Guest', floor: 4, cleaningStatus: 'clean', amenities: ['WiFi', 'TV', 'Mini Bar', 'Jacuzzi', 'Kitchen'], baseRate: 500, currentRate: 600 },
    { number: '402', type: 'Executive', status: 'available', floor: 4, cleaningStatus: 'clean', amenities: ['WiFi', 'TV', 'Mini Bar', 'Office'], baseRate: 300, currentRate: 360 },
    { number: '403', type: 'Suite', status: 'occupied', occupants: 1, guestName: 'Dr. Martinez', floor: 4, cleaningStatus: 'clean', amenities: ['WiFi', 'TV', 'Mini Bar', 'Jacuzzi'], baseRate: 350, currentRate: 420 },
    { number: '404', type: 'Deluxe', status: 'available', floor: 4, cleaningStatus: 'clean', amenities: ['WiFi', 'TV', 'Mini Bar'], baseRate: 200, currentRate: 234 },
  ];

  for (const room of rooms) {
    await kv.set(`room:${room.number}`, {
      id: room.number,
      ...room,
      createdAt: new Date().toISOString(),
    });
    console.log(`✓ Created room: ${room.number}`);
  }

  // Seed reservations
  const reservations = [
    {
      id: 'BK-2025-001',
      guestId: 'user_guest_001',
      guestName: 'John Smith',
      guestEmail: 'john.smith@email.com',
      roomId: '101',
      roomNumber: '101',
      roomType: 'Standard',
      checkIn: '2025-10-27',
      checkOut: '2025-10-31',
      status: 'checked-in',
      totalAmount: 720,
      currency: 'USD',
      paymentStatus: 'partial',
      numberOfGuests: 2,
      specialRequests: ['Late checkout'],
      createdAt: '2025-10-20T10:00:00Z',
    },
    {
      id: 'BK-2025-002',
      guestId: 'user_guest_001',
      guestName: 'Emma Wilson',
      guestEmail: 'emma.w@email.com',
      roomId: '204',
      roomNumber: '204',
      roomType: 'Deluxe',
      checkIn: '2025-10-28',
      checkOut: '2025-11-01',
      status: 'confirmed',
      totalAmount: 936,
      currency: 'USD',
      paymentStatus: 'pending',
      numberOfGuests: 1,
      specialRequests: ['Non-smoking'],
      createdAt: '2025-10-22T14:30:00Z',
    },
  ];

  for (const reservation of reservations) {
    await kv.set(`reservation:${reservation.id}`, reservation);
    console.log(`✓ Created reservation: ${reservation.id}`);
  }

  // Seed housekeeping tasks
  const tasks = [
    {
      id: 'task_001',
      roomNumber: '102',
      type: 'Deep Clean',
      priority: 'high',
      status: 'in-progress',
      assignee: 'user_housekeeping_001',
      assigneeName: 'Maria Cleaning',
      estimatedTime: 45,
      startedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: 'task_002',
      roomNumber: '301',
      type: 'Standard Clean',
      priority: 'medium',
      status: 'pending',
      assignee: 'user_housekeeping_001',
      assigneeName: 'Maria Cleaning',
      estimatedTime: 30,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'task_003',
      roomNumber: '405',
      type: 'Turndown Service',
      priority: 'low',
      status: 'pending',
      estimatedTime: 15,
      createdAt: new Date().toISOString(),
    },
  ];

  for (const task of tasks) {
    await kv.set(`task:${task.id}`, task);
    console.log(`✓ Created task: ${task.id}`);
  }

  // Seed inventory
  const inventory = [
    { id: 'inv_001', name: 'Towels', stock: 45, minimum: 30, unit: 'pieces', status: 'good', category: 'Linens', lastRestocked: '2025-10-25' },
    { id: 'inv_002', name: 'Bed Linens', stock: 28, minimum: 25, unit: 'sets', status: 'good', category: 'Linens', lastRestocked: '2025-10-24' },
    { id: 'inv_003', name: 'Toiletries', stock: 18, minimum: 20, unit: 'sets', status: 'low', category: 'Amenities', lastRestocked: '2025-10-20' },
    { id: 'inv_004', name: 'Cleaning Supplies', stock: 12, minimum: 15, unit: 'units', status: 'low', category: 'Supplies', lastRestocked: '2025-10-21' },
  ];

  for (const item of inventory) {
    await kv.set(`inventory:${item.id}`, item);
    console.log(`✓ Created inventory item: ${item.name}`);
  }

  // Seed work orders
  const workOrders = [
    {
      id: 'WO-2025-145',
      roomNumber: '203',
      issue: 'AC not working',
      description: 'Guest reported AC not cooling properly',
      priority: 'high',
      status: 'in-progress',
      assignee: 'user_maintenance_001',
      assigneeName: 'Tom Fix',
      reportedBy: 'user_reception_001',
      category: 'HVAC',
      estimatedCost: 150,
      createdAt: '2025-10-27T08:00:00Z',
    },
    {
      id: 'WO-2025-146',
      roomNumber: '512',
      issue: 'Leaking faucet',
      description: 'Bathroom sink faucet has a slow drip',
      priority: 'medium',
      status: 'pending',
      reportedBy: 'user_housekeeping_001',
      category: 'Plumbing',
      estimatedCost: 50,
      createdAt: '2025-10-27T09:30:00Z',
    },
  ];

  for (const workOrder of workOrders) {
    await kv.set(`work-order:${workOrder.id}`, workOrder);
    console.log(`✓ Created work order: ${workOrder.id}`);
  }

  console.log('✅ Database seeded successfully!');
}

// Run if called directly
if (import.meta.main) {
  await seedDatabase();
}
