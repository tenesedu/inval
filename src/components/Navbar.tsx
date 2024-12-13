import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Search, Bell } from "lucide-react";
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

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo - aligned with Quick Stats */}
          <Link to="/" className="text-xl font-bold text-primary pl-[16.66%]">
            Inval
          </Link>
          
          {/* Search Bar - aligned with content below */}
          <div className="flex-1 max-w-md pl-[25%]">
            <form onSubmit={handleSearch} className="relative">
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

          {/* Desktop-only buttons - aligned with content width */}
          <div className="hidden md:flex items-center gap-4 pr-[16.66%]">
            <ShareInvestmentDialog>
              <Button 
                className="bg-primary hover:bg-primary-dark rounded-none rounded-l-lg rounded-r-lg"
              >
                Share Investment
              </Button>
            </ShareInvestmentDialog>

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
              <span>Eduardo Fernando</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};