import { TOP_INVESTORS } from "./constants";

interface ExpertsListProps {
  selectedSector: string;
  selectedInvestors: string[];
  onToggleInvestor: (name: string) => void;
}

export const ExpertsList = ({
  selectedSector,
  selectedInvestors,
  onToggleInvestor
}: ExpertsListProps) => {
  const filteredInvestors = TOP_INVESTORS.filter(
    investor => selectedSector === "" || investor.specialty === selectedSector
  );

  return (
    <div>
      <Label className="text-lg font-semibold">Select Experts in {selectedSector} (minimum 2)</Label>
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
            <p className="text-sm text-success">+{investor.return}% return</p>
          </div>
        ))}
      </div>
    </div>
  );
};