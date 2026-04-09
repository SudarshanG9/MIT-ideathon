import { useState } from 'react';
import Layout from '../shared/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Route,
  MapPin,
  Clock,
  Shield,
  Plus,
  Star,
  Trash2,
  Navigation,
  TrendingUp,
  Calendar,
  Edit
} from 'lucide-react';
import { toast } from 'sonner';

interface UsualRoutesPageProps {
  onLogout: () => void;
}

interface SavedRoute {
  id: number;
  name: string;
  from: string;
  to: string;
  distance: string;
  avgTime: string;
  safetyScore: number;
  frequency: string;
  lastUsed: string;
  isFavorite: boolean;
}

export default function UsualRoutesPage({ onLogout }: UsualRoutesPageProps) {
  const [isAddingRoute, setIsAddingRoute] = useState(false);
  const [newRoute, setNewRoute] = useState({
    name: '',
    from: '',
    to: ''
  });

  const [routes, setRoutes] = useState<SavedRoute[]>([
    {
      id: 1,
      name: 'Home to Work',
      from: 'Koramangala 5th Block',
      to: 'MG Road Metro Station',
      distance: '4.2 km',
      avgTime: '25 min',
      safetyScore: 95,
      frequency: '5 times/week',
      lastUsed: '2 hours ago',
      isFavorite: true
    },
    {
      id: 2,
      name: 'Home to Gym',
      from: 'Koramangala 5th Block',
      to: 'Cult Fit, Indiranagar',
      distance: '3.1 km',
      avgTime: '18 min',
      safetyScore: 92,
      frequency: '3 times/week',
      lastUsed: '1 day ago',
      isFavorite: true
    },
    {
      id: 3,
      name: 'Work to Mall',
      from: 'MG Road Metro',
      to: 'Phoenix Mall',
      distance: '2.5 km',
      avgTime: '15 min',
      safetyScore: 88,
      frequency: '2 times/week',
      lastUsed: '3 days ago',
      isFavorite: false
    },
    {
      id: 4,
      name: 'Home to Friend\'s Place',
      from: 'Koramangala',
      to: 'HSR Layout',
      distance: '5.8 km',
      avgTime: '32 min',
      safetyScore: 90,
      frequency: '1 time/week',
      lastUsed: '1 week ago',
      isFavorite: false
    }
  ]);

  const handleAddRoute = () => {
    if (newRoute.name && newRoute.from && newRoute.to) {
      const route: SavedRoute = {
        id: routes.length + 1,
        ...newRoute,
        distance: '0 km',
        avgTime: '0 min',
        safetyScore: 0,
        frequency: 'New',
        lastUsed: 'Never',
        isFavorite: false
      };
      setRoutes([...routes, route]);
      setNewRoute({ name: '', from: '', to: '' });
      setIsAddingRoute(false);
      toast.success('Route saved successfully');
    }
  };

  const handleToggleFavorite = (id: number) => {
    setRoutes(routes.map(r =>
      r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
    ));
    const route = routes.find(r => r.id === id);
    toast.success(route?.isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleDeleteRoute = (id: number) => {
    setRoutes(routes.filter(r => r.id !== id));
    toast.info('Route deleted');
  };

  const handleStartRoute = (route: SavedRoute) => {
    toast.success(`Starting navigation to ${route.to}`, {
      description: 'Your emergency contacts will be notified'
    });
  };

  const favoriteRoutes = routes.filter(r => r.isFavorite);
  const otherRoutes = routes.filter(r => !r.isFavorite);

  return (
    <Layout onLogout={onLogout}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Usual Routes</h1>
            <p className="text-gray-600 mt-1">Manage your frequently traveled paths</p>
          </div>
          <Dialog open={isAddingRoute} onOpenChange={setIsAddingRoute}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="size-4 mr-2" />
                Add New Route
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Route</DialogTitle>
                <DialogDescription>
                  Save a route you travel frequently for quick access
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="route-name">Route Name</Label>
                  <Input
                    id="route-name"
                    placeholder="e.g., Home to Work"
                    value={newRoute.name}
                    onChange={(e) => setNewRoute({ ...newRoute, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <Input
                    id="from"
                    placeholder="Starting location"
                    value={newRoute.from}
                    onChange={(e) => setNewRoute({ ...newRoute, from: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <Input
                    id="to"
                    placeholder="Destination"
                    value={newRoute.to}
                    onChange={(e) => setNewRoute({ ...newRoute, to: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingRoute(false)}>Cancel</Button>
                <Button onClick={handleAddRoute} className="bg-purple-600 hover:bg-purple-700">
                  Save Route
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Routes</p>
                  <p className="text-2xl font-bold mt-1">{routes.length}</p>
                </div>
                <Route className="size-10 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Favorites</p>
                  <p className="text-2xl font-bold mt-1">{favoriteRoutes.length}</p>
                </div>
                <Star className="size-10 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Safety</p>
                  <p className="text-2xl font-bold mt-1">91%</p>
                </div>
                <Shield className="size-10 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Week</p>
                  <p className="text-2xl font-bold mt-1">12 trips</p>
                </div>
                <TrendingUp className="size-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Favorite Routes */}
        {favoriteRoutes.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Star className="size-5 text-yellow-500" />
              Favorite Routes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favoriteRoutes.map((route) => (
                <Card key={route.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{route.name}</CardTitle>
                        <CardDescription className="mt-2">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="size-4" />
                            {route.from}
                          </div>
                          <div className="flex items-center gap-2 text-sm mt-1">
                            <Navigation className="size-4" />
                            {route.to}
                          </div>
                        </CardDescription>
                      </div>
                      <Badge className={route.safetyScore > 90 ? 'bg-green-500' : 'bg-orange-500'}>
                        {route.safetyScore}% safe
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-gray-600">Distance</p>
                        <p className="font-semibold">{route.distance}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Avg Time</p>
                        <p className="font-semibold">{route.avgTime}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Used</p>
                        <p className="font-semibold">{route.frequency}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="size-3" />
                        Last used: {route.lastUsed}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                        onClick={() => handleStartRoute(route)}
                      >
                        <Navigation className="size-4 mr-2" />
                        Start Route
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleFavorite(route.id)}
                      >
                        <Star className={`size-4 ${route.isFavorite ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteRoute(route.id)}
                      >
                        <Trash2 className="size-4 text-red-600" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Other Routes */}
        {otherRoutes.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">All Routes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherRoutes.map((route) => (
                <Card key={route.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{route.name}</CardTitle>
                        <CardDescription className="mt-2">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="size-4" />
                            {route.from}
                          </div>
                          <div className="flex items-center gap-2 text-sm mt-1">
                            <Navigation className="size-4" />
                            {route.to}
                          </div>
                        </CardDescription>
                      </div>
                      <Badge className={route.safetyScore > 90 ? 'bg-green-500' : 'bg-orange-500'}>
                        {route.safetyScore}% safe
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-gray-600">Distance</p>
                        <p className="font-semibold">{route.distance}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Avg Time</p>
                        <p className="font-semibold">{route.avgTime}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Used</p>
                        <p className="font-semibold">{route.frequency}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="size-3" />
                        Last used: {route.lastUsed}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                        onClick={() => handleStartRoute(route)}
                      >
                        <Navigation className="size-4 mr-2" />
                        Start Route
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleFavorite(route.id)}
                      >
                        <Star className="size-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteRoute(route.id)}
                      >
                        <Trash2 className="size-4 text-red-600" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {routes.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Route className="size-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No routes saved yet</h3>
              <p className="text-gray-600 mb-4">Start by adding your frequently traveled routes</p>
              <Button onClick={() => setIsAddingRoute(true)} className="bg-purple-600 hover:bg-purple-700">
                <Plus className="size-4 mr-2" />
                Add Your First Route
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
