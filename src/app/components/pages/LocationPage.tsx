import { useState, useEffect } from 'react';
import Layout from '../shared/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  Navigation,
  Route,
  AlertTriangle,
  Shield,
  Sun,
  Users,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

// @ts-ignore
import icon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface LocationPageProps {
  onLogout: () => void;
}

// Helper Component for Live Tracking
function LocationMarker({ isLive }: { isLive: boolean }) {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      if (isLive) map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    if (isLive) {
      map.locate({ watch: true, enableHighAccuracy: true });
    } else {
      map.stopLocate();
    }
  }, [isLive, map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Your Live Location</Popup>
    </Marker>
  );
}

export default function LocationPage({ onLogout }: LocationPageProps) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<'safest' | 'fastest' | null>(null);
  const [activeTab, setActiveTab] = useState('navigate');

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

        <Tabs defaultValue="navigate" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="navigate">Navigate</TabsTrigger>
            <TabsTrigger value="current">Current Location</TabsTrigger>
          </TabsList>

          <TabsContent value="navigate" className="space-y-6 mt-6">
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

            {/* LIVE MAP CONTAINER */}
            <Card className="overflow-hidden">
              <div className="h-96 w-full relative z-0">
                <MapContainer 
                  center={[12.9716, 77.5946]} // Default Bangalore Center
                  zoom={13} 
                  className="h-full w-full"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  <LocationMarker isLive={activeTab === 'current'} />
                </MapContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {routes.map((route) => (
                <Card
                  key={route.type}
                  className={`cursor-pointer transition-all ${
                    selectedRoute === route.type ? 'ring-2 ring-purple-600 shadow-lg' : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedRoute(route.type)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Route className={`size-5 text-${route.color}-600`} />
                        <CardTitle className="text-lg">{route.name}</CardTitle>
                      </div>
                      <Badge className={route.color === 'green' ? 'bg-green-500' : 'bg-orange-500'}>
                        Risk: {route.riskScore}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Distance: {route.distance}</span>
                      <span className="text-gray-600">Time: {route.duration}</span>
                    </div>
                    {/* ... (rest of features mapping) */}
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedRoute && (
              <Button size="lg" className="w-full bg-green-600 hover:bg-green-700" onClick={handleStartNavigation}>
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
                <div className="h-64 rounded-lg overflow-hidden relative z-0">
                  <MapContainer center={[12.9344, 77.6192]} zoom={15} className="h-full w-full">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <LocationMarker isLive={true} />
                  </MapContainer>
                </div>
                
                {/* Safety Score Dashboard */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">92</p>
                    <p className="text-sm text-gray-600 mt-1">Safety Score</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600">High</p>
                    <p className="text-sm text-gray-600 mt-1">Crowd</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-3xl font-bold text-purple-600">85%</p>
                    <p className="text-sm text-gray-600 mt-1">Lighting</p>
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