import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Search, Share, Bell, User } from "lucide-react";
import { Input } from "./ui/input";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-primary">
            Inval
          </Link>
          
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search investments..."
                className="pl-8 h-9"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2 text-neutral-600 hover:text-primary"
            >
              <Share className="h-4 w-4" />
              Share Investment
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="text-neutral-600 hover:text-primary"
            >
              <Bell className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={() => navigate('/profile/eduardo_fernando')}
              className="flex items-center space-x-2"
            >
              <img 
                src="/placeholder.svg" 
                alt="Eduardo Fernando" 
                className="w-8 h-8 rounded-full"
              />
              <span>Eduardo Fernando</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};