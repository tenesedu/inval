import { Post } from "./Post";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type PostWithProfile = {
  id: string;
  content: string | null;
  investment_type: string | null;
  investment_name: string | null;
  investment_return: number | null;
  likes: number | null;
  comments: number | null;
  created_at: string;
  profiles: {
    name: string;
    avatar: string | null;
    username: string;
  } | null;
}

export const Feed = () => {
  const { data: posts, isLoading, error } = useQuery({
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
      return data as PostWithProfile[];
    },
  });

  if (error) {
    toast.error("Failed to load posts");
    return (
      <div className="text-center p-4 text-red-500">
        Failed to load posts. Please try again later.
      </div>
    );
  }

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
      {posts?.map((post) => {
        // Skip posts with missing profile data
        if (!post.profiles) {
          console.warn(`Post ${post.id} has missing profile data`);
          return null;
        }

        return (
          <Post
            key={post.id}
            user={{
              name: post.profiles.name,
              avatar: post.profiles.avatar || '/placeholder.svg',
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
        );
      })}
    </div>
  );
};