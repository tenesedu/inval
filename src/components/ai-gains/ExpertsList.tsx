import { Label } from "@/components/ui/label";
import { TOP_INVESTORS } from "./constants";

interface ExpertsListProps {
  selectedSector: string;
  selectedCountry: string;
  selectedInvestors: string[];
  onToggleInvestor: (name: string) => void;
}

export const ExpertsList = ({
  selectedSector,
  selectedCountry,
  selectedInvestors,
  onToggleInvestor
}: ExpertsListProps) => {
  const filteredInvestors = TOP_INVESTORS.filter(investor => {
    const matchesSector = selectedSector === "" || investor.specialty === selectedSector;
    const matchesCountry = selectedCountry === "All Countries" || selectedCountry === "" || investor.country === selectedCountry;
    return matchesSector && matchesCountry;
  });

  console.log("Filtered investors:", {
    total: filteredInvestors.length,
    sector: selectedSector,
    country: selectedCountry
  });

  return (
    <div>
      <Label className="text-lg font-semibold">
        Select Experts in {selectedSector} {selectedCountry !== "All Countries" && selectedCountry !== "" ? `from ${selectedCountry}` : ""}
      </Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredInvestors.map((investor) => (
          <div
            key={investor.name}
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedInvestors.includes(investor.name)
                ? 'bg-primary/10 border-primary'
                : 'hover:bg-neutral-50'
            }`}
            onClick={() => onToggleInvestor(investor.name)}
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