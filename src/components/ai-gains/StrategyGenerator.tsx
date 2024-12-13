import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { TOP_INVESTORS } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface StrategyGeneratorProps {
  isGenerating: boolean;
  canGenerate: boolean;
  selectedSector: string;
  selectedInvestors: string[];
  investmentAmount: string;
  onStrategyGenerated: (strategy: string) => void;
  onGeneratingChange: (isGenerating: boolean) => void;
}

export const StrategyGenerator = ({
  isGenerating,
  canGenerate,
  selectedSector,
  selectedInvestors,
  investmentAmount,
  onStrategyGenerated,
  onGeneratingChange
}: StrategyGeneratorProps) => {
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

  const generateStrategy = async () => {
    if (!selectedSector || !investmentAmount || selectedInvestors.length === 0) {
      toast.error("Please select a sector, specify the investment amount, and choose at least one expert");
      return;
    }

    try {
      onGeneratingChange(true);
      console.log("Generating strategy for:", {
        sector: selectedSector,
        amount: investmentAmount,
        investors: selectedInvestors,
        trackRecordsCount: trackRecords?.length
      });

      const selectedInvestorsData = TOP_INVESTORS.filter(inv => selectedInvestors.includes(inv.name));
      
      // Calculate performance metrics from track records
      const investorPerformance = selectedInvestors.map(name => {
        const records = trackRecords?.filter(record => record.expert_name === name) || [];
        const averageReturn = records.reduce((acc, record) => acc + Number(record.return_percentage), 0) / (records.length || 1);
        const latestReturn = records[records.length - 1]?.return_percentage || 0;
        return { name, averageReturn, latestReturn };
      });

      const averageReturn = investorPerformance.reduce((acc, inv) => acc + inv.averageReturn, 0) / investorPerformance.length;
      const amountPerInvestor = Number(investmentAmount) / selectedInvestorsData.length;

      const sectorSpecificAdvice = getSectorSpecificAdvice(selectedSector);

      const strategyText = `Investment Strategy for ${selectedSector}
Total investment amount: $${Number(investmentAmount).toLocaleString()}

1. Investment Distribution:
${selectedInvestorsData.map(inv => {
  const performance = investorPerformance.find(p => p.name === inv.name);
  return `- Following ${inv.name}'s strategy: $${amountPerInvestor.toLocaleString()} (${Math.round(100/selectedInvestorsData.length)}%)
   • 6-month average return: ${performance?.averageReturn.toFixed(1)}%
   • Latest monthly return: ${performance?.latestReturn.toFixed(1)}%`;
}).join('\n')}

2. Key Metrics:
- Main sector: ${selectedSector}
- Target annual return: ${averageReturn.toFixed(1)}%
- Number of combined strategies: ${selectedInvestorsData.length}
- Diversification per strategy: ${(100/selectedInvestorsData.length).toFixed(1)}%
- Historical data period: 6+ months

3. Implementation Plan:
${sectorSpecificAdvice}

4. Risk Management:
- Set stop-loss at -8% to protect capital
- Quarterly portfolio rebalancing
- Diversification across different assets within the sector
- Daily market condition monitoring

5. Strategy Breakdown:
${selectedInvestorsData.map(inv => {
  const performance = investorPerformance.find(p => p.name === inv.name);
  return `- ${inv.name}:
   • Specialty: ${inv.specialty}
   • 6-month average return: ${performance?.averageReturn.toFixed(1)}%
   • Latest monthly return: ${performance?.latestReturn.toFixed(1)}%
   • Allocated amount: $${amountPerInvestor.toLocaleString()}`;
}).join('\n')}

6. Next Steps:
1. Perform due diligence on each asset before investing
2. Implement positions gradually (DCA)
3. Set up price alerts for monitoring
4. Review strategy monthly`;

      onStrategyGenerated(strategyText);
      toast.success("Strategy generated successfully");

    } catch (error) {
      console.error("Error generating strategy:", error);
      toast.error("Error generating strategy");
    } finally {
      onGeneratingChange(false);
    }
  };

  return (
    <Button
      className="w-full"
      size="lg"
      onClick={generateStrategy}
      disabled={!canGenerate || isGenerating}
    >
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating Strategy...
        </>
      ) : (
        'Generate AI Strategy'
      )}
    </Button>
  );
};

const getSectorSpecificAdvice = (sector: string): string => {
  const adviceMap: { [key: string]: string } = {
    "Tech Stocks": `- Focus on companies with strong R&D investment
- Analysis of competitive advantages and entry barriers
- Evaluation of growth metrics and margins
- Consideration of emerging technology trends`,
    
    "Crypto": `- Implementation of DCA (Dollar Cost Averaging) strategy
- Secure storage in cold wallets
- Diversification across different blockchains
- Analysis of fundamentals and use cases`,
    
    "Real Estate": `- Analysis of premium and emerging locations
- Evaluation of rental yield vs appreciation
- Consideration of maintenance and management costs
- Diversification between commercial and residential properties`,
    
    "Dividend Stocks": `- Focus on companies with growing dividend history
- Analysis of payout ratios and coverage
- Evaluation of financial health and cash flow
- Diversification across defensive sectors`,
    
    "Forex Trading": `- Implementation of strict risk management
- Combined technical and fundamental analysis
- Monitoring of macroeconomic events
- Use of stops and loss limits`,
    
    "Commodities": `- Analysis of economic cycles and global demand
- Diversification across different commodities
- Consideration of storage and roll costs
- Evaluation of geopolitical impact`,
    
    "ESG Investments": `- Evaluation of sustainability metrics
- Analysis of corporate policies and governance
- Consideration of environmental regulations
- Monitoring of social trends`,
    
    "Growth Stocks": `- Analysis of growth metrics and scalability
- Evaluation of competitive advantages
- Consideration of valuations and multiples
- Monitoring of growth milestones`,

    "Mutual Funds": `- Analysis of fund manager track record
- Evaluation of expense ratios and fees
- Consideration of fund strategy alignment
- Monitoring of historical performance`,

    "Fixed Income": `- Analysis of yield curves and credit ratings
- Evaluation of duration and interest rate risk
- Consideration of inflation impact
- Monitoring of issuer creditworthiness`,

    "Startups": `- Analysis of market opportunity and team
- Evaluation of business model and traction
- Consideration of funding rounds and valuation
- Monitoring of growth metrics and milestones`
  };

  return adviceMap[sector] || `- Fundamental sector analysis
- Evaluation of specific risks
- Market trend monitoring
- Gradual position implementation`;
};