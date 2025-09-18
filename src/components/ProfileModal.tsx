"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { CheckCheck, Phone, Plus, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateProfile } from "@/redux/features/authSlice";

// Define the form data structure
interface ProfileFormInputs {
  name: string;
  email: string;
  phone: string;
}

const ProfileModal = ({ close }: { close: () => void }) => {
  const [profileImage, setProfileImage] = useState<string | null>(
    "/images/profile_picture.jpg"
  );
   const { userData, isAutheticated } = useSelector(
      (state: RootState) => state.auth
    );
    const dispatch = useDispatch()


  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormInputs>({
    defaultValues: {
      name: userData?.name,
      email: userData?.email,
      phone: userData?.phone
    },
  });

  const initials = userData?.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const handleProfileUpdate = (data: ProfileFormInputs) => {
    console.log("Form Data Submitted:", data);
    console.log("New Profile Image:", profileImage);
    dispatch(updateProfile({...userData, ...data,}))
    // close();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-secondary/50 z-50 flex items-center justify-center backdrop-blur-[6px]">
      <div className="w-[90vw] md:w-[60vw] lg:w-[40vw] bg-card rounded-3xl px-8 py-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Profile Info</h2>
          <Button
            className="text-black hover:bg-orange-600 rounded-full p-2 cursor-pointer"
            onClick={close}
          >
            <X />
          </Button>
        </div>
        <form onSubmit={handleSubmit(handleProfileUpdate)} className="flex flex-col gap-6 items-center w-full">
          {/* Avatar + Info */}
          <div className="flex flex-col items-center gap-3">
            <label className="w-24 h-24 group relative cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <Avatar className="w-full h-full">
                <AvatarImage src={profileImage || undefined} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="h-full w-full opacity-0 absolute top-0 left-0 bg-secondary/50 group-hover:opacity-100 duration-300 transition-opacity flex items-center justify-center rounded-full">
                <Plus size={30} className="text-white" />
              </div>
            </label>

            {/* Editable name input */}
            <input
              type="text"
              {...register("name", { required: true })}
              className="border-b-2 border-gray-300 focus:border-primary outline-0 text-center text-muted-foreground w-fit text-2xl"
            />
            {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4 items-center w-full">
            <input
              type="text"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              className="border-b-2 border-gray-300 focus:border-primary outline-0 text-center text-muted-foreground w-full max-w-xs"
            />
            {errors.email && <span className="text-red-500 text-sm">Valid email is required</span>}
            <div className="flex justify-center items-center border-b-2 border-gray-300 focus-within:border-primary w-full max-w-xs mx-auto">
              <span className="text-muted-foreground">+91</span>
              <input
                type="text"
                {...register("phone")}
                className="w-fit outline-0 text-muted-foreground bg-transparent text-center"
              />
            </div>
          </div>

          <div className="w-full flex justify-center">
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 text-base cursor-pointer">
              Update <CheckCheck className="ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;