import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  bio: z.string().optional(),
});

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      bio: "",
    },
  });

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      // Check if profile exists and is incomplete
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("name, username")
        .eq("user_id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        navigate("/auth");
        return;
      }

      if (profile?.name && profile?.username) {
        navigate("/");
        return;
      }

      setUserId(session.user.id);
    };

    checkSession();
  }, [navigate]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!userId) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          name: values.name,
          username: values.username,
          bio: values.bio || null,
        })
        .eq("user_id", userId);

      if (error) {
        if (error.message.includes("Username already exists")) {
          form.setError("username", { message: "This username is already taken" });
          return;
        }
        throw error;
      }

      toast.success("Profile setup complete!");
      navigate("/");
    } catch (error) {
      console.error("Error setting up profile:", error);
      toast.error("Failed to set up profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!userId) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm border p-8">
        <h1 className="text-2xl font-bold text-center text-primary mb-8">
          Complete Your Profile
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Choose a unique username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Setting up..." : "Complete Setup"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfileSetup;