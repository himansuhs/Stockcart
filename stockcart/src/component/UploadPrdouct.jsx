import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../helpers/ProductCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/UploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

function UploadPrdouct({ onClose, fetchdata }) {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    ProductImage: [],
    description: "",
    price: "",
    selling: "",
  });
  const [openfullScreen, setOpenfullScreen] = useState(false);
  const [fullScreen, setFullScreen] = useState("");
  // const [uploadImageInput, setUploadImageInput] = useState("");
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    // setUploadImageInput(file.name);
    // const imagePic = await ImageToBase64(file);
    const uploadImageCloundinary = await uploadImage(file);
    setData((prev) => {
      return {
        ...prev,
        ProductImage: [...prev.ProductImage, uploadImageCloundinary.url],
      };
    });
    // console.log("Uploading image", uploadImageCloundinary.url);
  };
  const handleDelete = async (index) => {
    const newProductImage = [...data.ProductImage];
    newProductImage.splice(index, 1);

    setData((prev) => {
      return {
        ...prev,
        ProductImage: [...newProductImage],
      };
    });
  };

  //  submit product
  const handleUploadProduct = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/upload-product", {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.success) {
      toast.success(result?.message);
      onClose();
      fetchdata();
    }
    if (result.error) {
      toast.error(result?.message);
    }
  };

  return (
    <div className="fixed  w-full h-full left-0 right-0 top-0 bottom-0 flex justify-center items-center bg-slate-200 bg-opacity-35">
      <div className="bg-white p-4 rounded w-full max-w-xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div
            className="w-fit ml-auto text-lg hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <IoMdClose />
          </div>
        </div>
        <form
          className="grid p-4 gap-3 overflow-y-scroll h-full"
          onSubmit={handleUploadProduct}
        >
          <label htmlFor="productName">Product Name :</label>
          <input
            type="text"
            name="productName"
            placeholder=" enter product name"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="brandName">Brand Name :</label>
          <input
            type="text"
            name="brandName"
            placeholder="enter brand name"
            value={data.brandName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="category">Category :</label>
          <select
            value={data.category}
            onChange={handleOnChange}
            name="category"
            className="p-2 bg-slate-100 border rounded"
          >
            <option value={""}>select category</option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="productImage">Product Image :</label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col ">
                <span className="text-5xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.ProductImage[0] ? (
              <div className="flex items-center gap-2">
                {data.ProductImage.map((el, index) => {
                  return (
                    <div className="relative group">
                      <img
                        src={el}
                        width={80}
                        height={80}
                        key={el}
                        alt={el}
                        className="m-2 bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setOpenfullScreen(true);
                          setFullScreen(el);
                        }}
                      />
                      <div
                        className="absolute right-0 bottom-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleDelete(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-500 text-xs">
                *Please Upload product Image
              </p>
            )}
          </div>
          <label htmlFor="price">price :</label>
          <input
            type="number"
            name="price"
            placeholder="enter price"
            value={data.price}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="selling">selling price :</label>
          <input
            type="number"
            name="selling"
            placeholder="enter selling price"
            value={data.selling}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          />
          <label htmlFor="description">description :</label>
          <textarea
            rows={3}
            name="description"
            placeholder="enter description"
            value={data.description}
            onChange={handleOnChange}
            className="h-28 bg-slate-100 border resize-none p-1"
            required
          ></textarea>

          <button className="px-3 py-1 bg-red-600 text-white mb-10 hover:bg-red-800">
            upload product
          </button>
        </form>
      </div>

      {/* displayimage full  */}
      {openfullScreen && (
        <DisplayImage
          onClose={() => setOpenfullScreen(false)}
          imgUrl={fullScreen}
        ></DisplayImage>
      )}
    </div>
  );
}

export default UploadPrdouct;
