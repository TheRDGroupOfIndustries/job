"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { CheckCheck, Phone, Plus, X, ChevronDown } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateProfile, updateEmployee } from "@/redux/features/authSlice";
import { IUser } from "@/models/User";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-hot-toast";

// Define the form data structure
interface ProfileFormInputs {
  name: string;
  email: string;
  role: string;
  phone: string;
  employeeId?: string;
  otherDetails?: string;
}

const EmployeeForm = ({
  employee,
  setEmployees,
  close,
}: {
  employee: IUser;
  setEmployees: React.Dispatch<React.SetStateAction<IUser[] | null>>;
  close: () => void;
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(
    employee?.profileImage || null
  );
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const { userData, isAutheticated } = useSelector(
    (state: RootState) => state.auth
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  console.log("employee:", employee);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IUser>({
    defaultValues: {
      name: employee?.name,
      email: employee?.email,
      role: employee?.role || "user",
      phone: employee?.phone,
      employeeId: employee?.employeeId,
      otherDetails: employee?.otherDetails,
      // profileImage: employee?.profileImage,
    },
  });

  const selectedRole = watch("role");
  const roleOptions = [
    { value: "user", label: "User" },
    { value: "employee", label: "Employee" },
    { value: "admin", label: "Admin" },
  ];

  const initials = employee?.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const handleProfileUpdate = async (data: ProfileFormInputs) => {
    console.log("Form Data Submitted:", data);
    console.log("New Profile Image:", profileImage);
    toast.loading("Updating...", { id: "updateEmployee" });

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
      setLoading(false);
    }

    // if (userData.role === "admin") {
    dispatch(updateEmployee({ details: data, id: employee._id }))
      .unwrap()
      .then(() => {
        setEmployees((prev) => {
          if (!prev) return prev;
          return prev.map((emp) =>
            emp._id === employee._id ? { ...emp, ...data } : emp
          );
        });
        close();
      });
    // }

    // close();
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

  const handleRoleSelect = (role: string) => {
    setValue("role", role);
    setIsRoleDropdownOpen(false);
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
            {errors.name && (
              <span className="text-red-500 text-sm">Name is required</span>
            )}
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4 items-center w-full">
            <input
              type="text"
              readOnly
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              className="border-b-2 border-gray-300 focus:border-primary outline-0 text-center text-muted-foreground w-full max-w-xs text-secondary"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                Valid email is required
              </span>
            )}

            {/* Role Dropdown */}
            <div className="relative w-full max-w-xs">
              <div
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="border-b-2 border-gray-300 focus-within:border-primary w-full flex items-center justify-between cursor-pointer py-2"
              >
                <span className="text-muted-foreground text-center w-full">
                  {roleOptions.find(option => option.value === selectedRole)?.label || "Select Role"}
                </span>
                <ChevronDown 
                  size={16} 
                  className={`text-muted-foreground transition-transform duration-200 ${
                    isRoleDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              {isRoleDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-card border border-gray-300 rounded-md shadow-lg z-10 mt-1">
                  {roleOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => handleRoleSelect(option.value)}
                      className="px-3 py-2 hover:bg-gray-300 cursor-pointer text-muted-foreground text-center"
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.role && (
              <span className="text-red-500 text-sm">Role is required</span>
            )}

            <div className="flex justify-center items-center border-b-2 border-gray-300 focus-within:border-primary w-full max-w-xs mx-auto">
              <span className="text-muted-foreground">+91</span>
              <input
                type="text"
                {...register("phone", {
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
              />
            </div>
            {errors.phone && (
              <span className="text-red-500 text-sm">
                {errors.phone.message}
              </span>
            )}
            <>
              <input
                type="text"
                {...register("employeeId")}
                placeholder="Employee ID"
                className="border-b-2 border-gray-300 focus:border-primary outline-0 text-center text-muted-foreground w-full max-w-xs "
              />
              <input
                type="text"
                {...register("otherDetails")}
                placeholder="Other Details"
                className="border-b-2 border-gray-300 focus:border-primary outline-0 text-center text-muted-foreground w-full max-w-xs"
              />
            </>
          </div>

          <div className="w-full flex justify-center">
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 text-base cursor-pointer"
            >
              Update <CheckCheck className="ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;