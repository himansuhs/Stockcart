import { Outlet } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const [cartCount, setCartCount] = useState(1);
  const fetchUserDetails = async () => {
    const dataresponse = await fetch("http://localhost:4000/api/user-details", {
      method: "get",
      credentials: "include",
    });
    const dataApi = await dataresponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
    // console.log(dataresponse);
  };
  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(
      "http://localhost:4000/api/count-addToCart",
      {
        method: "get",
        credentials: "include",
      }
    );
    const dataApi = await dataResponse.json();
    console.log("dataapi", dataApi);
    setCartCount(dataApi?.data?.count);
  };
  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart(); // fetch user's add to cart count in the header
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, // fetch user details
          cartCount,
          fetchUserAddToCart, // cart count
        }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-60px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
