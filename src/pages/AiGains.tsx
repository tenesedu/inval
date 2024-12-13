import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Brain, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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

    try {
      setIsGenerating(true);
      console.log("Generating strategy for:", {
        sector: selectedSector,
        amount: investmentAmount,
        investors: selectedInvestors
      });

      // Obtener los datos de los inversores seleccionados
      const selectedInvestorsData = TOP_INVESTORS.filter(inv => selectedInvestors.includes(inv.name));
      
      // Calcular el retorno promedio
      const averageReturn = selectedInvestorsData.reduce((acc, inv) => acc + inv.return, 0) / selectedInvestorsData.length;
      
      // Calcular la distribución del monto por inversor
      const amountPerInvestor = Number(investmentAmount) / selectedInvestorsData.length;

      // Generar recomendaciones específicas basadas en el sector
      const sectorSpecificAdvice = getSectorSpecificAdvice(selectedSector);

      // Construir la estrategia
      const strategyText = `Estrategia de Inversión Personalizada para ${selectedSector}
Monto total a invertir: $${Number(investmentAmount).toLocaleString()}

1. Distribución de la Inversión:
${selectedInvestorsData.map(inv => 
  `- Siguiendo estrategia de ${inv.name}: $${amountPerInvestor.toLocaleString()} (${Math.round(100/selectedInvestorsData.length)}%)`
).join('\n')}

2. Métricas Clave:
- Sector principal: ${selectedSector}
- Retorno anual objetivo: ${averageReturn.toFixed(1)}%
- Número de estrategias combinadas: ${selectedInvestorsData.length}
- Diversificación por estrategia: ${(100/selectedInvestorsData.length).toFixed(1)}%

3. Plan de Implementación:
${sectorSpecificAdvice}

4. Gestión de Riesgo:
- Establecer stop-loss en -8% para proteger el capital
- Rebalanceo trimestral del portafolio
- Diversificación entre diferentes activos dentro del sector
- Monitoreo diario de las condiciones del mercado

5. Desglose por Estrategia:
${selectedInvestorsData.map(inv => 
  `- ${inv.name}:
   • Especialidad: ${inv.specialty}
   • Retorno histórico: ${inv.return}%
   • Monto asignado: $${amountPerInvestor.toLocaleString()}`
).join('\n')}

6. Próximos Pasos:
1. Realizar due diligence de cada activo antes de invertir
2. Implementar las posiciones gradualmente (DCA)
3. Configurar alertas de precio para monitoreo
4. Revisar la estrategia mensualmente`;

      setStrategy(strategyText);
      toast.success("Estrategia generada exitosamente");

    } catch (error) {
      console.error("Error generating strategy:", error);
      toast.error("Error al generar la estrategia");
    } finally {
      setIsGenerating(false);
    }
  };

  const getSectorSpecificAdvice = (sector: string): string => {
    const adviceMap: { [key: string]: string } = {
      "Tech Stocks": `- Enfoque en empresas con fuerte inversión en I+D
- Análisis de ventajas competitivas y barreras de entrada
- Evaluación de métricas de crecimiento y márgenes
- Consideración de tendencias tecnológicas emergentes`,
      
      "Crypto": `- Implementación de estrategia DCA (Dollar Cost Averaging)
- Almacenamiento seguro en wallets frías
- Diversificación entre diferentes blockchains
- Análisis de fundamentales y casos de uso`,
      
      "Real Estate": `- Análisis de ubicaciones premium y emergentes
- Evaluación de rendimiento por alquiler vs. apreciación
- Consideración de costos de mantenimiento y gestión
- Diversificación entre propiedades comerciales y residenciales`,
      
      "Dividend Stocks": `- Enfoque en empresas con historial de dividendos crecientes
- Análisis de ratios de payout y cobertura
- Evaluación de la salud financiera y flujo de caja
- Diversificación entre sectores defensivos`,
      
      "Forex Trading": `- Implementación de gestión estricta del riesgo
- Análisis técnico y fundamental combinado
- Monitoreo de eventos macroeconómicos
- Uso de stops y límites de pérdida`,
      
      "Commodities": `- Análisis de ciclos económicos y demanda global
- Diversificación entre diferentes materias primas
- Consideración de costos de almacenamiento y roll
- Evaluación de impacto geopolítico`,
      
      "ESG Investments": `- Evaluación de métricas de sostenibilidad
- Análisis de políticas corporativas y gobierno
- Consideración de regulaciones ambientales
- Monitoreo de tendencias sociales`,
      
      "Growth Stocks": `- Análisis de métricas de crecimiento y escalabilidad
- Evaluación de ventajas competitivas
- Consideración de valoraciones y múltiplos
- Monitoreo de hitos de crecimiento`
    };

    return adviceMap[sector] || `- Análisis fundamental del sector
- Evaluación de riesgos específicos
- Monitoreo de tendencias del mercado
- Implementación gradual de posiciones`;
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