import React from "react";
import { Link } from "react-router-dom";


// Function to get cookie value by name
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
};

const Sidebar = () => {
  const userImage = getCookie("user_image");
  const userName = getCookie("user_name") || "GPCB (GOV)";

  console.log(userImage);

  return (
    <div className="gap-5 flex flex-col">
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        {/* Profile Section */}
        <div className="flex items-center mb-6 border-b pb-4 border-gray-200">
          <div className="w-12 h-12 bg-gray-200 border- text-white flex items-center justify-center text-lg rounded-full">
            U
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{userName}</h3>
            <p className="text-gray-500 text-sm">Admin Account</p>
          </div>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-1">
          <li>
            <Link to="/Gov/Dashboard" className="flex items-center text-gray-700 hover:bg-gray-100 active:bg-gray-200 p-3 rounded-lg hover:translate-y-[-5px]  transition">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/Gov/SetThreshold" className="flex items-center text-gray-700 hover:bg-gray-100 active:bg-gray-200 p-3 rounded-lg hover:translate-y-[-5px]  transition">
              Set Thresholds
            </Link>
          </li>

          <li>
            <Link to="/Gov/settings" className="flex items-center text-gray-700 hover:bg-gray-100 active:bg-gray-200 p-3 rounded-lg hover:translate-y-[-5px]  transition">
              Setting
            </Link>
          </li>

 
        </ul>
      </div>

    </div>
  );
};

export default Sidebar;
