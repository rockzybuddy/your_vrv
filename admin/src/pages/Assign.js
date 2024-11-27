import React, { useState, useEffect } from "react";
import axios from "axios";
import RoleForm from "../components/ManageRole";
import UpdateRole from "../components/NewRole";
import { MdOutlineDelete, MdUpdate } from "react-icons/md";
import { GridLoader } from "react-spinners";

const Roles = () => {
  const [showForm, setShowForm] = useState(false);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [roleToUpdate, setRoleToUpdate] = useState(null);

  const toggleForm = () => setShowForm((prev) => !prev);

  const fetchRoles = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/roles");
      setRoles(response.data.roles || []);
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const addRole = (newRole) => {
    setRoles((prev) => [...prev, newRole]);
    setShowForm(false);
  };

  const deleteRole = async (roleId) => {
    try {
      await axios.delete(`http://localhost:5000/api/roles/${roleId}`);
      setRoles((prev) => prev.filter((role) => role._id !== roleId));
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const updateRole = async (updatedRoleData) => {
    try {
      await axios.put(`http://localhost:5000/api/roles/${updatedRoleData._id}`, updatedRoleData);

      fetchRoles();

      setRoleToUpdate(null);
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <div className="p-4 min-h-screen text-[#FBE4D8] flex flex-col">
      

      {showForm && (
        <div className="mt-4">
          <RoleForm onRoleAdded={addRole} onClose={() => setShowForm(false)} />
        </div>
      )}
<div className="flex items-center justify-between">
      <h2 className="text-4xl text-[#DFB6B2] font-bold mt-8">Manage Roles</h2>
      <button
        onClick={toggleForm}
        className="bg-[#d57878ae] text-[#000000] py-2 px-4 rounded-full hover:bg-white hover:text-rose-500"
      >
        {showForm ? "Cancel" : "Add New Role"}
      </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
            <GridLoader
                color="rgba(225, 29, 72,1)"
                // size={100}
            />
            </div>
      ) : roles.length ? (
        <table className="w-full mt-4 bg-[#70425bd6] border border-[#DFB6B2]">
          <thead>
            <tr>
              <th className="border border-[#DFB6B2] p-2">Role</th>
              <th className="border border-[#DFB6B2] p-2">Permissions</th>
              <th className="border border-[#DFB6B2] p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role._id}>
                <td className="border border-[#DFB6B2] p-2">
                    <div className="flex justify-center">
                        {role.name}
                        </div>
                    </td>
                <td className="border border-[#DFB6B2] p-2">
                    <div className="flex justify-center">
                        {Object.entries(role.permissions)
                          .filter(([key, value]) => value)
                          .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
                          .join(", ")}
                    </div>
                </td>
                <td className="border border-[#DFB6B2] p-2 space-x-2">
                    <div className="flex justify-center gap-5">
                        <button
                          onClick={() => setRoleToUpdate(role)}
                          className="bg-white text-rose-600 font-semibold py-1 px-2 rounded-full"
                        >
                          <span className="flex items-center gap-1 justify-center"> Update <MdUpdate /></span>
                        </button>
                        <button
                          onClick={() => deleteRole(role._id)}
                          className="bg-rose-600 py-1 px-2 rounded-full"
                        >
                          <span className="flex items-center gap-1 justify-center"> Delete <MdOutlineDelete /> </span>
                        </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4 text-rose-400">No roles found.</p>
      )}

      {roleToUpdate && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Update Role</h2>
          <UpdateRole
            role={roleToUpdate}
            onUpdate={updateRole}
            onClose={() => setRoleToUpdate(null)}
          />
        </div>
      )}
    </div>
  );
};

export default Roles;
