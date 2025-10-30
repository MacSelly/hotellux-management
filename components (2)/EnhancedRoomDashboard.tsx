import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { AnimatedRoomCard } from './AnimatedRoomCard';
import { Filter, Grid3x3, List, Search } from 'lucide-react';

const rooms = [
  { number: '101', type: 'Standard', status: 'occupied' as const, occupants: 2, guestName: 'John Smith', floor: 1 },
  { number: '102', type: 'Standard', status: 'cleaning' as const, floor: 1 },
  { number: '103', type: 'Deluxe', status: 'available' as const, floor: 1 },
  { number: '104', type: 'Standard', status: 'occupied' as const, occupants: 1, guestName: 'Sarah Johnson', floor: 1 },
  { number: '201', type: 'Suite', status: 'occupied' as const, occupants: 3, guestName: 'Davis Family', floor: 2 },
  { number: '202', type: 'Deluxe', status: 'occupied' as const, occupants: 2, guestName: 'Mike & Lisa Chen', floor: 2 },
  { number: '203', type: 'Standard', status: 'maintenance' as const, floor: 2 },
  { number: '204', type: 'Deluxe', status: 'occupied' as const, occupants: 1, guestName: 'Emma Wilson', floor: 2 },
  { number: '301', type: 'Suite', status: 'cleaning' as const, floor: 3 },
  { number: '302', type: 'Executive', status: 'available' as const, floor: 3 },
  { number: '303', type: 'Deluxe', status: 'occupied' as const, occupants: 2, guestName: 'Robert & Jane', floor: 3 },
  { number: '304', type: 'Suite', status: 'occupied' as const, occupants: 4, guestName: 'Anderson Family', floor: 3 },
  { number: '401', type: 'Penthouse', status: 'occupied' as const, occupants: 2, guestName: 'VIP Guest', floor: 4 },
  { number: '402', type: 'Executive', status: 'available' as const, floor: 4 },
  { number: '403', type: 'Suite', status: 'occupied' as const, occupants: 1, guestName: 'Dr. Martinez', floor: 4 },
  { number: '404', type: 'Deluxe', status: 'available' as const, floor: 4 },
];

export function EnhancedRoomDashboard() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFloor, setSelectedFloor] = useState<number | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredRooms = rooms.filter(room => {
    const floorMatch = selectedFloor === 'all' || room.floor === selectedFloor;
    const statusMatch = statusFilter === 'all' || room.status === statusFilter;
    return floorMatch && statusMatch;
  });

  const statusCounts = {
    available: rooms.filter(r => r.status === 'available').length,
    occupied: rooms.filter(r => r.status === 'occupied').length,
    cleaning: rooms.filter(r => r.status === 'cleaning').length,
    maintenance: rooms.filter(r => r.status === 'maintenance').length,
  };

  const totalOccupants = rooms
    .filter(r => r.status === 'occupied')
    .reduce((sum, r) => sum + (r.occupants || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <GlassCard className="p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Rooms</p>
          <h3 className="text-slate-800 dark:text-white">{rooms.length}</h3>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Available</p>
          <h3 className="text-emerald-600 dark:text-emerald-400">{statusCounts.available}</h3>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Occupied</p>
          <h3 className="text-cyan-600 dark:text-cyan-400">{statusCounts.occupied}</h3>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Guests</p>
          <h3 className="text-slate-800 dark:text-white">{totalOccupants}</h3>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Occupancy Rate</p>
          <h3 className="text-slate-800 dark:text-white">
            {Math.round((statusCounts.occupied / rooms.length) * 100)}%
          </h3>
        </GlassCard>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 relative min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search rooms..."
            className="w-full pl-10 pr-4 py-2.5 glass-card rounded-xl text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-2 rounded-lg text-xs transition-all ${
              statusFilter === 'all' ? 'glass-intense text-cyan-600 dark:text-cyan-400' : 'glass-card text-slate-600 dark:text-slate-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('available')}
            className={`px-3 py-2 rounded-lg text-xs transition-all ${
              statusFilter === 'available' ? 'glass-intense text-emerald-600 dark:text-emerald-400' : 'glass-card text-slate-600 dark:text-slate-300'
            }`}
          >
            Available
          </button>
          <button
            onClick={() => setStatusFilter('occupied')}
            className={`px-3 py-2 rounded-lg text-xs transition-all ${
              statusFilter === 'occupied' ? 'glass-intense text-cyan-600 dark:text-cyan-400' : 'glass-card text-slate-600 dark:text-slate-300'
            }`}
          >
            Occupied
          </button>
        </div>

        <div className="flex gap-2">
          {['all', 1, 2, 3, 4].map((floor) => (
            <button
              key={floor}
              onClick={() => setSelectedFloor(floor as number | 'all')}
              className={`px-3 py-2 rounded-lg text-xs transition-all ${
                selectedFloor === floor ? 'glass-intense text-cyan-600 dark:text-cyan-400' : 'glass-card text-slate-600 dark:text-slate-300'
              }`}
            >
              {floor === 'all' ? 'All Floors' : `Floor ${floor}`}
            </button>
          ))}
        </div>

        <div className="flex gap-2 glass-card p-1.5 rounded-xl">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'grid' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'list' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Room Grid */}
      <div className={
        viewMode === 'grid'
          ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
          : 'space-y-3'
      }>
        {filteredRooms.map((room) => (
          <AnimatedRoomCard
            key={room.number}
            number={room.number}
            type={room.type}
            status={room.status}
            occupants={room.occupants}
            guestName={room.guestName}
          />
        ))}
      </div>
    </div>
  );
}
