"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import BtnLoader from "./BtnLoader";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { registerUser, verifyUser } from "@/redux/features/authSlice";
import { ArrowLeft } from "lucide-react";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  // role: string;
  otp: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      // role: "employee",
      otp: "",
    },
  });
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSendOtp = async (data: RegisterFormData) => {
    setSendingOtp(true);
    dispatch(registerUser(data) as any)
      .unwrap()
      .then((res: any) => {
        // console.log("register res", res)
        if (res.success) {
          setOtpSent(true);
        }
      })
      .catch((err: any) => {
        // console.log("register err", err);
      })
      .finally(() => {
        setSendingOtp(false);
      });
  };

  const handleVerifyOtp = async (data: RegisterFormData) => {
    setLoading(true);
    dispatch(verifyUser({ email: data.email, otp: data.otp }) as any)
      .unwrap()
      .then((res: any) => {
        // console.log("register res", res)
        if (res.success) {
          router.push("/auth/login");
        }
      })
      .catch((err: any) => {
        console.error("register err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Card className="w-full max-w-md shadow-lg rounded-2xl border-none">
      {otpSent ? (
        <>
          <CardHeader className="relative">
            <CardTitle className="text-2xl text-center">
              Verify your account
            </CardTitle>
            <CardDescription className="text-center">
              Enter Otp sent to your email to verify your account.
            </CardDescription>
            <Button
              className="absolute -top-18 -left-0 rounded-full cursor-pointer"
              onClick={() => setOtpSent(false)}
            >
              <ArrowLeft />{" "}
            </Button>
          </CardHeader>
          <form onSubmit={handleSubmit(handleVerifyOtp)}>
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
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter otp sent to your email"
                  className="rounded-xl"
                  {...register("otp", { required: "OTP is required" })}
                />
                {errors.otp && (
                  <p className="text-sm text-red-500">{errors.otp.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 p-6 pt-6">
              <Button
                className="w-full rounded-full cursor-pointer"
                type="submit"
              >
                {loading ? <BtnLoader /> : "Varify"}
              </Button>
            </CardFooter>
          </form>
        </>
      ) : (
        <>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Create a new account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your details to create an account.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(handleSendOtp)}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  className="rounded-xl"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

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
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="123-456-7890"
                  className="rounded-xl"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              {/* <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <div className="flex flex-row space-x-4">
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <Label htmlFor="role-user" className="cursor-pointer">
                      <Input
                        type="radio"
                        id="role-user"
                        value="user"
                        {...register("role")}
                        defaultChecked={watch("role") === "user"}
                        className="mr-1 shadow-none"
                      />
                      User
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <Label htmlFor="role-admin" className="cursor-pointer">
                      <Input
                        type="radio"
                        id="role-admin"
                        value="admin"
                        {...register("role")}
                        defaultChecked={watch("role") === "admin"}
                        className="mr-1 shadow-none"
                      />
                      Admin
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <Label htmlFor="role-employee" className="cursor-pointer">
                      <Input
                        type="radio"
                        id="role-employee"
                        value="employee"
                        {...register("role")}
                        defaultChecked={watch("role") === "employee"}
                        className="mr-1 shadow-none"
                      />
                      Employee
                    </Label>
                  </div>
                </div>
              </div> */}
            </CardContent>
            <CardFooter className="flex flex-col gap-4 p-6 pt-6">
              <Button
                className="w-full rounded-full cursor-pointer"
                type="submit"
              >
                {sendingOtp ? <BtnLoader /> : "Register"}
              </Button>
              <p className="text-center text-secondary text-base">
                Have an account?{" "}
                <Link href="/auth/login" className="hover:text-primary">
                  Login here.
                </Link>
              </p>
            </CardFooter>
          </form>
        </>
      )}
    </Card>
  );
}
