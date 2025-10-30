import { GlassCard } from '../GlassCard';
import { Wrench, AlertTriangle, CheckCircle, Clock, Calendar } from 'lucide-react';

const workOrders = [
  { id: 'WO-2025-145', room: '203', issue: 'AC not working', priority: 'high', status: 'in-progress', assignee: 'You' },
  { id: 'WO-2025-146', room: '512', issue: 'Leaking faucet', priority: 'medium', status: 'pending', assignee: 'You' },
  { id: 'WO-2025-147', room: '308', issue: 'Light bulb replacement', priority: 'low', status: 'pending', assignee: 'Available' },
  { id: 'WO-2025-148', room: '401', issue: 'Door lock malfunction', priority: 'high', status: 'pending', assignee: 'Available' },
];

const equipmentStatus = [
  { name: 'HVAC System A', status: 'operational', lastService: '2 days ago', nextService: 'In 28 days' },
  { name: 'Elevator 1', status: 'operational', lastService: '5 days ago', nextService: 'In 25 days' },
  { name: 'Elevator 2', status: 'maintenance', lastService: 'Today', nextService: 'In 30 days' },
  { name: 'Backup Generator', status: 'operational', lastService: '10 days ago', nextService: 'In 20 days' },
];

export function MaintenancePortal() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-slate-800 dark:text-white mb-2">Maintenance Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400">Work orders and equipment status</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <GlassCard className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <p className="text-xs text-slate-500 dark:text-slate-400">High Priority</p>
          </div>
          <h3 className="text-slate-800 dark:text-white">2</h3>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-orange-500" />
            <p className="text-xs text-slate-500 dark:text-slate-400">Pending</p>
          </div>
          <h3 className="text-slate-800 dark:text-white">5</h3>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="w-4 h-4 text-cyan-500" />
            <p className="text-xs text-slate-500 dark:text-slate-400">In Progress</p>
          </div>
          <h3 className="text-slate-800 dark:text-white">3</h3>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <p className="text-xs text-slate-500 dark:text-slate-400">Completed Today</p>
          </div>
          <h3 className="text-slate-800 dark:text-white">8</h3>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Work Orders */}
        <GlassCard className="p-6 lg:col-span-2">
          <h3 className="text-slate-800 dark:text-white mb-4">Work Orders</h3>
          <div className="space-y-3">
            {workOrders.map((order) => (
              <div key={order.id} className="glass-subtle rounded-xl p-4 hover:glass-intense transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm text-slate-800 dark:text-white">{order.id}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        order.priority === 'high'
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                          : order.priority === 'medium'
                          ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        {order.priority}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-200 mb-1">Room {order.room}: {order.issue}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Assigned to: {order.assignee}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs whitespace-nowrap ml-3 ${
                    order.status === 'in-progress'
                      ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  {order.assignee === 'Available' ? (
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg text-sm">
                      Accept Task
                    </button>
                  ) : order.status === 'pending' ? (
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg text-sm">
                      Start Work
                    </button>
                  ) : (
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg text-sm">
                      Mark Complete
                    </button>
                  )}
                  <button className="px-4 py-2 glass-card rounded-lg text-sm text-slate-600 dark:text-slate-300">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Equipment Status */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Wrench className="w-6 h-6 text-purple-500" />
            <h3 className="text-slate-800 dark:text-white">Equipment</h3>
          </div>
          <div className="space-y-3">
            {equipmentStatus.map((equipment, index) => (
              <div key={index} className="glass-subtle rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-700 dark:text-slate-200">{equipment.name}</p>
                  <span className={`w-2 h-2 rounded-full ${
                    equipment.status === 'operational' ? 'bg-emerald-500' : 'bg-orange-500'
                  }`} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <CheckCircle className="w-3 h-3" />
                    Last: {equipment.lastService}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3 h-3" />
                    Next: {equipment.nextService}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 px-4 py-2 glass-intense rounded-lg text-sm text-cyan-600 dark:text-cyan-400 hover:glass-card transition-all">
            Schedule Maintenance
          </button>
        </GlassCard>
      </div>
    </div>
  );
}
