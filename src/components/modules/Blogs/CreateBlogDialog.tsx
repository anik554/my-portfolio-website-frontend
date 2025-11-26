/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect} from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IBlogs } from "@/types";
import { getCurrentUser } from "@/app/utils/getCurrentUser";

interface IFormInput {
  title: string;
  thumbnail: string;
  tags: string[];
  content: string;
}

interface Props {
  blog: IBlogs | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => Promise<void>;
}

export function CreateBlogDialog({ blog, open, onOpenChange, onSuccess }: Props) {
  const isEdit = !!blog;

  const form = useForm<IFormInput>({
    defaultValues: {
      title: "",
      thumbnail: "",
      tags: [],
      content: "",
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (open && blog) {
      form.reset({
        title: blog.title ?? "",
        thumbnail: blog.thumbnail ?? "",
        tags: blog.tags ?? [],
        content: blog.content ?? "",
      });
    } else if (open && !blog) {
      form.reset({
        title: "",
        thumbnail: "",
        tags: [],
        content: "",
      });
    }
  }, [open, blog, form]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const user : any = await getCurrentUser();
    try {
      const payload = {
        ...data,
        authorId: user?.id, // adjust if needed
      };

      const url = isEdit
        ? `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blog!.id}`
        : `${process.env.NEXT_PUBLIC_BASE_API}/blog`;

      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      toast.success(isEdit ? "Blog updated!" : "Blog created!");
      await onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>{isEdit ? "Edit Blog" : "Create a Blog"}</DialogTitle>
              <DialogDescription>
                {isEdit ? "Update the blog details." : "Fill up the form to publish a blog post."}
              </DialogDescription>
            </DialogHeader>

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="My First Blog" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Thumbnail */}
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://imageurl.com" type="url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-10 items-center">
                      {field.value.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => {
                              field.onChange(field.value.filter((_, i) => i !== idx));
                            }}
                            className="ml-1 hover:bg-primary/80 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}

                      <input
                        type="text"
                        placeholder={field.value.length === 0 ? "Type tag and press Enter" : ""}
                        className="flex-1 min-w-[120px] outline-none text-sm"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && e.currentTarget.value.trim()) {
                            const newTag = e.currentTarget.value.trim();
                            if (!field.value.includes(newTag)) {
                              field.onChange([...field.value, newTag]);
                            }
                            e.currentTarget.value = "";
                            e.preventDefault();
                          }
                          if (e.key === "Backspace" && !e.currentTarget.value && field.value.length) {
                            field.onChange(field.value.slice(0, -1));
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your blog..." rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">{isEdit ? "Update" : "Create"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}