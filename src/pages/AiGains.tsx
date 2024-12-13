import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { InvestmentSectorSelect } from "@/components/ai-gains/InvestmentSectorSelect";
import { InvestmentAmountInput } from "@/components/ai-gains/InvestmentAmountInput";
import { ExpertsList } from "@/components/ai-gains/ExpertsList";
import { TOP_INVESTORS } from "@/components/ai-gains/constants";

const AiGains = () => {
  const [selectedInvestors, setSelectedInvestors] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [strategy, setStrategy] = useState<string | null>(null);
  const [selectedSector, setSelectedSector] = useState<string>("");
  const [investmentAmount, setInvestmentAmount] = useState<string>("");

  const toggleInvestor = (name: string) => {
    setSelectedInvestors(prev => 
      prev.includes(name) 
        ? prev.filter(n => n !== name)
        : [...prev, name]
    );
  };

  const generateStrategy = async () => {
    if (!selectedSector || !investmentAmount) {
      toast.error("Please select a sector and specify the investment amount");
      return;
    }

    if (selectedInvestors.length < 2) {
      toast.error("Please select at least 2 investors");
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
                onSectorChange={setSelectedSector}
              />

              <InvestmentAmountInput
                value={investmentAmount}
                onChange={setInvestmentAmount}
              />

              {selectedSector && (
                <ExpertsList
                  selectedSector={selectedSector}
                  selectedInvestors={selectedInvestors}
                  onToggleInvestor={toggleInvestor}
                />
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
