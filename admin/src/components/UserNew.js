import React, { useState, useEffect } from "react";

const UpdateUser = ({ user, onUpdate,roles, onClose }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    role: user.role || "",
    status: user.status || "",
  });

  useEffect(() => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "",
      status: user.status || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onUpdate(formData, user._id); 
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#70425bd6] p-4 rounded-md w-full">
      <div>
        <label className="block text-white mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-2 bg-[#3e1438a5]  text-white rounded-full"
          required
        />
      </div>
      <div>
        <label className="block text-white mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-2 bg-[#3e1438a5] text-white rounded-full"
          required
        />
      </div>
        <div>
        <label className="block text-white text-sm mb-2">Role</label>
        <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 bg-[#3e1438a5] text-white rounded-full mb-2"
        >
          {roles.map((role) => (
          <option value={role.name}>{role.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-white text-sm mb-2">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 bg-[#3e1438a5] text-white rounded-full mb-5"
          required
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex justify-center gap-5">
        <button
          type="submit"
          className="bg-white text-rose-600 font-semibold py-2 px-4 rounded-full hover:bg-white"
        >
          Update
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-rose-600 text-white py-2 px-4 rounded-full hover:bg-rose-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateUser;