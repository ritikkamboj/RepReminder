import { useEffect, useState } from "react";
import axios from "axios";

const ExpiredPage = () => {
  const [expiredCustomers, setExpiredCustomers] = useState([]);
  const [renewId, setRenewId] = useState(null);
  const [dates, setDates] = useState({ startDate: "", endDate: "" });

  const data = JSON.parse(localStorage.getItem("user"));
  const token = data.token ;
  console.log(token )

  const fetchExpired = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/subscriptions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const expired = res.data.filter((c) => c.status === "expired");
      setExpiredCustomers(expired);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchExpired();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/subscriptions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchExpired(); // Refresh list
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleRenew = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/subscriptions/${id}`,
        {
          startDate: dates.startDate,
          endDate: dates.endDate,
          status: "active",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRenewId(null);
      setDates({ startDate: "", endDate: "" });
      fetchExpired();
    } catch (err) {
      console.error("Renew error:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-red-600 mb-4">❌ Expired Subscriptions</h2>
      {expiredCustomers.length === 0 ? (
        <p className="text-gray-500">No expired subscriptions.</p>
      ) : (
        <div className="grid gap-4">
          {expiredCustomers.map((cust) => (
            <div
              key={cust._id}
              className="bg-white border border-red-300 rounded-xl p-4 shadow"
            >
              <p><strong>Name:</strong> {cust.name}</p>
              <p><strong>Phone:</strong> {cust.phone}</p>
              <p><strong>End Date:</strong> {new Date(cust.endDate).toLocaleDateString()}</p>

              <div className="flex gap-4 mt-3">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(cust._id)}
                >
                  🗑️ Delete
                </button>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => setRenewId(cust._id)}
                >
                  🔁 Renew
                </button>
              </div>

              {renewId === cust._id && (
                <div className="mt-4 space-y-2">
                  <input
                    type="date"
                    value={dates.startDate}
                    onChange={(e) => setDates({ ...dates, startDate: e.target.value })}
                    className="border p-2 rounded w-full"
                  />
                  <input
                    type="date"
                    value={dates.endDate}
                    onChange={(e) => setDates({ ...dates, endDate: e.target.value })}
                    className="border p-2 rounded w-full"
                  />
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => handleRenew(cust._id)}
                  >
                    ✅ Confirm Renew
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpiredPage;
