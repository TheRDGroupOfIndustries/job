import { LoaderCircle } from "lucide-react";

export default function BtnLoader ({color}: {color?: string}) {
  return (
    <LoaderCircle color={color} className="animate-spin h-5 w-5 mr-2 " />
  );
};
