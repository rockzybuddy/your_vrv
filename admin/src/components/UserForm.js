//goodcode
import React, { useState } from "react";
import axios from "axios";
import { RiUserAddLine } from "react-icons/ri";
import { MdPermContactCalendar } from "react-icons/md";
import { MdAttachEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import userimg from "../static/Programming-amico.png"

const UserForm = ({ onUserAdded, roles, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [status, setStatus] = useState("active");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users", {
        name,
        email,
        password,
        role,
        status
      });

      // Pass the newly created user object back to the parent
      onUserAdded(response.data);

      // Reset form fields
      setName("");
      setEmail("");
      setPassword("");
      setRole("user");
      setStatus("user");

      // Close the form
      onClose();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-[#3c234aa5] w-[20vw] border rounded-l-lg p-2 text-xl font-semibold flex flex-col gap-3 items-center justify-center">
        Add new user
        <img src={userimg}/>
      </div>
    <form onSubmit={handleSubmit} className="space-y-4 w-full md:w-[30vw] border bg-[#29142fc3] p-5 rounded-r-md">
      <div className="flex items-center gap-2">
        <span className="text-2xl"> <MdPermContactCalendar /> </span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder=" Enter name"
          className="w-full p-2 bg-[#0d07109b] text-white rounded-full placeholder:text-[#DFB6B2]"
          required
        />
      </div>

      <div className="flex items-center gap-2">
      <span className="text-2xl"> <MdAttachEmail /> </span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder=" Enter email"
          className="w-full p-2 bg-[#0d07109b] text-white rounded-full placeholder:text-[#DFB6B2]"
          required
        />
      </div>

      <div className="flex items-center gap-2">
      <span className="text-2xl"> <RiLockPasswordFill /> </span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder=" Enter password"
          className="w-full p-2 bg-[#0d07109b] text-white rounded-full placeholder:text-[#DFB6B2]"
          required
        />
      </div>

      <div>
        <label className="block text-sm">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 bg-[#0d07109b] text-white rounded-full"
          required
        >
        {roles.map((role) => (
          <option key={role._id} value={role.name}>{role.name}</option>
        ))}
        </select>
      </div>

      <div>
        <label className="block text-sm">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 bg-[#0d07109b] text-white rounded-full"
          required
        >
          <option value="active" className="hover:bg-rose-400">Active</option>
          <option value="inactive" className="hover:bg-rose-400">Inactive</option>
        </select>
      </div>



      <button type="submit" className="bg-[#d57878ae] text-[#000000] hover:bg-white hover:text-rose-500 py-2 px-4 rounded-full mt-4">
        <span className="flex items-center justify-between gap-2"> Add User <RiUserAddLine /> </span>
      </button>
    </form>
    </div>
  );
};

export default UserForm;
