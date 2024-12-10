import { Navbar } from "@/components/Navbar";
import { Feed } from "@/components/Feed";
import { TrendingUp, Users, Award } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const TOP_INVESTORS = [
  {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg",
    country: "USA",
    return: 25.5,
    specialty: "Tech Stocks"
  },
  {
    name: "Michael Chen",
    avatar: "/placeholder.svg",
    country: "Singapore",
    return: 22.8,
    specialty: "Crypto"
  },
  {
    name: "Elena Rodriguez",
    avatar: "/placeholder.svg",
    country: "Spain",
    return: 19.2,
    specialty: "Real Estate"
  },
  {
    name: "Hans Weber",
    avatar: "/placeholder.svg",
    country: "Germany",
    return: 18.5,
    specialty: "Dividend Stocks"
  },
  {
    name: "Yuki Tanaka",
    avatar: "/placeholder.svg",
    country: "Japan",
    return: 21.3,
    specialty: "Forex Trading"
  }
];

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  
  const filteredInvestors = selectedCountry === "all" 
    ? TOP_INVESTORS 
    : TOP_INVESTORS.filter(investor => investor.country === selectedCountry);

  const countries = ["all", ...new Set(TOP_INVESTORS.map(investor => investor.country))];

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="hidden md:block md:col-span-3">
            <div className="bg-white rounded-lg border p-4">
              <h2 className="font-heading text-lg font-semibold mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Total Return</p>
                    <p className="font-semibold text-success">+24.5%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Followers</p>
                    <p className="font-semibold">1,234</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Ranking</p>
                    <p className="font-semibold">#42</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Feed */}
          <div className="md:col-span-6">
            <Feed />
          </div>
          
          {/* Right Sidebar */}
          <div className="hidden md:block md:col-span-3">
            <div className="bg-white rounded-lg border p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-heading text-lg font-semibold">Top Investors</h2>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="w-[140px] bg-white">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country === "all" ? "All Countries" : country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                {filteredInvestors.map((investor, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <img src={investor.avatar} alt={investor.name} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <p className="font-semibold">{investor.name}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-success">+{investor.return}% return</p>
                        <p className="text-xs text-neutral-500">{investor.specialty}</p>
                      </div>
                      <p className="text-xs text-neutral-500">{investor.country}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;