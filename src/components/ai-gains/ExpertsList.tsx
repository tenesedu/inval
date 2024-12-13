import { Label } from "@/components/ui/label";
import { TOP_INVESTORS } from "./constants";
import { toast } from "sonner";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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
  const { data: trackRecords } = useQuery({
    queryKey: ['trackRecords'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('expert_track_records')
        .select('*')
        .order('operation_date', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  const filteredInvestors = TOP_INVESTORS.filter(investor => {
    const matchesSector = selectedSector === "" || investor.specialty === selectedSector;
    const matchesCountry = selectedCountry === "All Countries" || selectedCountry === "" || investor.country === selectedCountry;
    return matchesSector && matchesCountry;
  });

  const getInvestorTrackRecord = (name: string) => {
    if (!trackRecords) return [];
    return trackRecords
      .filter(record => record.expert_name === name)
      .map(record => ({
        date: new Date(record.operation_date).toLocaleDateString(),
        return: Number(record.return_percentage)
      }));
  };

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
    filteredCount: filteredInvestors.length,
    trackRecordsCount: trackRecords?.length
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
        {filteredInvestors.map((investor) => {
          const trackRecord = getInvestorTrackRecord(investor.name);
          const hasTrackRecord = trackRecord.length > 0;
          
          return (
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
              
              {hasTrackRecord && (
                <div className="mt-4 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trackRecord}>
                      <XAxis dataKey="date" hide />
                      <YAxis hide />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="return"
                        stroke="#16a34a"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <p className="text-xs text-center text-neutral-500 mt-2">6-month performance</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};