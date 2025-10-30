import { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { Wifi, WifiOff, Database, Server, Clock } from 'lucide-react';

export function ApiStatus() {
  const [apiStatus, setApiStatus] = useState({
    backend: 'checking',
    database: 'checking',
    lastCheck: new Date().toLocaleTimeString()
  });

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch('http://localhost:3001/health');
        if (response.ok) {
          setApiStatus({
            backend: 'connected',
            database: 'connected',
            lastCheck: new Date().toLocaleTimeString()
          });
        } else {
          setApiStatus({
            backend: 'error',
            database: 'error',
            lastCheck: new Date().toLocaleTimeString()
          });
        }
      } catch (error) {
        setApiStatus({
          backend: 'disconnected',
          database: 'disconnected',
          lastCheck: new Date().toLocaleTimeString()
        });
      }
    };

    checkApiStatus();
    const interval = setInterval(checkApiStatus, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 dark:text-green-400';
      case 'disconnected': return 'text-red-600 dark:text-red-400';
      case 'error': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <Wifi className="w-4 h-4" />;
      case 'disconnected': return <WifiOff className="w-4 h-4" />;
      case 'error': return <WifiOff className="w-4 h-4" />;
      default: return <Wifi className="w-4 h-4 animate-pulse" />;
    }
  };

  return (
    <GlassCard className="p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
          <Server className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 dark:text-white">API Status</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">System connectivity</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(apiStatus.backend)}
            <span className="text-sm text-slate-600 dark:text-slate-300">Backend</span>
          </div>
          <span className={`text-xs font-medium ${getStatusColor(apiStatus.backend)}`}>
            {apiStatus.backend.charAt(0).toUpperCase() + apiStatus.backend.slice(1)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            <span className="text-sm text-slate-600 dark:text-slate-300">Database</span>
          </div>
          <span className={`text-xs font-medium ${getStatusColor(apiStatus.database)}`}>
            SQLite
          </span>
        </div>

        <div className="pt-2 border-t border-slate-200/20 dark:border-slate-700/20">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Clock className="w-3 h-3" />
            <span>Last check: {apiStatus.lastCheck}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 glass-subtle rounded-xl">
        <div className="text-xs text-slate-600 dark:text-slate-300">
          <div className="flex justify-between mb-1">
            <span>Endpoint:</span>
            <span className="font-mono">localhost:3001</span>
          </div>
          <div className="flex justify-between">
            <span>Mode:</span>
            <span className="text-green-600 dark:text-green-400">Local Development</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}