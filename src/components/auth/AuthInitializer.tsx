"use client";

import { fetchUser } from "@/redux/features/authSlice";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthInitializer() {
   const dispatch = useDispatch<AppDispatch>();
   const router = useRouter();


  useEffect(() => {
    dispatch(fetchUser())
      // .unwrap()
      // .catch(() => {
      //   router.push("/auth/login");
      // });
  }, [dispatch]);

  return null; // doesn’t render anything
}
