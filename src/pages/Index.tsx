import { Navbar } from "@/components/Navbar";
import { Feed } from "@/components/Feed";
import { TrendingUp, Users, Award } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="hidden md:block md:col-span-3">
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
          </div>
          
          {/* Main Feed */}
          <div className="md:col-span-6">
            <Feed />
          </div>
          
          {/* Right Sidebar */}
          <div className="hidden md:block md:col-span-3">
            <div className="bg-white rounded-lg border p-4">
              <h2 className="font-heading text-lg font-semibold mb-4">Top Investors</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <img src="/placeholder.svg" alt="User" className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-semibold">Investor #{i}</p>
                      <p className="text-sm text-success">+{30 - i * 5}% return</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;