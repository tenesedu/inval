import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TOP_INVESTORS } from "@/data/topInvestors";

export const RightSidebar = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const navigate = useNavigate();
  
  const filteredInvestors = selectedCountry === "all" 
    ? TOP_INVESTORS 
    : TOP_INVESTORS.filter(investor => investor.country === selectedCountry);

  const countries = ["all", ...new Set(TOP_INVESTORS.map(investor => investor.country))];

  return (
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
          <div key={i} className="flex items-center space-x-3 hover:bg-neutral-50 p-2 rounded-lg cursor-pointer"
               onClick={() => navigate(`/profile/${investor.name.toLowerCase().replace(' ', '-')}`)}>
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
  );
};