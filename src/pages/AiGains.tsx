import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { InvestmentSectorSelect } from "@/components/ai-gains/InvestmentSectorSelect";
import { InvestmentAmountInput } from "@/components/ai-gains/InvestmentAmountInput";
import { ExpertsList } from "@/components/ai-gains/ExpertsList";
import { StrategyGenerator } from "@/components/ai-gains/StrategyGenerator";

const AiGains = () => {
  const [selectedInvestors, setSelectedInvestors] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [strategy, setStrategy] = useState<string | null>(null);
  const [selectedSector, setSelectedSector] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("All Countries");
  const [investmentAmount, setInvestmentAmount] = useState<string>("");

  const toggleInvestor = (name: string) => {
    setSelectedInvestors(prev => 
      prev.includes(name) 
        ? prev.filter(n => n !== name)
        : [...prev, name]
    );
  };

  const showExpertsList = selectedSector !== "";
  const canSelectExperts = investmentAmount !== "";
  const canGenerateStrategy = showExpertsList && canSelectExperts && selectedInvestors.length > 0;

  console.log("Current state:", {
    selectedSector,
    selectedCountry,
    investmentAmount,
    selectedInvestors,
    canGenerateStrategy,
    canSelectExperts
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-primary" />
              <CardTitle>AI Investment Strategy Generator</CardTitle>
            </div>
            <CardDescription>
              Customize your investment strategy based on sector experts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <InvestmentSectorSelect
                selectedSector={selectedSector}
                selectedCountry={selectedCountry}
                onSectorChange={setSelectedSector}
                onCountryChange={setSelectedCountry}
              />

              <InvestmentAmountInput
                value={investmentAmount}
                onChange={setInvestmentAmount}
              />

              {showExpertsList && (
                <ExpertsList
                  selectedSector={selectedSector}
                  selectedCountry={selectedCountry}
                  selectedInvestors={selectedInvestors}
                  onToggleInvestor={toggleInvestor}
                  canSelectExperts={canSelectExperts}
                />
              )}

              <StrategyGenerator
                isGenerating={isGenerating}
                canGenerate={canGenerateStrategy}
                selectedSector={selectedSector}
                selectedInvestors={selectedInvestors}
                investmentAmount={investmentAmount}
                onStrategyGenerated={setStrategy}
                onGeneratingChange={setIsGenerating}
              />

              {strategy && (
                <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Generated Strategy</h3>
                  <pre className="whitespace-pre-wrap font-mono text-sm">
                    {strategy}
                  </pre>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AiGains;