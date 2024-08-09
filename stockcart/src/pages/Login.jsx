import React, { useContext, useState } from "react";
import loginIcons from "../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataresponse = await fetch("http://localhost:4000/api/login", {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataApi = await dataresponse.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails(); // fetch user details
      fetchUserAddToCart();
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };
  console.log(data);
  return (
    <section>
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcons} alt="" />
          </div>
          <form className="pt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-100 p-1">
                <input
                  type="email"
                  required
                  placeholder="enter email"
                  name="email"
                  value={data.email}
                  onChange={handleOnchange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>Password:</label>
              <div className="bg-slate-100 p-1 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="enter password"
                  name="password"
                  value={data.password}
                  onChange={handleOnchange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forget-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                forget password
              </Link>
            </div>
            <button className="bg-red-600 text-white px-4 py-1 w-full max-w-[140px] rounded-full hover:scale-105 transition-all mx-auto block mt-5 hover:bg-red-700">
              Login
            </button>
          </form>
          <p className="my-5">
            Don't have an account ?{" "}
            <Link
              to={"/sign-up"}
              className="hover:text-red-600 hover:underline text-red-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
