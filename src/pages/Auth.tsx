import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { toast } from "sonner";
import { ProfileSetup } from "@/components/ProfileSetup";

const Auth = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [needsProfile, setNeedsProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        console.log("Checking user session...");
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Session error:", error);
          setIsLoading(false);
          return;
        }

        if (session) {
          console.log("User session found:", session.user.id);
          setSession(session);

          // Check if user has a profile
          const { data: profiles, error: profileError } = await supabase
            .from("profiles")
            .select("id")
            .eq("user_id", session.user.id)
            .single();

          if (profileError && profileError.code !== "PGRST116") {
            console.error("Error checking profile:", profileError);
            toast.error("Error checking profile status");
            setIsLoading(false);
            return;
          }

          if (!profiles) {
            console.log("User needs to create profile");
            setNeedsProfile(true);
          } else {
            console.log("User has profile, redirecting to home");
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Error in checkUser:", error);
        toast.error("An error occurred while checking user status");
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);

      if (event === "SIGNED_IN" && session) {
        setSession(session);

        try {
          // Check if user has a profile
          const { data: profiles, error: profileError } = await supabase
            .from("profiles")
            .select("id")
            .eq("user_id", session.user.id)
            .single();

          if (profileError && profileError.code !== "PGRST116") {
            console.error("Error checking profile:", profileError);
            toast.error("Error checking profile status");
            return;
          }

          if (!profiles) {
            console.log("New user needs to create profile");
            setNeedsProfile(true);
          } else {
            console.log("User has profile, redirecting to home");
            navigate("/");
          }
        } catch (error) {
          console.error("Error checking profile after sign in:", error);
          toast.error("Error checking profile status");
        }
      } else if (event === "SIGNED_OUT") {
        setSession(null);
        setNeedsProfile(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="text-primary">Loading...</div>
      </div>
    );
  }

  if (needsProfile && session) {
    return <ProfileSetup session={session} />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm border p-8">
        <h1 className="text-2xl font-bold text-center text-primary mb-8">
          Welcome to Inval
        </h1>
        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#6E59A5",
                  brandAccent: "#4A3B80",
                },
              },
            },
          }}
          providers={[]}
        />
      </div>
    </div>
  );
};

export default Auth;
