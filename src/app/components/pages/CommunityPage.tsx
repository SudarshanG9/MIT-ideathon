import Layout from '../shared/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  AlertCircle,
  MapPin,
  Clock,
  Users,
  TrendingUp,
  MessageSquare,
  Flag,
  ShieldAlert,
  Lightbulb,
  Heart
} from 'lucide-react';
import { toast } from 'sonner';

interface CommunityPageProps {
  onLogout: () => void;
}

export default function CommunityPage({ onLogout }: CommunityPageProps) {
  const communityAlerts = [
    {
      id: 1,
      user: 'Anjali M',
      time: '15 mins ago',
      location: 'MG Road Metro Station',
      message: 'Poor lighting near exit gate 2. Please be cautious after 8 PM.',
      severity: 'medium',
      reactions: 24,
      comments: 5
    },
    {
      id: 2,
      user: 'Priya S',
      time: '1 hour ago',
      location: 'Indiranagar 100 Feet Road',
      message: 'Increased police patrolling observed. Area feels safer.',
      severity: 'positive',
      reactions: 42,
      comments: 8
    },
    {
      id: 3,
      user: 'Meera R',
      time: '3 hours ago',
      location: 'Koramangala 5th Block',
      message: 'Suspicious vehicle following pedestrians. Reported to authorities.',
      severity: 'high',
      reactions: 67,
      comments: 12
    },
    {
      id: 4,
      user: 'Kavya N',
      time: '5 hours ago',
      location: 'Whitefield Main Road',
      message: 'New street lights installed. Much better visibility at night.',
      severity: 'positive',
      reactions: 35,
      comments: 4
    }
  ];

  const safetyTips = [
    {
      title: 'Trust Your Instincts',
      description: 'If something feels wrong, it probably is. Always trust your gut feeling.',
      icon: Lightbulb
    },
    {
      title: 'Stay in Well-Lit Areas',
      description: 'Choose routes with proper lighting, especially after dark.',
      icon: ShieldAlert
    },
    {
      title: 'Share Your Location',
      description: 'Keep your emergency contacts updated with your live location.',
      icon: MapPin
    }
  ];

  const stats = [
    { label: 'Active Members', value: '2,347', icon: Users, change: '+12%' },
    { label: 'Reports Today', value: '18', icon: Flag, change: '-5%' },
    { label: 'Safe Routes', value: '1,234', icon: MapPin, change: '+8%' }
  ];

  const handleReportIncident = () => {
    toast.success('Report submitted successfully', {
      description: 'Your report helps make the community safer for everyone.'
    });
  };

  return (
    <Layout onLogout={onLogout}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Community Safety Hub</h1>
            <p className="text-gray-600 mt-1">Stay informed and help others stay safe</p>
          </div>
          <Button onClick={handleReportIncident} className="bg-purple-600 hover:bg-purple-700">
            <Flag className="size-4 mr-2" />
            Report Incident
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <Badge variant={stat.change.startsWith('+') ? 'default' : 'secondary'} className="text-xs">
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <stat.icon className="size-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="alerts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="alerts">Community Alerts</TabsTrigger>
            <TabsTrigger value="tips">Safety Tips</TabsTrigger>
            <TabsTrigger value="awareness">Awareness</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-4 mt-6">
            {communityAlerts.map((alert) => (
              <Card key={alert.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-purple-100 text-purple-600">
                        {alert.user.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold">{alert.user}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <Clock className="size-3" />
                            {alert.time}
                            <span>•</span>
                            <MapPin className="size-3" />
                            {alert.location}
                          </div>
                        </div>
                        <Badge variant={
                          alert.severity === 'high' ? 'destructive' :
                          alert.severity === 'medium' ? 'default' :
                          'secondary'
                        }>
                          {alert.severity === 'positive' ? 'Good News' : alert.severity}
                        </Badge>
                      </div>
                      <p className="text-gray-700 mt-3">{alert.message}</p>
                      <div className="flex items-center gap-4 mt-4">
                        <Button variant="ghost" size="sm">
                          <Heart className="size-4 mr-2" />
                          {alert.reactions}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="size-4 mr-2" />
                          {alert.comments}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="tips" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {safetyTips.map((tip, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="bg-purple-100 size-12 rounded-lg flex items-center justify-center mb-3">
                      <tip.icon className="size-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                    <CardDescription>{tip.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Community Safety Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 size-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Report Responsibly</h4>
                    <p className="text-sm text-gray-600">Only report genuine safety concerns to maintain community trust.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 size-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Verify Information</h4>
                    <p className="text-sm text-gray-600">Cross-check alerts with official sources before taking action.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 size-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Support Each Other</h4>
                    <p className="text-sm text-gray-600">Help fellow community members by sharing safety tips and updates.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="awareness" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Safety Awareness Campaign</CardTitle>
                <CardDescription>Empowering communities through education and awareness</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Know Your Rights</h3>
                  <p className="text-gray-700 mb-4">
                    Every individual has the right to feel safe in public spaces. Understanding your rights empowers you to take action when needed.
                  </p>
                  <Button variant="outline" className="border-purple-600 text-purple-600">Learn More</Button>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Self-Defense Workshops</h3>
                  <p className="text-gray-700 mb-4">
                    Join our community-led self-defense workshops happening every weekend. Learn practical skills to protect yourself.
                  </p>
                  <Button variant="outline" className="border-blue-600 text-blue-600">Register Now</Button>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Technology for Safety</h3>
                  <p className="text-gray-700 mb-4">
                    Learn how to use safety apps, emergency features on your phone, and wearable devices to stay protected.
                  </p>
                  <Button variant="outline" className="border-green-600 text-green-600">Explore Tools</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
