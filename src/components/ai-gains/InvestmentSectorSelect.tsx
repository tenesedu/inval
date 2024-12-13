import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const INVESTMENT_SECTORS = [
  "Tech Stocks",
  "Crypto",
  "Real Estate",
  "Dividend Stocks",
  "Forex Trading",
  "Commodities",
  "ESG Investments",
  "Growth Stocks",
  "Mutual Funds",
  "Fixed Income",
  "Startups"
];

interface InvestmentSectorSelectProps {
  selectedSector: string;
  onSectorChange: (value: string) => void;
}

export const InvestmentSectorSelect = ({
  selectedSector,
  onSectorChange
}: InvestmentSectorSelectProps) => {
  return (
    <div className="space-y-2">
      <Label>Select Investment Sector</Label>
      <Select
        value={selectedSector}
        onValueChange={(value) => {
          onSectorChange(value);
        }}
      >
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="Select a sector" />
        </SelectTrigger>
        <SelectContent className="bg-white border shadow-lg z-50">
          {INVESTMENT_SECTORS.map((sector) => (
            <SelectItem 
              key={sector} 
              value={sector} 
              className="hover:bg-neutral-100"
            >
              {sector}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};