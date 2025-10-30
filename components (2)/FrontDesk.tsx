import { GlassCard } from './GlassCard';
import { 
  UserCheck, 
  UserX, 
  Key, 
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Briefcase,
  Wifi,
  Coffee,
  Car
} from 'lucide-react';
import { useState } from 'react';

const checkInQueue = [
  {
    id: 1,
    guest: 'Alexandra Chen',
    room: '304',
    time: '14:30',
    type: 'Deluxe Suite',
    status: 'ready',
    preferences: ['Non-smoking', 'High floor', 'Extra pillows']
  },
  {
    id: 2,
    guest: 'Marcus Johnson',
    room: '212',
    time: '15:00',
    type: 'Standard Room',
    status: 'cleaning',
    preferences: ['Late checkout', 'City view']
  },
  {
    id: 3,
    guest: 'Sofia Martinez',
    room: '405',
    time: '15:30',
    type: 'Executive Suite',
    status: 'ready',
    preferences: ['VIP service', 'Airport pickup']
  },
];

const services = [
  { icon: Wifi, label: 'WiFi Access', count: 12 },
  { icon: Coffee, label: 'Room Service', count: 8 },
  { icon: Car, label: 'Valet Parking', count: 15 },
  { icon: Briefcase, label: 'Concierge', count: 6 },
];

const messages = [
  {
    room: '304',
    guest: 'Alexandra Chen',
    message: 'Could I get extra towels please?',
    time: '5 min ago',
    status: 'unread'
  },
  {
    room: '508',
    guest: 'David Park',
    message: 'Thank you for the room upgrade!',
    time: '12 min ago',
    status: 'read'
  },
  {
    room: '212',
    guest: 'Marcus Johnson',
    message: 'What time is breakfast served?',
    time: '18 min ago',
    status: 'replied'
  },
];

export function FrontDesk() {
  const [activeTab, setActiveTab] = useState<'checkin' | 'checkout' | 'messages'>('checkin');

  return (
    <div className="flex-1 p-8 overflow-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-slate-800 dark:text-white mb-2">Front Desk Operations</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage check-ins, check-outs, and guest communications</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <GlassCard hover className="p-5 cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <span className="px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs">
              8 waiting
            </span>
          </div>
          <h4 className="text-slate-800 dark:text-white mb-1">Check-In</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">Process arrivals</p>
        </GlassCard>

        <GlassCard hover className="p-5 cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
              <UserX className="w-6 h-6 text-white" />
            </div>
            <span className="px-2 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 text-xs">
              5 today
            </span>
          </div>
          <h4 className="text-slate-800 dark:text-white mb-1">Check-Out</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">Process departures</p>
        </GlassCard>

        <GlassCard hover className="p-5 cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg">
              <Key className="w-6 h-6 text-white" />
            </div>
            <span className="px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs">
              Active
            </span>
          </div>
          <h4 className="text-slate-800 dark:text-white mb-1">Digital Keys</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage access</p>
        </GlassCard>

        <GlassCard hover className="p-5 cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <span className="px-2 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs">
              12 new
            </span>
          </div>
          <h4 className="text-slate-800 dark:text-white mb-1">Messages</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">Guest communication</p>
        </GlassCard>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Check-in Queue */}
        <GlassCard className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-slate-800 dark:text-white">Check-In Queue</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('checkin')}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                  activeTab === 'checkin'
                    ? 'glass-intense text-cyan-600 dark:text-cyan-400'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                Check-In
              </button>
              <button
                onClick={() => setActiveTab('checkout')}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                  activeTab === 'checkout'
                    ? 'glass-intense text-cyan-600 dark:text-cyan-400'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                Check-Out
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                  activeTab === 'messages'
                    ? 'glass-intense text-cyan-600 dark:text-cyan-400'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                Messages
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {activeTab === 'checkin' && checkInQueue.map((guest) => (
              <div key={guest.id} className="glass-subtle rounded-xl p-5 hover:glass-intense transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                      <span className="text-white">{guest.guest.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <h4 className="text-slate-800 dark:text-white">{guest.guest}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Room {guest.room} • {guest.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">{guest.time}</span>
                    {guest.status === 'ready' ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500 ml-2" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-orange-500 ml-2" />
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {guest.preferences.map((pref, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 glass-subtle rounded-lg text-xs text-slate-600 dark:text-slate-300"
                    >
                      {pref}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                    Start Check-In
                  </button>
                  <button className="px-4 py-2 glass-subtle rounded-lg text-slate-600 dark:text-slate-300 hover:glass-intense transition-all duration-200">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="px-4 py-2 glass-subtle rounded-lg text-slate-600 dark:text-slate-300 hover:glass-intense transition-all duration-200">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {activeTab === 'messages' && messages.map((msg, index) => (
              <div key={index} className="glass-subtle rounded-xl p-5 hover:glass-intense transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-slate-800 dark:text-white mb-1">{msg.guest}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Room {msg.room}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    msg.status === 'unread'
                      ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                      : msg.status === 'replied'
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {msg.status}
                  </span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-200 mb-2">{msg.message}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{msg.time}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Right Panel - Services */}
        <GlassCard className="p-6">
          <h3 className="text-slate-800 dark:text-white mb-6">Guest Services</h3>
          <div className="space-y-4 mb-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.label} className="glass-subtle rounded-xl p-4 hover:glass-intense transition-all duration-200 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-700 dark:text-slate-200">{service.label}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{service.count} active requests</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="glass-subtle rounded-xl p-5">
            <h4 className="text-slate-800 dark:text-white mb-4">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full px-4 py-2.5 glass-card rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:glass-intense transition-all duration-200 text-left">
                Send Digital Key
              </button>
              <button className="w-full px-4 py-2.5 glass-card rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:glass-intense transition-all duration-200 text-left">
                Request Housekeeping
              </button>
              <button className="w-full px-4 py-2.5 glass-card rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:glass-intense transition-all duration-200 text-left">
                Call Concierge
              </button>
              <button className="w-full px-4 py-2.5 glass-card rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:glass-intense transition-all duration-200 text-left">
                Emergency Services
              </button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
