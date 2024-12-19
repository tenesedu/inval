import { useParams } from "react-router-dom";
import { Post } from "@/components/Post";
import { TrendingUp, Users, Award } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const Profile = () => {
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) throw userError;

        // Fetch user profile from 'profiles' table
        const { data: userProfile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (profileError) throw profileError;

        // Set fetched profile
        setProfile(userProfile);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Early return if loading or error
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // If no profile is found, display a message
  if (!profile) return <p>No profile found</p>;

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg border p-6 mb-6">
          <div className="flex items-center space-x-4 mb-6">
            {/* Check if profile is loaded before accessing avatar */}
            <img
              src={profile.avatar || "/placeholder.svg"} // Use a default avatar if not available
              alt={profile.name}
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-neutral-500">@{profile.username}</p>
              <p className="mt-2">{profile.bio}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-neutral-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="font-semibold">Total Return</span>
              </div>
              <p className="text-2xl font-bold text-success">
                {/* Example: {user.stats.totalReturn}% */}
              </p>
            </div>
            <div className="bg-neutral-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-semibold">Followers</span>
              </div>
              {/* Example: {user.stats.followers} */}
            </div>
            <div className="bg-neutral-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="font-semibold">Ranking</span>
              </div>
              {/* Example: #{user.stats.ranking} */}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Investment History</h2>
          {/* {MOCK_POSTS.map((post, index) => (
            <Post key={index} {...post} />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
