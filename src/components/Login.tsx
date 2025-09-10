"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Label } from "./ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BtnLoader from "./BtnLoader";
import { useDispatch } from "react-redux";
import { authLogin } from "@/redux/features/authSlice";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch()


  const onSubmit = async (data: LoginFormData) => {
    console.log("Login Data:", data);
    // Handle login submission, e.g., send data to an API
    setLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(res)
      if (!res.ok) {
        throw new Error("Login failed");
      }
      
      const responseData = await res.json();
      console.log(responseData);
      dispatch(authLogin(responseData))
      
      switch (responseData.user.role) {
        case "admin":
          router.push("/admin");
          break;
        case "employee":
          router.push("/employee");
          break;
        default:
          router.push("/");
          break;
      }
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <Card className="w-full max-w-md shadow-lg rounded-2xl border-none">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Login to your account
        </CardTitle>
        <CardDescription className="text-center">
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              className="rounded-xl"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              className="rounded-xl"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 p-6 pt-6">
          <Button className="w-full rounded-full" type="submit">
            {loading ? <BtnLoader/> : "Login"}
          </Button>
          <p className="text-center text-secondary text-base">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="hover:text-primary">
              Register here.
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
