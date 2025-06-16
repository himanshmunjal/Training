import { useState } from "react";

export default function Employee() {
    const[formData, setFormData] = useState({
        employee_id: "",
        name: "",
        department: "",
        contact: "",
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-6">
            <h1 className="text-3xl font-semibold text-orange-600 mb-6">
                Enter Employee Details
            </h1>

            <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <div className="space-y-4">
                    <label className="block text-lg font-medium">Employee ID</label>
                    <input
                        type="text"
                        name="employee_id"
                        value={formData.employee_id}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300"
                    />

                    <label className="block text-lg font-medium">Employee Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300"
                    />

                    <label className="block text-lg font-medium">Department</label>
                    <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300"
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
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300"
                    />
                    <button
                        type="submit"
                        className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition-all duration-300"
                        onClick={(e) => {
                            e.preventDefault();
                            // Handle form submission logic here
                            console.log("Form submitted:", formData);
                        }}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}