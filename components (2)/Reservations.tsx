import { GlassCard } from './GlassCard';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Search, 
  Filter,
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  Check,
  X,
  Edit,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

const reservations = [
  {
    id: 'BK-2024-001',
    guest: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    room: '204 - Deluxe Suite',
    checkIn: 'Oct 28, 2025',
    checkOut: 'Oct 31, 2025',
    status: 'Confirmed',
    amount: '$890',
    color: 'emerald'
  },
  {
    id: 'BK-2024-002',
    guest: 'Emma Wilson',
    email: 'emma.w@email.com',
    phone: '+1 (555) 234-5678',
    room: '312 - Ocean View',
    checkIn: 'Oct 29, 2025',
    checkOut: 'Nov 02, 2025',
    status: 'Pending',
    amount: '$1,240',
    color: 'orange'
  },
  {
    id: 'BK-2024-003',
    guest: 'Michael Brown',
    email: 'mbrown@email.com',
    phone: '+1 (555) 345-6789',
    room: '156 - Standard Room',
    checkIn: 'Oct 27, 2025',
    checkOut: 'Oct 30, 2025',
    status: 'Checked In',
    amount: '$680',
    color: 'cyan'
  },
  {
    id: 'BK-2024-004',
    guest: 'Sarah Davis',
    email: 'sarah.d@email.com',
    phone: '+1 (555) 456-7890',
    room: '208 - Executive Suite',
    checkIn: 'Oct 30, 2025',
    checkOut: 'Nov 03, 2025',
    status: 'Confirmed',
    amount: '$1,560',
    color: 'emerald'
  },
];

const calendarDays = [
  { date: 23, bookings: 12, revenue: 2840 },
  { date: 24, bookings: 15, revenue: 3560 },
  { date: 25, bookings: 18, revenue: 4230 },
  { date: 26, bookings: 14, revenue: 3120 },
  { date: 27, bookings: 20, revenue: 4890, isToday: true },
  { date: 28, bookings: 16, revenue: 3780 },
  { date: 29, bookings: 19, revenue: 4450 },
];

