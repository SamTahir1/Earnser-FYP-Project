import React from "react";
import SignUp from "../Components/CreateAccount";
import Header from "../Components/Header";
import Footer from "../Components/Footer"

let SignUP = () => {
  return (
    <>
      <Header />
      <div>
        <SignUp />
      </div>
      <Footer />
    </>
  );
};

export default SignUP;
