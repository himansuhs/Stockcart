import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEditOutline } from "react-icons/md";
import ChangeUserRole from "../component/ChangeUserRole";

function AllUsers() {
  const [allUsers, setAllUsers] = useState();
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateUser, setUpdateUser] = useState({
    name: "",
    email: "",
    role: "",
    _id: "",
  });
  const fetchUser = async () => {
    const fetchData = await fetch("http://localhost:4000/api/all-users", {
      method: "get",
      credentials: "include",
    });
    const dataApi = await fetchData.json();
    if (dataApi.success) {
      setAllUsers(dataApi.data);
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }

    console.log(dataApi);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="bg-white p-2">
      <table className="w-full userTable">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers &&
            allUsers.map((user, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{moment(user.createdAt).format("MMMM Do YYYY")}</td>
                  <td>
                    <button
                      className="bg-green-300 p-1 rounded-full cursor-pointer hover:bg-green-500"
                      onClick={() => {
                        setOpenUpdate((prev) => !prev);
                        setUpdateUser(user);
                      }}
                    >
                      <MdModeEditOutline />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {openUpdate && (
        <ChangeUserRole
          onClose={() => setOpenUpdate(false)}
          name={updateUser.name}
          email={updateUser.email}
          role={updateUser.role}
          userId={updateUser._id}
          callFunc={fetchUser}
        ></ChangeUserRole>
      )}
    </div>
  );
}

export default AllUsers;
