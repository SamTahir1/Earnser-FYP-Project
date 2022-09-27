import React from "react";
import Header from "../Components/Header";
import Home from "../Components/home";
import Footer from "../Components/Footer"

let homePage = () => {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-12 col-md-10 col-sm-10">
            <div className="row">
              <div className="col-12 main-content">
                <Home />
              </div>
              <div className="col-12">
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </>
  );
};

export default homePage;
