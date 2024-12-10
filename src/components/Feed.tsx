import { Post } from "./Post";

const MOCK_POSTS = [
  {
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      username: "sarahj_invest",
    },
    content: "Just increased my position in Tesla after analyzing their latest earnings report. The growth potential in their energy division is often overlooked. 🚀",
    investment: {
      type: "Stocks",
      name: "TSLA",
      return: 12.5,
    },
    timestamp: "2h ago",
    likes: 234,
    comments: 45,
  },
  {
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg",
      username: "mchen_crypto",
    },
    content: "Bitcoin breaking key resistance levels. Technical analysis suggests we might see $50k soon. NFA.",
    investment: {
      type: "Crypto",
      name: "BTC",
      return: -3.2,
    },
    timestamp: "4h ago",
    likes: 156,
    comments: 32,
  },
];

export const Feed = () => {
  return (
    <div className="space-y-4">
      {MOCK_POSTS.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  );
};