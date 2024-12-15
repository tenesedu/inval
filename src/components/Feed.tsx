import { Post } from "./Post";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Feed = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      console.log('Fetching posts...');
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:profile_id (
            name,
            avatar,
            username
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        throw error;
      }

      console.log('Posts fetched:', data);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts?.map((post) => (
        <Post
          key={post.id}
          user={{
            name: post.profiles.name,
            avatar: post.profiles.avatar,
            username: post.profiles.username,
          }}
          content={post.content}
          investment={{
            type: post.investment_type,
            name: post.investment_name,
            return: post.investment_return,
          }}
          timestamp={new Date(post.created_at).toLocaleString()}
          likes={post.likes}
          comments={post.comments}
        />
      ))}
    </div>
  );
};