import { useEffect, useState } from "react";
import axios from "axios";

const ExpiringPage = () => {
  const [expiringCustomers, setExpiringCustomers] = useState([]);

  useEffect(() => {
    const fetchExpiring = async () => {
      try {
        const data = JSON.parse(localStorage.getItem("user"));
        const token = data.token ;
        console.log(token)
        const res = await axios.get("http://localhost:5000/api/subscriptions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const today = new Date();
        const fiveDaysLater = new Date();
        fiveDaysLater.setDate(today.getDate() + 5);

        const filtered = res.data.filter((customer) => {
          const endDate = new Date(customer.endDate);
          return endDate >= today && endDate <= fiveDaysLater && customer.status === "active";
        });

        setExpiringCustomers(filtered);
      } catch (error) {
        console.error("Error fetching expiring customers:", error);
      }
    };

    fetchExpiring();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-yellow-600 mb-4">⚠️ Expiring Subscriptions (within 5 days)</h2>
      {expiringCustomers.length === 0 ? (
        <p className="text-gray-500">No subscriptions expiring soon.</p>
      ) : (
        <div className="grid gap-4">
          {expiringCustomers.map((cust) => (
            <div key={cust._id} className="bg-white p-4 rounded-xl shadow border border-yellow-300">
              <p><strong>Name:</strong> {cust.name}</p>
              <p><strong>Phone:</strong> {cust.phone}</p>
              <p><strong>End Date:</strong> {new Date(cust.endDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpiringPage;
