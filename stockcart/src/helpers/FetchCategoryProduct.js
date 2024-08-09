const fetchCategoryProduct = async (category) => {
  const response = await fetch("http://localhost:4000/api/category-product", {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category: category }),
  });
  const dataResponse = await response.json();

  return dataResponse;
};
export default fetchCategoryProduct;
