import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Login } from './components/Login';
import { EnhancedSidebar } from './components/EnhancedSidebar';
import { Dashboard } from './components/Dashboard';
import { Reservations } from './components/Reservations';
import { FrontDesk } from './components/FrontDesk';
import { RoomManagement } from './components/RoomManagement';
import { Financial } from './components/Financial';
import { AIInsights } from './components/AIInsights';
import { GuestPortal } from './components/portals/GuestPortal';
import { HousekeepingPortal } from './components/portals/HousekeepingPortal';
import { MaintenancePortal } from './components/portals/MaintenancePortal';
import { UserManagement } from './components/UserManagement';
import { EnhancedRoomDashboard } from './components/EnhancedRoomDashboard';
import { AnimationSettings } from './components/AnimationSettings';
import { ApiStatus } from './components/ApiStatus';

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const [activeModule, setActiveModule] = useState(() => {
    // Set default module based on user role
    if (!user) return 'dashboard';
    switch (user.role) {
      case 'guest':
        return 'guest-portal';
      case 'housekeeping':
        return 'housekeeping';
      case 'maintenance':
        return 'maintenance';
      default:
        return 'dashboard';
    }
  });

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return (
          <div className="flex-1 overflow-auto">
            <Dashboard />
          </div>
        );
      case 'guest-portal':
        return (
          <div className="flex-1 p-8 overflow-auto">
            <GuestPortal />
          </div>
        );
      case 'reservations':
        return (
          <div className="flex-1 overflow-auto">
            <Reservations />
          </div>
        );
      case 'frontdesk':
        return (
          <div className="flex-1 overflow-auto">
            <FrontDesk />
          </div>
        );
      case 'rooms':
        return (
          <div className="flex-1 p-8 overflow-auto">
            <div className="mb-8">
              <h1 className="text-slate-800 dark:text-white mb-2">Room Management</h1>
              <p className="text-slate-500 dark:text-slate-400">Real-time room status with live occupancy indicators</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
              <div className="lg:col-span-3">
                <EnhancedRoomDashboard />
              </div>
              <div className="space-y-4">
                <ApiStatus />
                <AnimationSettings />
              </div>
            </div>
          </div>
        );
      case 'housekeeping':
        return (
          <div className="flex-1 p-8 overflow-auto">
            <HousekeepingPortal />
          </div>
        );
      case 'maintenance':
        return (
          <div className="flex-1 p-8 overflow-auto">
            <MaintenancePortal />
          </div>
        );
      case 'financial':
        return (
          <div className="flex-1 overflow-auto">
            <Financial />
          </div>
        );
      case 'ai':
        return (
          <div className="flex-1 overflow-auto">
            <AIInsights />
          </div>
        );
      case 'users':
        return (
          <div className="flex-1 p-8 overflow-auto">
            <UserManagement />
          </div>
        );
      default:
        return (
          <div className="flex-1 overflow-auto">
            <Dashboard />
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <EnhancedSidebar activeModule={activeModule} onModuleChange={setActiveModule} />
      <main className="flex-1 flex flex-col overflow-hidden">
        {renderModule()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}