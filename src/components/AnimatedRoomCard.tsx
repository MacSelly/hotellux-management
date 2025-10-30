import { User, Users, Wrench, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface AnimatedRoomCardProps {
  number: string;
  type: string;
  status: 'occupied' | 'available' | 'cleaning' | 'maintenance';
  occupants?: number;
  guestName?: string;
}

export function AnimatedRoomCard({ number, type, status, occupants = 0, guestName }: AnimatedRoomCardProps) {
  const { animationIntensity } = useTheme();
  
  const getStatusColor = () => {
    switch (status) {
      case 'available':
        return 'from-emerald-400 to-teal-500';
      case 'occupied':
        return 'from-cyan-400 to-blue-500';
      case 'cleaning':
        return 'from-orange-400 to-yellow-500';
      case 'maintenance':
        return 'from-red-400 to-pink-500';
      default:
        return 'from-slate-400 to-slate-500';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'occupied':
        return occupants && occupants > 1 ? Users : User;
      case 'cleaning':
        return Sparkles;
      case 'maintenance':
        return Wrench;
      default:
        return null;
    }
  };

  const Icon = getStatusIcon();
  const shouldAnimate = animationIntensity !== 'off';

  return (
    <div className="glass-subtle rounded-xl p-4 hover:glass-intense transition-all duration-300 cursor-pointer relative overflow-hidden group">
      {/* Ambient background glow for occupied rooms */}
      {status === 'occupied' && shouldAnimate && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 animate-pulse-slow" />
          {animationIntensity === 'high' && (
            <>
              {/* Floating particles */}
              <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-cyan-400/40 animate-float-1" />
              <div className="absolute top-4 right-3 w-1.5 h-1.5 rounded-full bg-blue-400/30 animate-float-2" />
              <div className="absolute bottom-3 left-4 w-1 h-1 rounded-full bg-cyan-300/40 animate-float-3" />
            </>
          )}
        </>
      )}

      {/* Room content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-slate-800 dark:text-white">{number}</h4>
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getStatusColor()} flex items-center justify-center shadow-lg ${
            shouldAnimate && status === 'occupied' ? 'animate-gentle-pulse' : ''
          }`}>
            {Icon && (
              <Icon className={`w-5 h-5 text-white ${
                shouldAnimate && animationIntensity !== 'low' && status === 'occupied' ? 'animate-breathing' : ''
              }`} />
            )}
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{type}</p>
        
        <div className="flex items-center justify-between">
          <span className={`inline-block px-2 py-1 rounded-lg text-xs capitalize ${
            status === 'available'
              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
              : status === 'occupied'
              ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400'
              : status === 'cleaning'
              ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
              : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
          }`}>
            {status}
          </span>
          
          {status === 'occupied' && occupants > 0 && (
            <span className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1">
              {occupants > 1 ? <Users className="w-3 h-3" /> : <User className="w-3 h-3" />}
              {occupants}
            </span>
          )}
        </div>

        {guestName && status === 'occupied' && (
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 truncate">
            {guestName}
          </p>
        )}
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
    </div>
  );
}
