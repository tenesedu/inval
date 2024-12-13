import { useParams } from "react-router-dom";
import { Post } from "@/components/Post";
import { TrendingUp, Users, Award } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const MOCK_POSTS = [
  {
    user: {
      name: "Eduardo Fernando",
      avatar: "/placeholder.svg",
      username: "eduardo_fernando",
    },
    content: "Long-term investment strategies have consistently proven their worth. Focus on fundamentals, not market noise. 📈",
    investment: {
      type: "Portfolio Strategy",
      name: "Long-term Growth",
      return: 15.7,
    },
    timestamp: "1d ago",
    likes: 142,
    comments: 28,
  },
  {
    user: {
      name: "Eduardo Fernando",
      avatar: "/placeholder.svg",
      username: "eduardo_fernando",
    },
    content: "Tech sector analysis: AI companies showing strong growth potential for 2024. Keep an eye on semiconductor manufacturers.",
    investment: {
      type: "Tech Stocks",
      name: "AI Sector",
      return: 22.3,
    },
    timestamp: "3d ago",
    likes: 189,
    comments: 45,
  },
];

const Profile = () => {
  const { username } = useParams();
  const user = {
    name: "Eduardo Fernando",
    avatar: "/placeholder.svg",
    username: "eduardo_fernando",
    bio: "Passionate investor focused on long-term growth opportunities.",
    stats: {
      totalReturn: 25.5,
      followers: 1234,
      ranking: 42,
    },
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg border p-6 mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full" />
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-neutral-500">@{user.username}</p>
              <p className="mt-2">{user.bio}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-neutral-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="font-semibold">Total Return</span>
              </div>
              <p className="text-2xl font-bold text-success">+{user.stats.totalReturn}%</p>
            </div>
            <div className="bg-neutral-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-semibold">Followers</span>
              </div>
              <p className="text-2xl font-bold">{user.stats.followers}</p>
            </div>
            <div className="bg-neutral-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="font-semibold">Ranking</span>
              </div>
              <p className="text-2xl font-bold">#{user.stats.ranking}</p>
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