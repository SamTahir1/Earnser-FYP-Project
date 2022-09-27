import React from "react";
import Header from "../Components/Header";
import Sidemenu from "../Components/sidemenu";
import ViewQuery from "../Components/viewQuery";
import Answers from "../Components/viewAnswer";
import AddAnswer from "../Components/addAnswer";
import Footer from "../Components/Footer"

let Query = () => {
  return (
    <>
      <Header />
      <div className="queryPage container-fluid">
        <div className="row">
          <div className="col-3 col-lg-3 col-md-2 col-sm-2 sidebar">
            <Sidemenu />
          </div>
          <div className="col-9 col-lg-9 col-md-9 col-sm-9">
            <ViewQuery />
            <div className="row">
              <div className="col-12">
                <Answers />
              </div>
              <div className="col-12">
                <AddAnswer />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

    </>
  );
};

export default Query;