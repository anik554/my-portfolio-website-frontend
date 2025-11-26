"use client"
import { registerUserAction } from "@/actions/authActions";
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
} from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface RegistrationType {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export function SignupForm({ className,...props }: React.ComponentProps<typeof Card>) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  const onsubmit: SubmitHandler<RegistrationType> = async (
    data: FieldValues
  ) => {
    setLoading(true)
    try {
      const res = await registerUserAction(data)
      console.log(res)
      if(!res.success){
        toast.error(res?.message ? res?.message : "Registration Faild")
      }else{
        toast.success(res?.message ? res?.message : "Registration Successfully")
        router.push("/login")
      }
    } catch (err) {
      console.error(err);
    }
    
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jhon Due" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+880173699999" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              />
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
                      "Register"
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
