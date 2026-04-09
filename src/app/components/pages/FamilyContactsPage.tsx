import { useState } from 'react';
import Layout from '../shared/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback } from '../ui/avatar';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Heart, Phone, MapPin, UserPlus, Shield, Star, Clock, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface FamilyContactsPageProps {
  onLogout: () => void;
}

interface Contact {
  id: number;
  name: string;
  relation: string;
  phone: string;
  isPrimary: boolean;
  status: 'active' | 'offline';
  lastSeen: string;
}

export default function FamilyContactsPage({ onLogout }: FamilyContactsPageProps) {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: 'Rajesh Kumar',
      relation: 'Father',
      phone: '+91 98765 43210',
      isPrimary: true,
      status: 'active',
      lastSeen: 'Online now'
    },
    {
      id: 2,
      name: 'Lakshmi Kumar',
      relation: 'Mother',
      phone: '+91 98765 43211',
      isPrimary: true,
      status: 'active',
      lastSeen: 'Online now'
    },
    {
      id: 3,
      name: 'Arun Kumar',
      relation: 'Brother',
      phone: '+91 98765 43212',
      isPrimary: false,
      status: 'active',
      lastSeen: '5 mins ago'
    },
    {
      id: 4,
      name: 'Kavya Sharma',
      relation: 'Best Friend',
      phone: '+91 98765 43213',
      isPrimary: true,
      status: 'offline',
      lastSeen: '2 hours ago'
    }
  ]);

  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    relation: '',
    phone: ''
  });

  const handleAddContact = () => {
    if (newContact.name && newContact.relation && newContact.phone) {
      const contact: Contact = {
        id: contacts.length + 1,
        ...newContact,
        isPrimary: false,
        status: 'offline',
        lastSeen: 'Never'
      };
      setContacts([...contacts, contact]);
      setNewContact({ name: '', relation: '', phone: '' });
      setIsAddingContact(false);
      toast.success('Contact added successfully');
    }
  };

  const handleShareLocation = (contactName: string) => {
    toast.success(`Location shared with ${contactName}`, {
      description: 'Your live location is now being shared'
    });
  };

  const handleCallContact = (contactName: string, phone: string) => {
    toast.info(`Calling ${contactName}`, {
      description: phone
    });
  };

  return (
    <Layout onLogout={onLogout}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Emergency Contacts</h1>
            <p className="text-gray-600 mt-1">Manage your trusted circle of safety</p>
          </div>
          <Dialog open={isAddingContact} onOpenChange={setIsAddingContact}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <UserPlus className="size-4 mr-2" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Emergency Contact</DialogTitle>
                <DialogDescription>
                  Add someone you trust to your emergency contact list
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relation">Relation</Label>
                  <Select
                    value={newContact.relation}
                    onValueChange={(value) => setNewContact({ ...newContact, relation: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select relation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Father">Father</SelectItem>
                      <SelectItem value="Mother">Mother</SelectItem>
                      <SelectItem value="Brother">Brother</SelectItem>
                      <SelectItem value="Sister">Sister</SelectItem>
                      <SelectItem value="Spouse">Spouse</SelectItem>
                      <SelectItem value="Friend">Friend</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+91 98765 43210"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingContact(false)}>Cancel</Button>
                <Button onClick={handleAddContact} className="bg-purple-600 hover:bg-purple-700">
                  Add Contact
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quick Info */}
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Shield className="size-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Auto-Alert on Emergency</h3>
                <p className="text-sm text-gray-700">
                  In case of an SOS trigger, all your primary contacts will be automatically notified with your live location,
                  biometric data, and emergency details. The Sentinel Ring will continue transmitting your location even if
                  your phone is disconnected.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Primary Contacts */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Star className="size-5 text-yellow-500" />
            Primary Contacts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.filter(c => c.isPrimary).map((contact) => (
              <Card key={contact.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-12">
                        <AvatarFallback className="bg-purple-100 text-purple-600 text-lg">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{contact.name}</h3>
                        <p className="text-sm text-gray-600">{contact.relation}</p>
                      </div>
                    </div>
                    <Badge variant={contact.status === 'active' ? 'default' : 'secondary'}>
                      {contact.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="size-4" />
                      {contact.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="size-4" />
                      {contact.lastSeen}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleCallContact(contact.name, contact.phone)}
                    >
                      <Phone className="size-4 mr-2" />
                      Call
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleShareLocation(contact.name)}
                    >
                      <MapPin className="size-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Other Contacts */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Other Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.filter(c => !c.isPrimary).map((contact) => (
              <Card key={contact.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-gray-100 text-gray-600">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{contact.name}</h3>
                        <p className="text-sm text-gray-600">{contact.relation}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{contact.status}</Badge>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="size-4" />
                      {contact.phone}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setContacts(contacts.map(c =>
                        c.id === contact.id ? { ...c, isPrimary: true } : c
                      ));
                      toast.success(`${contact.name} marked as primary contact`);
                    }}
                  >
                    <Star className="size-4 mr-2" />
                    Make Primary
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergency Services */}
        <Card>
          <CardHeader>
            <CardTitle>Emergency Services</CardTitle>
            <CardDescription>Quick access to emergency helplines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <Shield className="size-6 text-red-600" />
                <div className="text-center">
                  <p className="font-semibold">Police</p>
                  <p className="text-sm text-gray-600">100</p>
                </div>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <Heart className="size-6 text-red-600" />
                <div className="text-center">
                  <p className="font-semibold">Ambulance</p>
                  <p className="text-sm text-gray-600">108</p>
                </div>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <Shield className="size-6 text-purple-600" />
                <div className="text-center">
                  <p className="font-semibold">Women Helpline</p>
                  <p className="text-sm text-gray-600">1091</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
