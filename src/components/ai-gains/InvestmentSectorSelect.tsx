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

const COUNTRIES = [
  "All Countries",
  "USA",
  "China",
  "Japan",
  "Germany",
  "Brazil",
  "Spain"
];

interface InvestmentSectorSelectProps {
  selectedSector: string;
  selectedCountry: string;
  onSectorChange: (value: string) => void;
  onCountryChange: (value: string) => void;
}

export const InvestmentSectorSelect = ({
  selectedSector,
  selectedCountry,
  onSectorChange,
  onCountryChange
}: InvestmentSectorSelectProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Select Investment Sector</Label>
        <Select
          value={selectedSector}
          onValueChange={onSectorChange}
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

      <div className="space-y-2">
        <Label>Select Country (Optional)</Label>
        <Select
          value={selectedCountry}
          onValueChange={onCountryChange}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent className="bg-white border shadow-lg z-50">
            {COUNTRIES.map((country) => (
              <SelectItem 
                key={country} 
                value={country}
                className="hover:bg-neutral-100"
              >
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};