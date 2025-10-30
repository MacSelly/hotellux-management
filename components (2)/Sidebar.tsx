import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  BedDouble, 
  CreditCard, 
  Settings,
  Bell,
  Search,
  ChevronRight,
  Home,
  ClipboardList,
  Sparkles
} from 'lucide-react';
import { cn } from './ui/utils';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const modules = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', badge: null },
  { id: 'reservations', icon: Calendar, label: 'Reservations', badge: '12' },
  { id: 'frontdesk', icon: Users, label: 'Front Desk', badge: '3' },
  { id: 'rooms', icon: BedDouble, label: 'Room Management', badge: null },
  { id: 'financial', icon: CreditCard, label: 'Financial', badge: null },
  { id: 'ai', icon: Sparkles, label: 'AI Insights', badge: 'NEW' },
];

const quickActions = [
  { icon: ClipboardList, label: 'Tasks', count: 8 },
  { icon: Bell, label: 'Notifications', count: 5 },
  { icon: Settings, label: 'Settings', count: null },
];

export function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  return (
    <div className="w-72 h-screen glass-card border-r border-white/20 p-6 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
          <Home className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-slate-800 dark:text-white">HotelLux</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Management Suite</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2.5 glass-subtle rounded-xl text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5">
        <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 px-3">Main Menu</p>
        {modules.map((module) => {
          const Icon = module.icon;
          const isActive = activeModule === module.id;
          
          return (
            <button
              key={module.id}
              onClick={() => onModuleChange(module.id)}
              className={cn(
                'w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group',
                isActive
                  ? 'glass-intense text-cyan-600 dark:text-cyan-400 shadow-lg'
                  : 'text-slate-600 dark:text-slate-300 hover:glass-subtle'
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn('w-5 h-5', isActive && 'text-cyan-500')} />
                <span className="text-sm">{module.label}</span>
              </div>
              {module.badge && (
                <span className={cn(
                  'px-2 py-0.5 rounded-full text-xs',
                  module.badge === 'NEW' 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                    : 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400'
                )}>
                  {module.badge}
                </span>
              )}
              {isActive && <ChevronRight className="w-4 h-4" />}
            </button>
          );
        })}
      </nav>

      {/* Quick Actions */}
      <div className="pt-6 border-t border-white/10 space-y-2">
        <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 px-3">Quick Actions</p>
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:glass-subtle transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                <span className="text-sm">{action.label}</span>
              </div>
              {action.count && (
                <span className="px-2 py-0.5 rounded-full text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                  {action.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* User Profile */}
      <div className="mt-6 p-4 glass-card flex items-center gap-3 cursor-pointer hover:glass-intense transition-all duration-200">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
          <span className="text-sm text-white">AM</span>
        </div>
        <div className="flex-1">
          <p className="text-sm text-slate-700 dark:text-slate-200">Alex Morgan</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Manager</p>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400" />
      </div>
    </div>
  );
}
