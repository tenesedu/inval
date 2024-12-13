import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TOP_INVESTORS } from "@/data/topInvestors";

type FilterType = "country" | "specialty";

export const RightSidebar = () => {
  const [filterType, setFilterType] = useState<FilterType>("country");
  const [selectedValue, setSelectedValue] = useState<string>("all");
  const navigate = useNavigate();
  
  const filterOptions = {
    country: ["all", ...new Set(TOP_INVESTORS.map(investor => investor.country))],
    specialty: ["all", ...new Set(TOP_INVESTORS.map(investor => investor.specialty))]
  };

  const filteredInvestors = selectedValue === "all" 
    ? TOP_INVESTORS 
    : TOP_INVESTORS.filter(investor => 
        filterType === "country" 
          ? investor.country === selectedValue
          : investor.specialty === selectedValue
      );

  // Sort investors by return and take top 5
  const displayedInvestors = [...filteredInvestors]
    .sort((a, b) => b.return - a.return)
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex flex-col gap-4 mb-4">
        <h2 className="font-heading text-lg font-semibold">Top Investors</h2>
        
        <div className="flex flex-col gap-2">
          <Select value={filterType} onValueChange={(value: FilterType) => {
            setFilterType(value);
            setSelectedValue("all");
          }}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="country">Country</SelectItem>
              <SelectItem value="specialty">Investment Sector</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedValue} onValueChange={setSelectedValue}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder={`Select ${filterType}`} />
            </SelectTrigger>
            <SelectContent>
              {filterOptions[filterType].map((option) => (
                <SelectItem key={option} value={option}>
                  {option === "all" ? `All ${filterType === "country" ? "Countries" : "Sectors"}` : option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {displayedInvestors.map((investor, i) => (
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

      <Button 
        variant="outline" 
        className="w-full mt-4"
        onClick={() => navigate('/investors')}
      >
        View Full List
      </Button>
    </div>
  );
};