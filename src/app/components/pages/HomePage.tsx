import Layout from '../shared/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router';
import {
  MapPin,
  Users,
  Heart,
  Watch,
  ShieldCheck,
  TrendingDown,
  Activity,
  AlertCircle
} from 'lucide-react';

interface HomePageProps {
  onLogout: () => void;
}

export default function HomePage({ onLogout }: HomePageProps) {
  const navigate = useNavigate();

  const stats = [
    { label: 'Safe Trips', value: '147', icon: ShieldCheck, color: 'text-green-600' },
    { label: 'Community Members', value: '2.3K', icon: Users, color: 'text-blue-600' },
    { label: 'Ring Status', value: 'Connected', icon: Watch, color: 'text-purple-600' },
    { label: 'Risk Level', value: 'Low', icon: TrendingDown, color: 'text-emerald-600' },
  ];

  const quickActions = [
    {
      title: 'Start Safe Route',
      description: 'Navigate with AI-powered safety routing',
      icon: MapPin,
      color: 'bg-green-500',
      path: '/location'
    },
    {
      title: 'Check Ring Status',
      description: 'View your Sentinel Ring connection',
      icon: Watch,
      color: 'bg-purple-500',
      path: '/ring'
    },
    {
      title: 'Emergency Contacts',
      description: 'Manage your trusted contacts',
      icon: Heart,
      color: 'bg-red-500',
      path: '/family'
    },
    {
      title: 'Community Alerts',
      description: 'See nearby safety updates',
      icon: Users,
      color: 'bg-blue-500',
      path: '/community'
    },
  ];

  const recentAlerts = [
    { time: '2 hours ago', message: 'High crowd density detected on MG Road', severity: 'low' },
    { time: '5 hours ago', message: 'Community alert: Unlit area reported near Metro Station', severity: 'medium' },
    { time: '1 day ago', message: 'Safe route completed successfully', severity: 'success' },
  ];

  return (
    <Layout onLogout={onLogout}>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Priya</h1>
          <p className="text-purple-100">Your safety is our priority. Stay protected with Sentinel SafePath.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className={`size-10 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Card
                key={action.title}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(action.path)}
              >
                <CardHeader>
                  <div className={`${action.color} size-12 rounded-lg flex items-center justify-center mb-3`}>
                    <action.icon className="size-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentAlerts.map((alert, index) => (
                  <div key={index} className="p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors">
                    <div className={`mt-1 ${
                      alert.severity === 'success' ? 'text-green-600' :
                      alert.severity === 'medium' ? 'text-orange-600' :
                      'text-blue-600'
                    }`}>
                      {alert.severity === 'success' ? <ShieldCheck className="size-5" /> : <AlertCircle className="size-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                    <Badge variant={
                      alert.severity === 'success' ? 'default' :
                      alert.severity === 'medium' ? 'destructive' :
                      'secondary'
                    }>
                      {alert.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ring Health Status */}
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="size-8 text-purple-600" />
                <div>
                  <CardTitle>Sentinel Ring Health</CardTitle>
                  <CardDescription>All systems operational</CardDescription>
                </div>
              </div>
              <Badge className="bg-green-500">Active</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Battery</p>
                <p className="text-xl font-semibold">78%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Heart Rate</p>
                <p className="text-xl font-semibold">72 BPM</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">LoRa Signal</p>
                <p className="text-xl font-semibold">Strong</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Sync</p>
                <p className="text-xl font-semibold">2m ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
