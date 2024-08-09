import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";
import { toast } from "react-toastify";

function AdminPanel() {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
      toast.error("Unauthorized Access!");
      return; // stop the function execution if user is not admin.
    }
  }, []);
  return (
    <div className="min-h-[calc(100vh-180px)] md:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-60 customShadow">
        <div className="h-32  flex justify-center items-center flex-col ">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt={user?.name}
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <FaRegUserCircle />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>
        <div>
          <nav className="grid p-4">
            <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">
              All Users
            </Link>
            <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">
              Products
            </Link>
          </nav>
        </div>
      </aside>
      <main className="h-full w-full p-2">
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default AdminPanel;
