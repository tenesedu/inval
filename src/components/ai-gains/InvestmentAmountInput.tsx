import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InvestmentAmountInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const InvestmentAmountInput = ({
  value,
  onChange
}: InvestmentAmountInputProps) => {
  return (
    <div className="space-y-2">
      <Label>Investment Amount ($)</Label>
      <Input
        type="number"
        placeholder="Enter amount"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};