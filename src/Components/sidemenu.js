import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { InfoCircleFill,ShieldFillCheck, CartPlusFill, PersonBoundingBox, Basket3Fill, ChatLeftTextFill, HouseDoorFill, QuestionCircleFill, PeopleFill, BookmarkHeartFill, PencilSquare } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import axios from "axios";
import Cookies from 'universal-cookie';
import { ToastContainer, toast, Flip } from 'react-toastify';

let SideMenu = () => {
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
                <div className="leftAside h-100 sidemenusection sidenav">
                        <div className="row  mt-4 justify-content-center">
                            <div className="col-8 col-lg-2 col-md-5 col-sm-7 ">
                                <HouseDoorFill className="text-white" size={25} />
                            </div>
                            <div className="col-lg-6 col-md-0 col-sm-0 d-none d-lg-block d-md-none d-sm-none" >
                                <Link className="text-white " to='/home' > Home </Link> 
                            </div>
                        </div>
                        <div className="row  mt-4 justify-content-center">
                            <div className="col-8 col-lg-2  col-md-5 col-sm-7">
                                <QuestionCircleFill className="text-white" size={25} />
                            </div>
                            <div className="col-lg-6 d-none d-lg-block d-md-none d-sm-none">
                                 <Link className="text-white"to="/questions"> Questions </Link> 
                            </div>
                        </div>
                        <div className="row  mt-4 justify-content-center">
                            <div className="col-8 col-lg-2  col-md-5 col-sm-7">
                                <Basket3Fill className="text-white" size={25} />
                            </div>
                            <div className="col-lg-6 d-none d-lg-block d-md-none d-sm-none">
                                 <Link className="text-white"to="/virtual/product"> Products </Link> 
                            </div>
                        </div>
                        <div className="row  mt-4 justify-content-center">
                            <div className="col-8 col-lg-2  col-md-5 col-sm-7">
                                <CartPlusFill className="text-white" size={25} />
                            </div>
                            <div className="col-lg-6 d-none d-lg-block d-md-none d-sm-none">
                                 <Link className="text-white"to="/virtual/sale"> Add Virtual Product </Link> 
                            </div>
                        </div>
                        <div className={AdminAccess ? 'row  mt-4 justify-content-center' : 'd-none'}>
                            <div className="col-8 col-lg-2  col-md-5 col-sm-7">
                                <ShieldFillCheck className="text-white" size={25} />
                            </div>
                            <div className="col-lg-6 d-none d-lg-block d-md-none d-sm-none">
                                 <Link className="text-white"to="/virtual/product/verify"> Verify Product </Link> 
                            </div>
                        </div>
                        <div className={dataAccess ? 'row  mt-4 justify-content-center text-white' : 'd-none'}>
                            <div className="col-8 col-lg-2  col-md-5 col-sm-7">
                                <BookmarkHeartFill  size={25} />
                            </div>
                            <div className="col-lg-6 d-none d-lg-block d-md-none d-sm-none">
                                 <Link className="text-white" to="/solutions"> Best Solutions </Link> 
                            </div>
                        </div>
                        <div className="row  mt-4 justify-content-center">
                            <div className="col-8 col-lg-2  col-md-5 col-sm-7">
                                <PeopleFill className="text-white" size={25} />
                            </div>
                            <div className="col-lg-6 d-none d-lg-block d-md-none d-sm-none">
                                 <Link className="text-white"to="/users"> Users </Link> 
                            </div>
                        </div>
                       
                            {
                                (token) &&
                                (UserId) &&
                                (firstname) &&
                                (lastname)
                                ?
                                <div className={dataAccess ? 'row  mt-4 justify-content-center ' : 'd-none'} >
                                    <div className="col-8 col-lg-2  col-md-5 col-sm-7">
                                        <PersonBoundingBox className="text-white" size={25} />
                                    </div>
                                    <div className="col-lg-6 d-none d-lg-block d-md-none d-sm-none">
                                    <Link className="text-white" to={profilePath}> User Profile </Link> 
                                    </div>
                                </div>
                                :
                                <div className={dataAccess ? 'row  mt-4 justify-content-center ' : 'd-none'}>
                                    <div className="col-8 col-lg-2  col-md-5 col-sm-7">
                                        <PersonBoundingBox className="text-white" size={25} />
                                    </div>
                                    <div className="col-lg-6 d-none d-lg-block d-md-none d-sm-none">
                                        <Link className="text-white" to={profileCreate}> Create Profile </Link> 
                                    </div>
                                </div>
                            }
    
                        <div className="row  mt-4 justify-content-center ">
                            <div className="col-8 col-lg-2  col-md-5 col-sm-7">
                                <ChatLeftTextFill className="text-white" size={25} />
                            </div>
                            <div className="col-lg-6 d-none d-lg-block d-md-none d-sm-none">
                                 <Link className="text-white" to="/contactus"> Contact Us </Link> 
                            </div>
                        </div>
                        <div className="row  mt-4 justify-content-center" >
                            <div className="col-8 col-lg-2  col-md-5 col-sm-7">
                                <InfoCircleFill className="text-white" size={25} />
                            </div>
                            <div className="col-lg-6 d-none d-lg-block d-md-none d-sm-none">
                                 <Link className="text-white" to="/aboutus"> About Us </Link> 
                            </div>
                        </div>
                        <div className="row  mt-4 justify-content-center d-lg-none">
                            <div className="col-8 col-lg-2  col-md-5 col-sm-7">
                                <PencilSquare className="text-white" size={25} />
                            </div>
                            <div className="col-lg-6 d-none d-lg-block d-md-none d-sm-none">
                                <Link className="link sidebutton" to="/query/create"> Add Query </Link>
                            </div>
                        </div>
                        <div className="row  mt-5 w-100">
                            <div className="col-12 col-lg-12 d-none d-lg-block mb-5 d-sm-none">
                                <Button className="btn btn-primary ml-5  w-75 addQuery text-dark"><Link className="link sidebutton" to="/query/create"> Add Query </Link></Button>
                                <ToastContainer
                                    position="top-right"
                                    autoClose={2000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                    limit={5}
                                    transition={Flip}
                                />
                            </div>
                       </div>
                       
                </div>
            </>
        );
}

export default SideMenu;