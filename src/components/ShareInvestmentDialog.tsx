import { useState } from "react";
import { Share } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const ShareInvestmentDialog = () => {
  const [investment, setInvestment] = useState("");
  const [description, setDescription] = useState("");

  const handleShare = () => {
    if (!investment || !description) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Here you would typically send this to your backend
    console.log("Sharing investment:", { investment, description });
    toast.success("Investment shared successfully!");
    setInvestment("");
    setDescription("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="default"
          size="sm"
          className="flex items-center gap-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
        >
          <Share className="h-4 w-4" />
          Share Investment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Investment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <label htmlFor="investment" className="text-sm font-medium">
              Investment Name/Symbol
            </label>
            <Input
              id="investment"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              placeholder="e.g., AAPL, Bitcoin, Real Estate"
            />
          </div>
          <div>
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Share your thoughts about this investment..."
              rows={4}
            />
          </div>
          <Button onClick={handleShare} className="w-full">
            Share
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};