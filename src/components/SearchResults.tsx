import { Post } from "./Post";

interface SearchResult {
  id: string;
  content: string;
  investment_type: string;
  investment_name: string;
  investment_return: number;
  likes: number;
  comments: number;
  created_at: string;
  user_id: string;
  user_name: string;
  user_username: string;
  user_avatar: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
}

export const SearchResults = ({ results, isLoading }: SearchResultsProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p>Searching...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8">
        <p>No results found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <Post
          key={result.id}
          user={{
            name: result.user_name,
            avatar: result.user_avatar,
            username: result.user_username,
          }}
          content={result.content}
          investment={{
            type: result.investment_type,
            name: result.investment_name,
            return: result.investment_return,
          }}
          timestamp={new Date(result.created_at).toLocaleDateString()}
          likes={result.likes}
          comments={result.comments}
        />
      ))}
    </div>
  );
};