import React, { useState } from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

function ChangeUserRole({ name, email, role, onClose, userId, callFunc }) {
  const [changeRole, setChangeRole] = useState(role);
  const handleOnChange = (e) => {
    setChangeRole(e.target.value);
  };
  const updateUserRole = async (e) => {
    const fetchResponse = await fetch("http://localhost:4000/api/update-user", {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: changeRole,
        userId: userId,
      }),
    });
    const responseData = await fetchResponse.json();

    if (responseData.success) {
      onClose();
      toast.success("Role updated successfully");
      callFunc();
    }
    console.log("role updated", responseData);
  };
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0  w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className=" mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name : {name}</p>
        <p>Email : {email}</p>
        <div className="flex items-center justify-between">
          <p>Role:</p>
          <select
            className="border px-4 py-1 cursor-pointer my-4"
            value={changeRole}
            onChange={handleOnChange}
          >
            {Object.values(ROLE).map((el) => {
              return <option key={el}>{el}</option>;
            })}
          </select>
        </div>
        <button
          className="w-fit mx-auto block  p-2 rounded-full py-1 px-3 bg-red-600 text-white hover:bg-red-800"
          onClick={updateUserRole}
        >
          change role
        </button>
      </div>
    </div>
  );
}

export default ChangeUserRole;
