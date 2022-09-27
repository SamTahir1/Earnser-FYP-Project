import React, { useEffect, useState  } from "react";
import { Link } from "react-router-dom";
import { Card, Badge, Button, Image } from 'react-bootstrap';
import axios from "axios";
import defaultImage from "../upload/profile/profile.jpeg";
import { ToastContainer, toast, Flip } from 'react-toastify';

let ViewAllUsers = () => {
    let [users,setUsers]=useState("");
    let url = "http://localhost:9000/api/users/all";

    useEffect(() => {
        getAllUsers();
   });

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

    let getAllUsers =async () => {
        try{
            let response = await axios.get(url);
             setUsers(response?.data?.AllUsers)
        } catch(err){
            let errmsg = err?.response?.data?.message;
            errorNotify(errmsg)
        }
    }

    let getuserInfo = () => {

        if(users.length > 0){
            return(
                users.map((user, index) => (  
                    getOneuser(user)
                ))
            )
        }
    }

    let getOneuser = (user) => {
        let id = user._id;

        return(
                <Card className="col-4 mx-2 my-2">
                    <Card.Header className="row">
                        <div className="col-4 ">
                            <Image className="Profile w-100 h-100 " src={defaultImage} />
                        </div>
                        <div className="col-8 title">
                            <div className="row">
                                <h5 className="col-12 d-flex justify-content-left"> {user.firstName +" "+ user.lastName}</h5>
                                <div className="col-12 d-flex justify-content-left">
                                    <Badge className="p-2 points mx-1"  bg="primary" pill> Points {user.points} </Badge>
                                    <Badge className="p-2 points mx-1"  bg="primary" pill> Points {user.rupees} </Badge>
                                </div>
                            </div>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                        <div className="col-12 d-flex justify-content-center">
                            <Button className="create-query-btn w-100">
                                <Link className="link sidebutton" to={'/profile/' + id +'/view'}>
                                    View Profile
                                </Link>
                            </Button>
                                    
                        </div>
                        </Card.Text>
                    </Card.Body>
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
                </Card>
        )
    }



    return (
        <div className="createQuery mx-1 mx-xl-3 mx-lg-3 mx-sm-1 mx-md-1 my-5 ">
            <div className="row">
                <div className="col-12 w-100">
                    <div className="d-flex justify-content-center">
                        <div className="queryHeader d-flex justify-content-center p-0 p-xl-2 p-lg-2 p-md-1 p-sm-0 w-75 w-xl-50 w-lg-50 w-md-75 w-sm-75 ">Users</div>
                    </div>
                    <div className="my-5 row">
                            {getuserInfo()}
                        
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default ViewAllUsers;
