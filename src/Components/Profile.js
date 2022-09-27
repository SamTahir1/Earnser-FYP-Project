import React, { useEffect, useState  } from "react";
import { Button, Badge, Image } from 'react-bootstrap';
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from 'universal-cookie';
import defaultImage from "../upload/profile/profile.jpeg";


let Profile = () => {
    let cookies = new Cookies();
    let UserId = cookies.get('userid');
    let [profile,setProfile]=useState("");
    let [username,setUsername]=useState("");
    let [points,setPoints]=useState("");
    let [rupees,setRupees]=useState("");
    let [firstname,setFirstName]=useState("");
    let [lastname,setLastName]=useState("");
    let [gender,setGender]=useState("");
    let [phone,setPhone]=useState("");
    let [skills,setSkills]=useState("");
    let [email,setEmail]=useState(""); 
    // let [errorMsg,seterrorMsg]=useState(""); 

    let location = useLocation()
    let currentPath = location.pathname.split('/')
    let currentUserId = currentPath[2].toUpperCase()

    let url = "http://localhost:9000/api/profile/"+currentUserId+"/view";
    let path = "/profile/"+currentUserId+"/edit";

    useEffect(() => {
        getProfile();
   });

    let getProfile =async (e) => {
        try{
            let response = await axios.get(url);  
            setProfile(response?.data?.data_user_profile?.[0]?.profile)
            setFirstName(response?.data?.data_user_profile?.[0]?.firstName)
            setLastName(response?.data?.data_user_profile?.[0]?.lastName)
            setPhone(response?.data?.data_user_profile?.[0]?.phone)
            setSkills(response?.data?.data_user_profile?.[0]?.skills)
            setGenderValue(response?.data?.data_user_profile?.[0]?.gender)
            setUsername(response?.data?.data_user_profile?.[1]?.username)
            setEmail(response?.data?.data_user_profile?.[1]?.email)
            setPoints(response?.data?.data_user_profile?.[0]?.points)
            setRupees(response?.data?.data_user_profile?.[0]?.rupees)
        } catch(err){
            // let errmsg = err?.response?.data?.message;
            // seterrorMsg(errmsg)
        }
    }

    let getprofile = (profile) => {
        if(profile){
            var ProfilePath = require( "./upload/profile/"+profile );
            return <Image className="Profile w-25 h-25 rounded-circle " alt="Profile Image" width={25} height={25} src={ProfilePath} />
        }else{
            return <Image className="Profile w-25 h-25 rounded-circle " src={defaultImage} />
       }
    }
    let setGenderValue = (gender) => {
        if(gender === true){
            setGender("Male")
        }else{
            setGender("Female")
        }
    }
    

    return (
        <>
        <div className="row">
            <div className="col-12">
                <div className="row mb-2 text-white mt-5 d-flex justify-content-center">
                    {getprofile(profile)}
                </div>
                <div className="row d-flex justify-content-center ">
                    <h2>{username}</h2>
                </div>
            </div>
            <div className="col-12 mb-5  d-flex justify-content-center">
                <div className="col-12">
                    <div className="row mt-5 ">
                        <div className="col-6 d-flex justify-content-center">
                            <Badge className="p-2 points" bg="primary" pill> Points {points} </Badge>
                        </div>
                        <div className="col-6 d-flex justify-content-center">
                            <Badge className="p-2 pkr" bg="success" pill> PKR {rupees} </Badge>
                        </div>
                    </div>
                    <div className="row mt-5 ">
                        <div className="col-6 d-flex justify-content-center">
                            <label><b>First Name</b></label>
                            <div className="ml-2"> {firstname} </div>
                        </div>

                        <div className="col-6 d-flex justify-content-center">
                            <label><b>Last Name</b></label>
                            <div className="ml-2">{lastname}</div>
                        </div>
                    </div>
                    <div className="row mt-3 ">
                        <div className="col-6 d-flex justify-content-center">
                            <label><b>Gender</b></label>
                            <div className="ml-2">{gender}</div>
                        </div>

                        <div className="col-6 d-flex justify-content-center">
                            <label><b>Phone</b></label>
                            <div className="ml-2">{phone}</div>
                        </div>
                    </div>
                    <div className="row mt-3 ">
                        <div className="col-6 d-flex justify-content-center">
                            <label><b>Skills</b></label>
                            <div className="ml-2">{skills}</div>
                        </div>

                        <div className="col-6 d-flex justify-content-center">
                            <label><b>Email</b></label>
                            <div className="ml-2">{email}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 mt-4 mb-5 d-flex justify-content-center">
                    <Button className="create-query-btn w-25 mb-5"   type="submit">
                        <Link className="sidebutton" to={path}>
                            Edit
                        </Link>
                    </Button>
            </div>

        </div>
        </>
    );
};

export default Profile;