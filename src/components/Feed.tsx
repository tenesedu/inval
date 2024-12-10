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
  {
    user: {
      name: "Elena Rodriguez",
      avatar: "/placeholder.svg",
      username: "elena_realestate",
    },
    content: "Just closed a major real estate deal in Madrid's prime location. The European property market is showing strong signals for 2024. 🏢",
    investment: {
      type: "Real Estate",
      name: "Commercial Property",
      return: 19.2,
    },
    timestamp: "5h ago",
    likes: 189,
    comments: 28,
  },
  {
    user: {
      name: "Hans Weber",
      avatar: "/placeholder.svg",
      username: "hans_dividends",
    },
    content: "Dividend aristocrats continue to prove their worth. My portfolio of high-yield dividend stocks has outperformed the market this quarter. 📈",
    investment: {
      type: "Dividend Stocks",
      name: "DIV Portfolio",
      return: 8.5,
    },
    timestamp: "6h ago",
    likes: 145,
    comments: 23,
  },
  {
    user: {
      name: "Yuki Tanaka",
      avatar: "/placeholder.svg",
      username: "yuki_forex",
    },
    content: "USD/JPY showing interesting patterns. Keep an eye on the Bank of Japan's next move, could be a game changer for forex traders. 💹",
    investment: {
      type: "Forex",
      name: "USD/JPY",
      return: 21.3,
    },
    timestamp: "7h ago",
    likes: 167,
    comments: 39,
  },
  {
    user: {
      name: "Maria Silva",
      avatar: "/placeholder.svg",
      username: "maria_commodities",
    },
    content: "Gold prices reaching new highs. With current global uncertainties, commodities are proving to be a solid hedge. 🥇",
    investment: {
      type: "Commodities",
      name: "GOLD",
      return: 15.8,
    },
    timestamp: "8h ago",
    likes: 198,
    comments: 42,
  }
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