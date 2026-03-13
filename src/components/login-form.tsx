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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loggeduser, setLoggedUser] = useState({
    email: "",
    password: "",
  });
  
  const [btnDisabled, setBtnDisabled] = useState(false);
  const router = useRouter()
  useEffect(() => {
    if (loggeduser.email === "" && loggeduser.password === "") {
      console.log("No Logged User");
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [loggeduser]);

  const handleLoginInput = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", loggeduser, {});
      if (response) {
        toast.success("User Logged In Succesfully");
        console.log(loggeduser);
        router.push("/users/profile")
      } else {
        toast.error("Failed While Login User");
      }

      return;
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="font-semibold text-center font-serif">
            Login to your account
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLoginInput}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={loggeduser.email}
                  onChange={(e) =>
                    setLoggedUser({
                      ...loggeduser,
                      email: e.currentTarget.value,
                    })
                  }
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={loggeduser.password}
                  onChange={(e) =>
                    setLoggedUser({
                      ...loggeduser,
                      password: e.currentTarget.value,
                    })
                  }
                />
              </Field>
              <Field>
                <Button type="submit" disabled={btnDisabled}>
                  Login
                </Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
