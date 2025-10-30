import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { Users, Plus, Edit, Trash2, Shield, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { toast } from 'sonner@2.0.3';

const users = [
  { id: '1', name: 'Sarah Reception', email: 'reception@hotel.com', role: 'receptionist', status: 'active', lastLogin: '2 hours ago' },
  { id: '2', name: 'Maria Cleaning', email: 'housekeeping@hotel.com', role: 'housekeeping', status: 'active', lastLogin: '30 min ago' },
  { id: '3', name: 'Tom Fix', email: 'maintenance@hotel.com', role: 'maintenance', status: 'active', lastLogin: '1 hour ago' },
  { id: '4', name: 'John Guest', email: 'guest@hotel.com', role: 'guest', status: 'active', lastLogin: '5 min ago' },
  { id: '5', name: 'Alex Admin', email: 'admin@hotel.com', role: 'admin', status: 'active', lastLogin: 'Just now' },
];

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'guest',
    password: ''
  });

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: 'from-purple-400 to-pink-500',
      receptionist: 'from-cyan-400 to-blue-500',
      housekeeping: 'from-emerald-400 to-teal-500',
      maintenance: 'from-orange-400 to-red-500',
      guest: 'from-slate-400 to-slate-500',
    };
    return colors[role as keyof typeof colors] || colors.guest;
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    toast.success(`User ${newUser.name} added successfully!`);
    setIsAddUserOpen(false);
    setNewUser({ name: '', email: '', role: 'guest', password: '' });
  };

  const handleEditUser = () => {
    if (!selectedUser) return;
    
    toast.success(`User ${selectedUser.name} updated successfully!`);
    setIsEditUserOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    
    toast.success(`User ${selectedUser.name} deleted successfully!`);
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const openEditDialog = (user: any) => {
    setSelectedUser({ ...user });
    setIsEditUserOpen(true);
  };

  const openDeleteDialog = (user: any) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6 pt-12 lg:pt-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-slate-800 dark:text-white mb-2">User Management</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage system users and permissions</p>
        </div>
        <button 
          onClick={() => setIsAddUserOpen(true)}
          className="px-4 md:px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 min-h-[44px] w-full sm:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        <GlassCard className="p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Users</p>
          <h3 className="text-slate-800 dark:text-white">{users.length}</h3>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Admins</p>
          <h3 className="text-purple-600 dark:text-purple-400">
            {users.filter(u => u.role === 'admin').length}
          </h3>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Staff</p>
          <h3 className="text-cyan-600 dark:text-cyan-400">
            {users.filter(u => ['receptionist', 'housekeeping', 'maintenance'].includes(u.role)).length}
          </h3>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Guests</p>
          <h3 className="text-slate-600 dark:text-slate-400">
            {users.filter(u => u.role === 'guest').length}
          </h3>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Active Now</p>
          <h3 className="text-emerald-600 dark:text-emerald-400">{users.length}</h3>
        </GlassCard>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users by name, email, or role..."
          className="w-full pl-12 pr-4 py-3.5 glass-card text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
        />
      </div>

      {/* User List */}
      <GlassCard className="p-4 md:p-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-sm text-slate-500 dark:text-slate-400">User</th>
                <th className="text-left py-3 px-4 text-sm text-slate-500 dark:text-slate-400">Email</th>
                <th className="text-left py-3 px-4 text-sm text-slate-500 dark:text-slate-400">Role</th>
                <th className="text-left py-3 px-4 text-sm text-slate-500 dark:text-slate-400">Status</th>
                <th className="text-left py-3 px-4 text-sm text-slate-500 dark:text-slate-400">Last Login</th>
                <th className="text-left py-3 px-4 text-sm text-slate-500 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRoleBadge(user.role)} flex items-center justify-center`}>
                        <span className="text-white text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-sm text-slate-700 dark:text-slate-200">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-slate-600 dark:text-slate-300">{user.email}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs capitalize bg-gradient-to-r ${getRoleBadge(user.role)} text-white`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-slate-600 dark:text-slate-300">{user.lastLogin}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toast.info('Permission management coming soon')}
                        className="p-1.5 glass-subtle rounded-lg hover:glass-intense transition-all duration-200 min-h-[36px] min-w-[36px]"
                      >
                        <Shield className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                      </button>
                      <button 
                        onClick={() => openEditDialog(user)}
                        className="p-1.5 glass-subtle rounded-lg hover:glass-intense transition-all duration-200 min-h-[36px] min-w-[36px]"
                      >
                        <Edit className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                      </button>
                      <button 
                        onClick={() => openDeleteDialog(user)}
                        className="p-1.5 glass-subtle rounded-lg hover:glass-intense transition-all duration-200 min-h-[36px] min-w-[36px]"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-[500px] glass-card border border-white/20">
          <DialogHeader>
            <DialogTitle className="text-slate-800 dark:text-white">Add New User</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400">
              Create a new user account with role and permissions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="newName" className="text-slate-700 dark:text-slate-200">Full Name *</Label>
              <Input
                id="newName"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="John Doe"
                className="mt-1.5 glass-subtle"
              />
            </div>
            <div>
              <Label htmlFor="newEmail" className="text-slate-700 dark:text-slate-200">Email *</Label>
              <Input
                id="newEmail"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="john@hotel.com"
                className="mt-1.5 glass-subtle"
              />
            </div>
            <div>
              <Label htmlFor="newPassword" className="text-slate-700 dark:text-slate-200">Password *</Label>
              <Input
                id="newPassword"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                placeholder="••••••••"
                className="mt-1.5 glass-subtle"
              />
            </div>
            <div>
              <Label htmlFor="newRole" className="text-slate-700 dark:text-slate-200">Role *</Label>
              <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                <SelectTrigger className="mt-1.5 glass-subtle">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="receptionist">Receptionist</SelectItem>
                  <SelectItem value="housekeeping">Housekeeping</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="guest">Guest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
            <button
              onClick={() => setIsAddUserOpen(false)}
              className="flex-1 px-4 py-2.5 glass-card rounded-xl text-slate-600 dark:text-slate-300 hover:glass-intense transition-all duration-200 min-h-[44px]"
            >
              Cancel
            </button>
            <button
              onClick={handleAddUser}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 min-h-[44px]"
            >
              Add User
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="sm:max-w-[500px] glass-card border border-white/20">
          <DialogHeader>
            <DialogTitle className="text-slate-800 dark:text-white">Edit User</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400">
              Update user information and role
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="editName" className="text-slate-700 dark:text-slate-200">Full Name *</Label>
                <Input
                  id="editName"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  className="mt-1.5 glass-subtle"
                />
              </div>
              <div>
                <Label htmlFor="editEmail" className="text-slate-700 dark:text-slate-200">Email *</Label>
                <Input
                  id="editEmail"
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  className="mt-1.5 glass-subtle"
                />
              </div>
              <div>
                <Label htmlFor="editRole" className="text-slate-700 dark:text-slate-200">Role *</Label>
                <Select value={selectedUser.role} onValueChange={(value) => setSelectedUser({ ...selectedUser, role: value })}>
                  <SelectTrigger className="mt-1.5 glass-subtle">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="receptionist">Receptionist</SelectItem>
                    <SelectItem value="housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="guest">Guest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
            <button
              onClick={() => setIsEditUserOpen(false)}
              className="flex-1 px-4 py-2.5 glass-card rounded-xl text-slate-600 dark:text-slate-300 hover:glass-intense transition-all duration-200 min-h-[44px]"
            >
              Cancel
            </button>
            <button
              onClick={handleEditUser}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 min-h-[44px]"
            >
              Save Changes
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="glass-card border border-white/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-800 dark:text-white">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500 dark:text-slate-400">
              This will permanently delete the user account for {selectedUser?.name}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-3">
            <AlertDialogCancel className="glass-card border-white/20 text-slate-600 dark:text-slate-300 hover:glass-intense min-h-[44px] m-0">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteUser}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 min-h-[44px] m-0"
            >
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
