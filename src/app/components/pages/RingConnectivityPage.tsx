import { useState } from 'react';
import Layout from '../shared/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Watch,
  QrCode,
  Bluetooth,
  Battery,
  Activity,
  Wifi,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Settings,
  Zap,
  Heart,
  Radio
} from 'lucide-react';
import { toast } from 'sonner';

interface RingConnectivityPageProps {
  onLogout: () => void;
}

export default function RingConnectivityPage({ onLogout }: RingConnectivityPageProps) {
  const [isConnected, setIsConnected] = useState(true);
  const [isScanning, setIsScanning] = useState(false);

  const ringStats = {
    battery: 78,
    heartRate: 72,
    lastSync: '2 minutes ago',
    loraSignal: 'Strong',
    bluetoothSignal: 'Connected',
    firmwareVersion: '2.1.4'
  };

  const biometricData = [
    { time: '00:00', value: 68 },
    { time: '04:00', value: 62 },
    { time: '08:00', value: 70 },
    { time: '12:00', value: 75 },
    { time: '16:00', value: 72 },
    { time: '20:00', value: 69 },
    { time: 'Now', value: 72 }
  ];

  const handleScanQR = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      toast.success('Ring paired successfully');
      setIsConnected(true);
    }, 2000);
  };

  const handleSync = () => {
    toast.info('Syncing with Sentinel Ring...', {
      duration: 2000
    });
    setTimeout(() => {
      toast.success('Sync completed');
    }, 2000);
  };

  return (
    <Layout onLogout={onLogout}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Sentinel Ring</h1>
            <p className="text-gray-600 mt-1">Manage your smart safety wearable</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSync}>
              <RefreshCw className="size-4 mr-2" />
              Sync Now
            </Button>
            {!isConnected && (
              <Button onClick={handleScanQR} className="bg-purple-600 hover:bg-purple-700">
                <QrCode className="size-4 mr-2" />
                {isScanning ? 'Scanning...' : 'Pair Ring'}
              </Button>
            )}
          </div>
        </div>

        {/* Connection Status */}
        <Card className={isConnected ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`${isConnected ? 'bg-green-100' : 'bg-orange-100'} size-16 rounded-full flex items-center justify-center`}>
                  {isConnected ? (
                    <CheckCircle className="size-8 text-green-600" />
                  ) : (
                    <AlertCircle className="size-8 text-orange-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {isConnected ? 'Ring Connected' : 'Ring Disconnected'}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {isConnected
                      ? 'Your Sentinel Ring is active and monitoring'
                      : 'Please pair your ring to activate safety features'}
                  </p>
                </div>
              </div>
              <Badge className={isConnected ? 'bg-green-500' : 'bg-orange-500'}>
                {isConnected ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="status" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="pairing">QR Pairing</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="status" className="space-y-6 mt-6">
            {/* Battery & Health */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Battery className="size-5 text-green-600" />
                    Battery Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">{ringStats.battery}%</span>
                    <Badge className={ringStats.battery > 50 ? 'bg-green-500' : 'bg-orange-500'}>
                      {ringStats.battery > 50 ? 'Good' : 'Charge Soon'}
                    </Badge>
                  </div>
                  <Progress value={ringStats.battery} className="h-3" />
                  <p className="text-sm text-gray-600">
                    Estimated {Math.floor(ringStats.battery / 5)} days remaining
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="size-5 text-red-600" />
                    Heart Rate
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">{ringStats.heartRate} BPM</span>
                    <Badge className="bg-blue-500">Normal</Badge>
                  </div>
                  <div className="h-20 flex items-end gap-1">
                    {biometricData.map((data, idx) => (
                      <div key={idx} className="flex-1 bg-red-200 rounded-t" style={{ height: `${(data.value / 100) * 100}%` }} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Last 24 hours average</p>
                </CardContent>
              </Card>
            </div>

            {/* Connectivity */}
            <Card>
              <CardHeader>
                <CardTitle>Connectivity Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bluetooth className="size-6 text-blue-600" />
                      <div>
                        <p className="font-semibold">Bluetooth</p>
                        <p className="text-sm text-gray-600">{ringStats.bluetoothSignal}</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-500">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Radio className="size-6 text-purple-600" />
                      <div>
                        <p className="font-semibold">LoRaWAN</p>
                        <p className="text-sm text-gray-600">{ringStats.loraSignal}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Strong</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Device Info */}
            <Card>
              <CardHeader>
                <CardTitle>Device Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Device ID</span>
                  <span className="font-mono text-sm">SR-2024-7A3F</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Firmware Version</span>
                  <span className="font-mono text-sm">{ringStats.firmwareVersion}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Last Sync</span>
                  <span className="text-sm">{ringStats.lastSync}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">LoRa Gateway</span>
                  <span className="text-sm">Gateway-BLR-042</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pairing" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Pair Your Sentinel Ring</CardTitle>
                <CardDescription>Scan the QR code on your ring to pair it with your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* QR Scanner Placeholder */}
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg p-12 flex flex-col items-center justify-center">
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <QrCode className="size-32 text-purple-600" />
                  </div>
                  <p className="mt-4 text-gray-700 font-semibold">Scan QR Code Here</p>
                  <p className="text-sm text-gray-600 mt-1">Point your ring's QR code at the camera</p>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={handleScanQR}
                  disabled={isScanning}
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="size-5 mr-2 animate-spin" />
                      Pairing...
                    </>
                  ) : (
                    <>
                      <QrCode className="size-5 mr-2" />
                      Start QR Scan
                    </>
                  )}
                </Button>

                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-3">Pairing Instructions</h4>
                  <ol className="space-y-2 list-decimal list-inside text-sm text-gray-700">
                    <li>Ensure your Sentinel Ring is charged and powered on</li>
                    <li>Locate the QR code on the inside of your ring or in the box</li>
                    <li>Click "Start QR Scan" and point your camera at the QR code</li>
                    <li>Wait for the confirmation message</li>
                    <li>Complete the initial sync by keeping the ring near your phone</li>
                  </ol>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-900">First Time Setup</h4>
                      <p className="text-sm text-blue-800 mt-1">
                        During first-time pairing, you'll need to wear the ring for 5 minutes to establish
                        your baseline biometric profile. This helps the AI distinguish between normal activity
                        and emergency situations.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Ring Settings</CardTitle>
                <CardDescription>Configure your Sentinel Ring preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">Haptic Alerts</p>
                    <p className="text-sm text-gray-600">Vibration for emergency verification</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">Continuous HR Monitoring</p>
                    <p className="text-sm text-gray-600">Always track heart rate</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">Auto LoRa Activation</p>
                    <p className="text-sm text-gray-600">Activate LoRa on phone disconnect</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">Battery Saver Mode</p>
                    <p className="text-sm text-gray-600">Reduce sensor frequency below 20%</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Zap className="size-4 mr-2" />
                  Update Firmware
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <RefreshCw className="size-4 mr-2" />
                  Reset Baseline Data
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                  <AlertCircle className="size-4 mr-2" />
                  Unpair Device
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
