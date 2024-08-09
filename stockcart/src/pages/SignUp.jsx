import React, { useState } from "react";
import loginIcons from "../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ImageToBase64 from "../helpers/ImageToBase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    Cpassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await ImageToBase64(file);

    setData((prev) => {
      return { ...prev, profilePic: imagePic };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.Cpassword) {
      const dataresponse = await fetch("http://localhost:4000/api/signup", {
        method: SummaryApi.SignUp.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataApi = await dataresponse.json();
      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }
      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      console.log("plz check password and confirm password");
    }
  };

  return (
    <section>
      <div className="mx-auto container p-4">
        <div className="shadow-md p-5 w-full max-w-sm mx-auto border-4 border-[#5d3a5a]">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcons} alt="" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-slate-200 bg-opacity-80 py-3 text-center absolute bottom-0 w-full cursor-pointer">
                  upload photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          <form className="pt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="grid">
              <label className="text-white">Name</label>
              <div className="border-[#5d3a5a] border-4 p-1 rounded-md">
                <input
                  type="text"
                  required
                  placeholder="enter your name"
                  name="name"
                  value={data.name}
                  onChange={handleOnchange}
                  className="w-full h-full outline-none bg-transparent text-white"
                />
              </div>
            </div>
            <div className="grid">
              <label className="text-white">Email</label>
              <div className="border-[#5d3a5a] border-4  rounded-md p-1">
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
              <label className="text-white">Password</label>
              <div className="border-[#5d3a5a] border-4  rounded-md p-1 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="enter password"
                  name="password"
                  value={data.password}
                  onChange={handleOnchange}
                  className="w-full h-full outline-none bg-transparent text-white"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span style={{ color: "white" }}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label className="text-white">Confirm Password</label>
              <div className="border-[#5d3a5a] border-4  rounded-md p-1 flex">
                <input
                  type={showCPassword ? "text" : "password"}
                  required
                  placeholder="enter confirm password"
                  name="Cpassword"
                  value={data.Cpassword}
                  onChange={handleOnchange}
                  className="w-full h-full outline-none bg-transparent text-white"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowCPassword((prev) => !prev)}
                >
                  <span style={{ color: "white" }}>
                    {showCPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <button className="border-[#5d3a5a] border-4 text-white px-4 py-1 w-full max-w-[140px] rounded-full hover:scale-105 transition-all mx-auto block mt-5 hover:bg-[#b08fb3]">
              SignUp
            </button>
          </form>
          <p className="my-5 text-[#4b0082]">
            Already have an account ?{" "}
            <Link
              to={"/login"}
              className="hover:text-red-600 hover:underline text-red-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
