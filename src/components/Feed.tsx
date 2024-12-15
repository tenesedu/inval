import { Post } from "./Post";
import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

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
};

const POSTS_PER_PAGE = 5;

export const Feed = () => {
  const { ref, inView } = useInView();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 0 }) => {
      console.log("Fetching posts page:", pageParam);
      const from = Number(pageParam) * POSTS_PER_PAGE;
      const to = from + POSTS_PER_PAGE - 1;

      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          *,
          profiles:profile_id (
            name,
            avatar,
            username
          )
        `
        )
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) {
        console.error("Error fetching posts:", error);
        throw error;
      }

      console.log(data);

      console.log("Posts fetched:", data);
      return data as unknown as PostWithProfile[];
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.length === POSTS_PER_PAGE ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (error) {
    toast.error("Failed to load posts");
    return (
      <div className="text-center p-4 text-red-500">
        Failed to load posts. Please try again later.
      </div>
    );
  }

  if (status === "pending") {
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
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.map((post) => {
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
                  avatar: post.profiles.avatar || "/placeholder.svg",
                  username: post.profiles.username,
                }}
                content={post.content || ""}
                investment={{
                  type: post.investment_type || "",
                  name: post.investment_name || "",
                  return: post.investment_return || 0,
                }}
                timestamp={new Date(post.created_at).toLocaleString()}
                likes={post.likes || 0}
                comments={post.comments || 0}
              />
            );
          })}
        </div>
      ))}

      <div ref={ref} className="h-10">
        {isFetchingNextPage && (
          <div className="text-center p-4">
            <div className="animate-pulse">
              <div className="h-32 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
