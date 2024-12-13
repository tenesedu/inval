import { Bell } from "lucide-react";

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    message: "Sarah Johnson started following you",
    time: "2 hours ago"
  },
  {
    id: 2,
    message: "Your investment in TSLA is up by 5%",
    time: "5 hours ago"
  },
  {
    id: 3,
    message: "New market analysis available",
    time: "1 day ago"
  }
];

const Notifications = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Notificaciones</h1>
      </div>
      
      <div className="space-y-4">
        {MOCK_NOTIFICATIONS.map((notification) => (
          <div 
            key={notification.id} 
            className="p-4 bg-white rounded-lg shadow border border-neutral-200"
          >
            <p className="text-sm">{notification.message}</p>
            <p className="text-xs text-neutral-500 mt-1">{notification.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;