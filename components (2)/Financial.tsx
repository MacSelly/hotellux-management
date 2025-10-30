import { GlassCard } from './GlassCard';
import { 
  DollarSign,
  CreditCard,
  TrendingUp,
  FileText,
  Download,
  Printer,
  Mail,
  Check,
  Clock,
  AlertCircle
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

const monthlyRevenue = [
  { month: 'Apr', revenue: 58000, expenses: 32000 },
  { month: 'May', revenue: 62000, expenses: 35000 },
  { month: 'Jun', revenue: 71000, expenses: 38000 },
  { month: 'Jul', revenue: 78000, expenses: 41000 },
  { month: 'Aug', revenue: 75000, expenses: 39000 },
  { month: 'Sep', revenue: 82000, expenses: 43000 },
  { month: 'Oct', revenue: 88000, expenses: 45000 },
];

const recentInvoices = [
  { id: 'INV-2025-1284', guest: 'John Smith', room: '204', amount: 890, status: 'paid', date: 'Oct 25, 2025' },
  { id: 'INV-2025-1285', guest: 'Emma Wilson', room: '312', amount: 1240, status: 'pending', date: 'Oct 26, 2025' },
  { id: 'INV-2025-1286', guest: 'Michael Brown', room: '156', amount: 680, status: 'paid', date: 'Oct 26, 2025' },
  { id: 'INV-2025-1287', guest: 'Sarah Davis', room: '208', amount: 1560, status: 'overdue', date: 'Oct 24, 2025' },
  { id: 'INV-2025-1288', guest: 'David Park', room: '405', amount: 2340, status: 'paid', date: 'Oct 27, 2025' },
];

const paymentMethods = [
  { method: 'Credit Card', amount: '$45,680', percentage: 62, color: 'from-cyan-400 to-blue-500' },
  { method: 'Cash', amount: '$18,240', percentage: 25, color: 'from-emerald-400 to-teal-500' },
  { method: 'Bank Transfer', amount: '$9,120', percentage: 13, color: 'from-purple-400 to-pink-500' },
];

export function Financial() {
  return (
    <div className="flex-1 p-8 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-slate-800 dark:text-white mb-2">Financial Management</h1>
          <p className="text-slate-500 dark:text-slate-400">Track revenue, process payments, and manage invoices</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2.5 glass-card rounded-xl text-slate-600 dark:text-slate-300 hover:glass-intense transition-all duration-200 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            New Invoice
          </button>
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <GlassCard hover className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Total Revenue</p>
          <h2 className="text-slate-800 dark:text-white mb-1">$88,450</h2>
          <p className="text-xs text-emerald-600 dark:text-emerald-400">+12.5% vs last month</p>
        </GlassCard>

        <GlassCard hover className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <Check className="w-5 h-5 text-cyan-500" />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Payments Received</p>
          <h2 className="text-slate-800 dark:text-white mb-1">$73,040</h2>
          <p className="text-xs text-cyan-600 dark:text-cyan-400">156 transactions</p>
        </GlassCard>

        <GlassCard hover className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <AlertCircle className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Pending Payments</p>
          <h2 className="text-slate-800 dark:text-white mb-1">$12,680</h2>
          <p className="text-xs text-orange-600 dark:text-orange-400">18 invoices</p>
        </GlassCard>

        <GlassCard hover className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Avg Transaction</p>
          <h2 className="text-slate-800 dark:text-white mb-1">$468</h2>
          <p className="text-xs text-purple-600 dark:text-purple-400">+8.2% increase</p>
        </GlassCard>
      </div>

      {/* Revenue Chart & Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <GlassCard className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-slate-800 dark:text-white mb-1">Revenue vs Expenses</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Monthly comparison</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                <span className="text-xs text-slate-600 dark:text-slate-300">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-xs text-slate-600 dark:text-slate-300">Expenses</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.9)', 
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(20px)'
                }} 
              />
              <Bar dataKey="revenue" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expenses" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-slate-800 dark:text-white mb-6">Payment Methods</h3>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.method}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-600 dark:text-slate-300">{method.method}</p>
                  <span className="text-sm text-slate-700 dark:text-slate-200">{method.amount}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${method.color}`}
                    style={{ width: `${method.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{method.percentage}% of total</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 glass-subtle rounded-xl">
            <h4 className="text-slate-800 dark:text-white mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 glass-card rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:glass-intense transition-all duration-200 text-left">
                Process Refund
              </button>
              <button className="w-full px-4 py-2 glass-card rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:glass-intense transition-all duration-200 text-left">
                Generate Report
              </button>
              <button className="w-full px-4 py-2 glass-card rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:glass-intense transition-all duration-200 text-left">
                View Analytics
              </button>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Recent Invoices */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-slate-800 dark:text-white">Recent Invoices</h3>
          <button className="text-sm text-cyan-500 hover:text-cyan-600">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-sm text-slate-500 dark:text-slate-400">Invoice ID</th>
                <th className="text-left py-3 px-4 text-sm text-slate-500 dark:text-slate-400">Guest</th>
                <th className="text-left py-3 px-4 text-sm text-slate-500 dark:text-slate-400">Room</th>
                <th className="text-left py-3 px-4 text-sm text-slate-500 dark:text-slate-400">Amount</th>
                <th className="text-left py-3 px-4 text-sm text-slate-500 dark:text-slate-400">Date</th>
                <th className="text-left py-3 px-4 text-sm text-slate-500 dark:text-slate-400">Status</th>
                <th className="text-left py-3 px-4 text-sm text-slate-500 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4">
                    <span className="text-sm text-slate-700 dark:text-slate-200">{invoice.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-slate-700 dark:text-slate-200">{invoice.guest}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-slate-600 dark:text-slate-300">{invoice.room}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-slate-700 dark:text-slate-200">${invoice.amount}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-slate-600 dark:text-slate-300">{invoice.date}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      invoice.status === 'paid'
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                        : invoice.status === 'pending'
                        ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 glass-subtle rounded-lg hover:glass-intense transition-all duration-200">
                        <Printer className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                      </button>
                      <button className="p-1.5 glass-subtle rounded-lg hover:glass-intense transition-all duration-200">
                        <Mail className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                      </button>
                      <button className="p-1.5 glass-subtle rounded-lg hover:glass-intense transition-all duration-200">
                        <Download className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
