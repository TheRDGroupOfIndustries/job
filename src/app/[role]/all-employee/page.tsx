import AllEmployees from "@/components/AllEmployees";
import { baseUrl } from "@/lib/other";

export default async function Page () {
  // const res = await fetch(`${baseUrl}/api/employees`, {
  //   method: "GET",
  //   credentials: "include",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // const data = await res.json();
  // console.log("data: ", data);

  return (
    <AllEmployees/>
  );
};
