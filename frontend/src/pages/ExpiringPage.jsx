import { useState, useEffect } from "react";

const ExpiringPage = () => {
  const [customers, setCustomers] = useState([]);
  const [renewId, setRenewId] = useState(null);
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");

  const data = JSON.parse(localStorage.getItem("user"));
  const token = data.token ;

  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/subscriptions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      // Filter customers expiring in 5 days
      const today = new Date();
      const in5Days = new Date();
      in5Days.setDate(today.getDate() + 5);

      const expiringSoon = data.filter((cust) => {
        const end = new Date(cust.endDate);
        return end >= today && end <= in5Days && cust.status === "active";
      });

      setCustomers(expiringSoon);
    };

    fetchCustomers();
  }, []);

  const handleRenew = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/subscriptions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ startDate: newStartDate, endDate: newEndDate }),
    });

    if (res.ok) {
      alert("Subscription renewed 🎉");
      setRenewId(null);
      setNewStartDate("");
      setNewEndDate("");
      // Refetch customers
      window.location.reload(); // or trigger fetchCustomers again
    } else {
      alert("Renew failed 💔");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Expiring Customers (5 Days)</h2>
      <div className="space-y-4">
        {customers.map((cust) => (
          <div
            key={cust._id}
            className="p-4 bg-white rounded shadow flex flex-col gap-2"
          >
            <div>
              <span className="font-semibold">Name:</span> {cust.name}
            </div>
            <div>
              <span className="font-semibold">End Date:</span>{" "}
              {cust.endDate.slice(0, 10)}
            </div>

            {renewId === cust._id ? (
              <div className="flex flex-col gap-2">
                <input
                  type="date"
                  value={newStartDate}
                  onChange={(e) => setNewStartDate(e.target.value)}
                  className="border px-2 py-1 rounded"
                  required
                />
                <input
                  type="date"
                  value={newEndDate}
                  onChange={(e) => setNewEndDate(e.target.value)}
                  className="border px-2 py-1 rounded"
                  required
                />
                <button
                  onClick={() => handleRenew(cust._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Save Renewal
                </button>
                <button
                  onClick={() => setRenewId(null)}
                  className="text-sm text-gray-500 underline"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setRenewId(cust._id)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                🔁 Renew
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpiringPage;
