import React from "react";
import Navbar from "../components/Navbar";
import DataList from "../components/DataList";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p>you can manage data here.</p>
        <DataList />
      </div>
    </div>
  );
};

export default Dashboard;
