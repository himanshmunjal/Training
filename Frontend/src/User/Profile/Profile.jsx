import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserProfile() {
  const [user, setUser] = useState({});
  const [bookings, setBookings] = useState([]);
  const [editing, setEditing] = useState(false);

  const passengerId = localStorage.getItem("passenger_id");
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    if (!passengerId || !token) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:2211/user/profile/${passengerId}`, {
          headers: { Authorization: token },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    const fetchBookings = async () => {
      try {
        const res = await axios.get(`http://localhost:2211/user/bookings/${passengerId}`, {
          headers: { Authorization: token },
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    fetchProfile();
    fetchBookings();
  }, [passengerId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:2211/user/update/${passengerId}`, {
        name: user.name,
        contact: user.contact,
      }, {
        headers: { Authorization: token },
      });
      setEditing(false);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Profile Section */}
      <div className="bg-white border rounded shadow p-4 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-left">👤 Passenger Profile</h2>
        
        <div className="mb-3">
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={user.name || ""}
            disabled={!editing}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={user.email || ""}
            disabled
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        <div className="mb-3">
          <label className="block font-medium mb-1">Contact</label>
          <input
            type="text"
            name="contact"
            value={user.contact || ""}
            disabled={!editing}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="text-gray-500 mt-1">ID: {user.id}</div>

        <div className="mt-4 flex space-x-3">
          <button
            onClick={() => setEditing(!editing)}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            {editing ? "Cancel" : "Edit"}
          </button>
          {editing && (
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
          )}
        </div>
      </div>

      {/* Bookings Section */}
      <div className="bg-white border rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4 text-left">🧾 Your Bookings</h2>
        {bookings.length ? (
          <ul className="space-y-3">
            {bookings.map((b) => (
              <li key={b.id} className="border p-3 rounded">
                <div><strong>Flight:</strong> {b.flight_no}</div>
                <div><strong>Date:</strong> {b.date}</div>
                <div><strong>Status:</strong> {b.status}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No bookings yet.</p>
        )}
      </div>
    </div>
  );
}
