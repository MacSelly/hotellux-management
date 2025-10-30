import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { Users, Search, Plus, Edit, Trash2, Shield, Mail, Phone, Calendar, Eye, EyeOff } from 'lucide-react';

const mockUsers = [
  {
    id: 'user_admin_001',
    name: 'Alex Admin',
    email: 'admin@hotel.com',
    role: 'admin',
    phone: '+1 (555) 567-8901',
    status: 'active',
    lastLogin: '2025-01-27 14:30',
    createdAt: '2024-12-01'
  },
  {
    id: 'user_reception_001',
    name: 'Sarah Reception',
    email: 'reception@hotel.com',
    role: 'receptionist',
    phone: '+1 (555) 234-5678',
    status: 'active',
    lastLogin: '2025-01-27 09:15',
    createdAt: '2024-12-15'
  },
  {
    id: 'user_housekeeping_001',
    name: 'Maria Cleaning',
    email: 'housekeeping@hotel.com',
    role: 'housekeeping',
    phone: '+1 (555) 345-6789',
    status: 'active',
    lastLogin: '2025-01-27 08:00',
    createdAt: '2024-12-20'
  },
  {
    id: 'user_maintenance_001',
    name: 'Tom Fix',
    email: 'maintenance@hotel.com',
    role: 'maintenance',
    phone: '+1 (555) 456-7890',
    status: 'active',
    lastLogin: '2025-01-26 16:45',
    createdAt: '2025-01-05'
  },
  {
    id: 'user_guest_001',
    name: 'John Guest',
    email: 'guest@hotel.com',
    role: 'guest',
    phone: '+1 (555) 123-4567',
    status: 'inactive',
    lastLogin: '2025-01-25 12:30',
    createdAt: '2025-01-10'
  }
];

export function UserManagement() {
  const [selectedRole, setSelectedRole] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);

  const filteredUsers = mockUsers.filter(user => {
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      case 'receptionist': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
      case 'housekeeping': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'maintenance': return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30';
      case 'guest': return 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
      : 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
  };

  const roleStats = {
    total: mockUsers.length,
    admin: mockUsers.filter(u => u.role === 'admin').length,
    receptionist: mockUsers.filter(u => u.role === 'receptionist').length,
    housekeeping: mockUsers.filter(u => u.role === 'housekeeping').length,
    maintenance: mockUsers.filter(u => u.role === 'maintenance').length,
    guest: mockUsers.filter(u => u.role === 'guest').length,
    active: mockUsers.filter(u => u.status === 'active').length
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">User Management</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage system users and their permissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <GlassCard className="p-4">
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Total Users</p>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">{roleStats.total}</h3>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Admins</p>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">{roleStats.admin}</h3>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Reception</p>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">{roleStats.receptionist}</h3>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Housekeeping</p>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">{roleStats.housekeeping}</h3>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Maintenance</p>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">{roleStats.maintenance}</h3>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Active</p>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">{roleStats.active}</h3>
          </div>
        </GlassCard>
      </div>

      {/* Filters and Search */}
      <GlassCard className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass-subtle rounded-xl text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
            />
          </div>

          <div className="flex gap-2">
            {['all', 'admin', 'receptionist', 'housekeeping', 'maintenance', 'guest'].map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  selectedRole === role
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                    : 'glass-subtle text-slate-600 dark:text-slate-300 hover:glass-intense'
                }`}
              >
                {role === 'all' ? 'All' : role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setShowAddUser(true)}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add User
          </button>
        </div>
      </GlassCard>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <GlassCard key={user.id} className="p-6 hover:glass-intense transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{user.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {user.phone}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Role</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>

                <div className="text-center">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </div>

                <div className="text-center">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Last Login</p>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">{user.lastLogin}</p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Created</p>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">{user.createdAt}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="p-2 glass-subtle rounded-xl hover:glass-intense transition-all">
                  <Eye className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </button>
                <button className="p-2 glass-subtle rounded-xl hover:glass-intense transition-all">
                  <Edit className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </button>
                <button className="p-2 glass-subtle rounded-xl hover:glass-intense transition-all">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <GlassCard className="w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Add New User</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 glass-subtle rounded-xl text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 glass-subtle rounded-xl text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 glass-subtle rounded-xl text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">Role</label>
                <select className="w-full px-4 py-3 glass-subtle rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all">
                  <option value="guest">Guest</option>
                  <option value="receptionist">Receptionist</option>
                  <option value="housekeeping">Housekeeping</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 glass-subtle rounded-xl text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                  placeholder="Enter password"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddUser(false)}
                  className="flex-1 px-4 py-3 glass-subtle rounded-xl text-slate-600 dark:text-slate-300 hover:glass-intense transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Add User
                </button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
}