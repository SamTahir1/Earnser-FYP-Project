import React from "react";
import Header from "../Components/Header";
import Sidemenu from "../Components/sidemenu";
import BuyProduct from "../Components/buyProduct";
import Footer from "../Components/Footer"

let Query = () => {
  return (
    <>
      <Header />
      <div className="queryPage container-fluid">
        <div className="row">
          <div className="col-3 col-lg-3 col-md-2 col-sm-2">
            <Sidemenu />
          </div>
          <div className="col-9 col-lg-9 col-md-9 col-sm-9">
            <BuyProduct />
          </div>
        </div>
         </div>
        <Footer />
        
    </>
  );
};

export default Query;