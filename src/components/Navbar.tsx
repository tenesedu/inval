import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Search, Bell, LogOut } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ShareInvestmentDialog } from "./ShareInvestmentDialog";
import { NotificationsDropdown } from "./NotificationsDropdown";

export const Navbar = ({ onSearchResults }: { onSearchResults?: (results: any[]) => void }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    setIsSearching(true);
    try {
      const { data, error } = await supabase
        .rpc('search_posts', {
          search_query: searchQuery.trim()
        });

      if (error) {
        console.error('Search error:', error);
        toast.error("An error occurred while searching");
        return;
      }

      if (onSearchResults) {
        onSearchResults(data || []);
      }

      if (!data || data.length === 0) {
        toast.info("No results found");
      }
    } catch (err) {
      console.error('Search error:', err);
      toast.error("An error occurred while searching");
    } finally {
      setIsSearching(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error("Failed to log out");
    }
  };

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="w-[100px]">
            <Link to="/" className="text-xl font-bold text-primary">
              Inval
            </Link>
          </div>

          {/* Center Container */}
          <div className="flex items-center gap-4 max-w-2xl ml-8">
            {/* Search Bar */}
            <div className="w-[400px]">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search investments..."
                  className="pl-8 h-9 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isSearching}
                />
              </form>
            </div>

            {/* Share Investment Button */}
            <div className="hidden md:block">
              <ShareInvestmentDialog>
                <Button 
                  className="bg-primary hover:bg-primary-dark rounded-none rounded-l-lg rounded-r-lg whitespace-nowrap"
                >
                  Share Investment
                </Button>
              </ShareInvestmentDialog>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            <NotificationsDropdown>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
              </Button>
            </NotificationsDropdown>

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
              <span className="whitespace-nowrap">Eduardo Fernando</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
