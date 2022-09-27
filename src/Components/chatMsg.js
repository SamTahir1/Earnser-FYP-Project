import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, Badge, FormText } from "react-bootstrap";
import axios from "axios";
import Cookies from 'universal-cookie';


let ChatMsg = () => {
    let cookies = new Cookies();
    console.log(cookies.get('token')) 


    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="createQuery mx-1 mx-xl-3 mx-lg-3 mx-sm-1 mx-md-1 my-5 ">
                        <div className="row">
                            <div className="col-12 w-100">
                                <div className="d-flex justify-content-center">
                                    
                                </div>
                                <div className="container my-5">
                                   Chating
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatMsg;