const url = `https://api.cloudinary.com/v1_1/dq7haxwr2/image/upload`;

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "stockcart");
  const dataResponse = await fetch(url, {
    method: "post",
    body: formData,
  });

  return dataResponse.json();
};
export default uploadImage;
