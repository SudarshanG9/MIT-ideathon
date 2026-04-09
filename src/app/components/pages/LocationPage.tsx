import { useState } from 'react';
import Layout from '../shared/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  MapPin,
  Navigation,
  Route,
  AlertTriangle,
  Shield,
  Clock,
  TrendingUp,
  Sun,
  Moon,
  Users,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

interface LocationPageProps {
  onLogout: () => void;
}

export default function LocationPage({ onLogout }: LocationPageProps) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<'safest' | 'fastest' | null>(null);

  const routes = [
    {
      type: 'safest' as const,
      name: 'SafePath Route',
      distance: '4.2 km',
      duration: '25 min',
      riskScore: 98,
      color: 'green',
      features: [
        { icon: Sun, label: 'Well-lit', value: '95%' },
        { icon: Users, label: 'High crowd density', value: '85%' },
        { icon: Shield, label: 'Low crime rate', value: '92%' },
      ],
      warnings: []
    },
    {
      type: 'fastest' as const,
      name: 'Standard Route',
      distance: '3.5 km',
      duration: '18 min',
      riskScore: 72,
      color: 'orange',
      features: [
        { icon: Zap, label: 'Fastest', value: '7 min saved' },
        { icon: Sun, label: 'Moderate lighting', value: '65%' },
        { icon: Users, label: 'Low crowd density', value: '45%' },
      ],
      warnings: ['Dark alley section', 'Low crowd density after 8 PM']
    }
  ];

  const handleStartNavigation = () => {
    if (!selectedRoute) {
      toast.error('Please select a route');
      return;
    }
    toast.success('Navigation started', {
      description: 'Your location is being shared with emergency contacts'
    });
  };

  return (
    <Layout onLogout={onLogout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Safe Route Navigation</h1>
          <p className="text-gray-600 mt-1">AI-powered routing for your safety</p>
        </div>

        <Tabs defaultValue="navigate" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="navigate">Navigate</TabsTrigger>
            <TabsTrigger value="current">Current Location</TabsTrigger>
          </TabsList>

          <TabsContent value="navigate" className="space-y-6 mt-6">
            {/* Route Input */}
            <Card>
              <CardHeader>
                <CardTitle>Plan Your Safe Route</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <div className="flex gap-2">
                    <MapPin className="size-5 text-gray-400 mt-2" />
                    <Input
                      id="from"
                      placeholder="Current location"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <div className="flex gap-2">
                    <Navigation className="size-5 text-gray-400 mt-2" />
                    <Input
                      id="to"
                      placeholder="Enter destination"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    />
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Find Safe Routes
                </Button>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="overflow-hidden">
              <div className="h-96 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-50 relative flex items-center justify-center">
                <div className="text-center space-y-3">
                  <MapPin className="size-16 text-purple-600 mx-auto" />
                  <p className="text-gray-600">Interactive map will display here</p>
                  <p className="text-sm text-gray-500">Real-time risk analysis and safe routing visualization</p>
                </div>
                {/* Simulated route overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg className="w-full h-full" opacity="0.3">
                    <path
                      d="M 50 350 Q 150 300 250 250 T 450 150"
                      stroke="#10b981"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray="10,5"
                    />
                    <path
                      d="M 50 350 L 200 280 L 350 200 L 450 150"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="5,5"
                    />
                  </svg>
                </div>
              </div>
            </Card>

            {/* Route Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {routes.map((route) => (
                <Card
                  key={route.type}
                  className={`cursor-pointer transition-all ${
                    selectedRoute === route.type
                      ? 'ring-2 ring-purple-600 shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedRoute(route.type)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Route className={`size-5 text-${route.color}-600`} />
                        <CardTitle className="text-lg">{route.name}</CardTitle>
                      </div>
                      <Badge className={`bg-${route.color}-500`}>
                        Risk: {route.riskScore}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Distance: {route.distance}</span>
                      <span className="text-gray-600">Time: {route.duration}</span>
                    </div>

                    <div className="space-y-2">
                      {route.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <feature.icon className="size-4 text-gray-600" />
                            <span className="text-gray-700">{feature.label}</span>
                          </div>
                          <span className="font-semibold">{feature.value}</span>
                        </div>
                      ))}
                    </div>

                    {route.warnings.length > 0 && (
                      <div className="bg-orange-50 p-3 rounded-lg space-y-1">
                        {route.warnings.map((warning, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <AlertTriangle className="size-4 text-orange-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-orange-800">{warning}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedRoute && (
              <Button
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handleStartNavigation}
              >
                <Navigation className="size-5 mr-2" />
                Start Navigation
              </Button>
            )}
          </TabsContent>

          <TabsContent value="current" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Location Safety</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current location map placeholder */}
                <div className="h-64 bg-gradient-to-br from-green-100 via-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapPin className="size-12 text-green-600 mx-auto" />
                    <p className="font-semibold">You are here</p>
                    <p className="text-sm text-gray-600">Koramangala, Bangalore</p>
                  </div>
                </div>

                {/* Safety Score */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">92</p>
                    <p className="text-sm text-gray-600 mt-1">Safety Score</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600">High</p>
                    <p className="text-sm text-gray-600 mt-1">Crowd Density</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-3xl font-bold text-purple-600">85%</p>
                    <p className="text-sm text-gray-600 mt-1">Lighting</p>
                  </div>
                </div>

                {/* Area Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="size-5 text-green-600" />
                      <span className="text-sm">Crime Rate</span>
                    </div>
                    <Badge className="bg-green-500">Low</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Sun className="size-5 text-yellow-600" />
                      <span className="text-sm">Time of Day</span>
                    </div>
                    <Badge className="bg-blue-500">Daytime</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="size-5 text-blue-600" />
                      <span className="text-sm">Nearby Users</span>
                    </div>
                    <Badge className="bg-purple-500">47 active</Badge>
                  </div>
                </div>

                {/* Nearby Safe Spaces */}
                <div>
                  <h3 className="font-semibold mb-3">Nearby Safe Spaces</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-semibold text-sm">City Police Station</p>
                        <p className="text-xs text-gray-600">0.3 km away</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Navigation className="size-4 mr-2" />
                        Navigate
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-semibold text-sm">Metro Station</p>
                        <p className="text-xs text-gray-600">0.5 km away</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Navigation className="size-4 mr-2" />
                        Navigate
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-semibold text-sm">24/7 Convenience Store</p>
                        <p className="text-xs text-gray-600">0.2 km away</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Navigation className="size-4 mr-2" />
                        Navigate
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
