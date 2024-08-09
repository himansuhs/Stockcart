import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayCurrency from "../helpers/DisplayCurrency";

function AdminProduct({ data, fetchdata }) {
  const [openEdit, setOpenEdit] = React.useState(false);
  return (
    <div className="bg-white p-2 rounded">
      <div className="w-40">
        <div className="h-32 w-32 flex justify-center items-center">
          <img
            src={data.ProductImage[0]}
            width={80}
            height={100}
            className="object-fill mx-auto my-auto h-full w-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>
        <div>
          <p className="font-semibold">{displayCurrency(data.selling)}</p>

          <div
            className="w-fit ml-auto p-1 bg-green-100   hover:bg-green-500 rounded-full hover:text-white cursor-pointer"
            onClick={() => setOpenEdit((prev) => !prev)}
          >
            <MdModeEditOutline />
          </div>
        </div>
      </div>
      {openEdit && (
        <AdminEditProduct
          Productdata={data}
          onClose={() => setOpenEdit(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
}

export default AdminProduct;
