import { GlassCard } from '../GlassCard';
import { Calendar, CreditCard, MessageSquare, Bell, FileText, CheckCircle, Clock } from 'lucide-react';

export function GuestPortal() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-slate-800 dark:text-white mb-2">Welcome Back, John</h1>
        <p className="text-slate-500 dark:text-slate-400">Your stay at HotelLux</p>
      </div>

      {/* Current Reservation */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-slate-800 dark:text-white">Current Reservation</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Room 204 - Deluxe Suite</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="glass-subtle rounded-lg p-3">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Check-in</p>
            <p className="text-sm text-slate-700 dark:text-slate-200">Oct 27, 2025</p>
          </div>
          <div className="glass-subtle rounded-lg p-3">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Check-out</p>
            <p className="text-sm text-slate-700 dark:text-slate-200">Oct 31, 2025</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all">
            Extend Stay
          </button>
          <button className="px-4 py-2 glass-subtle rounded-lg text-slate-600 dark:text-slate-300 hover:glass-intense transition-all">
            Check Out
          </button>
        </div>
      </GlassCard>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard hover className="p-4 cursor-pointer">
          <MessageSquare className="w-8 h-8 text-cyan-500 mb-2" />
          <h4 className="text-sm text-slate-800 dark:text-white mb-1">Room Service</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">Order now</p>
        </GlassCard>

        <GlassCard hover className="p-4 cursor-pointer">
          <Bell className="w-8 h-8 text-purple-500 mb-2" />
          <h4 className="text-sm text-slate-800 dark:text-white mb-1">Requests</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">View all</p>
        </GlassCard>

        <GlassCard hover className="p-4 cursor-pointer">
          <CreditCard className="w-8 h-8 text-emerald-500 mb-2" />
          <h4 className="text-sm text-slate-800 dark:text-white mb-1">View Bill</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">$890.00</p>
        </GlassCard>

        <GlassCard hover className="p-4 cursor-pointer">
          <FileText className="w-8 h-8 text-orange-500 mb-2" />
          <h4 className="text-sm text-slate-800 dark:text-white mb-1">Invoice</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">Download</p>
        </GlassCard>
      </div>

      {/* Recent Requests */}
      <GlassCard className="p-6">
        <h3 className="text-slate-800 dark:text-white mb-4">Recent Requests</h3>
        <div className="space-y-3">
          {[
            { item: 'Extra towels', status: 'completed', time: '10 min ago' },
            { item: 'Room cleaning', status: 'in-progress', time: '25 min ago' },
            { item: 'Late checkout request', status: 'pending', time: '1 hour ago' },
          ].map((request, index) => (
            <div key={index} className="flex items-center justify-between p-3 glass-subtle rounded-lg">
              <div className="flex items-center gap-3">
                {request.status === 'completed' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Clock className="w-5 h-5 text-orange-500" />
                )}
                <div>
                  <p className="text-sm text-slate-700 dark:text-slate-200">{request.item}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{request.time}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-lg capitalize ${
                request.status === 'completed'
                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                  : request.status === 'in-progress'
                  ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400'
                  : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
              }`}>
                {request.status}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
