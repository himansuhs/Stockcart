import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryProduct from "../helpers/FetchCategoryProduct";
import displayCurrency from "../helpers/DisplayCurrency";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

function HorizontalCardProduct({ category, heading }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);

  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();
  const { fetchUserAddToCart } = useContext(Context);
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryProduct(category);
    setLoading(false);

    setData(categoryProduct?.data);
    console.log(categoryProduct.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none translate-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-2 absolute left-0 text-lg hidden md:block opacity-60"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-2 absolute right-0 text-lg hidden md:block transition-all opacity-60"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>
        {loading
          ? loadingList.map((product, index) => {
              return (
                <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse">
                    {/* <img
                      src={product.ProductImage[0]}
                      alt=""
                      className="object-scale-down h-full hover:scale-125 transition-all mix-blend-multiply"
                    /> */}
                  </div>
                  <div className="p-1 md:p-2 grid w-full gap-2">
                    <h2 className="font-medium md:text-lg text-base text-ellipsis line-clamp-1 text-black bg-slate-200 p-1 animate-pulse rounded-full"></h2>
                    <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
                    <div className="flex gap-2 w-full">
                      <p className="text-red-600 font-medium text-sm p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                      <p className="text-slate-500 line-through text-sm p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                    </div>

                    <button className=" text-white py-0.5 px-3 rounded-full text-sm w-full bg-slate-200 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  to={"product/" + product._id}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
                >
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] ">
                    <img
                      src={product.ProductImage[0]}
                      alt=""
                      className="object-scale-down h-full hover:scale-125 transition-all mix-blend-multiply"
                    />
                  </div>
                  <div className="p-1 md:p-2 space-y-0.5">
                    <h2 className="font-medium md:text-lg text-base text-ellipsis line-clamp-1 text-black">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product.category}
                    </p>
                    <div className="flex gap-2">
                      <p className="text-red-600 font-medium text-sm">
                        {displayCurrency(product.selling)}
                      </p>
                      <p className="text-slate-500 line-through text-sm">
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
    </div>
  );
}

export default HorizontalCardProduct;
