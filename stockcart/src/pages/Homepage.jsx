import React from "react";
import CategoryList from "../component/CategoryList";
import BannerProduct from "../component/BannerProduct";
import HorizontalCardProduct from "../component/HorizontalCardProduct";
import VerticalCardProduct from "../component/VerticalCardProduct";

function Homepage() {
  return (
    <div>
      <CategoryList></CategoryList>
      <BannerProduct></BannerProduct>
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpods"} />
      <HorizontalCardProduct category={"watches"} heading={"Smart watches"} />
      <VerticalCardProduct category={"mobile"} heading={"Mobiles"} />
    </div>
  );
}

export default Homepage;
