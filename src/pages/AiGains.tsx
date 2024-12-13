import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Brain, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const INVESTMENT_SECTORS = [
  "Tech Stocks",
  "Crypto",
  "Real Estate",
  "Dividend Stocks",
  "Forex Trading",
  "Commodities",
  "ESG Investments",
  "Growth Stocks"
];

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
  const [selectedSector, setSelectedSector] = useState<string>("");
  const [investmentAmount, setInvestmentAmount] = useState<string>("");

  const filteredInvestors = TOP_INVESTORS.filter(
    investor => selectedSector === "" || investor.specialty === selectedSector
  );

  const toggleInvestor = (name: string) => {
    setSelectedInvestors(prev => 
      prev.includes(name) 
        ? prev.filter(n => n !== name)
        : [...prev, name]
    );
  };

  const generateStrategy = async () => {
    if (!selectedSector || !investmentAmount) {
      toast.error("Por favor, selecciona un sector y especifica el monto a invertir");
      return;
    }

    if (selectedInvestors.length < 2) {
      toast.error("Por favor, selecciona al menos 2 inversores");
      return;
    }

    setIsGenerating(true);
    // Simulate AI strategy generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    const selectedInvestorsData = TOP_INVESTORS.filter(inv => selectedInvestors.includes(inv.name));
    
    const strategy = `Estrategia de Inversión Personalizada para ${selectedSector}
Monto a invertir: $${Number(investmentAmount).toLocaleString()}

1. Distribución de la Inversión:
${selectedInvestorsData.map(inv => `- Estrategia de ${inv.name}: $${(Number(investmentAmount) / selectedInvestorsData.length).toLocaleString()} (${Math.round(100/selectedInvestorsData.length)}%)`).join('\n')}

2. Estrategias Clave:
- Sector principal: ${selectedSector}
- Retorno anual objetivo: ${(selectedInvestorsData.reduce((acc, inv) => acc + inv.return, 0) / selectedInvestorsData.length).toFixed(1)}%
- Rebalanceo trimestral del portafolio
- Gestión de riesgo mediante diversificación

3. Pasos de Implementación:
- Comenzar con posiciones pequeñas
- Escalar gradualmente basado en el rendimiento
- Monitoreo diario de condiciones del mercado
- Establecer órdenes de stop-loss para gestión de riesgo

4. Consideraciones Específicas para ${selectedSector}:
${selectedInvestorsData.map(inv => `- ${inv.name}: Enfoque en retornos consistentes (${inv.return}% histórico)`).join('\n')}`;

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
              <CardTitle>Generador de Estrategias de Inversión IA</CardTitle>
            </div>
            <CardDescription>
              Personaliza tu estrategia de inversión basada en expertos del sector
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Sector Selection */}
              <div className="space-y-2">
                <Label>Selecciona el Sector de Inversión</Label>
                <Select
                  value={selectedSector}
                  onValueChange={(value) => {
                    setSelectedSector(value);
                    setSelectedInvestors([]);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {INVESTMENT_SECTORS.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Investment Amount */}
              <div className="space-y-2">
                <Label>Monto a Invertir ($)</Label>
                <Input
                  type="number"
                  placeholder="Ingresa el monto"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                />
              </div>

              {selectedSector && (
                <div>
                  <Label className="text-lg font-semibold">Selecciona Expertos en {selectedSector} (mínimo 2)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {filteredInvestors.map((investor) => (
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
                        <p className="text-sm text-success">+{investor.return}% retorno</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button
                className="w-full"
                size="lg"
                onClick={generateStrategy}
                disabled={!selectedSector || !investmentAmount || selectedInvestors.length < 2 || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generando Estrategia...
                  </>
                ) : (
                  'Generar Estrategia IA'
                )}
              </Button>

              {strategy && (
                <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Estrategia Generada</h3>
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