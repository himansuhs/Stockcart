import React, { useContext } from "react";
import displayCurrency from "../helpers/DisplayCurrency";
import Context from "../context";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";
import scrollTop from "../helpers/scrollTop";

function VerticalProductCard({ loading, data = [] }) {
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCart } = useContext(Context);
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] md:justify-between  justify-center md:gap-6 overflow-x-scroll scrollbar-none translate-all">
      {/* <button
      className="bg-white shadow-md rounded-full p-2 absolute left-0 text-lg hidden md:block "
      onClick={scrollLeft}
    >
      <FaAngleLeft />
    </button>
    <button
      className="bg-white shadow-md rounded-full p-2 absolute right-0 text-lg hidden md:block transition-all "
      onClick={scrollRight}
    > */}

      {loading
        ? loadingList.map((product, index) => {
            return (
              <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow ">
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse ">
                  {/* <img
                src={product.ProductImage[0]}
                alt=""
                className="object-scale-down h-full hover:scale-125 transition-all"
              /> */}
                </div>
                <div className="p-2 md:p-1.6 grid gap-3">
                  <h2 className="font-medium md:text-lg text-base text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200"></h2>
                  <p className="capitalize text-slate-500 p-1 py-2 animate-pulse rounded-full bg-slate-200"></p>
                  <div className="flex gap-2">
                    <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2 "></p>
                    <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                  </div>

                  <button className=" text-white py-2 px-2  text-sm  animate-pulse rounded-full bg-slate-200"></button>
                </div>
              </div>
            );
          })
        : data.map((product, index) => {
            return (
              <Link
                to={"/product/" + product._id}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow "
                onClick={scrollTop}
              >
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center ">
                  <img
                    src={product.ProductImage[0]}
                    alt=""
                    className="object-scale-down h-full hover:scale-125 transition-all"
                  />
                </div>
                <div className="p-2 md:p-1.6 grid gap-3">
                  <h2 className="font-medium md:text-lg text-base text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product.category}
                  </p>
                  <div className="flex gap-2">
                    <p className="text-red-600 font-medium">
                      {displayCurrency(product.selling)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayCurrency(product.price)}
                    </p>
                  </div>

                  <button
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded-full text-sm "
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to cart
                  </button>
                </div>
              </Link>
            );
          })}
    </div>
  );
}

export default VerticalProductCard;
