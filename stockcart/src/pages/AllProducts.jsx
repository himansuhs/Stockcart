import React, { useEffect, useState } from "react";
import UploadPrdouct from "../component/UploadPrdouct";
import AdminProduct from "../component/AdminProduct";

function AllProducts() {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const fetchAllProducts = async () => {
    const response = await fetch("http://localhost:4000/api/get-products");
    const dataResponse = await response.json();
    setAllProduct(dataResponse?.data || []);
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <div>
      <div className="bg-white py-2 px-4 flex items-center justify-between">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border-2 py-1 px-3 rounded-full border-red-600 text-red-600 hover:bg-red-700 hover:text-white transition-all"
          onClick={() => setOpenUploadProduct((prev) => !prev)}
        >
          Upload product
        </button>
      </div>

      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-280px)] overflow-y-auto">
        {allProduct.map((product, index) => {
          return (
            <AdminProduct
              data={product}
              key={index + "allProduct"}
              fetchdata={fetchAllProducts}
            />
          );
        })}
      </div>

      {/* all product component  */}
      {openUploadProduct && (
        <UploadPrdouct
          onClose={() => setOpenUploadProduct(false)}
          fetchdata={fetchAllProducts}
        ></UploadPrdouct>
      )}
    </div>
  );
}

export default AllProducts;
