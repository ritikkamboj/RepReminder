import { useEffect, useState } from "react";
import axios from "axios";

const ActivePage = () => {
  const [activeCustomers, setActiveCustomers] = useState([]);

  useEffect(() => {
    const fetchActive = async () => {
      try {
        const data = JSON.parse(localStorage.getItem("user"));
       
        const token = data.token ;
        console.log(token);
        const res = await axios.get("http://localhost:5000/api/subscriptions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const filtered = res.data.filter((customer) => customer.status === "active");
        setActiveCustomers(filtered);
      } catch (error) {
        console.error("Error fetching active customers:", error);
      }
    };

    fetchActive();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">🟢 Active Subscriptions</h2>
      {activeCustomers.length === 0 ? (
        <p className="text-gray-500">No active customers at the moment.</p>
      ) : (
        <div className="grid gap-4">
          {activeCustomers.map((cust) => (
            <div key={cust._id} className="bg-white p-4 rounded-xl shadow border">
              <p><strong>Name:</strong> {cust.name}</p>
              <p><strong>Phone:</strong> {cust.phone}</p>
              <p><strong>Start:</strong> {new Date(cust.startDate).toLocaleDateString()}</p>
              <p><strong>End:</strong> {new Date(cust.endDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivePage;
