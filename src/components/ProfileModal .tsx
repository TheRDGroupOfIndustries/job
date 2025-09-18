"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { CheckCheck, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const ProfileModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const user = {
    name: "Adarsh Pandit",
    email: "adarshpanditdev@gmail.com",
    phone: "9086345112",
    avatar: "/images/profile_picture.jpg",
  };

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-secondary/50 z-50 flex items-center justify-center backdrop-blur-[6px]">
      <div className="w-[90vw] md:w-[60vw] lg:w-[40vw] bg-card rounded-3xl px-8 py-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Profile Info</h2>
          <Button
            className="text-black hover:bg-orange-600 rounded-full p-2"
            onClick={() => setIsOpen(false)}
          >
            <X />
          </Button>
        </div>

        {/* Avatar + Info */}
        <div className="flex flex-col items-center gap-3">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          {/* Editable name input */}
          <input
            type="text"
            defaultValue={user.name}
            className="border-b-2 border-gray-300 focus:border-primary outline-0 text-center text-muted-foreground w-fit text-2xl"
          />
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4 items-center w-full">
          <input
            type="text"
            defaultValue={user.email}
            className="border-b-2 border-gray-300 focus:border-primary outline-0 text-center text-muted-foreground w-full max-w-xs"
          />
          <div className="flex justify-center items-center border-b-2 border-gray-300 focus-within:border-primary w-full max-w-xs mx-auto">
            <span className="text-muted-foreground">+91</span>
            <input
              type="text"
              defaultValue={user.phone}
              className="w-fit outline-0 text-muted-foreground bg-transparent text-center"
            />
          </div>

          <div className="w-full flex justify-center">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 text-base">
              Update <CheckCheck />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
