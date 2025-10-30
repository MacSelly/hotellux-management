import { useTheme } from '../contexts/ThemeContext';
import { GlassCard } from './GlassCard';
import { Zap, ZapOff } from 'lucide-react';

export function AnimationSettings() {
  const { animationIntensity, setAnimationIntensity } = useTheme();

  const intensityOptions = [
    { value: 'off' as const, label: 'Off', icon: ZapOff },
    { value: 'low' as const, label: 'Low', icon: Zap },
    { value: 'medium' as const, label: 'Medium', icon: Zap },
    { value: 'high' as const, label: 'High', icon: Zap },
  ];

  return (
    <GlassCard className="p-4">
      <h4 className="text-sm text-slate-700 dark:text-slate-200 mb-3">Animation Intensity</h4>
      <div className="grid grid-cols-2 gap-2">
        {intensityOptions.map((option) => {
          const Icon = option.icon;
          const isActive = animationIntensity === option.value;
          
          return (
            <button
              key={option.value}
              onClick={() => setAnimationIntensity(option.value)}
              className={`px-3 py-2 rounded-lg text-xs transition-all duration-200 flex items-center gap-2 ${
                isActive
                  ? 'glass-intense text-cyan-600 dark:text-cyan-400'
                  : 'glass-subtle text-slate-600 dark:text-slate-300 hover:glass-card'
              }`}
            >
              <Icon className="w-3 h-3" />
              {option.label}
            </button>
          );
        })}
      </div>
    </GlassCard>
  );
}
