import TasksComp from "@/components/TasksComp";

export default async function Page() {
  // const response = await fetch("http://localhost:3000/api/kanban", {
  //   method: "GET",
  //   headers: { "Content-Type": "application/json" },
  // });
  // const data = await response.json();
  // console.log(data);


  return (
    <TasksComp />
  );
}
