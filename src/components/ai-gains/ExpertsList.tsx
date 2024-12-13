import { Label } from "@/components/ui/label";
import { TOP_INVESTORS } from "./constants";
import { toast } from "sonner";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ExpertsListProps {
  selectedSector: string;
  selectedCountry: string;
  selectedInvestors: string[];
  onToggleInvestor: (name: string) => void;
  canSelectExperts: boolean;
}

export const ExpertsList = ({
  selectedSector,
  selectedCountry,
  selectedInvestors,
  onToggleInvestor,
  canSelectExperts
}: ExpertsListProps) => {
  const filteredInvestors = TOP_INVESTORS.filter(investor => {
    const matchesSector = selectedSector === "" || investor.specialty === selectedSector;
    const matchesCountry = selectedCountry === "All Countries" || selectedCountry === "" || investor.country === selectedCountry;
    return matchesSector && matchesCountry;
  });

  const handleInvestorClick = (name: string) => {
    if (!canSelectExperts) {
      toast.error("Please enter an investment amount first");
      return;
    }
    onToggleInvestor(name);
  };

  console.log("ExpertsList state:", {
    selectedSector,
    selectedCountry,
    selectedInvestors,
    canSelectExperts,
    filteredCount: filteredInvestors.length
  });

  if (filteredInvestors.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-neutral-500">No experts found for the selected criteria</p>
      </div>
    );
  }

  return (
    <div>
      <Label className="text-lg font-semibold">
        Select Experts in {selectedSector} {selectedCountry !== "All Countries" && selectedCountry !== "" ? `from ${selectedCountry}` : ""}
        {!canSelectExperts && " (Enter investment amount to select experts)"}
      </Label>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {filteredInvestors.map((investor) => (
          <div
            key={investor.name}
            className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
              selectedInvestors.includes(investor.name)
                ? 'bg-primary/10 border-primary shadow-md'
                : !canSelectExperts 
                  ? 'opacity-50 hover:opacity-60'
                  : 'hover:bg-neutral-100 hover:shadow-md'
            }`}
            onClick={() => handleInvestorClick(investor.name)}
          >
            <div className="flex items-start gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={investor.avatar} alt={investor.name} />
                <AvatarFallback>{investor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{investor.name}</p>
                <p className="text-sm text-neutral-500">{investor.specialty}</p>
                <p className="text-sm text-neutral-500">{investor.country}</p>
                <p className="text-sm text-success">+{investor.return}% return</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};