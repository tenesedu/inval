import { Label } from "@/components/ui/label";
import { TOP_INVESTORS } from "./constants";
import { toast } from "sonner";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredInvestors.map((investor) => (
          <div
            key={investor.name}
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedInvestors.includes(investor.name)
                ? 'bg-primary/10 border-primary'
                : !canSelectExperts 
                  ? 'opacity-50 hover:bg-neutral-100/50'
                  : 'hover:bg-neutral-100'
            }`}
            onClick={() => handleInvestorClick(investor.name)}
          >
            <p className="font-semibold">{investor.name}</p>
            <p className="text-sm text-neutral-500">{investor.specialty}</p>
            <p className="text-sm text-neutral-500">{investor.country}</p>
            <p className="text-sm text-success">+{investor.return}% return</p>
          </div>
        ))}
      </div>
    </div>
  );
};