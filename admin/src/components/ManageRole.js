import React, { useState } from "react";
import axios from "axios";
import { IoMdOptions } from "react-icons/io";
import userimg from "../static/Programming-amico.png"

const RoleForm = ({ onRoleAdded, onClose }) => {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState({
    read: false,
    write: false,
    delete: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/roles", {
        name,
        permissions,
      });
      onRoleAdded(response.data.role);
      // Reset form fields
      setName("");
      setPermissions({ read: false, write: false, delete: false });
      onClose();
    } catch (error) {
      console.error("Error adding role:", error);
    }
  };

  const togglePermission = (perm) =>
    setPermissions((prev) => ({ ...prev, [perm]: !prev[perm] }));

  return ( 
    <div className="flex justify-center">
      <div className="bg-[#3c234aa5] w-[20vw] text-xl border rounded-l-md flex flex-col gap-2 items-center font-semibold justify-center p-2">
      Add new user
      <img className="size-52" src={userimg}/>
      </div>
    <form onSubmit={handleSubmit} className="space-y-4 bg-[#29142fc3] border p-5 md:w-[30vw] gap-20 rounded-r-md">
      <div className="flex items-center gap-2">
      <span className="text-2xl"> <IoMdOptions /> </span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 bg-[#0d07109b] text-white rounded-full placeholder:text-[#DFB6B2]"
          placeholder=" Enter role name"
          required
        />
      </div>

      <div>
        <label className="block text-sm">Permissions</label>
        <div className="flex space-x-4">
          {["read", "write", "delete"].map((perm) => (
            <label key={perm} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={permissions[perm]}
                onChange={() => togglePermission(perm)}
                className="accent-rose-400"
              />
              <span>{perm.charAt(0).toUpperCase() + perm.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="bg-[#d57878ae] text-black py-2 px-4 rounded-full hover:bg-white hover:text-rose-500"
      >
        Add Role
      </button>
    </form>
    </div>
  );
};

export default RoleForm;
