import Layout from '../shared/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import {
  Shield,
  Lightbulb,
  MapPin,
  Phone,
  Users,
  AlertCircle,
  CheckCircle,
  Eye,
  Volume2,
  Smartphone,
  BookOpen
} from 'lucide-react';

interface SafetyTipsPageProps {
  onLogout: () => void;
}

export default function SafetyTipsPage({ onLogout }: SafetyTipsPageProps) {
  const safetyCategories = [
    {
      icon: MapPin,
      title: 'Travel Safety',
      color: 'bg-blue-500',
      tips: [
        'Always share your trip details with trusted contacts',
        'Use well-lit and populated routes, especially at night',
        'Trust the Sentinel Ring\'s safe routing algorithm',
        'Keep your phone charged and emergency contacts updated',
        'Avoid isolated areas and shortcuts through unknown places'
      ]
    },
    {
      icon: Smartphone,
      title: 'Digital Safety',
      color: 'bg-purple-500',
      tips: [
        'Enable location sharing only with trusted contacts',
        'Keep your Sentinel Ring app updated',
        'Use strong passwords and enable two-factor authentication',
        'Be cautious about sharing personal information online',
        'Review app permissions regularly'
      ]
    },
    {
      icon: Users,
      title: 'Social Safety',
      color: 'bg-green-500',
      tips: [
        'Always inform someone about your whereabouts',
        'Trust your instincts - if something feels wrong, it probably is',
        'Stay in groups when possible, especially in unfamiliar areas',
        'Be aware of your surroundings and avoid distractions',
        'Know the emergency exits and safe spaces in public venues'
      ]
    },
    {
      icon: Shield,
      title: 'Personal Safety',
      color: 'bg-red-500',
      tips: [
        'Carry pepper spray or personal safety devices',
        'Learn basic self-defense techniques',
        'Keep emergency contacts on speed dial',
        'Wear your Sentinel Ring at all times',
        'Stay alert and avoid wearing headphones in isolated areas'
      ]
    }
  ];

  const emergencyResources = [
    { name: 'National Emergency Number', contact: '112', description: 'All emergencies' },
    { name: 'Police', contact: '100', description: 'Law enforcement' },
    { name: 'Ambulance', contact: '108', description: 'Medical emergencies' },
    { name: 'Women Helpline', contact: '1091', description: '24/7 support for women' },
    { name: 'Child Helpline', contact: '1098', description: 'Child safety and welfare' },
    { name: 'Mental Health Helpline', contact: '08046110007', description: 'Psychological support' }
  ];

  return (
    <Layout onLogout={onLogout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Safety Tips & Resources</h1>
          <p className="text-gray-600 mt-1">Your guide to staying safe in all situations</p>
        </div>

        <Tabs defaultValue="tips" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tips">Safety Tips</TabsTrigger>
            <TabsTrigger value="resources">Emergency Resources</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="tips" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {safetyCategories.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className={`${category.color} size-12 rounded-lg flex items-center justify-center mb-3`}>
                      <category.icon className="size-6 text-white" />
                    </div>
                    <CardTitle>{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2">
                          <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="size-6 text-purple-600" />
                  Pro Tip: Using Your Sentinel Ring
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 size-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Keep it charged</h4>
                    <p className="text-sm text-gray-700">Ensure your ring has at least 20% battery before long trips</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 size-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Sync regularly</h4>
                    <p className="text-sm text-gray-700">Open the app daily to sync biometric baseline data</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 size-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Test the SOS</h4>
                    <p className="text-sm text-gray-700">Practice the emergency activation monthly (in test mode)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Helplines</CardTitle>
                <CardDescription>Quick access numbers for immediate help</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {emergencyResources.map((resource, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="bg-red-100 size-12 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="size-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{resource.name}</h4>
                        <p className="text-2xl font-bold text-red-600 mt-1">{resource.contact}</p>
                        <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Safety Apps & Tools</CardTitle>
                <CardDescription>Additional resources for your safety</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="bg-blue-100 size-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Smartphone className="size-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Himmat Plus App</h4>
                    <p className="text-sm text-gray-600">Delhi Police women safety app with panic button</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="bg-green-100 size-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="size-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">My Safetipin</h4>
                    <p className="text-sm text-gray-600">Community-based safety mapping application</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="bg-purple-100 size-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Eye className="size-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">bSafe</h4>
                    <p className="text-sm text-gray-600">Live GPS tracking and fake call features</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How does the Sentinel Ring detect emergencies?</AccordionTrigger>
                    <AccordionContent>
                      The Sentinel Ring uses advanced biometric sensors to monitor your heart rate, movement patterns, and other
                      physiological indicators. When it detects anomalies consistent with panic or distress (elevated heart rate,
                      sudden movement changes, etc.), combined with loss of phone connection, it triggers a verification alert
                      through haptic vibration. If you don't respond within seconds, it automatically sends an SOS alert via
                      LoRaWAN network to emergency services.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What happens when I press the SOS button?</AccordionTrigger>
                    <AccordionContent>
                      When you activate SOS:
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Your location is immediately shared with all primary emergency contacts</li>
                        <li>Local authorities receive a Code Red alert with your verified identity</li>
                        <li>The Sentinel Ring begins continuous location tracking via LoRa network</li>
                        <li>Audio recording starts (where legally permitted) for evidence</li>
                        <li>Nearby community members are alerted to provide assistance</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How does safe routing work?</AccordionTrigger>
                    <AccordionContent>
                      Our AI-powered safe routing algorithm analyzes multiple factors including real-time crime data, street
                      lighting conditions, crowd density, historical safety records, and community reports. Instead of just
                      showing the fastest route, it recommends the safest path to your destination, even if it takes a few
                      minutes longer. The route is dynamically updated based on real-time conditions.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Will the ring work without my phone?</AccordionTrigger>
                    <AccordionContent>
                      Yes! This is the key advantage of the Sentinel Ring. While your phone is used for navigation and app
                      features during normal use, the ring operates independently in emergencies. It uses LoRaWAN technology
                      to communicate directly with community gateways and emergency services, bypassing cellular networks
                      entirely. This ensures help can reach you even if your phone is destroyed, stolen, or out of battery.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>How do I prevent false alarms?</AccordionTrigger>
                    <AccordionContent>
                      The system has multiple safeguards against false alarms:
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Edge AI distinguishes between exercise and panic based on movement patterns</li>
                        <li>The ring vibrates to confirm distress before sending alerts</li>
                        <li>You have 10 seconds to cancel a false trigger</li>
                        <li>Regular baseline biometric data helps improve accuracy</li>
                        <li>Manual SOS requires deliberate activation</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6">
                    <AccordionTrigger>Is my data and location private?</AccordionTrigger>
                    <AccordionContent>
                      Yes. Your location and biometric data are encrypted end-to-end. Normal location tracking is only
                      visible to you and contacts you explicitly authorize. Emergency data is only shared with verified
                      authorities during active incidents. We use Aadhar-verified onboarding to prevent spam accounts and
                      ensure a trusted user base. Your data is never sold to third parties, and you can request deletion
                      at any time.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
