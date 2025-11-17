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
import { IUser } from "@/types";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface Props {
  user: IUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => Promise<void>;
}

export function UserCreateModal({
  user,
  open,
  onOpenChange,
  onSuccess,
}: Props) {
  const isEdit = !!user;

  const form = useForm<IFormInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (open && user) {
      form.reset({
        name: user.name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
      });
    } else if (open && !user) {
      form.reset({
        name: "",
        email: "",
        password: "",
        phone: "",
      });
    }
  }, [open, form, user]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const payload = {
        ...data,
        authorId: 2, // adjust if needed
      };

      const url = isEdit
        ? `${process.env.NEXT_PUBLIC_BASE_API}/user/${user!.id}`
        : `${process.env.NEXT_PUBLIC_BASE_API}/user`;

      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      toast.success(isEdit ? "User updated!" : "User created!");
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
                {isEdit ? "Edit User Info" : "Create a User"}
              </DialogTitle>
              <DialogDescription>
                {isEdit
                  ? "Update the user details."
                  : "Fill up the form to create a user registration."}
              </DialogDescription>
            </DialogHeader>

            {/* Title */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Anik Imtiaz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Thumbnail */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="abc@gmail.com"
                      type="email"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="*******" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your Valid Phone Number..."
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
