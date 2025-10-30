import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { Settings, Zap, ZapOff, Eye, EyeOff } from 'lucide-react';

export function AnimationSettings() {
  const [animationLevel, setAnimationLevel] = useState('medium');
  const [reducedMotion, setReducedMotion] = useState(false);

  const animationLevels = [
    { value: 'off', label: 'Off', description: 'No animations' },
    { value: 'low', label: 'Low', description: 'Gentle effects' },
    { value: 'medium', label: 'Medium', description: 'Balanced experience' },
    { value: 'high', label: 'High', description: 'Full effects' }
  ];

  return (
    <GlassCard className="p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
          <Settings className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 dark:text-white">Animation Settings</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Customize visual effects</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-slate-600 dark:text-slate-300 mb-2">
            Animation Intensity
          </label>
          <div className="space-y-2">
            {animationLevels.map((level) => (
              <label key={level.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="animation"
                  value={level.value}
                  checked={animationLevel === level.value}
                  onChange={(e) => setAnimationLevel(e.target.value)}
                  className="w-4 h-4 text-cyan-500 focus:ring-cyan-400/50"
                />
                <div className="flex-1">
                  <div className="text-sm text-slate-700 dark:text-slate-200">{level.label}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{level.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200/20 dark:border-slate-700/20">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              className="w-4 h-4 text-cyan-500 focus:ring-cyan-400/50 rounded"
            />
            <div className="flex items-center gap-2">
              {reducedMotion ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="text-sm text-slate-700 dark:text-slate-200">
                Respect system preferences
              </span>
            </div>
          </label>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 ml-7">
            Follow accessibility settings
          </p>
        </div>

        <div className="pt-3 border-t border-slate-200/20 dark:border-slate-700/20">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Performance Impact:</span>
            <span className={`font-medium ${
              animationLevel === 'high' ? 'text-red-500' :
              animationLevel === 'medium' ? 'text-yellow-500' :
              animationLevel === 'low' ? 'text-green-500' :
              'text-gray-500'
            }`}>
              {animationLevel === 'high' ? 'High' :
               animationLevel === 'medium' ? 'Medium' :
               animationLevel === 'low' ? 'Low' : 'None'}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 glass-subtle rounded-xl">
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
          <Zap className="w-3 h-3" />
          <span>
            Current: {animationLevels.find(l => l.value === animationLevel)?.label} intensity
          </span>
        </div>
      </div>
    </GlassCard>
  );
}