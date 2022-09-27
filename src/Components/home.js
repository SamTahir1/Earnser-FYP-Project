import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image  } from "react-bootstrap";
import { ToastContainer, toast, Flip } from 'react-toastify';
import axios from "axios";
import Cookies from 'universal-cookie';
import { InfoCircleFill,ShieldFillCheck, CartPlusFill, PersonBoundingBox, Basket3Fill, ChatLeftTextFill, HouseDoorFill, QuestionCircleFill, PeopleFill, BookmarkHeartFill, PencilSquare } from 'react-bootstrap-icons';
import HomePgImg from '../images/homepage.png';

let Home = () => {
    let cookies = new Cookies();
    let UserId = cookies.get('userid');
    let token = cookies.get('token');
    let UserRole = cookies.get('role');
    let profilePath = "/profile/"+UserId+"/view";
    let profileCreate = "/profile/create";
    let [firstname,setFirstName]=useState("");
    let [lastname,setLastName]=useState("");
    let [gender,setGender]=useState("");
    let [dataAccess,setDataAccess]=useState(false);
    let [AdminAccess,setAdminAccess]=useState(false);   

    let url = "http://localhost:9000/api/profile/"+UserId+"/view";


    useEffect(() => {
        getProfile();
    });

    useEffect(() => {
        if(token){
            setDataAccess(true)
        }
    },[token])

    useEffect(() => {
        if(UserRole === "admin"){
            setAdminAccess(true)
        }
    },[AdminAccess])
    
    let errorNotify = (error) =>  toast.error(error, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
    });
    
    let getProfile =async (e) => {
        try{
            let response = await axios.get(url);
            setFirstName(response?.data?.data_user_profile?.[0]?.firstName)
            setLastName(response?.data?.data_user_profile?.[0]?.lastName)
            setGender(response?.data?.data_user_profile?.[0]?.gender)
        } catch (err) {
            let errmsg = err?.response?.data?.message;
            errorNotify(errmsg)
        }
    }
    





    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="createQuery mx-1 mx-xl-3 mx-lg-3 mx-sm-1 mx-md-1 my-5 ">
                        <div className="row">
                            <div className="col-12 w-100">
                                <div className="d-flex justify-content-center">
                                    <div className="queryHeader header_box d-flex justify-content-center p-0 p-xl-2 p-lg-2 p-md-1 p-sm-0 w-75 w-xl-50 w-lg-50 w-md-75 w-sm-75"><h2>Welcome To Earnser</h2></div>
                                </div>
                                <div className="col-12 w-100 my-5">
                                    <div className="row  mt-5 justify-content-center">
                                        <div className="homePageIcon d-flex justify-content-center col-1 col-lg-1 col-md-1 col-sm-1 ">
                                            <Link className="text-dark my-4 mx-4" to='/home' >
                                                <HouseDoorFill className="text-dark" size={50} />
                                            </Link>
                                        </div>
                                        <div className="homePageIcon d-flex justify-content-center col-1 col-lg-1 col-md-1 col-sm-1 ">
                                            <Link className="text-dark my-4 mx-4" to='/questions' >
                                                <QuestionCircleFill className="text-dark" size={50} />
                                            </Link>
                                        </div>
                                        <div className="homePageIcon d-flex justify-content-center col-1 col-lg-1 col-md-1 col-sm-1 ">
                                            <Link className="text-dark my-4 mx-4" to='/virtual/product' >
                                                <Basket3Fill className="text-dark" size={50} />
                                            </Link>
                                        </div>
                                        <div className="homePageIcon d-flex justify-content-center col-1 col-lg-1 col-md-1 col-sm-1 ">
                                            <Link className="text-dark my-4 mx-4" to='/virtual/sale' >
                                                <CartPlusFill className="text-dark" size={50} />
                                            </Link>
                                        </div>
                                        <div className={AdminAccess ? 'homePageIcon d-flex justify-content-center col-1 col-lg-1 col-md-1 col-sm-1' : 'd-none'}>
                                            <Link className="text-dark my-4 mx-4" to='/virtual/product/verify' >
                                                <ShieldFillCheck className="text-dark" size={50} />
                                            </Link>
                                        </div>
                                        <div className={AdminAccess ? 'homePageIcon d-flex justify-content-center col-1 col-lg-1 col-md-1 col-sm-1' : 'd-none'}>
                                            <Link className="text-dark my-4 mx-4" to='/solutions' >
                                                <BookmarkHeartFill className="text-dark" size={50} />
                                            </Link>
                                        </div>
                                        <div className="homePageIcon d-flex justify-content-center col-1 col-lg-1 col-md-1 col-sm-1 ">
                                            <Link className="text-dark my-4 mx-4" to='/users' >
                                                <PeopleFill className="text-dark" size={50} />
                                            </Link>
                                        </div>
                                        {
                                            (token) &&
                                            (UserId) &&
                                            (firstname)
                                            ?
                                            <div className={AdminAccess ? 'homePageIcon d-flex justify-content-center col-1 col-lg-1 col-md-1 col-sm-1' : 'd-none'}>
                                                <Link className="text-dark my-4 mx-4" to={profilePath} >
                                                    <PersonBoundingBox className="text-dark" size={50} />
                                                </Link>
                                            </div>
                                            :
                                            <div className={AdminAccess ? 'homePageIcon d-flex justify-content-center col-1 col-lg-1 col-md-1 col-sm-1' : 'd-none'}>
                                                <Link className="text-dark my-4 mx-4" to={profileCreate} >
                                                    <PersonBoundingBox className="text-dark" size={50} />
                                                </Link>
                                            </div>
                                        } 
                                         <div className="homePageIcon d-flex justify-content-center col-1 col-lg-1 col-md-1 col-sm-1 ">
                                            <Link className="text-dark my-4 mx-4" to='/contactus' >
                                                <ChatLeftTextFill className="text-dark" size={50} />
                                            </Link>
                                        </div>
                                        <div className="homePageIcon d-flex justify-content-center col-1 col-lg-1 col-md-1 col-sm-1 ">
                                            <Link className="text-dark my-4 mx-4" to='/aboutus' >
                                                <InfoCircleFill className="text-dark" size={50} />
                                            </Link>
                                        </div>
                                        <div className="homePageIcon d-flex justify-content-center col-1 col-lg-1 col-md-1 col-sm-1 ">
                                            <Link className="text-dark my-4 mx-4" to='/query/create' >
                                                <PencilSquare className="text-dark" size={50} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <Image className="w-100 text-dark" src={HomePgImg} alt="EARNSER" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;