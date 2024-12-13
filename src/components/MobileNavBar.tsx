import { Home, Bot, Upload, Bell, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ShareInvestmentDialog } from "./ShareInvestmentDialog";
import { NotificationsDropdown } from "./NotificationsDropdown";

export const MobileNavBar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 px-4 py-2 z-50">
      <div className="flex justify-between items-center">
        <Link 
          to="/" 
          className={cn(
            "flex flex-col items-center p-2 rounded-lg",
            isActive("/") ? "text-primary" : "text-neutral-600"
          )}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Inicio</span>
        </Link>

        <Link 
          to="/ai-gains" 
          className={cn(
            "flex flex-col items-center p-2 rounded-lg",
            isActive("/ai-gains") ? "text-primary" : "text-neutral-600"
          )}
        >
          <Bot size={24} />
          <span className="text-xs mt-1">AI Gains</span>
        </Link>

        <ShareInvestmentDialog>
          <button 
            className="flex flex-col items-center p-2 rounded-lg text-neutral-600"
          >
            <Upload size={24} />
            <span className="text-xs mt-1">Subir</span>
          </button>
        </ShareInvestmentDialog>

        <NotificationsDropdown>
          <button 
            className="flex flex-col items-center p-2 rounded-lg text-neutral-600"
          >
            <Bell size={24} />
            <span className="text-xs mt-1">Alertas</span>
          </button>
        </NotificationsDropdown>

        <Link 
          to="/profile/eduardo_fernando" 
          className={cn(
            "flex flex-col items-center p-2 rounded-lg",
            isActive("/profile/eduardo_fernando") ? "text-primary" : "text-neutral-600"
          )}
        >
          <User size={24} />
          <span className="text-xs mt-1">Perfil</span>
        </Link>
      </div>
    </div>
  );
};