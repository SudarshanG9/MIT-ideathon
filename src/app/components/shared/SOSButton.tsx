import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { toast } from 'sonner';

export default function SOSButton() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isActivating, setIsActivating] = useState(false);

  const handleSOSActivation = () => {
    setIsActivating(true);

    // Simulate SOS activation
    setTimeout(() => {
      toast.error('SOS ACTIVATED - Emergency services notified', {
        duration: 5000,
        description: 'Your location has been shared with emergency contacts and authorities',
      });
      setIsActivating(false);
      setShowConfirm(false);
    }, 1500);
  };

  return (
    <>
      <Button
        size="lg"
        className="fixed bottom-8 right-8 size-20 rounded-full bg-red-600 hover:bg-red-700 shadow-2xl z-50 animate-pulse"
        onClick={() => setShowConfirm(true)}
      >
        <div className="flex flex-col items-center">
          <AlertTriangle className="size-8" />
          <span className="text-xs mt-1">SOS</span>
        </div>
      </Button>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="size-6" />
              Activate Emergency SOS
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will immediately:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Alert your emergency contacts</li>
                <li>Send your live location to authorities</li>
                <li>Activate your Sentinel Ring's emergency mode</li>
                <li>Start recording biometric and audio evidence</li>
              </ul>
              <p className="mt-3 font-semibold">Are you in danger?</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isActivating}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSOSActivation}
              disabled={isActivating}
              className="bg-red-600 hover:bg-red-700"
            >
              {isActivating ? 'Activating...' : 'Activate SOS'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
