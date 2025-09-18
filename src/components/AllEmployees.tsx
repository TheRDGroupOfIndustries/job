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
import { useState } from "react";
import { employees } from "@/lib/Dummy/employee";

export default function AllEmployees() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
        <div className="w-full h-[650px] overflow-y-auto rounded-md relative custom-scrollbar">
          <table className="w-full text-base ">
            <thead className=" bg-card sticky top-0 z-10">
              <tr>
                <th className="h-12 pl-14 px-4 text-center align-middle font-medium text-gray-700 w-[120px]">S NO.</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Email</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Employee ID</th>
                <th className="h-12 px-4 align-middle font-medium text-gray-700 text-left">Other details...</th>
                <th className="h-12 px-4 text-center align-middle font-medium text-gray-700 w-[100px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee._id} className=" transition-colors hover:bg-gray-100 ">
                  <td className="p-4  pl-14 font-medium">{index <= 9 ? `0${index}` : index }</td>
                  <td className="p-4">{employee.name}</td>
                  <td className="p-4">{employee.email}</td>
                  <td className="p-4">{employee.employeeID}</td>
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
                            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-background " role="menuitem">
                              Edit
                            </a>
                            <a href="#" className="flex items-center px-4 py-2 text-sm text-red-500 hover:bg-background " role="menuitem">
                              Delete
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  );
}
