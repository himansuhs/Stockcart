import React from "react";
import { IoMdClose } from "react-icons/io";

function DisplayImage({ imgUrl, onClose }) {
  return (
    <div className="fixed bottom-0 right-0 left-0 top-0 flex justify-center items-center ">
      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto">
        <div
          className="w-fit ml-auto text-lg hover:text-red-600 cursor-pointer p-4"
          onClick={onClose}
        >
          <IoMdClose />
        </div>
        <div className="flex justify-center p-4 max-h-[80vh] max-w-[80vw]">
          <img src={imgUrl} alt="Product Image" className="w-full h-full " />
        </div>
      </div>
    </div>
  );
}

export default DisplayImage;
