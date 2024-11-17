import React from "react";
import Navbar from "../components/Navbar";
import DataList from "../components/dataList";

const ViewerDashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Viewer Dashboard</h1>
        <p>Viewers can only view data related to their assigned country.</p>
        <DataList />
      </div>
    </div>
  );
};

export default ViewerDashboard;
