import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

function Header() {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const context = useContext(Context);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);
  // console.log(user);

  const handleLogout = async () => {
    const fetchData = await fetch("http://localhost:4000/api/user-logout", {
      method: "get",
      credentials: "include",
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }
    if (data.error) {
      toast.error(data.message);
    }
  };
  // console.log("header add to cart", context);
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };
  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"}>
            <Logo w={100} h={50} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none "
            onChange={handleSearch}
          />
          <div
            className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white  "
            onChange={handleSearch}
            value={search}
          >
            <GrSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <FaRegUserCircle />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-4 shadow-lg rounded ">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"admin-panel/all-products"}
                      className="whitespace-nowrap hover:bg-slate-200 p-2 "
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      Admin panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <span>
                <IoMdCart />
              </span>
              <div className="bg-red-600 text-white w-4 p-1 h-4 rounded-full flex items-center justify-center absolute top-0 -right-2">
                <p className="text-xs">{context?.cartCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <Link
                to={"/"}
                onClick={handleLogout}
                className="px-3 py-1 bg-red-600 rounded-full text-white hover:bg-red-800"
              >
                logout
              </Link>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 bg-red-600 rounded-full text-white hover:bg-red-800"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
