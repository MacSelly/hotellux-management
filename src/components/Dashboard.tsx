import { GlassCard } from './GlassCard';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  BedDouble,
  ArrowUp,
  ArrowDown,
  Calendar,
  Clock,
  Star,
  Activity
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const kpiData = [
  { 
    title: 'Total Revenue',
    value: '$284,590',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'from-emerald-400 to-teal-500'
  },
  { 
    title: 'Occupancy Rate',
    value: '87.3%',
    change: '+5.2%',
    trend: 'up',
    icon: BedDouble,
    color: 'from-cyan-400 to-blue-500'
  },
  { 
    title: 'Active Guests',
    value: '156',
    change: '-3.1%',
    trend: 'down',
    icon: Users,
    color: 'from-purple-400 to-pink-500'
  },
  { 
    title: 'Avg Daily Rate',
    value: '$234',
    change: '+8.7%',
    trend: 'up',
    icon: TrendingUp,
    color: 'from-orange-400 to-red-500'
  },
];

const revenueData = [
  { month: 'Jan', revenue: 45000, bookings: 120 },
  { month: 'Feb', revenue: 52000, bookings: 135 },
  { month: 'Mar', revenue: 48000, bookings: 128 },
  { month: 'Apr', revenue: 61000, bookings: 152 },
  { month: 'May', revenue: 55000, bookings: 145 },
  { month: 'Jun', revenue: 67000, bookings: 168 },
  { month: 'Jul', revenue: 72000, bookings: 180 },
];

const occupancyData = [
  { name: 'Single', value: 45, color: '#06b6d4' },
  { name: 'Double', value: 78, color: '#3b82f6' },
  { name: 'Suite', value: 23, color: '#8b5cf6' },
  { name: 'Deluxe', value: 10, color: '#ec4899' },
];

const recentActivity = [
  { time: '2 min ago', action: 'New booking', guest: 'John Smith', room: '204' },
  { time: '15 min ago', action: 'Check-out', guest: 'Emma Wilson', room: '312' },
  { time: '23 min ago', action: 'Check-in', guest: 'Michael Brown', room: '156' },
  { time: '1 hr ago', action: 'Reservation', guest: 'Sarah Davis', room: '208' },
];

export function Dashboard() {
  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
      {/* Header */}
      <div className="mb-6 md:mb-8 pt-12 lg:pt-0">
        <h1 className="text-slate-800 dark:text-white mb-2">Dashboard Overview</h1>
        <p className="text-slate-500 dark:text-slate-400">Welcome back! Here's what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <GlassCard key={kpi.title} hover className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                  kpi.trend === 'up' 
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                }`}>
                  {kpi.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  <span className="text-xs">{kpi.change}</span>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{kpi.title}</p>
              <h2 className="text-slate-800 dark:text-white">{kpi.value}</h2>
            </GlassCard>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Revenue Chart */}
        <GlassCard className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-slate-800 dark:text-white mb-1">Revenue Analytics</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Monthly revenue and bookings trend</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 glass-subtle rounded-lg text-xs text-slate-600 dark:text-slate-300">Week</button>
              <button className="px-3 py-1.5 glass-intense rounded-lg text-xs text-cyan-600 dark:text-cyan-400">Month</button>
              <button className="px-3 py-1.5 glass-subtle rounded-lg text-xs text-slate-600 dark:text-slate-300">Year</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.9)', 
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(20px)'
                }} 
              />
              <Area type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Occupancy Distribution */}
        <GlassCard className="p-6">
          <h3 className="text-slate-800 dark:text-white mb-1">Room Occupancy</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Distribution by room type</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={occupancyData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {occupancyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {occupancyData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.name}</p>
                  <p className="text-sm text-slate-700 dark:text-slate-200">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Recent Activity */}
        <GlassCard className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-slate-800 dark:text-white">Recent Activity</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Live updates from your hotel</p>
              </div>
            </div>
            <button className="text-sm text-cyan-500 hover:text-cyan-600">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 glass-subtle rounded-xl hover:glass-intense transition-all duration-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700 dark:text-slate-200">{activity.action} - {activity.guest}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Room {activity.room} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Quick Stats */}
        <GlassCard className="p-6">
          <h3 className="text-slate-800 dark:text-white mb-6">Quick Stats</h3>
          <div className="space-y-4">
            <div className="p-4 glass-subtle rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600 dark:text-slate-300">Check-ins Today</p>
                <Calendar className="w-4 h-4 text-cyan-500" />
              </div>
              <h4 className="text-slate-800 dark:text-white">24</h4>
              <div className="mt-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full" style={{ width: '70%' }} />
              </div>
            </div>
            <div className="p-4 glass-subtle rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600 dark:text-slate-300">Check-outs Today</p>
                <Calendar className="w-4 h-4 text-purple-500" />
              </div>
              <h4 className="text-slate-800 dark:text-white">18</h4>
              <div className="mt-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full" style={{ width: '50%' }} />
              </div>
            </div>
            <div className="p-4 glass-subtle rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600 dark:text-slate-300">Guest Satisfaction</p>
                <Star className="w-4 h-4 text-orange-500" />
              </div>
              <h4 className="text-slate-800 dark:text-white">4.8/5.0</h4>
              <div className="mt-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full" style={{ width: '96%' }} />
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
