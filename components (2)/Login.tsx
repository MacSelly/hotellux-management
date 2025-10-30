import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { GlassCard } from './GlassCard';
import { Lock, Mail, Eye, EyeOff, AlertCircle, LogIn } from 'lucide-react';

export function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(email, password);
    
    if (!success) {
      setError('Invalid email or password');
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { role: 'Guest', email: 'guest@hotel.com', password: 'guest123' },
    { role: 'Receptionist', email: 'reception@hotel.com', password: 'reception123' },
    { role: 'Housekeeping', email: 'housekeeping@hotel.com', password: 'house123' },
    { role: 'Maintenance', email: 'maintenance@hotel.com', password: 'maint123' },
    { role: 'Admin', email: 'admin@hotel.com', password: 'admin123' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Login Form */}
        <GlassCard className="p-8">
          <div className="mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-4 shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-slate-800 dark:text-white mb-2">Welcome to HotelLux</h1>
            <p className="text-slate-500 dark:text-slate-400">Sign in to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 glass-subtle rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 glass-subtle rounded-xl text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 glass-subtle rounded-xl text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>
        </GlassCard>

        {/* Demo Accounts */}
        <GlassCard className="p-8">
          <h2 className="text-slate-800 dark:text-white mb-6">Demo Accounts</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Use these credentials to explore different user roles:
          </p>
          <div className="space-y-3">
            {demoAccounts.map((account) => (
              <div
                key={account.email}
                className="glass-subtle rounded-xl p-4 hover:glass-intense transition-all duration-200 cursor-pointer"
                onClick={() => {
                  setEmail(account.email);
                  setPassword(account.password);
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-slate-800 dark:text-white">{account.role}</h4>
                  <span className="text-xs px-2 py-1 glass-card rounded-lg text-slate-600 dark:text-slate-300">
                    Click to fill
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">
                  {account.email}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {account.password}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 glass-card rounded-xl">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <strong>Note:</strong> Each role has different access levels and features. 
              Admins have full access, while other roles are restricted to their specific functions.
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
