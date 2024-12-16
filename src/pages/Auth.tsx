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
        navigate("/");
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          console.log("User signed in:", session.user.id);
          
          try {
            // First check if a profile already exists
            const { data: existingProfile } = await supabase
              .from("profiles")
              .select("id")
              .eq("user_id", session.user.id)
              .maybeSingle();

            if (!existingProfile) {
              // Create complete profile record
              const { error: insertError } = await supabase
                .from("profiles")
                .insert({
                  id: crypto.randomUUID(),
                  user_id: session.user.id,
                  name: session.user.email?.split('@')[0] || 'User',
                  username: `user_${session.user.id.split('-')[0]}`,
                  created_at: new Date().toISOString()
                });

              if (insertError) {
                console.error("Error creating profile:", insertError);
                toast.error("Failed to create profile. Please try again.");
                return;
              }

              console.log("Profile created successfully");
            } else {
              console.log("Profile already exists");
            }
            
            navigate("/");
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