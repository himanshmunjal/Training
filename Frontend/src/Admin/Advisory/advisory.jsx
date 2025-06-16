import { useState, useEffect } from "react";
import axios from "axios";

export default function AdvisoryForm() {
  const [formData, setFormData] = useState({
    admin_key: "",
    advisory_title: "",
    advisory_text: "",
    advisory_date: "",
    airline: "",
    start_date: "",
    end_date: "",
  });

  const [advisories, setAdvisories] = useState([]);

  // Fetch advisories on component mount
  useEffect(() => {
    fetchAdvisories();
  }, []);

  const fetchAdvisories = async () => {
    try {
      const response = await axios.get("http://localhost:2211/admin/advisories");
      setAdvisories(response.data);
    } catch (error) {
      console.error("Error fetching advisories:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:2211/admin/advisory", {
        admin_key: parseInt(formData.admin_key),
        advisory_title: formData.advisory_title,
        advisory_text: formData.advisory_text,
        advisory_date: formData.advisory_date,
        airline: formData.airline,
        start_date: new Date(formData.start_date).toISOString(),
        end_date: new Date(formData.end_date).toISOString(),
      });
      if (response.status === 200) {
        alert("Advisory submitted successfully!");
        setFormData({
          admin_key: "",
          advisory_title: "",
          advisory_text: "",
          advisory_date: "",
          airline: "",
          start_date: "",
          end_date: "",
        });
        fetchAdvisories(); // Refresh table
      }
    } catch (error) {
      console.error("Error submitting advisory:", error);
      alert("Failed to submit advisory. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this advisory?")) return;

    try {
      await axios.delete(`http://localhost:2211/admin/advisory/${id}`);
      setAdvisories(advisories.filter((adv) => adv.advisory_id !== id));
    } catch (error) {
      console.error("Error deleting advisory:", error);
      alert("Failed to delete advisory.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-orange-600 text-center mb-6">
        Admin Advisory Dashboard
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <label className="block text-lg font-medium">Admin ID</label>
        <input type="text" name="admin_key" value={formData.admin_key} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />

        <label className="block text-lg font-medium">Airline Name</label>
        <input type="text" name="airline" value={formData.airline} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />

        <label className="block text-lg font-medium">Advisory Title</label>
        <input type="text" name="advisory_title" value={formData.advisory_title} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />

        <label className="block text-lg font-medium">Advisory Text</label>
        <textarea name="advisory_text" value={formData.advisory_text} onChange={handleChange} required rows="4" className="w-full p-2 border border-gray-300 rounded" />

        <label className="block text-lg font-medium">Date</label>
        <input type="date" name="advisory_date" value={formData.advisory_date} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />

        <label className="block text-lg font-medium">Advisory Start Date & Time</label>
        <input type="datetime-local" name="start_date" value={formData.start_date} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />

        <label className="block text-lg font-medium">Advisory End Date & Time</label>
        <input type="datetime-local" name="end_date" value={formData.end_date} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />

        <button type="submit" className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 mt-4">
          Submit
        </button>
      </form>

      <div className="mt-10 mb-8 bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left text-sm border">
          <thead className="bg-orange-50">
            <tr>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Airline</th>
              <th className="p-3 border">Start</th>
              <th className="p-3 border">End</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {advisories.map((adv) => (
              <tr key={adv.advisory_id}>
                <td className="p-3 border">{adv.advisory_title}</td>
                <td className="p-3 border">{adv.airline}</td>
                <td className="p-3 border">{new Date(adv.start_date).toLocaleString()}</td>
                <td className="p-3 border">{new Date(adv.end_date).toLocaleString()}</td>
                <td className="p-3 border">
                  <button
                    onClick={() => handleDelete(adv.advisory_id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {advisories.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No advisories yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}