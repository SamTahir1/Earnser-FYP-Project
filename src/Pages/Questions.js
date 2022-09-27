import React from "react";
import Header from "../Components/Header";
import Sidemenu from "../Components/sidemenu";
import Questions from "../Components/allQuestions";
import Footer from "../Components/Footer"

let AllQuestions = () => {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 col-xl-3 col-lg-3 col-md-2 col-sm-2 sidebar">
            <Sidemenu />
          </div>
          <div className="col-9 col-lg-9 col-md-10 col-sm-10">
            <Questions />
          </div>
        </div>
      </div>
      <Footer />
      </>
  );
};

export default AllQuestions;
