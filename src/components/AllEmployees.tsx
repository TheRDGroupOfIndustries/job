"use client";

import { MoreHorizontal, MoreVertical } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useEffect, useState } from "react";
import { Employee } from "@/types";
import { IUser } from "@/models/User";
import EmployeeForm from "./EmployeeForm";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "@/redux/features/authSlice";

export default function AllEmployees() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [employees, setEmployees] = useState<IUser[] | null>(null);
  const [updateEmployee, setUpdateEmployee] = useState<IUser[] | null>(null);
  const dispatch = useDispatch();
  

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((data) => {
        console.log("data:", data.employees);
        setEmployees(data.employees);
      });
  }, []);

  if(!employees) {
    return (
      <div className="">
        no employee
      </div>
    )
  }

  const handleDelete = () => {
    if(!openDropdown) return;
    dispatch(deleteEmployee({id: openDropdown}) as any)
    .then(() => {
      setEmployees((prev) => {
        if(!prev) return prev;
        return prev.filter((emp) => emp._id !== openDropdown);
      })
      setOpenDropdown(null)
    }).catch((err) => {
      console.error("Failed to delete employee:", err);
    })
  }

  return (
    <div className="w-full h-[650px] overflow-y-auto rounded-md relative custom-scrollbar">
      <table className="w-full text-base ">
        <thead className=" bg-card sticky top-0 z-10">
          <tr>
            <th className="h-12 pl-14 px-4 text-center align-middle font-medium text-gray-700 w-[120px]">
              S NO.
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">
              Name
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">
              Email
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">
              Employee ID
            </th>
            <th className="h-12 px-4 align-middle font-medium text-gray-700 text-left">
              Other details...
            </th>
            <th className="h-12 px-4 text-center align-middle font-medium text-gray-700 w-[100px]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((employee, index) => (
            <tr
              key={employee._id}
              className=" transition-colors hover:bg-gray-100 "
            >
              <td className="p-4  pl-14 font-medium">
                {index <= 9 ? `0${index}` : index}
              </td>
              <td className="p-4">{employee.name}</td>
              <td className="p-4">{employee.email}</td>
              <td className="p-4">{employee.employeeId}</td>
              <td className="p-4">{employee.otherDetails}</td>
              <td className="p-4 text-center">
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      className="flex items-center justify-center p-2 rounded-md hover:bg-gray-200"
                      id={`menu-button-${employee._id}`}
                      onClick={() => toggleDropdown(employee._id)}
                    >
                      <span className="sr-only">Open menu</span>
                      <MoreVertical />
                    </button>
                  </div>

                  {openDropdown === employee._id && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-card focus:outline-none z-50"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby={`menu-button-${employee._id}`}
                    >
                      <div className="py-1" role="none">
                        <button
                          onClick={() => {
                            setUpdateEmployee(employee);
                            setOpenDropdown(null);
                          }}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-background w-full "
                          role="menuitem"
                        >
                          Edit
                        </button>
                        <button
                          onClick={handleDelete}
                          className="flex items-center px-4 py-2 text-sm text-red-500 hover:bg-background w-full "
                          role="menuitem"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {updateEmployee && (
        <EmployeeForm
          employee={updateEmployee}
          close={() => setUpdateEmployee(null)}
          setEmployees={setEmployees}
        />
      )}
    </div>
  );
}
