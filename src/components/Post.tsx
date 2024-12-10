import { ArrowUp, ArrowDown, MessageCircle, Share2, Heart } from "lucide-react";

interface PostProps {
  user: {
    name: string;
    avatar: string;
    username: string;
  };
  content: string;
  investment: {
    type: string;
    name: string;
    return: number;
  };
  timestamp: string;
  likes: number;
  comments: number;
}

export const Post = ({ user, content, investment, timestamp, likes, comments }: PostProps) => {
  return (
    <div className="bg-white rounded-lg border p-4 card-hover">
      <div className="flex items-center space-x-3 mb-3">
        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-sm text-neutral-500">@{user.username} · {timestamp}</p>
        </div>
      </div>
      
      <p className="mb-3">{content}</p>
      
      <div className="bg-neutral-50 rounded-lg p-3 mb-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-neutral-500">{investment.type}</span>
            <h4 className="font-semibold">{investment.name}</h4>
          </div>
          <div className={`flex items-center space-x-1 ${investment.return >= 0 ? 'text-success' : 'text-danger'}`}>
            {investment.return >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            <span className="font-semibold">{Math.abs(investment.return)}%</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-6 text-neutral-500">
        <button className="flex items-center space-x-2 hover:text-primary transition-colors">
          <Heart className="h-4 w-4" />
          <span className="text-sm">{likes}</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-primary transition-colors">
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm">{comments}</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-primary transition-colors">
          <Share2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};