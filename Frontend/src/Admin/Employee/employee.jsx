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
    parameter: "",
  });

  const [res, setres] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (formData.option === "add") {
        response = await axios.post(
          `https://skyport-b.onrender.com/admin/addemp/${formData.admin_key}`,
          {
            emp_id: formData.emp_id,
            emp_name: formData.emp_name,
            emp_department: formData.emp_department,
            emp_contact: formData.emp_contact,
            emp_email: formData.emp_email,
          }
        );

        if (response.status === 200) {
          setSuccessMessage("Employee added successfully.");
          setErrorMessage("");
          setFormData((prev) => ({
            ...prev,
            option: "search",
            parameter: "getall",
          }));
        } else {
          setErrorMessage("Error adding employee.");
          setSuccessMessage("");
        }
      } else if (formData.option === "delete") {
        response = await axios.delete(
          `https://skyport-b.onrender.com/admin/deleteemp/${formData.emp_id}/${formData.emp_name}/${formData.admin_key}`
        );

        if (response.status === 200) {
          setSuccessMessage("Employee deleted successfully.");
          setErrorMessage("");
          setFormData((prev) => ({
            ...prev,
            option: "search",
            parameter: "getall",
          }));
        } else {
          setErrorMessage("Failed to delete employee.");
          setSuccessMessage("");
        }
      } else if (formData.option === "search" || response?.status === 200) {
        let url = "";

        switch (formData.parameter) {
          case "emp_id_search":
            url = `https://skyport-b.onrender.com/admin/searchbyid/${formData.emp_id}`;
            break;
          case "emp_name_search":
            url = `https://skyport-b.onrender.com/admin/searchbyname/${formData.emp_name}`;
            break;
          case "emp_department_search":
            url = `https://skyport-b.onrender.com/admin/searchbydepartment/${formData.emp_department}`;
            break;
          case "getall":
            url = `https://skyport-b.onrender.com/admin/search`;
            break;
          default:
            setErrorMessage("Invalid search parameter selected.");
            setSuccessMessage("");
            return;
        }

        const searchResponse = await axios.get(url);
        setres(
          Array.isArray(searchResponse.data.employee)
            ? searchResponse.data.employee
            : [searchResponse.data.employee]
        );
        console.log(searchResponse.data);
      }
    } catch (error) {
      console.error("Request failed:", error);
      setErrorMessage("Server error occurred. Check console for details.");
      setSuccessMessage("");
    }

    setFormData((prev) => ({
      ...prev,
      emp_id: "",
      emp_name: "",
      emp_department: "",
      emp_contact: "",
      emp_email: "",
      admin_key: "",
    }));
  };

  return (
    <>
      <div className="p-20 flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-6">
        <h1 className="text-3xl font-semibold text-orange-600 mb-6">
          Enter Employee Details
        </h1>
        
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <div className="space-y-4">
            <label className="block text-lg font-medium">
              Select a service
            </label>
            <select
              name="option"
              value={formData.option}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300"
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="add">Add Employee</option>
              <option value="delete">Delete Employee</option>
              <option value="search">Search Employee</option>
            </select>

            {formData.option === "search" && (
              <>
                <label className="block text-lg font-medium">Search By:</label>
                <select
                  name="parameter"
                  value={formData.parameter}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300"
                >
                  <option value="" disabled>
                    Choose a parameter
                  </option>
                  <option value="emp_id_search">Employee ID</option>
                  <option value="emp_name_search">Emplyoee Name</option>
                  <option value="emp_department_search">
                    Employee Department
                  </option>
                </select>
              </>
            )}

            {formData.parameter === "emp_id_search" && (
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
              </>
            )}

            {formData.parameter === "emp_name_search" && (
              <>
                <label className="block text-lg font-medium">
                  Employee Name
                </label>
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
            {formData.parameter === "emp_department_search" && (
              <>
                <label className="block text-lg font-medium">
                  Choose Department
                </label>
                <select
                  name="emp_department"
                  value={formData.emp_department}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="" disabled>
                    Select Department
                  </option>
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
              </>
            )}

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

                <label className="block text-lg font-medium">
                  Employee Name
                </label>
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
                  <option value="" disabled>
                    Select Department
                  </option>
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
      {formData.option === "search" && res.length > 0 && (
        <div className="mt-10 bg-white rounded-xl shadow overflow-x-auto ">
          <h2 className="text-xl font-semibold text-gray-700 p-4 border-b">
            Employee Details
          </h2>
          <table className="min-w-min text-sm text-left">
            <thead className="bg-orange-50 text-gray-700">
              <tr>
                <th className="px-4 py-3 border">Employee Name</th>
                <th className="px-4 py-3 border">Employee ID</th>
                <th className="px-4 py-3 border">Department</th>
                <th className="px-4 py-3 border">Contact</th>
                <th className="px-4 py-3 border">Email</th>
              </tr>
            </thead>
            <tbody>
              {res.map((emp, index) => (
                <tr key={index}>
                  <td className="p-3 border">{emp.emp_name}</td>
                  <td className="p-3 border">{emp.emp_id}</td>
                  <td className="p-3 border">{emp.emp_department}</td>
                  <td className="p-3 border">{emp.emp_contact}</td>
                  <td className="p-3 border">{emp.emp_email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {successMessage && (
          <div className="mb-4 text-green-700 bg-green-100 border border-green-300 p-3 m-5 rounded w-full max-w-md">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 text-red-700 bg-red-100 border border-red-300 p-3 rounded w-full max-w-md">
            {errorMessage}
          </div>
        )}
      </div>
    </>
  );
}
