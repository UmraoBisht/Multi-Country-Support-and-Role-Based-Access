// src/components/CountrySelector.js

import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const CountrySelector = ({fetchData}) => {
  const { updateUserCountry } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to={"/login"} />;

  const handleChange = (event) => {
    const selectedCountry = event.target.value;
    updateUserCountry(selectedCountry);
    fetchData();
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 py-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <label className="block text-lg font-medium text-gray-700 mb-4">
          Select Country:
        </label>
        <select
          value={user?.country}
          onChange={handleChange}
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="US" selected={"US" === user.country}>
            United States
          </option>
          <option value="India" selected={"India" === user.country}>
            India
          </option>
          <option value="UK" selected={"UK" === user.country}>
            United Kingdom
          </option>
          <option value="Canada" selected={"Canada" === user.country}>
            Canada
          </option>
          <option value="Germany" selected={"Germany" === user.country}>
            Germany
          </option>
          {/* Add other countries as needed */}
        </select>
      </div>
    </div>
  );
};

export default CountrySelector;
