import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CategoryList() {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);
  const fectCategoryData = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:4000/api/get-category");
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse?.data || []);
    console.log(dataResponse);
    // console.log(categoryProduct);
    //  console.log(dataResponse.data);
  };

  useEffect(() => {
    fectCategoryData();
  }, []);
  return (
    <>
      <div className="container mx-auto p-3">
        <div className="flex items-center justify-between gap-3 overflow-scroll scrollbar-none ">
          {loading
            ? categoryLoading.map((loading, index) => {
                return (
                  <div
                    key={index}
                    className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                  ></div>
                );
              })
            : categoryProduct.map((product, index) => {
                return (
                  <Link
                    to={"/product-category?category=" + product?.category}
                    className="cursor-pointer"
                    key={index}
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-5 bg-slate-200 flex items-center justify-center ">
                      <img
                        src={product?.ProductImage[0]}
                        alt={product.category}
                        className="h-full object-scale-down mix-blend-multiply hover:scale-150 transition-all"
                      />
                    </div>
                    <p className="text-center text-sm md:text-base capitalize">
                      {product.category}
                    </p>
                  </Link>
                );
              })}
        </div>
      </div>
    </>
  );
}

export default CategoryList;
