import axios from "axios";
import { useState } from "react";

export default function Employee() {
  const [formData, setFormData] = useState({
    emp_id: "",
    emp_name: "",
    emp_department: "",
    emp_contact: "",
    emp_email: "",
    option: "",
    admin_key: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (formData.option === "add") {
        response = await axios.post(
          `http://localhost:2211/admin/addemp/${formData.admin_key}`,
          {
            emp_id: formData.emp_id,
            emp_name: formData.emp_name,
            emp_department: formData.emp_department,
            emp_contact: formData.emp_contact,
            emp_email: formData.emp_email,
          }
        );

        if (response.status === 200) {
          alert("Employee added successfully");
        } else {
          alert("Error adding employee");
        }
      } else if (formData.option === "delete") {
        response = await axios.delete(
          `http://localhost:2211/admin/deleteemp/${formData.emp_id}/${formData.emp_name}/${formData.admin_key}`
        );

        if (response.status === 200) {
          alert("Employee deleted successfully");
          console.log(response.data);
        } else {
          alert("Failed to delete employee");
        }
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Server error occurred. Check console for details.");
    }

    setFormData({
      emp_id: "",
      emp_name: "",
      emp_department: "",
      emp_contact: "",
      emp_email: "",
      option: "",
      admin_key: "",
    });
  };

  return (
    <div className="p-20 flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-6">
      <h1 className="text-3xl font-semibold text-orange-600 mb-6">
        Enter Employee Details
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="space-y-4">
          <label className="block text-lg font-medium">Select a service</label>
          <select
            name="option"
            value={formData.option}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300"
          >
            <option value="" disabled>Select an option</option>
            <option value="add">Add Employee</option>
            <option value="delete">Delete Employee</option>
          </select>

          {(formData.option === "add" || formData.option === "delete") && (
            <>
              <label className="block text-lg font-medium">Employee ID</label>
              <input
                type="text"
                name="emp_id"
                value={formData.emp_id}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />

              <label className="block text-lg font-medium">Employee Name</label>
              <input
                type="text"
                name="emp_name"
                value={formData.emp_name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </>
          )}

          {formData.option === "add" && (
            <>
              <label className="block text-lg font-medium">Department</label>
              <select
                name="emp_department"
                value={formData.emp_department}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="" disabled>Select Department</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
                <option value="IT">IT</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Security">Security</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Logistics">Logistics</option>
                <option value="Marketing">Marketing</option>
                <option value="Administration">Administration</option>
                <option value="Crew">Crew</option>
                <option value="Engineering">Engineering</option>
                <option value="Ground">Ground Staff</option>
              </select>

              <label className="block text-lg font-medium">Contact</label>
              <input
                type="text"
                name="emp_contact"
                value={formData.emp_contact}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />

              <label className="block text-lg font-medium">Email</label>
              <input
                type="email"
                name="emp_email"
                value={formData.emp_email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </>
          )}

          {(formData.option === "add" || formData.option === "delete") && (
            <>
              <label className="block text-lg font-medium">Admin Key</label>
              <input
                type="number"
                name="admin_key"
                value={formData.admin_key}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition-all"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
