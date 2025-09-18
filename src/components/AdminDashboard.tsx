"use client";

import React from "react";
import { Card } from "./ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { FileText, User, PlusCircle } from "lucide-react";

// Data for charts
const mailsData = [
  { name: "Adarsh", value: 20 },
  { name: "Hrithik", value: 12 },
  { name: "Prashant", value: 1 },
  { name: "Aquib", value: 120 },
];

const sheetsData = [
  { name: "Adarsh", value: 20 },
  { name: "Chetan", value: 22 },
  { name: "Dola", value: 54 },
  { name: "Sorosj", value: 0 },
  { name: "Hrithik", value: 100 },
];

const COLORS = ["#8884d8", "#ff7f50", "#82ca9d", "#ffc658", "#0088FE"];

const AdminDashboard = () => {
  return (
    <div className="p-10 grid grid-cols-1 gap-6 custom-scrollbar">
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-6 text-center bg-white shadow-md rounded-xl border-none ">
          <h2 className="text-4xl font-bold">193</h2>
          <p className="text-gray-600 mt-1">Total Employee</p>
        </Card>
        <Card className="p-6 text-center bg-white shadow-md rounded-xl border-none ">
          <h2 className="text-4xl font-bold">20</h2>
          <p className="text-gray-600 mt-1">Registered Applications</p>
        </Card>
        <Card className="p-6 text-center bg-white shadow-md rounded-xl border-none ">
          <h2 className="text-4xl font-bold">102</h2>
          <p className="text-gray-600 mt-1">Total Job Posted</p>
        </Card>
      </div>

      {/* Middle Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white shadow-md rounded-xl border-none ">
          <h3 className="font-semibold mb-4">Mails Sent</h3>
          <PieChart width={300} height={250}>
            <Pie
              data={mailsData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {mailsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          <p className="text-center mt-2 font-medium">
            Total Sent Mails –{" "}
            {mailsData.reduce((acc, cur) => acc + cur.value, 0)}
          </p>
        </Card>

        <Card className="p-6 bg-white shadow-md rounded-xl border-none">
          <h3 className="font-semibold mb-4">Sheets Created</h3>
          <PieChart width={300} height={250}>
            <Pie
              data={sheetsData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              dataKey="value"
              label
            >
              {sheetsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          <p className="text-center mt-2 font-medium">
            {sheetsData.reduce((acc, cur) => acc + cur.value, 0)}
          </p>
        </Card>
      </div>

      {/* Bottom Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-6 flex flex-col items-center justify-center text-orange-500 cursor-pointer hover:bg-orange-50 transition rounded-xl">
          <FileText size={28} />
          <p className="mt-2 font-medium">Post a Blog</p>
        </Card>
        <Card className="p-6 flex flex-col items-center justify-center text-orange-500 cursor-pointer hover:bg-orange-50 transition rounded-xl">
          <User size={28} />
          <p className="mt-2 font-medium">Employee Info</p>
        </Card>
        <Card className="p-6 flex flex-col items-center justify-center text-orange-500 cursor-pointer hover:bg-orange-50 transition rounded-xl">
          <PlusCircle size={28} />
          <p className="mt-2 font-medium">Assign Work</p>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
