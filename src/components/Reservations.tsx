import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { Calendar, Search, Filter, Plus, Eye, Edit, Trash2, User, Mail, Phone, MapPin } from 'lucide-react';

const mockReservations = [
  {
    id: 'BK-2025-001',
    guestName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    roomNumber: '101',
    roomType: 'Standard',
    checkIn: '2025-01-27',
    checkOut: '2025-01-31',
    status: 'checked-in',
    totalAmount: 720,
    guests: 2,
    specialRequests: ['Late checkout']
  },
  {
    id: 'BK-2025-002',
    guestName: 'Emma Wilson',
    email: 'emma.w@email.com',
    phone: '+1 (555) 234-5678',
    roomNumber: '204',
    roomType: 'Deluxe',
    checkIn: '2025-01-28',
    checkOut: '2025-02-01',
    status: 'confirmed',
    totalAmount: 936,
    guests: 1,
    specialRequests: ['Non-smoking']
  },
  {
    id: 'BK-2025-003',
    guestName: 'Davis Family',
    email: 'davis.family@email.com',
    phone: '+1 (555) 345-6789',
    roomNumber: '201',
    roomType: 'Suite',
    checkIn: '2025-01-29',
    checkOut: '2025-02-03',
    status: 'pending',
    totalAmount: 1260,
    guests: 4,
    specialRequests: ['Extra bed', 'High floor']
  }
];

export function Reservations() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReservations = mockReservations.filter(reservation => {
    const matchesStatus = selectedStatus === 'all' || reservation.status === selectedStatus;
    const matchesSearch = reservation.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
      case 'checked-in': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'cancelled': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Reservations</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage hotel bookings and guest reservations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <GlassCard className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">Total Reservations</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{mockReservations.length}</h3>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">Checked In</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                {mockReservations.filter(r => r.status === 'checked-in').length}
              </h3>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">Pending</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                {mockReservations.filter(r => r.status === 'pending').length}
              </h3>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">Revenue</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                ${mockReservations.reduce((sum, r) => sum + r.totalAmount, 0).toLocaleString()}
              </h3>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Filters and Search */}
      <GlassCard className="p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search reservations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass-subtle rounded-xl text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
            />
          </div>

          <div className="flex gap-2">
            {['all', 'confirmed', 'checked-in', 'pending'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  selectedStatus === status
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                    : 'glass-subtle text-slate-600 dark:text-slate-300 hover:glass-intense'
                }`}
              >
                {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>

          <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Reservation
          </button>
        </div>
      </GlassCard>

      {/* Reservations List */}
      <div className="space-y-4">
        {filteredReservations.map((reservation) => (
          <GlassCard key={reservation.id} className="p-6 hover:glass-intense transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{reservation.guestName}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {reservation.email}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {reservation.phone}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Room</p>
                  <p className="text-lg font-semibold text-slate-800 dark:text-white">{reservation.roomNumber}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{reservation.roomType}</p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Check-in</p>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">{reservation.checkIn}</p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Check-out</p>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">{reservation.checkOut}</p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Total</p>
                  <p className="text-lg font-semibold text-slate-800 dark:text-white">${reservation.totalAmount}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                  {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1).replace('-', ' ')}
                </span>

                <div className="flex gap-2">
                  <button className="p-2 glass-subtle rounded-xl hover:glass-intense transition-all">
                    <Eye className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  </button>
                  <button className="p-2 glass-subtle rounded-xl hover:glass-intense transition-all">
                    <Edit className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  </button>
                  <button className="p-2 glass-subtle rounded-xl hover:glass-intense transition-all">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>

            {reservation.specialRequests.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-200/20 dark:border-slate-700/20">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Special Requests:</p>
                <div className="flex gap-2">
                  {reservation.specialRequests.map((request, index) => (
                    <span key={index} className="px-2 py-1 glass-subtle rounded-lg text-xs text-slate-600 dark:text-slate-300">
                      {request}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}