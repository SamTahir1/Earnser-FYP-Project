import React, { useEffect, useState  } from "react";
import { Link } from "react-router-dom";
import { Card, Badge, Button } from 'react-bootstrap';
import { ChatDotsFill } from 'react-bootstrap-icons';
import { ToastContainer, toast, Flip } from 'react-toastify';
import axios from "axios";
import Cookies from 'universal-cookie';

let ViewQuery = () => {
    let cookies = new Cookies();
    let UserId = cookies.get('userid');
    let UserRole = cookies.get('role');
    let query_id = window.location.pathname.split("/");
    let [title,setTitle]=useState("");
    let [description,setDescription]=useState("");
    let [points,setPoints]=useState("");
    let [rupees,setRupees]=useState("");
    let [name,setName]=useState("");
    let [file,setFile]=useState("");
    let [date,setDate]=useState(""); 
    let [expiretime,setExpireTime]=useState("");
    let [Access,setAccess]=useState(false);
    let [QueryUserId,setQueryUserId]=useState("");

    
    let url = "http://localhost:9000/api/query/"+query_id[2]+"/view";
    let path = '/query/'+query_id[2]+'/edit';
    
    useEffect(() => {
        getQuery();
    });

    useEffect(() => {
        if(UserRole === "admin" || QueryUserId === UserId){
            setAccess(true)
        }
    },[UserRole, QueryUserId, UserId])

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


    let getQuery =async (e) => {
        try{
            let response = await axios.get(url)
            setTitle(response?.data?.query_data?.queryData?.title)
            setDescription(response?.data?.query_data?.queryData?.description)
            setPoints(response?.data?.query_data?.queryData?.points)
            setRupees(response?.data?.query_data?.queryData?.rupees)
            setName(response?.data?.query_data?.FullName)
            setFile(response?.data?.query_data?.queryData?.files)
            setDate(response?.data?.query_data?.queryData?.date)
            setExpireTime(response?.data?.query_data?.queryData?.expiretime)
            setQueryUserId(response?.data?.query_data?.queryData?.user_id[0])
            
        } catch(err){
            errorNotify(err?.response?.data?.message)
        }
    }

    
    let getDate = (date) => {
        if(date){
            let dateTime = date.split(' ')
            let day = dateTime[2].substring(0, 2)
            let month = dateTime[1]
            let year = dateTime[3]
            let time = dateTime[4]
            return time + " " + day + '-' + month + '-' + year
        }
    }

    let getExpireDate = (expiretime, date) => {
        var askedData = new Date(date);
       
        if(expiretime === 24){
            askedData.setDate(askedData.getDate() + 1)
            let expire_date = askedData.getDate();
            let expire_month = askedData.getMonth() + 1;
            let expire_min = askedData.getMinutes()+1;
            let expire_hour = askedData.getHours();
            let expire_year = askedData.getFullYear();
            return(expire_date + "-" + expire_month + "-" +expire_year + '(' +  expire_hour+':'+expire_min+')' )

        }else if(expiretime === 72){
            askedData.setDate(askedData.getDate() + 3)
            let expire_date = askedData.getDate();
             let expire_year = askedData.getFullYear();
            let expire_month = askedData.getMonth() + 1;
            let expire_min = askedData.getMinutes()+1;
            let expire_hour = askedData.getHours();
            return(expire_date + "-" + expire_month + "-" +expire_year + '(' +  expire_hour+':'+expire_min+')' )
        }else {
            askedData.setDate(askedData.getDate() + 5)
            let expire_date = askedData.getDate();
             let expire_year = askedData.getFullYear();
            let expire_month = askedData.getMonth() + 1;
            let expire_min = askedData.getMinutes()+1;
            let expire_hour = askedData.getHours();
            return(expire_date + "-" + expire_month + "-" +expire_year + '(' +  expire_hour+':'+expire_min+')' )
        }

    }


    let getFile = (file) => {
        if(file !== ""){
            let path = "/upload/files/"+file;
            return  <Link className="title" to={path} target="_blank" download>Download</Link>
        }else{
           return
       }   
    }



    return (
        <div className="createQuery mx-1 mx-xl-3 mx-lg-3 mx-sm-1 mx-md-1 my-5 ">
            <div className="row">
                <div className="col-12 w-100">
                    <div className="d-flex justify-content-center">
                        <div className="queryHeader d-flex justify-content-center p-0 p-xl-2 p-lg-2 p-md-1 p-sm-0 w-75 w-xl-50 w-lg-50 w-md-75 w-sm-75 title">Query</div>
                    </div>
                    <div className="my-5 col-12">
                        <div className={Access ? 'col-12 my-4 d-flex justify-content-end' : 'd-none'}>
                                <Button className="create-query-btn w-25"   type="submit">
                                    <Link className="link sidebutton" to={path}>
                                        Edit
                                    </Link>
                                </Button>
                        </div>
                        <Card className="col-12">
                            <Card.Header className="row">
                                <div className="col-10 title">
                                 <h5> {title} </h5>
                                </div>
                                <div className="col-2">
                                    <div className="col-12 my-1 d-flex justify-content-end">
                                        <Badge className="p-2 points"  bg="primary" pill> Points {points} </Badge>
                                    </div>
                                    <div className="col-12 my-1 d-flex justify-content-end">
                                        <Badge className="p-2 pkr" bg="success" pill> PKR {rupees} </Badge>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {description}
                                </Card.Text>
                                
                                <div className="col-12 my-1 d-flex justify-content-end">        
                                    {getFile(file)}
                                </div>
                                
                            </Card.Body>
                        </Card>
                        <Card className="col-12 mt-1">
                            <div className="row">
                                <div className="col-6 my-2">
                                    <div className="row">
                                        <div className="col-12 d-flex justify-content-start title">
                                            Query by:{name}
                                        </div>
                                        <div className="col-12 d-flex justify-content-start">
                                            Asked on: {getDate(date)} 
                                        </div>
                                        <div className="col-12 d-flex justify-content-start">
                                            Expire on: {getExpireDate(expiretime, date)}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 d-flex justify-content-end pr-5 my-auto">
                                    <div className="row ">
                                        <div className="col-10 title">
                                            Answer on Group Chat
                                        </div>
                                        <div className="col-2">
                                        <Link className="text-white" to={{ pathname: '/chat', state: {id: query_id[2], title: title}}}>
                                             <ChatDotsFill className="text-white title" size={40} />
                                        </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
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
        </div>
    );
};

export default ViewQuery;
