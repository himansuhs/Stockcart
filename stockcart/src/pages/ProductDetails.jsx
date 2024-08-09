import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa6";
import displayCurrency from "../helpers/DisplayCurrency";
import VerticalCardProduct from "../component/VerticalCardProduct";
import CategoryWiseProductDisplay from "../component/CategoryWiseProductDisplay";

function ProductDetails() {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    ProductImage: [],
    description: "",
    price: "",
    selling: "",
  });
  const parms = useParams();
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageC, setZoomImageC] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const imageLoading = new Array(4).fill(null);
  console.log(parms);
  const fetchProduct = async () => {
    setLoading(true);
    const responseData = await fetch(
      "http://localhost:4000/api/product-details",
      {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: parms?.id }),
      }
    );
    setLoading(false);
    const dataResponse = await responseData.json();

    setData(dataResponse.data);
    setActiveImage(dataResponse.data.ProductImage[0]);
  };

  useEffect(() => {
    fetchProduct();
  }, [parms]);
  const handleMouseProduct = (imgUrl) => {
    setActiveImage(imgUrl);
  };
  const handleZoomProduct = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      // console.log(left, top, width, height);
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageC({ x, y });
    },
    [zoomImageC]
  );
  const handleZoomOut = () => {
    setZoomImage(false);
  };
  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4 ">
        {/* product image  */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4 relative">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200">
            <img
              src={activeImage}
              alt=""
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomProduct}
              onMouseLeave={handleZoomOut}
            />
            {/* product zoom  */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0 overflow-hidden">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px]  mix-blend-multiply scale-125"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageC.x * 100}% ${
                      zoomImageC.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {imageLoading.map(() => {
                  return (
                    <div className="h-20 w-20 bg-slate-200 animate-pulse"></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data.ProductImage.map((imgUrl, index) => {
                  return (
                    <div className="h-20 w-20 bg-slate-200" key={imgUrl}>
                      <img
                        src={imgUrl}
                        className="h-full w-full object-scale-down mix-blend-multiply p-1 cursor-pointer"
                        onMouseEnter={() => handleMouseProduct(imgUrl)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* product detail  */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse   rounded-full  w-full h-4 lg:h-8"></p>
            <h2 className="text-2xl lg:text-4xl bg-slate-200 animate-pulse font-medium w-full h-6 lg:h-8"></h2>
            <p className="capitalize text-slate-300 bg-slate-200 mim-w-[100px] w-full h-4 lg:h-8"></p>
            <div className="bg-slate-200 h-6 lg:h-8 animate-pulse flex items-center gap-1"></div>
            <div className="flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl animate-pulse bg-slate-200 h-4 lg:h-8">
              <p className="text-red-600"></p>
              <p className="text-slate-400 line-through h-6 lg:h-8 bg-slate-200 animate-pulse"></p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button className="h-6 lg:h-8 bg-slate-600 rounded animate-pulse"></button>
              <button className="h-6 lg:h-8 bg-slate-600 rounded animate-pulse"></button>
            </div>
            <div>
              <p className=" font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse"></p>
              <p className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <p className="bg-red-200 text-red-600 px-2 rounded-full  w-fit">
              {data.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data.productName}
            </h2>
            <p className="capitalize text-slate-300">{data.category}</p>
            <div className="text-red-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl ">
              <p className="text-red-600">{displayCurrency(data.selling)}</p>
              <p className="text-slate-400 line-through">
                {displayCurrency(data.price)}
              </p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white">
                Buy
              </button>
              <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] bg-red-600 font-medium text-white hover:text-red-600 hover:bg-white">
                Add to cart
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-1">Description</p>
              <p>{data.description}</p>
            </div>
          </div>
        )}
      </div>
      {data.category && (
        <CategoryWiseProductDisplay
          category={data.category}
          heading={"Recommended Product"}
        />
      )}
    </div>
  );
}

export default ProductDetails;
