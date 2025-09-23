"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Send } from "lucide-react";
import ReactMarkdown from 'react-markdown';


export default function Page() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Figma ipsum component variant main layer. Inspect underline component bullet arrow scrolling image group comment rectangle. Draft boolean outline thumbnail scrolling. Selection frame within inspect link undo. Undo union pencil image layer device frame. Inspect underline selection effect duplicate selection. Background group ipsum component plugin invite plugin subtract bold. Fill layer bold link style connection shadow vector component subtract. Link ipsum export flatten library team duplicate figma. Device group prototype scale editor frame pixel object subtract polygon. Device comment community slice overflow pencil align. Inspect hand ellipse flatten group.",
      sender: "employee",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  // const employees = [
  //   "Adarsh Pandit (adarshpanditdev@gmail.com)",
  //   "Sarah Johnson (sarah.johnson@company.com)",
  //   "Michael Chen (michael.chen@company.com)",
  //   "Emily Rodriguez (emily.rodriguez@company.com)",
  //   "David Wilson (david.wilson@company.com)",
  //   "Lisa Thompson (lisa.thompson@company.com)",
  //   "James Brown (james.brown@company.com)",
  //   "Anna Davis (anna.davis@company.com)",
  //   "Robert Garcia (robert.garcia@company.com)",
  //   "Jessica Miller (jessica.miller@company.com)",
  // ];

  const [users, setUsers] = useState<any[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch("/api/mails/mail-users")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUsers(res.suggetions);
      });
  }, []);

  const fetchEmployeeDetails = (id: string) => {
    // Fetch employee details based on email
    setLoading(true);
    fetch(`/api/admin/reports/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReport(data);
      }).finally(() => setLoading(false));
  };

  useEffect(() => {
    if (selectedEmployee) {
      console.log(selectedEmployee);
      fetchEmployeeDetails(selectedEmployee._id);
    }
  }, [selectedEmployee?._id ]);

  const handleEmployeeSelect = (employee: string) => {
    setSelectedEmployee(employee);
    setIsDropdownOpen(false);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  // const handleKeyPress = (e: {
  //   key: string;
  //   shiftKey: any;
  //   preventDefault: () => void;
  // }) => {
  //   if (e.key === "Enter" && !e.shiftKey) {
  //     e.preventDefault();
  //     handleSendMessage();
  //   }
  // };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden ">
      {/* Header */}
      {/* <div className="bg-white border-b border-gray-200 p-4 pl-20">
        <div className="flex justify-end items-center">
          {selectedEmployee && (
            <div className="bg-gray-500 text-white px-4 py-2 rounded-full text-sm ">
              {selectedEmployee.name} ({selectedEmployee.email})
            </div>
          )}
        </div>
      </div> */}

      {/* Chat Messages Area */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar pl-20">
        {selectedEmployee && (
          <div className="flex justify-end items-center mb-4">
            <div className="bg-gray-500 text-white px-4 py-2 rounded-full text-sm w-fit  ">
              {selectedEmployee.name} ({selectedEmployee.email})
            </div>
            </div>
          )}
        {loading ? (
          <div className="text-center text-gray-500 flex items-center justify-center *:">
             <div className="animate-spin rounded-full h-16 w-16 border-4 border-secondary border-b-transparent mt-20"></div>
          </div>
        ) : report && report.employee ? (
          // messages.map((message) => (
            <div
              key={report.employee._id}
              className={`flex ${
                // message.sender === "user" ? "justify-end" : "justify-start"
                "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl ${
                  // message.sender === "user"
                  //   ? "bg-blue-500 text-white ml-auto"
                     "bg-orange-500 text-white"
                } break-words whitespace-pre-wrap`}
              >
                <ReactMarkdown>{report.summary}</ReactMarkdown>
              </div>
            </div>
          // ))
        ) : report?.message ? (
          <div className="text-center text-gray-500">{report.message}</div>
        ) : (
          <div className="text-center text-gray-500">
            Please select an employee to view the chat.
          </div>
        )}
      </div>

      {/* Message Input Area*/}
      {/* <div className="bg-white border-t border-gray-200 p-3">
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent whitespace-pre-wrap overflow-x-hidden"
              rows={1}
              style={{ minHeight: "40px", maxHeight: "120px" }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div> */}

      {/* Employee List at Bottom */}
      <div className="bg-white border-t border-gray-200 p-4 relative">
        {isDropdownOpen && (
          <div
            className="absolute bottom-full left-4 right-4 mb-1 
      bg-orange-100 border border-gray-200 rounded-2xl shadow-lg z-10 
      max-h-64 overflow-y-auto overflow-x-hidden custom-scrollbar"
          >
            {users.map((employee, index) => (
              <button
                key={index}
                onClick={() => handleEmployeeSelect(employee)}
                className={`w-full text-left px-4 py-3 border-b border-orange-500 last:border-b-0 transition-colors ${
                  selectedEmployee === employee
                    ? "bg-orange-100 text-orange-700"
                    : "text-orange-600 hover:bg-orange-200"
                }`}
              >
                {employee.name} ({employee.email})
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full bg-orange-500 text-white px-1 py-1 rounded-4xl flex items-center justify-between hover:bg-orange-600 transition-colors"
        >
          <span className="text-left pl-4 text-lg">
            Please Select an Employee
          </span>
          {isDropdownOpen ? (
            <ChevronDown className="w-10 h-10 bg-white text-black rounded-full p-1" />
          ) : (
            <ChevronUp className="w-10 h-10 bg-white text-black rounded-full p-1" />
          )}
        </button>
      </div>
    </div>
  );
}
