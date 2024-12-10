import { useParams } from "react-router-dom";
import { Post } from "@/components/Post";
import { TrendingUp, Users, Award } from "lucide-react";

const MOCK_POSTS = [
  {
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      username: "sarahj",
    },
    content: "Just increased my position in tech stocks. The AI sector is showing strong growth potential.",
    investment: {
      type: "Tech Stocks",
      name: "NVDA",
      return: 45.2,
    },
    timestamp: "2h ago",
    likes: 234,
    comments: 18,
  },
  {
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      username: "sarahj",
    },
    content: "My analysis suggests a bullish trend in semiconductor stocks for Q2 2024.",
    investment: {
      type: "Tech Analysis",
      name: "Semiconductor Sector",
      return: 28.5,
    },
    timestamp: "1d ago",
    likes: 189,
    comments: 24,
  },
];

const Profile = () => {
  const { username } = useParams();
  // In a real app, we would fetch the user data based on the username
  const user = {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg",
    username: "sarahj",
    country: "USA",
    specialty: "Tech Stocks",
    return: 25.5,
    followers: 1234,
    following: 321,
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg border p-6 mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full" />
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-neutral-500">@{user.username}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm">{user.country}</span>
                <span className="text-sm text-success">+{user.return}% return</span>
                <span className="text-sm">{user.specialty}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-neutral-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="font-semibold">Total Return</span>
              </div>
              <p className="text-2xl font-bold text-success">+{user.return}%</p>
            </div>
            <div className="bg-neutral-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-semibold">Followers</span>
              </div>
              <p className="text-2xl font-bold">{user.followers}</p>
            </div>
            <div className="bg-neutral-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="font-semibold">Following</span>
              </div>
              <p className="text-2xl font-bold">{user.following}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Investment History</h2>
          {MOCK_POSTS.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;