import { TrendingUp, Users, Award, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const LeftSidebar = () => {
  const navigate = useNavigate();

  const handleAiGainsClick = () => {
    navigate('/ai-gains');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border p-4">
        <h2 className="font-heading text-lg font-semibold mb-4">Quick Stats</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Total Return</p>
              <p className="font-semibold text-success">+24.5%</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Followers</p>
              <p className="font-semibold">1,234</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Ranking</p>
              <p className="font-semibold">#42</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-lg font-semibold">AI Gains</h2>
          </div>
        </div>
        <p className="text-sm text-neutral-500 mb-4">
          Get personalized investment strategies based on your favorite investors' track records.
        </p>
        <Button 
          onClick={handleAiGainsClick}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Generate AI Strategy
        </Button>
      </div>
    </div>
  );
};