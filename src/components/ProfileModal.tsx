"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { CheckCheck, Phone, Plus, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateProfile } from "@/redux/features/authSlice";
import { IUser } from "@/models/User";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-hot-toast";

// Define the form data structure
interface ProfileFormInputs {
  name: string;
  email: string;
  phone: string;
  employeeId?: string;
  otherDetails?: string;
  profileImage?: string;
}

const ProfileModal = ({ close }: { close: () => void }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { userData, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const [profileImage, setProfileImage] = useState<string | null>(userData?.profileImage || null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      employeeId: userData?.employeeId || "",
      otherDetails: userData?.otherDetails || "",
    },
  });

  const initials = userData?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("") || "U";

  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const handleProfileUpdate = async (data: ProfileFormInputs) => {
    try {
      toast.loading("Updating...", { id: "update" });
      console.log("Form Data Submitted:", data);

      // Only upload image if a new image file was selected
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", UPLOAD_PRESET || "");
        
        const response = await axios.post(CLOUDINARY_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        data.profileImage = response.data.secure_url;
        console.log("Upload successful:", response.data);
      } else {
        // Keep existing profile image if no new image was uploaded
        // data.profileImage = "/images/profile_picture.jpg";
      }

      // Only dispatch update if user is admin
      // if (userData?.role === "admin") {
        await dispatch(updateProfile({ details: data })).unwrap();
      // }

      close();
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error appropriately - maybe show a toast notification
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageFile(file || null);

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
            disabled={loading}
          >
            <X />
          </Button>
        </div>
        <form
          onSubmit={handleSubmit(handleProfileUpdate)}
          className="flex flex-col gap-6 items-center w-full"
        >
          {/* Avatar + Info */}
          <div className="flex flex-col items-center gap-3">
            <label className="w-24 h-24 group relative cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={loading}
              />
              <Avatar className="w-full h-full">
                <AvatarImage src={profileImage || undefined} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="h-full w-full opacity-0 absolute top-0 left-0 bg-secondary/50 group-hover:opacity-100 duration-300 transition-opacity flex items-center justify-center rounded-full">
                {loading ? (
                  <LoaderCircle size={20} className="text-white animate-spin" />
                ) : (
                  <Plus size={30} className="text-white" />
                )}
              </div>
            </label>

            {/* Editable name input */}
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="border-b-2 border-gray-300 focus:border-primary outline-0 text-center text-muted-foreground w-fit text-2xl"
              disabled={loading}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4 items-center w-full">
            <input
              type="text"
              readOnly
              {...register("email", { 
                required: "Email is required", 
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email"
                }
              })}
              className="border-b-2 border-gray-300 focus:border-primary outline-0 text-center text-muted-foreground w-full max-w-xs text-secondary"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
            <div className="flex justify-center items-center border-b-2 border-gray-300 focus-within:border-primary w-full max-w-xs mx-auto">
              <span className="text-muted-foreground">+91</span>
              <input
                type="text"
                {...register("phone", {
                  required: "Phone number is required",
                  minLength: {
                    value: 10,
                    message: "Phone number must be 10 digits",
                  },
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                })}
                className="w-fit outline-0 text-muted-foreground bg-transparent text-center"
                disabled={loading}
              />
            </div>
            {errors.phone && (
              <span className="text-red-500 text-sm">
                {errors.phone.message}
              </span>
            )}
            {userData?.role === "employee" && (
              <>
                <input
                  type="text"
                  {...register("employeeId")}
                  readOnly
                  placeholder="Employee ID"
                  className="border-b-2 border-gray-300 focus:border-primary outline-0 text-center text-muted-foreground w-full max-w-xs text-secondary placeholder:text-secondary"
                />
                <input
                  type="text"
                  placeholder="Other Details"
                  {...register("otherDetails")}
                  className="border-b-2 border-gray-300 focus:border-primary outline-0 text-center text-muted-foreground w-full max-w-xs placeholder:text-secondary"
                  disabled={loading}
                />
              </>
            )}
          </div>

          <div className="w-full flex justify-center">
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 text-base cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <>
                  Updating... <LoaderCircle className="ml-2 animate-spin" size={16} />
                </>
              ) : (
                <>
                  Update <CheckCheck className="ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;