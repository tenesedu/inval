import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, TrendingDown } from "lucide-react";

const mockTrendingInvestments = [
  {
    id: 1,
    name: "Tesla",
    symbol: "TSLA",
    change: 8.5,
    isPositive: true
  },
  {
    id: 2,
    name: "Apple",
    symbol: "AAPL",
    change: -2.3,
    isPositive: false
  },
  {
    id: 3,
    name: "Amazon",
    symbol: "AMZN",
    change: 5.7,
    isPositive: true
  },
  {
    id: 4,
    name: "Microsoft",
    symbol: "MSFT",
    change: 3.2,
    isPositive: true
  },
  {
    id: 5,
    name: "Google",
    symbol: "GOOGL",
    change: -1.8,
    isPositive: false
  }
];

const mockPopularUsers = [
  {
    id: 1,
    name: "Warren Buffett",
    username: "warrenbuffett",
    avatar: "https://i.pravatar.cc/150?img=4",
    followers: "2.3M",
    isFollowing: false
  },
  {
    id: 2,
    name: "Cathie Wood",
    username: "cathiewood",
    avatar: "https://i.pravatar.cc/150?img=5",
    followers: "1.8M",
    isFollowing: true
  },
  {
    id: 3,
    name: "Ray Dalio",
    username: "raydalio",
    avatar: "https://i.pravatar.cc/150?img=6",
    followers: "1.5M",
    isFollowing: false
  }
];

export const RightSidebar = () => {
  return (
    <div className="space-y-6">
      {/* Trending Investments */}
      <Card>
        <CardHeader>
          <CardTitle>Trending Investments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockTrendingInvestments.map((investment) => (
            <div key={investment.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{investment.name}</p>
                <p className="text-sm text-muted-foreground">{investment.symbol}</p>
              </div>
              <div className="flex items-center space-x-1">
                {investment.isPositive ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={investment.isPositive ? "text-green-500" : "text-red-500"}>
                  {investment.change}%
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Popular Users */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Investors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockPopularUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">@{user.username}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{user.followers}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};