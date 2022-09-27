import React from "react";
import Header from "../Components/Header"
import Profile from "../Components/Profile"
import Sidemenu from "../Components/sidemenu"
import Footer from "../Components/Footer"

let Home = () => {
  return (
    <>
      <Header />
      <div className=" queryPage container-fluid">
        <div className="row">
          <div className="col-3 col-lg-3 col-md-2 col-sm-2 sidebar">
            <Sidemenu />
          </div>
          <div className="col-9 col-lg-9 col-md-9 col-sm-6 col-xs-5 col-5">
            <Profile />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
