import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Session } from "@supabase/supabase-js";

const formSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be less than 50 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers and underscores"
    ),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  bio: z.string().max(160).optional(),
  profilePicture: z.any().optional(),
});

export function ProfileSetup({ session }: { session: Session }) {
  if (!session || !session.user) {
    console.error("Session or user not available.");
    return <div>Loading...</div>; // Handle edge cases where session isn't ready
  }
  const navigate = useNavigate();
  console.log(session);
  const userId = session.user.id;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: "",
      bio: "",
      avatar: "",
    },
  });

  async function uploadProfilePicture(file) {
    const filename = `${userId}/profile-picture/${Date.now()}.jpg`;
    const { data, error } = await supabase.storage
      .from("profile-pictures")
      .upload(filename, file);

    if (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload profile picture.");
      return;
    }

    if (data) {
      const { data } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(filename);

      const publicUrl = data.publicUrl;
      console.log(publicUrl);
      return publicUrl;
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let avatarUrl = "";
      if (values.profilePicture instanceof File) {
        avatarUrl = await uploadProfilePicture(values.profilePicture);
        if (!avatarUrl) {
          return;
        }
      }

      const { error } = await supabase.from("profiles").insert({
        user_id: userId,
        username: values.username,
        name: values.name,
        bio: values.bio || null,
        avatar: avatarUrl,
      });

      if (error) {
        console.error("Error creating profile:", error);
        if (error.message.includes("unique_username")) {
          toast.error("Username already taken. Please choose another one.");
          return;
        }
        toast.error("Error creating profile. Please try again.");
        return;
      }

      toast.success("Profile created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error in profile setup:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio (optional)</FormLabel>
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
            <FormField
              control={form.control}
              name="profilePicture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        field.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Complete Setup
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
