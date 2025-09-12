"use client";

import { Forward, MailPlus, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";

type MailFormData = {
  to: string;
  subject: string;
  body: string;
};

export default function ComposeMailModal() {
  const [isOpen, setIsOpen] = useState(false);

    const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<MailFormData>();

  const onSubmit = (data: MailFormData) => {
    console.log("Form Data:", data);
    // TODO: dispatch/send mail API call
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
          <div className=" w-[90vw] md:w-[80vw] lg:w-[60vw] h-[80vh] bg-card rounded-4xl px-8 py-4 flex flex-col gap-8 ">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Compose a Mail</h2>
              <Button
                className="text-card rounded-full cursor-pointer"
                onClick={() => {
                    setIsOpen(false)
                    reset()
                }}
              >
                <X />{" "}
              </Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div className="italic">
                <strong>FROM: </strong>user.example@example.com
              </div>

              {/* To field */}
              <input
                type="text"
                placeholder="To:"
                className={`w-full border-b-2 focus:border-primary ${errors.to ? "border-primary" : "border-background"} text-lg outline-0`}
                {...register("to", { required: "Recipient is required" })}
              />

              {/* Subject field */}
              <input
                type="text"
                placeholder="Subject:"
                className={`w-full border-b-2 focus:border-primary ${errors.subject ? "border-primary" : "border-background"} text-lg outline-0`}
                {...register("subject", { required: "Subject is required" })}
              />

              {/* Body field */}
              <textarea
                placeholder="Body:"
                rows={10}
                className={`w-full border-b-2 focus:border-primary ${errors.body ? "border-primary" : "border-background"} text-lg outline-0 resize-none`}
                {...register("body", {
                  required: "Message body cannot be empty",
                })}
              />

              <div className="w-full flex justify-end py-4 ">
                <Button type="submit" className="text-card text-lg cursor-pointer">
                  Send <Forward/>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
