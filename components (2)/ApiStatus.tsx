import { useEffect, useState } from 'react';
import { GlassCard } from './GlassCard';
import { CheckCircle, XCircle, Loader, Server } from 'lucide-react';
import { projectId } from '../utils/supabase/info';

export function ApiStatus() {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [mode, setMode] = useState<'api' | 'mock'>('mock');

  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-31e4cd2a/health`,
        { method: 'GET' }
      );
      
      if (response.ok) {
        setStatus('online');
        setMode('api');
      } else {
        setStatus('offline');
        setMode('mock');
      }
    } catch (error) {
      setStatus('offline');
      setMode('mock');
    }
  };

  return (
    <GlassCard className="p-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          status === 'checking'
            ? 'bg-gradient-to-br from-slate-400 to-slate-500'
            : status === 'online'
            ? 'bg-gradient-to-br from-emerald-400 to-teal-500'
            : 'bg-gradient-to-br from-orange-400 to-red-500'
        }`}>
          {status === 'checking' ? (
            <Loader className="w-5 h-5 text-white animate-spin" />
          ) : status === 'online' ? (
            <CheckCircle className="w-5 h-5 text-white" />
          ) : (
            <Server className="w-5 h-5 text-white" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm text-slate-800 dark:text-white">Backend Status</h4>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              status === 'online'
                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
            }`}>
              {status === 'checking' ? 'Checking...' : status === 'online' ? 'API Connected' : 'Mock Mode'}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {mode === 'api' 
              ? 'Using Supabase backend' 
              : 'Using local demo data'}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
