"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface IFormInput {
  title: string;
  thumbnail: string;
  tags: string[];
  content: string;
}

export function CreateBlogDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter(); 
  const form = useForm<IFormInput>({
    defaultValues: {
      title: "",
      thumbnail: "",
      tags: [],
      content: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const payload = {
        ...data,
        authorId: 1,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/blog`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        toast.error("Failed to create blog");
        return;
      }

      toast.success("New Blog Created Successfully");

      // Close dialog + reset form
      setOpen(false);
      form.reset();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="default">Create Blog</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <DialogHeader>
              <DialogTitle>Create a Blog</DialogTitle>
              <DialogDescription>
                Fill up the form to publish a blog post.
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
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://imageurl.com"
                      type="url"
                      {...field}
                    />
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
                      {field.value.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => {
                              const newTags = field.value.filter(
                                (_, i) => i !== index
                              );
                              field.onChange(newTags);
                            }}
                            className="ml-1 hover:bg-primary/80 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}

                      <input
                        type="text"
                        placeholder={
                          field.value.length === 0
                            ? "Type tag and press Enter"
                            : ""
                        }
                        className="flex-1 min-w-[120px] outline-none text-sm"
                        onKeyDown={(e) => {
                          if (
                            e.key === "Enter" &&
                            e.currentTarget.value.trim()
                          ) {
                            const newTag = e.currentTarget.value.trim();
                            if (!field.value.includes(newTag)) {
                              field.onChange([...field.value, newTag]);
                            }
                            e.currentTarget.value = "";
                            e.preventDefault();
                          }

                          if (
                            e.key === "Backspace" &&
                            !e.currentTarget.value &&
                            field.value.length > 0
                          ) {
                            field.onChange(
                              field.value.slice(0, -1)
                            );
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
                    <Textarea
                      placeholder="Describe your blog..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
