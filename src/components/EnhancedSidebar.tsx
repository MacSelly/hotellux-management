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
  Sparkles,
  LogOut,
  Shield,
  Wrench,
  UserCog,
  Menu,
  X
} from 'lucide-react';
import { cn } from './ui/utils';
import { useAuth } from '../contexts/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { useState, useEffect } from 'react';

interface EnhancedSidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const allModules = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['admin', 'receptionist', 'housekeeping', 'maintenance'] },
  { id: 'guest-portal', icon: Home, label: 'My Stay', roles: ['guest'] },
  { id: 'reservations', icon: Calendar, label: 'Reservations', roles: ['admin', 'receptionist'] },
  { id: 'frontdesk', icon: Users, label: 'Front Desk', roles: ['admin', 'receptionist'] },
  { id: 'rooms', icon: BedDouble, label: 'Room Management', roles: ['admin', 'receptionist', 'housekeeping'] },
  { id: 'housekeeping', icon: Sparkles, label: 'Housekeeping', roles: ['admin', 'housekeeping'] },
  { id: 'maintenance', icon: Wrench, label: 'Maintenance', roles: ['admin', 'maintenance'] },
  { id: 'financial', icon: CreditCard, label: 'Financial', roles: ['admin'] },
  { id: 'ai', icon: Sparkles, label: 'AI Insights', roles: ['admin'] },
  { id: 'users', icon: UserCog, label: 'User Management', roles: ['admin'] },
];

export function EnhancedSidebar({ activeModule, onModuleChange }: EnhancedSidebarProps) {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const availableModules = allModules.filter(module => 
    user && module.roles.includes(user.role)
  );

  const handleModuleChange = (module: string) => {
    onModuleChange(module);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 left-4 z-50 p-3 glass-card rounded-xl text-slate-600 dark:text-slate-300 hover:glass-intense transition-all duration-200 lg:hidden"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "w-72 h-screen glass-card border-r border-white/20 p-6 flex flex-col transition-transform duration-300 z-40",
        isMobile && "fixed top-0 left-0",
        isMobile && !isMobileMenuOpen && "-translate-x-full"
      )}>
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
      <nav className="flex-1 space-y-1.5 overflow-y-auto">
        <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 px-3">Menu</p>
        {availableModules.map((module) => {
          const Icon = module.icon;
          const isActive = activeModule === module.id;
          
          return (
            <button
              key={module.id}
              onClick={() => handleModuleChange(module.id)}
              className={cn(
                'w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group min-h-[44px]',
                isActive
                  ? 'glass-intense text-cyan-600 dark:text-cyan-400 shadow-lg'
                  : 'text-slate-600 dark:text-slate-300 hover:glass-subtle'
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn('w-5 h-5', isActive && 'text-cyan-500')} />
                <span className="text-sm">{module.label}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4" />}
            </button>
          );
        })}
      </nav>

      {/* Theme Toggle */}
      <div className="pt-4 pb-2 border-t border-white/10">
        <div className="flex items-center justify-between px-3 mb-4">
          <span className="text-xs text-slate-500 dark:text-slate-400">Theme</span>
          <ThemeToggle />
        </div>
      </div>

      {/* User Profile & Logout */}
      {user && (
        <div className="space-y-3">
          <div className="p-4 glass-card rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                <span className="text-sm text-white">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700 dark:text-slate-200 truncate">{user.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize truncate">{user.role}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 glass-subtle rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:glass-intense transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
