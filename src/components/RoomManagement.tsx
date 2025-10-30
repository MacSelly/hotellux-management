import { GlassCard } from './GlassCard';
import { 
  BedDouble,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Wrench,
  Sparkles,
  User,
  Grid3x3,
  List,
  Filter
} from 'lucide-react';
import { useState } from 'react';

const rooms = [
  { number: '101', type: 'Standard', status: 'occupied', floor: 1, clean: true, maintenance: false },
  { number: '102', type: 'Standard', status: 'cleaning', floor: 1, clean: false, maintenance: false },
  { number: '103', type: 'Deluxe', status: 'available', floor: 1, clean: true, maintenance: false },
  { number: '104', type: 'Standard', status: 'occupied', floor: 1, clean: true, maintenance: false },
  { number: '201', type: 'Suite', status: 'available', floor: 2, clean: true, maintenance: false },
  { number: '202', type: 'Deluxe', status: 'occupied', floor: 2, clean: true, maintenance: false },
  { number: '203', type: 'Standard', status: 'maintenance', floor: 2, clean: false, maintenance: true },
  { number: '204', type: 'Deluxe', status: 'occupied', floor: 2, clean: true, maintenance: false },
  { number: '301', type: 'Suite', status: 'cleaning', floor: 3, clean: false, maintenance: false },
  { number: '302', type: 'Executive', status: 'available', floor: 3, clean: true, maintenance: false },
  { number: '303', type: 'Deluxe', status: 'occupied', floor: 3, clean: true, maintenance: false },
  { number: '304', type: 'Suite', status: 'reserved', floor: 3, clean: true, maintenance: false },
];

const housekeepingTasks = [
  { id: 1, room: '102', assignee: 'Maria Garcia', task: 'Deep Clean', priority: 'high', time: '30 min' },
  { id: 2, room: '301', assignee: 'John Smith', task: 'Standard Clean', priority: 'medium', time: '45 min' },
  { id: 3, room: '405', assignee: 'Sarah Lee', task: 'Turndown Service', priority: 'low', time: '15 min' },
];

const maintenanceIssues = [
  { room: '203', issue: 'AC not working', priority: 'high', status: 'in-progress' },
  { room: '512', issue: 'Leaking faucet', priority: 'medium', status: 'pending' },
  { room: '308', issue: 'Light bulb replacement', priority: 'low', status: 'pending' },
];

