import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react";

const mockPosts = [
  {
    id: 1,
    username: "johndoe",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    content: "Just invested in Tesla. Bullish on their AI and robotics division! 🚀",
    timestamp: "2h ago",
    likes: 245,
    comments: 32,
    shares: 12,
    investment: {
      amount: 5000,
      return: 15.2,
      isPositive: true
    }
  },
  {
    id: 2,
    username: "janedoe",
    name: "Jane Doe",
    avatar: "https://i.pravatar.cc/150?img=2",
    content: "Diversifying my portfolio with some gold ETFs. What do you think about precious metals in the current market?",
    timestamp: "4h ago",
    likes: 189,
    comments: 45,
    shares: 8,
    investment: {
      amount: 10000,
      return: -2.5,
      isPositive: false
    }
  },
  {
    id: 3,
    username: "investorpro",
    name: "Investor Pro",
    avatar: "https://i.pravatar.cc/150?img=3",
    content: "My analysis of the tech sector shows promising growth opportunities in AI and cloud computing. Here's my detailed breakdown...",
    timestamp: "6h ago",
    likes: 432,
    comments: 78,
    shares: 56,
    investment: {
      amount: 25000,
      return: 8.7,
      isPositive: true
    }
  }
];

export const Feed = () => {
  const [posts] = useState(mockPosts);

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center space-x-4">
            <img
              src={post.avatar}
              alt={post.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <CardTitle className="text-lg">{post.name}</CardTitle>
              <p className="text-sm text-muted-foreground">@{post.username} · {post.timestamp}</p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{post.content}</p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <DollarSign className="h-4 w-4" />
                <span>${post.investment.amount.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                {post.investment.isPositive ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={post.investment.isPositive ? "text-green-500" : "text-red-500"}>
                  {post.investment.return}%
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>1 month</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-4 pt-4 border-t">
              <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary">
                <span>{post.likes}</span>
                <span>Likes</span>
              </button>
              <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary">
                <span>{post.comments}</span>
                <span>Comments</span>
              </button>
              <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary">
                <span>{post.shares}</span>
                <span>Shares</span>
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};