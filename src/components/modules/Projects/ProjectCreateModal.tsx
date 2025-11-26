/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
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
import { IProjects } from "@/types";
import { X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { getCurrentUser } from "@/app/utils/getCurrentUser";

interface IFormInput {
  title: string;
  thumbnail: string;
  description: string;
  repoLink: string;
  liveLink: string;
  features: string[];
  technologies: string[];
}

interface Props {
  project: IProjects | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => Promise<void>;
}

export function ProjectCreateModal({
  project,
  open,
  onOpenChange,
  onSuccess,
}: Props) {
  const isEdit = !!project;

  const form = useForm<IFormInput>({
    defaultValues: {
      title: "",
      thumbnail: "",
      description: "",
      repoLink: "",
      liveLink: "",
      features: [],
      technologies: [],
    },
  });

  useEffect(() => {
    if (open && project) {
      form.reset({
        title: project.title ?? "",
        thumbnail: project.thumbnail ?? "",
        description: project.description ?? "",
        repoLink: project.repoLink ?? "",
        liveLink: project.liveLink ?? "",
        features: project.features ?? [],
        technologies: project.technologies ?? [],
      });
    } else if (open && !project) {
      form.reset({
        title: "",
        thumbnail: "",
        description: "",
        repoLink: "",
        liveLink: "",
        features: [],
        technologies: [],
      });
    }
  }, [open, form, project]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const user : any = await getCurrentUser();
    try {
      const payload = {
        ...data,
        authorId: user?.id, // adjust if needed
      };

      const url = isEdit
        ? `${process.env.NEXT_PUBLIC_BASE_API}/project/${project!.id}`
        : `${process.env.NEXT_PUBLIC_BASE_API}/project`;

      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      toast.success(isEdit ? "Project updated!" : "Project created!");
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
              <DialogTitle>
                {isEdit ? "Edit Project Info" : "Create a Project"}
              </DialogTitle>
              <DialogDescription>
                {isEdit
                  ? "Update the project details."
                  : "Fill up the form to create a project details."}
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
                    <Input
                      placeholder="Hospital Automation System"
                      {...field}
                    />
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
                      placeholder="http://thumbnail.com"
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
              name="repoLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repo Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="http://repolink.com"
                      type="url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content */}
            <FormField
              control={form.control}
              name="liveLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Live Link</FormLabel>
                  <FormControl>
                    <Input placeholder="http://liveLink.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features (Type tag and press Enter)</FormLabel>
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
                              field.onChange(
                                field.value.filter((_, i) => i !== idx)
                              );
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
                            field.value.length
                          ) {
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
            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies (Type tag and press Enter)</FormLabel>
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
                              field.onChange(
                                field.value.filter((_, i) => i !== idx)
                              );
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
                            field.value.length
                          ) {
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your project..."
                      rows={5}
                      {...field}
                    />
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
