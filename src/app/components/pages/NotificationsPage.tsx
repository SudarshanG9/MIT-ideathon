import Layout from '../shared/Layout';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Bell,
  Shield,
  Users,
  Watch,
  MapPin,
  AlertCircle,
  CheckCircle,
  Info,
  Heart,
  Clock,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';

interface NotificationsPageProps {
  onLogout: () => void;
}

interface Notification {
  id: number;
  type: 'alert' | 'info' | 'success' | 'warning';
  category: 'community' | 'ring' | 'safety' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function NotificationsPage({ onLogout }: NotificationsPageProps) {
  const notifications: Notification[] = [
    {
      id: 1,
      type: 'alert',
      category: 'community',
      title: 'Community Alert',
      message: 'Suspicious activity reported near Koramangala Metro Station',
      time: '10 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      category: 'ring',
      title: 'Ring Battery Low',
      message: 'Your Sentinel Ring battery is at 20%. Please charge soon.',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'success',
      category: 'safety',
      title: 'Safe Journey Completed',
      message: 'You have safely reached your destination. Trip duration: 25 minutes',
      time: '2 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'info',
      category: 'community',
      title: 'New Safety Tip',
      message: 'Remember to share your trip details when traveling at night',
      time: '5 hours ago',
      read: true
    },
    {
      id: 5,
      type: 'alert',
      category: 'safety',
      title: 'Area Safety Alert',
      message: 'Low lighting reported on MG Road between 8-10 PM',
      time: '1 day ago',
      read: true
    },
    {
      id: 6,
      type: 'success',
      category: 'ring',
      title: 'Ring Sync Successful',
      message: 'Your Sentinel Ring has been synced with the latest data',
      time: '1 day ago',
      read: true
    },
    {
      id: 7,
      type: 'info',
      category: 'system',
      title: 'New Feature Available',
      message: 'Check out the updated safe routing algorithm with better accuracy',
      time: '2 days ago',
      read: true
    }
  ];

  const getIcon = (category: string) => {
    switch (category) {
      case 'community': return Users;
      case 'ring': return Watch;
      case 'safety': return Shield;
      case 'system': return Bell;
      default: return Bell;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'alert': return AlertCircle;
      case 'success': return CheckCircle;
      case 'warning': return AlertCircle;
      case 'info': return Info;
      default: return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'alert': return 'text-red-600 bg-red-50';
      case 'success': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-orange-600 bg-orange-50';
      case 'info': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleMarkAllRead = () => {
    toast.success('All notifications marked as read');
  };

  const handleClearAll = () => {
    toast.info('All notifications cleared');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const filterNotifications = (category?: string) => {
    if (!category) return notifications;
    return notifications.filter(n => n.category === category);
  };

  return (
    <Layout onLogout={onLogout}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              Notifications
              {unreadCount > 0 && (
                <Badge className="bg-red-500">{unreadCount} new</Badge>
              )}
            </h1>
            <p className="text-gray-600 mt-1">Stay updated with your safety alerts</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleMarkAllRead}>
              <CheckCircle className="size-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="outline" onClick={handleClearAll}>
              <Trash2 className="size-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">
              All ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="community">
              Community
            </TabsTrigger>
            <TabsTrigger value="ring">
              Ring
            </TabsTrigger>
            <TabsTrigger value="safety">
              Safety
            </TabsTrigger>
            <TabsTrigger value="system">
              System
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3 mt-6">
            {notifications.map((notification) => {
              const Icon = getIcon(notification.category);
              const TypeIcon = getTypeIcon(notification.type);
              return (
                <Card
                  key={notification.id}
                  className={`hover:shadow-md transition-shadow ${!notification.read ? 'border-purple-200 bg-purple-50/30' : ''}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`${getTypeColor(notification.type)} size-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <TypeIcon className="size-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2">
                            <Icon className="size-4 text-gray-500" />
                            <h3 className="font-semibold">{notification.title}</h3>
                          </div>
                          {!notification.read && (
                            <div className="size-2 rounded-full bg-purple-600 flex-shrink-0 mt-2"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="size-3" />
                          {notification.time}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="community" className="space-y-3 mt-6">
            {filterNotifications('community').map((notification) => {
              const TypeIcon = getTypeIcon(notification.type);
              return (
                <Card
                  key={notification.id}
                  className={`hover:shadow-md transition-shadow ${!notification.read ? 'border-purple-200 bg-purple-50/30' : ''}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`${getTypeColor(notification.type)} size-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <TypeIcon className="size-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          {!notification.read && (
                            <div className="size-2 rounded-full bg-purple-600 flex-shrink-0 mt-2"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="size-3" />
                          {notification.time}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="ring" className="space-y-3 mt-6">
            {filterNotifications('ring').map((notification) => {
              const TypeIcon = getTypeIcon(notification.type);
              return (
                <Card
                  key={notification.id}
                  className={`hover:shadow-md transition-shadow ${!notification.read ? 'border-purple-200 bg-purple-50/30' : ''}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`${getTypeColor(notification.type)} size-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <TypeIcon className="size-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          {!notification.read && (
                            <div className="size-2 rounded-full bg-purple-600 flex-shrink-0 mt-2"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="size-3" />
                          {notification.time}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="safety" className="space-y-3 mt-6">
            {filterNotifications('safety').map((notification) => {
              const TypeIcon = getTypeIcon(notification.type);
              return (
                <Card
                  key={notification.id}
                  className={`hover:shadow-md transition-shadow ${!notification.read ? 'border-purple-200 bg-purple-50/30' : ''}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`${getTypeColor(notification.type)} size-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <TypeIcon className="size-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          {!notification.read && (
                            <div className="size-2 rounded-full bg-purple-600 flex-shrink-0 mt-2"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="size-3" />
                          {notification.time}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="system" className="space-y-3 mt-6">
            {filterNotifications('system').map((notification) => {
              const TypeIcon = getTypeIcon(notification.type);
              return (
                <Card
                  key={notification.id}
                  className={`hover:shadow-md transition-shadow ${!notification.read ? 'border-purple-200 bg-purple-50/30' : ''}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`${getTypeColor(notification.type)} size-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <TypeIcon className="size-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          {!notification.read && (
                            <div className="size-2 rounded-full bg-purple-600 flex-shrink-0 mt-2"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="size-3" />
                          {notification.time}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
