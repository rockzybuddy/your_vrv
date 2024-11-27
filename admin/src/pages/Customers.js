//goodcode
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "../components/UserForm";
import UpdateUser from "../components/UserNew";
import { MdOutlineDelete, MdUpdate } from "react-icons/md";
import {GridLoader} from "react-spinners";
import inuser from "../static/inuser.jpg"
const User = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userToUpdate, setUserToUpdate] = useState(null);
  const [roles, setRoles] = useState([]);

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

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
    setShowForm(false);
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateUser = async (updatedUserData, userId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${userId}`,
        updatedUserData
      );
      setUsers((prev) =>
        prev.map((user) => (user._id === userId ? response.data : user))
      );
      setUserToUpdate(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="p-4  min-h-screen text-[#e5c1be] flex flex-col">
      

      {showForm && (
        <div className="mt-4">
          <UserForm onUserAdded={addUser} roles = {roles} onClose={() => setShowForm(false)} />
        </div>
      )}
<div className="flex items-center justify-between">
      <h2 className="text-4xl text-[#DFB6B2] font-bold mt-8">Manage Users</h2>
      <button
        onClick={toggleForm}
        className="bg-[#d57878ae] text-[#000000] py-2 px-4 rounded-full hover:bg-white hover:text-rose-500"
      >
        {showForm ? "Cancel" : "Add New User"}
      </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <GridLoader
          color="rgba(225, 29, 72,1)"
          // size={100}
          />
        </div>
      ) : users.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
          {users.map((user) => (
            <>
            
          <div class="relative flex flex-col md:flex-row w-full my-6 bg-[#70425bd6] shadow-lg shadow-[#a38582be] rounded-lg">
             
             {userToUpdate && userToUpdate._id === user._id ? (
                <UpdateUser
                  user={userToUpdate}
                  onUpdate={updateUser}
                  roles = {roles}
                  onClose={() => setUserToUpdate(null)}
                />
              ) : ( 
                <>
  <div class="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
    <img
      src={`
        ${
          user.status === "active" ? "https://www.shutterstock.com/image-vector/young-smiling-man-adam-avatar-600nw-2107967969.jpg" : inuser
        }
        `}
      alt="card-image"
      class="h-full w-full rounded-md md:rounded-xl object-cover"
    />
  </div>
  <div class="p-6">
    <h4 class="mb-2 text-[#DFB6B2] text-2xl font-bold">
      {user.name}
    </h4>
    <div className="">
                  
                  <p>
                    <span className="font-bold">Role:</span> {user.role}
                  </p>
                  <p>
                    <span className="font-bold">Email:</span> {user.email}
                  </p>
                  <p>
                    <span className="font-bold">Status:</span> {user.status}
                  </p>
                </div>

          
    <div>
    {!userToUpdate || userToUpdate._id !== user._id ? (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-rose-600 text-white py-1 px-3 rounded-full hover:bg-rose-700"
                  >
                   <span className="flex items-center gap-1 justify-center rounded-full"> Delete <MdOutlineDelete /> </span>
                  </button>
                  <button
                    onClick={() => setUserToUpdate(user)}
                    className="bg-white py-1 px-3 rounded-full hover:bg-gray-400 text-rose-600 font-semibold"
                  >
                    <span className="flex items-center gap-1 justify-center"> Update <MdUpdate /></span>
                  </button>
                </div>
              ) : null}
    </div>
  </div>
              
  </>
            )}
</div> 
            {/* <div
              key={user._id}
              className={`bg-zinc-800 p-4 rounded-md shadow-md flex justify-between items-center
                ${
                user.status === "active" ? "border-green-500 border" : "border-red-500 border"
              }`}
            >
              {userToUpdate && userToUpdate._id === user._id ? (
                <UpdateUser
                  user={userToUpdate}
                  onUpdate={updateUser}
                  roles = {roles}
                  onClose={() => setUserToUpdate(null)}
                />
              ) : (
                <div>
                  <p>
                    <div className="flex items-center gap-2">
                      <ProfileIcon name={user.name} bgColor="bg-rose-500" textColor="text-white" />
                      <span className="font-bold">{user.name}</span> 
                    </div>
                  </p>
                  <p>
                    <span className="font-bold">Email:</span> {user.email}
                  </p>
                  <p>
                    <span className="font-bold">Role:</span> {user.role}
                  </p>
                  <p>
                    <span className="font-bold">Status:</span> {user.status}
                  </p>
                </div>
              )}

              {!userToUpdate || userToUpdate._id !== user._id ? (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-rose-600 text-white py-1 px-3 rounded-md hover:bg-rose-700"
                  >
                   <span className="flex items-center gap-1 justify-between"> Delete <MdOutlineDelete /> </span>
                  </button>
                  <button
                    onClick={() => setUserToUpdate(user)}
                    className="bg-white py-1 px-3 rounded-md hover:bg-gray-400 text-rose-600 font-semibold"
                  >
                    <span className="flex items-center gap-1 "> Update <MdUpdate /></span>
                  </button>
                </div>
              ) : null}
            </div> */}
            </>
          ))}
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default User;
