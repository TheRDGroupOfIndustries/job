"use client";

import { Forward, MailPlus, X } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createMail } from "@/redux/features/mailSlice";
import { RootState } from "@/redux/store";

type MailFormData = {
  to: string; // will store _id here
  subject: string;
  body: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
};

export default function ComposeMailModal() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<MailFormData>();
  const dispatch = useDispatch();

  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { userData } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isOpen) {
      fetch("/api/mails/mail-users")
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setSuggestions(res.suggetions);
          setFilteredSuggestions(res.suggetions); // ✅ show all initially
        });
    }
  }, [isOpen]);

  const onSubmit = (data: any) => {
    console.log("Form Data:", data, selectedUser, inputValue);
    dispatch(createMail(data) as any)
      .unwrap()
      .then(() => {
        setIsOpen(false);
        setSelectedUser("");
        setInputValue("");
        setShowDropdown(false);
        reset();
      });
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    setSelectedUser("");
    setValue("to", input);
    setInputValue(input);
    setShowDropdown(true);

    if (input.trim()) {
      setFilteredSuggestions(
        suggestions.filter(
          (s) =>
            s.name.toLowerCase().includes(input.toLowerCase()) ||
            s.email.toLowerCase().includes(input.toLowerCase())
        )
      );
    } else {
      setFilteredSuggestions(suggestions); // ✅ reset to full list if empty
    }
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-card rounded-full cursor-pointer"
      >
        <MailPlus />
        Compose
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-secondary/50 z-50 flex items-center justify-center backdrop-blur-[6px]">
          <div className="w-[90vw] md:w-[80vw] lg:w-[60vw] h-[80vh] bg-card rounded-4xl px-8 py-4 flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Compose a Mail</h2>
              <Button
                className="text-card rounded-full cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                  reset();
                  setSelectedUser("");
                  setInputValue("");
                }}
              >
                <X />
              </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div className="italic">
                <strong>FROM: </strong>
                {userData?.email}
              </div>

              {/* To field with search + dropdown */}
              <div className="relative">
                {/* Visible input */}
                <input
                  type="text"
                  value={selectedUser || inputValue}
                  placeholder="To:"
                  onChange={handleEmailInput}
                  onFocus={() => {
                    setShowDropdown(true);
                    setFilteredSuggestions(suggestions); // ✅ show all on focus
                  }}
                  className={`w-full border-b-2 focus:border-primary ${
                    errors.to ? "border-primary" : "border-background"
                  } text-lg outline-0`}
                />

                {/* Hidden field for ID */}
                <input
                  type="hidden"
                  {...register("to", {
                    required: "Recipient is required",
                  })}
                />

                {/* Dropdown */}
                {showDropdown && filteredSuggestions?.length > 0 && (
                  <div className="absolute top-10 w-full shadow left-0 bg-card rounded-2xl overflow-hidden z-50">
                    <Button
                      variant={"ghost"}
                      className="text-card bg-secondary hover:bg-secondary/50 rounded-full cursor-pointer absolute top-2 right-2 p-1"
                      onClick={() => {
                        setShowDropdown(false);
                      }}
                    >
                      <X />
                    </Button>
                    <ul className="h-[250px] overflow-y-auto w-full custom-scrollbar">
                      {filteredSuggestions.map((user) => (
                        <li
                          key={user._id}
                          onClick={() => {
                            setSelectedUser(`${user.name} (${user.email})`);
                            setValue("to", user.email);
                            setInputValue("");
                            setShowDropdown(false);
                          }}
                          className="px-4 py-3 hover:bg-background text-secondary cursor-pointer"
                        >
                          {user.name} ({user.email})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Subject field */}
              <input
                type="text"
                placeholder="Subject:"
                className={`w-full border-b-2 focus:border-primary ${
                  errors.subject ? "border-primary" : "border-background"
                } text-lg outline-0`}
                {...register("subject", { required: "Subject is required" })}
              />

              {/* Body field */}
              <textarea
                placeholder="Body:"
                rows={10}
                className={`w-full border-b-2 focus:border-primary ${
                  errors.body ? "border-primary" : "border-background"
                } text-lg outline-0 resize-none`}
                {...register("body", {
                  required: "Message body cannot be empty",
                })}
              />

              <div className="w-full flex justify-end py-4">
                <Button
                  type="submit"
                  className="text-card text-lg cursor-pointer"
                >
                  Send <Forward />
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
