import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCustomerPage = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("user"));
    const token = data.token ;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/subscriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, contact, startDate, endDate }),
      });

      if (res.ok) {
        alert("Customer added successfully 💪");
        navigate("/dashboard");
      } else {
        alert("Failed to add customer 😥");
      }
    } catch (error) {
      console.error("Error adding customer:", error);
      alert("Something went wrong 💔");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Customer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Customer Name"
          className="w-full px-4 py-2 border rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Contact Number"
          className="w-full px-4 py-2 border rounded-lg"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <input
          type="date"
          className="w-full px-4 py-2 border rounded-lg"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <input
          type="date"
          className="w-full px-4 py-2 border rounded-lg"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Add Customer
        </button>
      </form>
    </div>
  );
};

export default AddCustomerPage;
