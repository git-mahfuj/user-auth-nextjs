/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (user.name === "" && user.email === "" && user.password === "") {
      setButtonDisabled(true);
      console.log("No user");
    } else {
      setButtonDisabled(false);
    }
  }, [user]);
  const handleSignInInput = async (e: any) => {
    e.preventDefault();
    try {
      if (user.name === "" && user.email === "" && user.password === "") {
        toast.error("Fill All Field");
      }
      const response = await axios.post("/api/signup", user, {});
      if (response) {
        toast.success("User Created Succesfully");
        console.log(user);
        router.push("/users/login");
      } else {
        toast.error("Failed While Creating User");
      }

      return;
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignInInput}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={user.name}
                  onChange={(e) =>
                    setUser({ ...user, name: e.currentTarget.value })
                  }
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={user.email}
                  onChange={(e) =>
                    setUser({ ...user, email: e.currentTarget.value })
                  }
                />
              </Field>
              <Field>
                <Field className="">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.currentTarget.value })
                      }
                    />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" disabled={buttonDisabled}>
                  Create Account
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="#">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
