import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart2, DollarSign, PieChart, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const mockCategories = [
  {
    id: 1,
    name: "Technology",
    count: 156,
    icon: "💻"
  },
  {
    id: 2,
    name: "Finance",
    count: 98,
    icon: "💰"
  },
  {
    id: 3,
    name: "Healthcare",
    count: 75,
    icon: "🏥"
  },
  {
    id: 4,
    name: "Energy",
    count: 64,
    icon: "⚡"
  },
  {
    id: 5,
    name: "Real Estate",
    count: 42,
    icon: "🏠"
  }
];

const mockStats = [
  {
    id: 1,
    title: "Total Investments",
    value: "$2.5M",
    change: "+12.5%",
    isPositive: true,
    icon: DollarSign
  },
  {
    id: 2,
    title: "Active Users",
    value: "1.2K",
    change: "+8.3%",
    isPositive: true,
    icon: BarChart2
  },
  {
    id: 3,
    title: "Average Return",
    value: "7.8%",
    change: "+2.1%",
    isPositive: true,
    icon: TrendingUp
  },
  {
    id: 4,
    title: "Success Rate",
    value: "82%",
    change: "+5.2%",
    isPositive: true,
    icon: PieChart
  }
];

export const LeftSidebar = () => {
  const navigate = useNavigate();

  const handleAiGainsClick = () => {
    navigate('/ai-gains');
  };

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="font-medium">{stat.value}</p>
                  </div>
                </div>
                <span className={`text-sm ${stat.isPositive ? "text-green-500" : "text-red-500"}`}>
                  {stat.change}
                </span>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* AI Gains Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <CardTitle>AI Gains</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Get personalized investment strategies based on your favorite investors' track records and market analysis.
          </p>
          <Button 
            onClick={handleAiGainsClick}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Generate AI Strategy
          </Button>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockCategories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{category.count}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};