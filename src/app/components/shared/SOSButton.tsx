import { useState, useEffect } from 'react';
import { AlertTriangle, Timer } from 'lucide-react';
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
  const [countdown, setCountdown] = useState(60);

  const handleSOSActivation = () => {
    if (isActivating) return;
    setIsActivating(true);

    setTimeout(() => {
      toast.error('SOS ACTIVATED - Emergency services notified', {
        duration: 5000,
        description: 'Your location has been shared with emergency contacts and authorities',
      });
      setIsActivating(false);
      setShowConfirm(false);
      setCountdown(60); 
    }, 1500);
  };

  // The "Dead Man's Switch" Timer Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showConfirm && countdown > 0 && !isActivating) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (showConfirm && countdown === 0 && !isActivating) {
      handleSOSActivation();
    }

    return () => clearInterval(timer);
  }, [showConfirm, countdown, isActivating]);

  const handleCancel = () => {
    setShowConfirm(false);
    setCountdown(60);
  };

  return (
    <>
      <Button
        size="lg"
        className="fixed bottom-8 right-8 size-20 rounded-full bg-red-600 hover:bg-red-700 shadow-2xl z-50 animate-pulse"
        onClick={() => setShowConfirm(true)}
      >
        <div className="flex flex-col items-center">
          <AlertTriangle className="size-8 text-white" />
          <span className="text-xs mt-1 text-white font-bold">SOS</span>
        </div>
      </Button>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent className="border-2 border-red-600">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-between text-red-600 text-xl font-bold">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-6" />
                Activate Emergency SOS
              </div>
              <div className="flex items-center gap-1 text-sm bg-red-50 text-red-600 px-3 py-1 rounded-full border border-red-200">
                <Timer className="size-4 animate-spin-slow" />
                <span>{countdown}s</span>
              </div>
            </AlertDialogTitle>
            
            <AlertDialogDescription className="text-slate-700">
              <p className="mb-3">
                This will immediately:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
                <li>Alert your emergency contacts</li>
                <li>Send your live location to authorities</li>
                <li>Activate your Sentinel Ring's emergency mode</li>
                <li>Start recording biometric and audio evidence</li>
              </ul>
              
              <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                <p className="text-red-700 font-bold text-center">
                  AUTO-ACTIVATING IN {countdown} SECONDS
                </p>
                <p className="text-xs text-red-600 text-center mt-1">
                  Are you in danger?
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel 
              onClick={handleCancel} 
              disabled={isActivating}
              className="border-slate-200"
            >
              I am safe (Cancel)
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSOSActivation}
              disabled={isActivating}
              className="bg-red-600 hover:bg-red-700 text-white font-bold"
            >
              {isActivating ? 'Activating...' : 'Activate Now'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}