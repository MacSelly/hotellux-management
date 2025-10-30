import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 glass-card rounded-full p-1 transition-all duration-300 hover:glass-intense focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div
        className={`absolute top-1 w-5 h-5 rounded-full bg-gradient-to-br flex items-center justify-center shadow-lg transition-all duration-300 ${
          theme === 'light'
            ? 'left-1 from-orange-400 to-yellow-400'
            : 'left-8 from-indigo-400 to-purple-500'
        }`}
      >
        {theme === 'light' ? (
          <Sun className="w-3 h-3 text-white" />
        ) : (
          <Moon className="w-3 h-3 text-white" />
        )}
      </div>
    </button>
  );
}
