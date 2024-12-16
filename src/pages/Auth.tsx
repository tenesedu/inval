import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("name, username")
          .eq("user_id", session.user.id)
          .single();

        if (profile?.name && profile?.username) {
          navigate("/");
        } else {
          navigate("/profile-setup");
        }
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          console.log("User signed in:", session.user.id);
          
          try {
            // Create initial profile record with just the user_id
            const { error: insertError } = await supabase
              .from("profiles")
              .insert({
                id: session.user.id, // Use the auth.users id as the profile id
                user_id: session.user.id,
                name: '',
                username: '',
                created_at: new Date().toISOString()
              });

            if (insertError) {
              console.error("Error creating profile:", insertError);
              toast.error("Failed to create profile. Please try again.");
              return;
            }

            console.log("Profile created successfully");
            navigate("/profile-setup");
          } catch (error) {
            console.error("Unexpected error:", error);
            toast.error("An unexpected error occurred. Please try again.");
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

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
                  brand: '#6E59A5',
                  brandAccent: '#4A3B80',
                }
              }
            }
          }}
          providers={[]}
        />
      </div>
    </div>
  );
};

export default Auth;