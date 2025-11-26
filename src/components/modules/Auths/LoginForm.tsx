"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUser } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { login } from "@/actions/authActions";

interface UserTypes {
  email: string;
  password: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const route = useRouter();
  const form = useForm<UserTypes>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);

const onsubmit: SubmitHandler<UserTypes> = async (data) => {
  try {
    setLoading(true);
    const res = await login(data);

    if (res.success) {
      toast.success("Logged in successfully");
      route.push("/dashboard"); // only redirect ONCE (client-side)
    } else {
      toast.error(res.message || "Login failed");
    }
  } catch (error) {
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter User Email"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter User Password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FieldGroup>
                <Field>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Spinner /> Loading...
                      </div>
                    ) : (
                      "Login"
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() =>
                      signIn("google", {
                        callbackUrl: "/dashboard",
                      })
                    }
                  >
                    Login with Google
                  </Button>

                  <FieldDescription className="text-center">
                    Don&apos;t have an account?{" "}
                    <Link href="/register">Sign up</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