export function RoomManagement() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFloor, setSelectedFloor] = useState<number | 'all'>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'from-emerald-400 to-teal-500';
      case 'occupied':
        return 'from-cyan-400 to-blue-500';
      case 'cleaning':
        return 'from-orange-400 to-yellow-500';
      case 'maintenance':
        return 'from-red-400 to-pink-500';
      case 'reserved':
        return 'from-purple-400 to-indigo-500';
      default:
        return 'from-slate-400 to-slate-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return CheckCircle;
      case 'occupied':
        return User;
      case 'cleaning':
        return Sparkles;
      case 'maintenance':
        return Wrench;
      case 'reserved':
        return Clock;
      default:
        return XCircle;
    }
  };

  const filteredRooms = selectedFloor === 'all' 
    ? rooms 
    : rooms.filter(room => room.floor === selectedFloor);

  const statusCounts = {
    available: rooms.filter(r => r.status === 'available').length,
    occupied: rooms.filter(r => r.status === 'occupied').length,
    cleaning: rooms.filter(r => r.status === 'cleaning').length,
    maintenance: rooms.filter(r => r.status === 'maintenance').length,
  };

  return (
    <div className="flex-1 p-8 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-slate-800 dark:text-white mb-2">Room Management</h1>
          <p className="text-slate-500 dark:text-slate-400">Real-time room status and housekeeping coordination</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2.5 glass-card rounded-xl text-slate-600 dark:text-slate-300 hover:glass-intense transition-all duration-200 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <div className="flex gap-2 glass-card p-1.5 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === 'grid' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' 
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === 'list' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' 
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <GlassCard hover className="p-5 cursor-pointer">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Available</p>
              <h3 className="text-slate-800 dark:text-white">{statusCounts.available}</h3>
            </div>
          </div>
          <div className="h-1 rounded-full bg-slate-200 dark:bg-slate-700">
            <div className="h-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500" style={{ width: `${(statusCounts.available / rooms.length) * 100}%` }} />
          </div>
        </GlassCard>

        <GlassCard hover className="p-5 cursor-pointer">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Occupied</p>
              <h3 className="text-slate-800 dark:text-white">{statusCounts.occupied}</h3>
            </div>
          </div>
          <div className="h-1 rounded-full bg-slate-200 dark:bg-slate-700">
            <div className="h-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${(statusCounts.occupied / rooms.length) * 100}%` }} />
          </div>
        </GlassCard>

        <GlassCard hover className="p-5 cursor-pointer">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Cleaning</p>
              <h3 className="text-slate-800 dark:text-white">{statusCounts.cleaning}</h3>
            </div>
          </div>
          <div className="h-1 rounded-full bg-slate-200 dark:bg-slate-700">
            <div className="h-1 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500" style={{ width: `${(statusCounts.cleaning / rooms.length) * 100}%` }} />
          </div>
        </GlassCard>

        <GlassCard hover className="p-5 cursor-pointer">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Maintenance</p>
              <h3 className="text-slate-800 dark:text-white">{statusCounts.maintenance}</h3>
            </div>
          </div>
          <div className="h-1 rounded-full bg-slate-200 dark:bg-slate-700">
            <div className="h-1 rounded-full bg-gradient-to-r from-red-400 to-pink-500" style={{ width: `${(statusCounts.maintenance / rooms.length) * 100}%` }} />
          </div>
        </GlassCard>
      </div>

      {/* Floor Selector */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setSelectedFloor('all')}
          className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 ${
            selectedFloor === 'all' 
              ? 'glass-intense text-cyan-600 dark:text-cyan-400' 
              : 'glass-card text-slate-600 dark:text-slate-300'
          }`}
        >
          All Floors
        </button>
        {[1, 2, 3].map(floor => (
          <button
            key={floor}
            onClick={() => setSelectedFloor(floor)}
            className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 ${
              selectedFloor === floor 
                ? 'glass-intense text-cyan-600 dark:text-cyan-400' 
                : 'glass-card text-slate-600 dark:text-slate-300'
            }`}
          >
            Floor {floor}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Room Grid/List */}
        <GlassCard className="p-6 lg:col-span-2">
          <h3 className="text-slate-800 dark:text-white mb-6">Room Status Board</h3>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredRooms.map(room => {
                const StatusIcon = getStatusIcon(room.status);
                return (
                  <div
                    key={room.number}
                    className="glass-subtle rounded-xl p-4 hover:glass-intense transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-slate-800 dark:text-white">{room.number}</h4>
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getStatusColor(room.status)} flex items-center justify-center`}>
                        <StatusIcon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{room.type}</p>
                    <span className="inline-block px-2 py-1 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">
                      {room.status}
                    </span>
                    {room.maintenance && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-red-500">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Issue</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredRooms.map(room => {
                const StatusIcon = getStatusIcon(room.status);
                return (
                  <div
                    key={room.number}
                    className="glass-subtle rounded-xl p-4 hover:glass-intense transition-all duration-200 cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getStatusColor(room.status)} flex items-center justify-center`}>
                        <StatusIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-slate-800 dark:text-white">Room {room.number}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{room.type} • Floor {room.floor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">
                        {room.status}
                      </span>
                      {room.clean && (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      )}
                      {room.maintenance && (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </GlassCard>

        {/* Tasks & Issues */}
        <div className="space-y-6">
          {/* Housekeeping Tasks */}
          <GlassCard className="p-5">
            <h4 className="text-slate-800 dark:text-white mb-4">Housekeeping Tasks</h4>
            <div className="space-y-3">
              {housekeepingTasks.map(task => (
                <div key={task.id} className="glass-subtle rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-700 dark:text-slate-200">Room {task.room}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      task.priority === 'high' 
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        : task.priority === 'medium'
                        ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{task.task}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{task.assignee} • {task.time}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Maintenance Issues */}
          <GlassCard className="p-5">
            <h4 className="text-slate-800 dark:text-white mb-4">Maintenance Issues</h4>
            <div className="space-y-3">
              {maintenanceIssues.map((issue, index) => (
                <div key={index} className="glass-subtle rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-700 dark:text-slate-200">Room {issue.room}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      issue.status === 'in-progress'
                        ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {issue.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{issue.issue}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
