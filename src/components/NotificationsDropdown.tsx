import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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

export const NotificationsDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="text-neutral-600 hover:text-primary"
        >
          <Bell className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {MOCK_NOTIFICATIONS.map((notification) => (
          <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer">
            <div>
              <p className="text-sm">{notification.message}</p>
              <p className="text-xs text-neutral-500 mt-1">{notification.time}</p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};