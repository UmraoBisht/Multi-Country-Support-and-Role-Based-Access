import React, { useState, useEffect } from "react";
import UpdateModal from "./UpdateModal";
import api from "../services/api";
import CountrySelector from "./CountrySelector";

const DataList = () => {
  // const { user } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch data from backend
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/data");      
      setData(response?.data);
      // localStorage.setItem("user", JSON.stringify(response?.data?.user));
    } catch (error) {
      console.error("Error fetching data:", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  // Delete a row
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await api.delete(`/data/${id}`);
      setData((prevData) => prevData.filter((item) => item._id !== id)); // Remove deleted item
    } catch (error) {
      console.error("Error deleting data:", error.response.data);
    }
  };

  // Open the modal with selected row data
  const handleUpdate = (row) => {
    setSelectedData(row);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedData(null);
    setShowModal(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
       {user.role === "Viewer" && <CountrySelector fetchData={fetchData}/>}
      <h1 className="text-2xl font-bold mb-4">Data Table</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left">Country</th>
                {user?.role === "Admin" && (
                  <th className="py-3 px-6 text-center">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {data.map((row) => (
                <tr
                  key={row._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{row._id}</td>
                  <td className="py-3 px-6 text-left">{row.name}</td>
                  <td className="py-3 px-6 text-left">{row.description}</td>
                  <td className="py-3 px-6 text-left">{row.country}</td>
                  {user.role === "Admin" && (
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => handleUpdate(row)}
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(row._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <UpdateModal
          data={selectedData}
          closeModal={closeModal}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default DataList;
