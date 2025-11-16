"use client";
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
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Controller, FieldValues, Form, SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  title: string;
  thumbnail: string;
  tags: string[];
  content: string;
}

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => (
    <p className="text-sm text-muted-foreground">Loading editor...</p>
  ),
});

export function CreateBlogDialog() {
  const [content, setContent] = useState<string | undefined>("");
  const form = useForm<IFormInput>({
    defaultValues: {
      title: "",
      thumbnail: "",
      tags: [],
      content: "",
    },
  });

const onSubmit: SubmitHandler<FieldValues> = async (data) => {

}

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="default">Create Blog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a Blog</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              id="add-division"
              className="space-y-3"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField  control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Tour Title</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )} />

            </form>
          </Form>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title-1">Title</Label>
              <Input id="title-1" name="title" placeholder="My First Blog" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="thumbnail-1">Thumbnail</Label>
              <Input
                id="thumbnail-1"
                name="thumbnail"
                type="url"
                placeholder="https://image-url.com"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tags-1">Tags</Label>
              <Input
                id="tags-1"
                name="tags"
                placeholder="React, NodeJs, Mongodb"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content-1">Content</Label>
              <div data-color-mode="light">
                <MDEditor
                  id="content-1"
                  value={content}
                  onChange={setContent}
                  preview="edit"
                  height={300}
                  textareaProps={{
                    placeholder: "Write your blog post in **Markdown**...",
                  }}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
