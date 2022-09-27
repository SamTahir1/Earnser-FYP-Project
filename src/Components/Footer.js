import React from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "react-bootstrap-icons";


let Footer = () => {
  return (
    <div className="Footer pt-1" >
      <div className="text-center">
          <div className="d-flex justify-content-center mt-5 mb-3">
            <div className="text-white px-2 px-xl-3 px-lg-3 px-md-3 px-sm-2">
              <a href="www.facebook.com"><Facebook className="footor-icon" size="40" /></a>
            </div>
            <div className="text-white px-3">
              <a href="www.facebook.com"><Twitter className="footor-icon" size="40" /></a>
            </div>
            <div className="text-white px-3">
              <a href="www.facebook.com"><Instagram className="footor-icon" size="40"/></a>
            </div>
            <div className="text-white px-3">
              <a href="www.facebook.com"><Linkedin className="footor-icon" size="40"/></a>
            </div>
          </div>
        <div className="footer-copyright text-center pt-3 pb-4">
          <div className="text-white">
            &copy; {new Date().getFullYear()} Copyright: <a> Earnser </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;