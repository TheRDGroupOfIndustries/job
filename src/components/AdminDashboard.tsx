"use client";
import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FilePlus, FilePlus2, MessageSquareText, Plus } from "lucide-react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import TaskForm from "./TaskForm";
import { useRouter } from "next/navigation";
import { route } from "sanity/router";

// Data for charts
const mailsData = [
  { name: "Adarsh", value: 10 },
  { name: "Hrithik", value: 12 },
  { name: "Prashant", value: 14 },
  { name: "Aquib", value: 100 },
];

const sheetsData = [
  { name: "Adarsh", value: 20 },
  { name: "Chetan", value: 22 },
  { name: "Dola", value: 54 },
  { name: "Sooraj", value: 0 },
  { name: "Hrithik", value: 100 },
];

const COLORS = ["#8884d8", "#ff7f50", "#82ca9d", "#ffc658", "#0088FE"];

const AdminDashboard = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  const [openAssignWorkForm, setOpenAssignWorkForm] = useState(false);

  const router = useRouter()

  const totalMails = mailsData.reduce((acc, cur) => acc + cur.value, 0);
  const totalSheets = sheetsData.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <div className="p-4 lg:p-6 bg-background h-screen lg:overflow-hidden overflow-y-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto h-full flex flex-col min-h-screen lg:min-h-0">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 mb-3 lg:mb-4">
          <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center shadow-sm">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2">
              193
            </h2>
            <p className="text-gray-500 text-sm lg:text-base">Total Employee</p>
          </div>
          <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center shadow-sm">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2">
              20
            </h2>
            <p className="text-gray-500 text-sm lg:text-base">
              Registered Applications
            </p>
          </div>
          <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center shadow-sm">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2">
              102
            </h2>
            <p className="text-gray-500 text-sm lg:text-base">
              Total Job Posted
            </p>
          </div>
        </div>

        {/* Middle Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 lg:gap-4 flex-grow mb-3 lg:mb-4">
          {/* Mails Sent Chart */}
          <div className="bg-white rounded-xl lg:rounded-2xl p-2 lg:p-3 shadow-sm col-span-1 lg:col-span-2 flex flex-col">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 p-2 lg:p-3">
              Mails Sent
            </h3>
            <div className="flex-1 flex flex-col justify-center">
              <ResponsiveContainer width="100%" height="100%" minHeight={180}>
                <PieChart>
                  <Pie
                    data={mailsData}
                    cx="50%"
                    cy="45%"
                    outerRadius="60%"
                    dataKey="value"
                    textAnchor="middle"
                    label={({ name, value }) => `${name}\n${value}`}
                  >
                    {mailsData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    iconType="circle"
                    formatter={(value) => (
                      <span className="text-gray-800 text-xs">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-sm lg:text-base font-semibold text-gray-900 p-2">
              Total Sent Mails – {totalMails}
            </p>
          </div>

          {/* Sheets  Chart */}
          <div className="bg-white rounded-xl lg:rounded-2xl p-2 lg:p-3 shadow-sm col-span-1 lg:col-span-3 flex flex-col">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 p-2 lg:p-3">
              Sheets Created
            </h3>
            <div className="relative flex-1 flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%" minHeight={200}>
                <PieChart>
                  <Pie
                    data={sheetsData}
                    cx="55%"
                    cy="50%"
                    innerRadius="35%"
                    outerRadius="65%"
                    dataKey="value"
                    label={({ name, value }) => `${name}\n${value}`}
                  >
                    {sheetsData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    iconType="circle"
                    formatter={(value) => (
                      <span className="text-gray-800 text-xs">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Center total inside donut */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-xl lg:text-2xl font-bold text-gray-900">
                  {totalSheets}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
          <div onClick={()=>router.push(`/${userData?.role}/blogs`)} className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-5 flex items-center justify-center cursor-pointer hover:bg-orange-50 transition-colors duration-200 shadow-sm group">
            <FilePlus2 className="w-6 h-6 lg:w-8 lg:h-8 text-orange-500 mr-3" />
            <p className="text-lg lg:text-xl text-orange-500">Post a Blog</p>
          </div>

          <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-5 flex items-center justify-center cursor-pointer hover:bg-orange-50 transition-colors duration-200 shadow-sm group">
            <MessageSquareText className="w-6 h-6 lg:w-8 lg:h-8 text-orange-500 mr-3" />
            <p className="text-lg lg:text-xl font-medium text-orange-500">
              Employee Info
            </p>
          </div>

          <div onClick={() => setOpenAssignWorkForm(true)} className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-5 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-50 transition-colors duration-200 shadow-sm group">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-orange-500 flex items-center justify-center mb-2">
              <Plus className="w-6 h-6 lg:w-8 lg:h-8 text-orange-500" />
            </div>
            <p className="text-lg lg:text-xl font-medium text-orange-500">
              {userData?.role === "admin" ? "Assign" : "Add"} Work
            </p>
          </div>
        </div>
      </div>

      {openAssignWorkForm && (
        <TaskForm mode="Create" close={() => setOpenAssignWorkForm(false)} />
      )}

    </div>
  );
};

export default AdminDashboard;
