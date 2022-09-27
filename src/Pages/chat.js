import React,{useState,useEffect,useRef} from "react";
import Header from "../Components/Header";
import Sidemenu from "../Components/sidemenu";
import Footer from "../Components/Footer"
import ChatMsg from "../Components/messageForm"
let Chat = () => {
  

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 col-xl-3 col-lg-3 col-md-2 col-sm-2 sidebar">
            <Sidemenu />
          </div>
          
          <div className="col-9 col-lg-9 col-md-10 col-sm-10">
          <div className="row">
            <div className="col-12 w-100 mt-4">
              <div className="d-flex justify-content-center">
                  <div className="queryHeader header_box d-flex justify-content-center p-0 p-xl-2 p-lg-2 p-md-1 p-sm-0 w-75 w-xl-50 w-lg-50 w-md-75 w-sm-75"><h3>Earnser Group Community</h3></div>
              </div>
              <div className="col-12 w-100 my-5">
              <ChatMsg />
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <Footer />
      </>
  );
};

export default Chat;
