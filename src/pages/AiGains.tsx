import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Brain, Loader2 } from "lucide-react";

const TOP_INVESTORS = [
  { name: "Sarah Johnson", specialty: "Tech Stocks", return: 25.5 },
  { name: "Michael Chen", specialty: "Crypto", return: 22.8 },
  { name: "Elena Rodriguez", specialty: "Real Estate", return: 19.2 },
  { name: "Hans Weber", specialty: "Dividend Stocks", return: 18.5 },
  { name: "Yuki Tanaka", specialty: "Forex Trading", return: 21.3 },
  { name: "Maria Silva", specialty: "Commodities", return: 24.1 },
  { name: "Alex Thompson", specialty: "ESG Investments", return: 20.7 },
  { name: "Li Wei", specialty: "Growth Stocks", return: 23.4 }
];

const AiGains = () => {
  const [selectedInvestors, setSelectedInvestors] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [strategy, setStrategy] = useState<string | null>(null);

  const toggleInvestor = (name: string) => {
    setSelectedInvestors(prev => 
      prev.includes(name) 
        ? prev.filter(n => n !== name)
        : [...prev, name]
    );
  };

  const generateStrategy = async () => {
    setIsGenerating(true);
    // Simulate AI strategy generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    const selectedInvestorsData = TOP_INVESTORS.filter(inv => selectedInvestors.includes(inv.name));
    
    const strategy = `Based on the analysis of your selected investors' track records:

1. Portfolio Allocation:
${selectedInvestorsData.map(inv => `- ${inv.specialty}: ${Math.round(100/selectedInvestorsData.length)}%`).join('\n')}

2. Key Strategies:
- Focus on diversification across ${selectedInvestorsData.map(inv => inv.specialty).join(', ')}
- Target annual return: ${(selectedInvestorsData.reduce((acc, inv) => acc + inv.return, 0) / selectedInvestorsData.length).toFixed(1)}%
- Regular portfolio rebalancing every quarter
- Risk management through position sizing

3. Implementation Steps:
- Start with small positions
- Scale gradually based on performance
- Monitor market conditions daily
- Set stop-loss orders for risk management`;

    setStrategy(strategy);
    setIsGenerating(false);
  };

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
              Select your favorite investors to generate a personalized investment strategy based on their track records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Label className="text-lg font-semibold">Select Investors (min 2)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {TOP_INVESTORS.map((investor) => (
                    <div
                      key={investor.name}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedInvestors.includes(investor.name)
                          ? 'bg-primary/10 border-primary'
                          : 'hover:bg-neutral-50'
                      }`}
                      onClick={() => toggleInvestor(investor.name)}
                    >
                      <p className="font-semibold">{investor.name}</p>
                      <p className="text-sm text-neutral-500">{investor.specialty}</p>
                      <p className="text-sm text-success">+{investor.return}% return</p>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={generateStrategy}
                disabled={selectedInvestors.length < 2 || isGenerating}
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