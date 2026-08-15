import React, { useState, useEffect } from 'react';
import { Bell, CheckCheck, Briefcase, Calendar, Info, X } from 'lucide-react';
import { notificationService } from '../services/api';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await notificationService.getNotifications();
      if (res.success && res.data) {
        setNotifications(res.data.notifications || []);
        setUnreadCount(res.data.unreadCount || 0);
      }
    } catch (err) {
      console.error('Error loading notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition-colors focus:outline-none"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-slate-950">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-400" />
                <h4 className="text-sm font-semibold text-white">Notifications</h4>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-500/20 text-blue-400 rounded-full">
                    {unreadCount} unread
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
              {loading && notifications.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500">Loading notifications...</div>
              ) : notifications.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">No notifications yet.</div>
              ) : (
                notifications.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => !item.read && handleMarkRead(item._id)}
                    className={`p-3.5 transition-colors cursor-pointer flex gap-3 ${
                      item.read ? 'bg-slate-900/40 opacity-75' : 'bg-slate-800/40 hover:bg-slate-800/70'
                    }`}
                  >
                    <div className="mt-0.5">
                      {item.type === 'application' && <Briefcase className="w-4 h-4 text-emerald-400" />}
                      {item.type === 'deadline' && <Calendar className="w-4 h-4 text-amber-400" />}
                      {item.type === 'opportunity' && <Bell className="w-4 h-4 text-blue-400" />}
                      {item.type === 'system' && <Info className="w-4 h-4 text-purple-400" />}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-xs font-semibold text-slate-200">{item.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{item.message}</p>
                      <span className="text-[10px] text-slate-500 mt-1 block">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {!item.read && <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 shrink-0" />}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;
