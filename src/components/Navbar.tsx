import { Link } from "react-router-dom";
import { Bell, Search, User } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-heading font-bold text-primary">
          Inval
        </Link>
        
        <div className="flex items-center space-x-6">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search investors..."
              className="pl-10 pr-4 py-2 rounded-full bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
            />
          </div>
          
          <button className="btn-primary">Share Investment</button>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-neutral-100 rounded-full">
              <Bell className="h-5 w-5 text-neutral-600" />
            </button>
            <Link to="/profile" className="p-2 hover:bg-neutral-100 rounded-full">
              <User className="h-5 w-5 text-neutral-600" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};