import { GlassCard } from './GlassCard';
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  Calendar,
  DollarSign,
  ThumbsUp,
  ThumbsDown,
  Brain,
  Zap,
  Target
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const demandForecast = [
  { week: 'Week 1', predicted: 85, actual: 82 },
  { week: 'Week 2', predicted: 88, actual: 87 },
  { week: 'Week 3', predicted: 92, actual: 90 },
  { week: 'Week 4', predicted: 95, actual: null },
  { week: 'Week 5', predicted: 89, actual: null },
];

const sentimentData = [
  { category: 'Cleanliness', score: 4.8, trend: 'up' },
  { category: 'Service', score: 4.6, trend: 'up' },
  { category: 'Amenities', score: 4.2, trend: 'neutral' },
  { category: 'Location', score: 4.9, trend: 'up' },
  { category: 'Value', score: 4.1, trend: 'down' },
];

const aiRecommendations = [
  {
    id: 1,
    title: 'Dynamic Pricing Opportunity',
    description: 'Increase rates by 15% for next weekend based on high demand forecast',
    impact: 'High',
    revenue: '+$4,200',
    icon: DollarSign,
    color: 'from-emerald-400 to-teal-500'
  },
  {
    id: 2,
    title: 'Upsell Suite Upgrades',
    description: '12 guests with high upgrade probability arriving this week',
    impact: 'Medium',
    revenue: '+$1,800',
    icon: TrendingUp,
    color: 'from-cyan-400 to-blue-500'
  },
  {
    id: 3,
    title: 'Staff Optimization',
    description: 'Increase front desk staff by 2 for Wednesday check-in surge',
    impact: 'Medium',
    revenue: 'Efficiency',
    icon: Users,
    color: 'from-purple-400 to-pink-500'
  },
];

const predictiveInsights = [
  { metric: 'Next Month Occupancy', value: '91%', change: '+4%', icon: Calendar },
  { metric: 'Revenue Forecast', value: '$92.4K', change: '+12%', icon: DollarSign },
  { metric: 'Guest Satisfaction', value: '4.7/5', change: '+0.2', icon: ThumbsUp },
  { metric: 'Booking Conversion', value: '68%', change: '+5%', icon: Target },
];

export function AIInsights() {
  return (
    <div className="flex-1 p-8 overflow-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 via-pink-500 to-cyan-400 flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-slate-800 dark:text-white">AI-Powered Insights</h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400">Smart recommendations and predictive analytics for your hotel</p>
      </div>

      {/* Predictive Insights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {predictiveInsights.map((insight) => {
          const Icon = insight.icon;
          return (
            <GlassCard key={insight.metric} hover className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <Sparkles className="w-4 h-4 text-purple-500" />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{insight.metric}</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-slate-800 dark:text-white">{insight.value}</h3>
                <span className="text-xs text-emerald-600 dark:text-emerald-400">{insight.change}</span>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* AI Recommendations */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-6 h-6 text-purple-500" />
          <h3 className="text-slate-800 dark:text-white">Smart Recommendations</h3>
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
            AI Generated
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aiRecommendations.map((rec) => {
            const Icon = rec.icon;
            return (
              <GlassCard key={rec.id} hover className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${rec.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      rec.impact === 'High'
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                    }`}>
                      {rec.impact} Impact
                    </span>
                    <span className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">{rec.revenue}</span>
                  </div>
                </div>
                <h4 className="text-slate-800 dark:text-white mb-2">{rec.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{rec.description}</p>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" />
                  Apply Recommendation
                </button>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Demand Forecast & Sentiment Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demand Forecast */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-slate-800 dark:text-white">Demand Forecast</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">AI-predicted occupancy rates</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={demandForecast}>
              <defs>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
              <XAxis dataKey="week" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} domain={[75, 100]} />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.9)', 
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(20px)'
                }} 
              />
              <Area type="monotone" dataKey="predicted" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorPredicted)" />
              <Line type="monotone" dataKey="actual" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-500" />
              <span className="text-xs text-slate-600 dark:text-slate-300">AI Prediction</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-xs text-slate-600 dark:text-slate-300">Actual Data</span>
            </div>
          </div>
        </GlassCard>

        {/* Guest Sentiment Analysis */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
              <ThumbsUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-slate-800 dark:text-white">Guest Sentiment Analysis</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Based on 247 reviews</p>
            </div>
          </div>
          <div className="space-y-5">
            {sentimentData.map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-700 dark:text-slate-200">{item.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600 dark:text-slate-300">{item.score}</span>
                    {item.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                    ) : item.trend === 'down' ? (
                      <ThumbsDown className="w-4 h-4 text-red-500" />
                    ) : (
                      <div className="w-4 h-4" />
                    )}
                  </div>
                </div>
                <div className="relative w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                  <div 
                    className={`absolute h-2 rounded-full ${
                      item.score >= 4.5 
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                        : item.score >= 4.0
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500'
                        : 'bg-gradient-to-r from-orange-400 to-red-500'
                    }`}
                    style={{ width: `${(item.score / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 glass-subtle rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <h4 className="text-slate-800 dark:text-white">AI Insight</h4>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Guest satisfaction is trending upward. Consider highlighting "Cleanliness" and "Location" in marketing materials. 
              Focus on improving "Value" perception through targeted amenity packages.
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
