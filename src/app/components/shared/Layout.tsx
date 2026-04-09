import { ReactNode, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Button } from '../ui/button';
import {
  Home,
  Users,
  Heart,
  BookOpen,
  MapPin,
  Watch,
  User,
  Bell,
  Route,
  Menu,
  X,
  ShieldAlert
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import SOSButton from './SOSButton';

interface LayoutProps {
  children: ReactNode;
  onLogout: () => void;
}

export default function Layout({ children, onLogout }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: MapPin, label: 'Safe Route', path: '/location' },
    { icon: Users, label: 'Community', path: '/community' },
    { icon: Heart, label: 'Family', path: '/family' },
    { icon: BookOpen, label: 'Safety Tips', path: '/safety-tips' },
    { icon: Watch, label: 'Smart Ring', path: '/ring' },
    { icon: Route, label: 'My Routes', path: '/routes' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <ShieldAlert className="size-8 text-purple-600" />
              <span className="text-xl font-semibold text-gray-900">Sentinel SafePath</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {menuItems.slice(0, 6).map((item) => (
                <Button
                  key={item.path}
                  variant={location.pathname === item.path ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handleNavigation(item.path)}
                  className={location.pathname === item.path ? 'bg-purple-600 hover:bg-purple-700' : ''}
                >
                  <item.icon className="size-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleNavigation('/notifications')}
                className="hidden md:flex"
              >
                <Bell className="size-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleNavigation('/profile')}
                className="hidden md:flex"
              >
                <User className="size-5" />
              </Button>

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <nav className="flex flex-col gap-2 mt-8">
                    {menuItems.map((item) => (
                      <Button
                        key={item.path}
                        variant={location.pathname === item.path ? 'default' : 'ghost'}
                        className={`justify-start ${location.pathname === item.path ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                        onClick={() => handleNavigation(item.path)}
                      >
                        <item.icon className="size-4 mr-2" />
                        {item.label}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      className="justify-start mt-4 border-red-200 text-red-600 hover:bg-red-50"
                      onClick={onLogout}
                    >
                      Logout
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* SOS Button - Fixed position */}
      <SOSButton />
    </div>
  );
}
