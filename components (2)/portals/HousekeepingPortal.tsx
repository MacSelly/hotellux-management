import { GlassCard } from '../GlassCard';
import { Sparkles, CheckCircle, Clock, AlertCircle, Package } from 'lucide-react';

const tasks = [
  { room: '102', type: 'Deep Clean', priority: 'high', timeEstimate: '45 min', status: 'pending' },
  { room: '301', type: 'Standard Clean', priority: 'medium', timeEstimate: '30 min', status: 'in-progress' },
  { room: '204', type: 'Turndown Service', priority: 'low', timeEstimate: '15 min', status: 'pending' },
  { room: '405', type: 'Room Refresh', priority: 'medium', timeEstimate: '20 min', status: 'pending' },
];

const inventory = [
  { item: 'Towels', stock: 45, minimum: 30, status: 'good' },
  { item: 'Bed Linens', stock: 28, minimum: 25, status: 'good' },
  { item: 'Toiletries', stock: 18, minimum: 20, status: 'low' },
  { item: 'Cleaning Supplies', stock: 12, minimum: 15, status: 'low' },
];

export function HousekeepingPortal() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-slate-800 dark:text-white mb-2">Housekeeping Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400">Today's tasks and inventory status</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <GlassCard className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-orange-500" />
            <p className="text-xs text-slate-500 dark:text-slate-400">Pending</p>
          </div>
          <h3 className="text-slate-800 dark:text-white">8</h3>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-cyan-500" />
            <p className="text-xs text-slate-500 dark:text-slate-400">In Progress</p>
          </div>
          <h3 className="text-slate-800 dark:text-white">3</h3>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <p className="text-xs text-slate-500 dark:text-slate-400">Completed</p>
          </div>
          <h3 className="text-slate-800 dark:text-white">24</h3>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <p className="text-xs text-slate-500 dark:text-slate-400">Low Stock Items</p>
          </div>
          <h3 className="text-slate-800 dark:text-white">2</h3>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task List */}
        <GlassCard className="p-6 lg:col-span-2">
          <h3 className="text-slate-800 dark:text-white mb-4">Assigned Tasks</h3>
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <div key={index} className="glass-subtle rounded-xl p-4 hover:glass-intense transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                      task.status === 'in-progress' ? 'from-cyan-400 to-blue-500' : 'from-slate-400 to-slate-500'
                    } flex items-center justify-center`}>
                      <span className="text-white">{task.room}</span>
                    </div>
                    <div>
                      <h4 className="text-sm text-slate-800 dark:text-white">{task.type}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{task.timeEstimate}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs ${
                    task.priority === 'high'
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      : task.priority === 'medium'
                      ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <div className="flex gap-2">
                  {task.status === 'pending' ? (
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg text-sm">
                      Start Task
                    </button>
                  ) : (
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg text-sm">
                      Complete
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

        {/* Inventory */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-6 h-6 text-purple-500" />
            <h3 className="text-slate-800 dark:text-white">Inventory</h3>
          </div>
          <div className="space-y-3">
            {inventory.map((item, index) => (
              <div key={index} className="glass-subtle rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-700 dark:text-slate-200">{item.item}</p>
                  {item.status === 'low' && (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Stock: {item.stock}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Min: {item.minimum}</p>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className={`h-1.5 rounded-full ${
                      item.status === 'low'
                        ? 'bg-gradient-to-r from-red-400 to-orange-500'
                        : 'bg-gradient-to-r from-emerald-400 to-teal-500'
                    }`}
                    style={{ width: `${(item.stock / (item.minimum * 2)) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 px-4 py-2 glass-intense rounded-lg text-sm text-cyan-600 dark:text-cyan-400 hover:glass-card transition-all">
            Request Supplies
          </button>
        </GlassCard>
      </div>
    </div>
  );
}
