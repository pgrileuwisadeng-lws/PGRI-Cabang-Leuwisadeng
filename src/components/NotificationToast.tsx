import React, { useEffect, useState } from 'react';
import { Bell, X } from 'lucide-react';
import { PushNotificationItem } from '../types';

interface NotificationToastProps {
  notifications: PushNotificationItem[];
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ notifications }) => {
  const [activeToast, setActiveToast] = useState<PushNotificationItem | null>(null);

  useEffect(() => {
    if (notifications.length > 0) {
      const latest = notifications[0];
      // If it is newly created (e.g. timestamp 'Baru saja' and unread)
      if (!latest.read && latest.timestamp === 'Baru saja') {
        setActiveToast(latest);
        const timer = setTimeout(() => {
          setActiveToast(null);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [notifications]);

  if (!activeToast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-white dark:bg-slate-900 border border-red-500/40 rounded-2xl p-4 shadow-2xl animate-in slide-in-from-bottom-4 transition-all">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 shrink-0">
          <Bell className="w-5 h-5 animate-bounce" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 dark:text-red-400">
              Pemberitahuan Instan
            </span>
            <button 
              onClick={() => setActiveToast(null)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate mt-0.5">
            {activeToast.title}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-1 leading-relaxed">
            {activeToast.body}
          </p>
        </div>
      </div>
    </div>
  );
};