export function Reservations() {
  const [selectedView, setSelectedView] = useState<'list' | 'calendar'>('list');
  const [isNewReservationOpen, setIsNewReservationOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [newReservation, setNewReservation] = useState({
    guestName: '',
    email: '',
    phone: '',
    room: '',
    checkIn: '',
    checkOut: '',
    guests: '1'
  });

  const handleCreateReservation = () => {
    if (!newReservation.guestName || !newReservation.email || !newReservation.checkIn || !newReservation.checkOut) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    toast.success('Reservation created successfully!');
    setIsNewReservationOpen(false);
    setNewReservation({
      guestName: '',
      email: '',
      phone: '',
      room: '',
      checkIn: '',
      checkOut: '',
      guests: '1'
    });
  };
  
  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8 pt-12 lg:pt-0">
        <div>
          <h1 className="text-slate-800 dark:text-white mb-2">Reservations</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage all your bookings and guest information</p>
        </div>
        <button 
          onClick={() => setIsNewReservationOpen(true)}
          className="px-4 md:px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 min-h-[44px] w-full sm:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          New Reservation
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by guest name, room, or booking ID..."
            className="w-full pl-12 pr-4 py-3.5 glass-card text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
          />
        </div>
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="px-4 py-3.5 glass-card rounded-xl text-slate-600 dark:text-slate-300 hover:glass-intense transition-all duration-200 flex items-center gap-2 justify-center min-h-[44px]"
        >
          <Filter className="w-5 h-5" />
          Filters
        </button>
        <div className="flex gap-2 glass-card p-1.5 rounded-xl">
          <button
            onClick={() => setSelectedView('list')}
            className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
              selectedView === 'list' 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' 
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setSelectedView('calendar')}
            className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
              selectedView === 'calendar' 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' 
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Calendar
          </button>
        </div>
      </div>

      {selectedView === 'list' ? (
        <>
          {/* Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
            {[
              { label: 'Total Reservations', value: '156', color: 'from-cyan-400 to-blue-500' },
              { label: 'Confirmed', value: '98', color: 'from-emerald-400 to-teal-500' },
              { label: 'Pending', value: '32', color: 'from-orange-400 to-red-500' },
              { label: 'Checked In', value: '26', color: 'from-purple-400 to-pink-500' },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-4">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{stat.label}</p>
                <h3 className="text-slate-800 dark:text-white">{stat.value}</h3>
                <div className="mt-2 h-1 rounded-full bg-slate-200 dark:bg-slate-700">
                  <div className={`h-1 rounded-full bg-gradient-to-r ${stat.color}`} style={{ width: '70%' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Reservations List */}
          <GlassCard className="p-6">
            <div className="space-y-4">
              {reservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="glass-subtle rounded-xl p-5 hover:glass-intense transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-slate-800 dark:text-white">{reservation.guest}</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{reservation.id}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs ml-auto ${
                          reservation.color === 'emerald' 
                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                            : reservation.color === 'orange'
                            ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                            : 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400'
                        }`}>
                          {reservation.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 ml-0 md:ml-15">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600 dark:text-slate-300">{reservation.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600 dark:text-slate-300">{reservation.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600 dark:text-slate-300">{reservation.room}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CalendarIcon className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600 dark:text-slate-300">{reservation.checkIn} - {reservation.checkOut}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 ml-0 sm:ml-6 mt-4 sm:mt-0">
                      <div className="text-right mr-4">
                        <p className="text-sm text-slate-500 dark:text-slate-400">Total Amount</p>
                        <h4 className="text-slate-800 dark:text-white">{reservation.amount}</h4>
                      </div>
                      <button className="p-2 glass-subtle rounded-lg hover:glass-intense transition-all duration-200">
                        <Edit className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                      </button>
                      <button className="p-2 glass-subtle rounded-lg hover:glass-intense transition-all duration-200">
                        <Check className="w-4 h-4 text-emerald-500" />
                      </button>
                      <button className="p-2 glass-subtle rounded-lg hover:glass-intense transition-all duration-200">
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </>
      ) : (
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button className="p-2 glass-subtle rounded-lg hover:glass-intense transition-all duration-200">
                <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>
              <h3 className="text-slate-800 dark:text-white">October 2025</h3>
              <button className="p-2 glass-subtle rounded-lg hover:glass-intense transition-all duration-200">
                <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>
            </div>
            <button className="px-4 py-2 glass-intense rounded-lg text-sm text-cyan-600 dark:text-cyan-400">
              Today
            </button>
          </div>

          <div className="grid grid-cols-7 gap-4">
            {calendarDays.map((day) => (
              <div
                key={day.date}
                className={`glass-subtle rounded-xl p-4 hover:glass-intense transition-all duration-200 cursor-pointer ${
                  day.isToday ? 'ring-2 ring-cyan-400' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-sm ${
                    day.isToday 
                      ? 'text-cyan-600 dark:text-cyan-400' 
                      : 'text-slate-600 dark:text-slate-300'
                  }`}>
                    {day.date}
                  </span>
                  {day.isToday && (
                    <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  {day.bookings} bookings
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-200">
                  ${day.revenue}
                </p>
                <div className="mt-3 space-y-1">
                  {[...Array(Math.min(3, Math.floor(day.bookings / 5)))].map((_, i) => (
                    <div
                      key={i}
                      className="h-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                      style={{ width: `${60 + i * 20}%` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* New Reservation Dialog */}
      <Dialog open={isNewReservationOpen} onOpenChange={setIsNewReservationOpen}>
        <DialogContent className="sm:max-w-[500px] glass-card border border-white/20">
          <DialogHeader>
            <DialogTitle className="text-slate-800 dark:text-white">Create New Reservation</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400">
              Enter guest details and booking information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="guestName" className="text-slate-700 dark:text-slate-200">Guest Name *</Label>
                <Input
                  id="guestName"
                  value={newReservation.guestName}
                  onChange={(e) => setNewReservation({ ...newReservation, guestName: e.target.value })}
                  placeholder="John Smith"
                  className="mt-1.5 glass-subtle"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-slate-700 dark:text-slate-200">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newReservation.email}
                    onChange={(e) => setNewReservation({ ...newReservation, email: e.target.value })}
                    placeholder="john@email.com"
                    className="mt-1.5 glass-subtle"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-slate-700 dark:text-slate-200">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={newReservation.phone}
                    onChange={(e) => setNewReservation({ ...newReservation, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    className="mt-1.5 glass-subtle"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="checkIn" className="text-slate-700 dark:text-slate-200">Check-In *</Label>
                  <Input
                    id="checkIn"
                    type="date"
                    value={newReservation.checkIn}
                    onChange={(e) => setNewReservation({ ...newReservation, checkIn: e.target.value })}
                    className="mt-1.5 glass-subtle"
                  />
                </div>
                <div>
                  <Label htmlFor="checkOut" className="text-slate-700 dark:text-slate-200">Check-Out *</Label>
                  <Input
                    id="checkOut"
                    type="date"
                    value={newReservation.checkOut}
                    onChange={(e) => setNewReservation({ ...newReservation, checkOut: e.target.value })}
                    className="mt-1.5 glass-subtle"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="room" className="text-slate-700 dark:text-slate-200">Room Type</Label>
                  <Select value={newReservation.room} onValueChange={(value) => setNewReservation({ ...newReservation, room: value })}>
                    <SelectTrigger className="mt-1.5 glass-subtle">
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Room</SelectItem>
                      <SelectItem value="deluxe">Deluxe Suite</SelectItem>
                      <SelectItem value="executive">Executive Suite</SelectItem>
                      <SelectItem value="ocean">Ocean View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="guests" className="text-slate-700 dark:text-slate-200">Number of Guests</Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="10"
                    value={newReservation.guests}
                    onChange={(e) => setNewReservation({ ...newReservation, guests: e.target.value })}
                    className="mt-1.5 glass-subtle"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
            <button
              onClick={() => setIsNewReservationOpen(false)}
              className="flex-1 px-4 py-2.5 glass-card rounded-xl text-slate-600 dark:text-slate-300 hover:glass-intense transition-all duration-200 min-h-[44px]"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateReservation}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 min-h-[44px]"
            >
              Create Reservation
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
