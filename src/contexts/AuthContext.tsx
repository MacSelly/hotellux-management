import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, apiClient } from '../api';

export type UserRole = 'guest' | 'receptionist' | 'housekeeping' | 'maintenance' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  hasPermission: (requiredRole: UserRole[]) => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fallback mock users for demo mode if backend is not available
const mockUsers: Record<string, { password: string; user: User }> = {
  'guest@hotel.com': {
    password: 'guest123',
    user: { id: 'user_guest_001', name: 'John Guest', email: 'guest@hotel.com', role: 'guest' }
  },
  'reception@hotel.com': {
    password: 'reception123',
    user: { id: 'user_reception_001', name: 'Sarah Reception', email: 'reception@hotel.com', role: 'receptionist' }
  },
  'housekeeping@hotel.com': {
    password: 'house123',
    user: { id: 'user_housekeeping_001', name: 'Maria Cleaning', email: 'housekeeping@hotel.com', role: 'housekeeping' }
  },
  'maintenance@hotel.com': {
    password: 'maint123',
    user: { id: 'user_maintenance_001', name: 'Tom Fix', email: 'maintenance@hotel.com', role: 'maintenance' }
  },
  'admin@hotel.com': {
    password: 'admin123',
    user: { id: 'user_admin_001', name: 'Alex Admin', email: 'admin@hotel.com', role: 'admin' }
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session and validate token
    const initAuth = async () => {
      const storedUser = localStorage.getItem('hotel_user');
      const storedToken = localStorage.getItem('hotel_token');

      if (storedUser && storedToken) {
        apiClient.setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
      
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Try API login first
      const response = await authApi.login({ email, password });
      
      if (response.success && response.data) {
        setUser(response.data.user);
        localStorage.setItem('hotel_user', JSON.stringify(response.data.user));
        return true;
      }
    } catch (error) {
      console.warn('API login failed, falling back to mock mode:', error);
    }

    // Fallback to mock authentication for demo
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userRecord = mockUsers[email.toLowerCase()];
    if (userRecord && userRecord.password === password) {
      setUser(userRecord.user);
      localStorage.setItem('hotel_user', JSON.stringify(userRecord.user));
      localStorage.setItem('hotel_session_start', Date.now().toString());
      return true;
    }
    
    return false;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    setUser(null);
    apiClient.clearToken();
  };

  const hasPermission = (requiredRoles: UserRole[]): boolean => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    return requiredRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      hasPermission,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
