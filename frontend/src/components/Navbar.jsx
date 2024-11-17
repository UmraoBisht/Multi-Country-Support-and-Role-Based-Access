import React from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="bg-blue-500 text-white py-3 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold">Multi-Country App</h1>
      <div>
        <span className="mr-4">Role: {user?.role}</span>
        <span className="mr-4">Country: {user?.country}</span>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
