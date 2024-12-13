import { Navbar } from "@/components/Navbar";
import { Feed } from "@/components/Feed";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { SearchResults } from "@/components/SearchResults";
import { MobileNavBar } from "@/components/MobileNavBar";
import { useState } from "react";

const Index = () => {
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar onSearchResults={handleSearchResults} />
      
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="hidden md:block md:col-span-3">
            <LeftSidebar />
          </div>
          
          {/* Main Feed */}
          <div className="md:col-span-6">
            {searchResults !== null ? (
              <SearchResults results={searchResults} isLoading={isSearching} />
            ) : (
              <Feed />
            )}
          </div>
          
          {/* Right Sidebar */}
          <div className="hidden md:block md:col-span-3">
            <RightSidebar />
          </div>
        </div>
      </main>

      <MobileNavBar />
    </div>
  );
};

export default Index;