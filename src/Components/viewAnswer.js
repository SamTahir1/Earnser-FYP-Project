import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Form, Modal, Button } from 'react-bootstrap';
import { HandThumbsUpFill, HandThumbsDownFill, NodePlusFill } from 'react-bootstrap-icons';
import { ToastContainer, toast, Flip } from 'react-toastify';
import axios from "axios";
import Cookies from 'universal-cookie';

let Answers = () => {
    let cookies = new Cookies();
    let UserId = cookies.get('userid');
    let token = cookies.get('token');
    let UserRole = cookies.get('role');
    let [show, setShow] = useState(false);
    let [count1, setCount1] = useState(0);
    let [count2, setCount2] = useState(0);
    let [commentData, setCommentData] = useState("");
    let [name, setName] = useState("");
    let [soultion_Des, setSolutionDes] = useState("");
    let [QueryUserId,setQueryUserId]=useState("");
    let [Access,setAccess]=useState(false);
    let [DisApprove,setDisApprove]=useState(false);

    let query_id = window.location.pathname.split("/");
    let url = "http://localhost:9000/api/comment/" + query_id[2] + "/view";
    let queryUrl = "http://localhost:9000/api/query/"+query_id[2]+"/view";

    let handleClose = () => setShow(false);
    let handleShow = () => setShow(true);
    
    let incrementCount1 = () => {
        setCount1(count1 + 1);
    };

    let incrementCount2 = () => {
        setCount2(count2 + 1);
    };

    useEffect(() => {
        getQuery();
    });

    useEffect(() => {
        getComments();
    });

    useEffect(() => {
        checkApprove(commentData);
    },[commentData]);
    
    useEffect(() => {
        if(UserRole === "admin" || QueryUserId === UserId){
            setAccess(true)
        }
    },[UserRole, QueryUserId, UserId])

    let successNotify = (msg) =>  toast.success(msg, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
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

    let getComments = async (e) => {
        try {
            let response = await axios.get(url);

            setCommentData(response?.data?.comment_data?.commentData)
            setName(response?.data?.comment_data?.FullName)

        } catch (err) {
            let errmsg = err?.response?.data?.message;
            errorNotify(errmsg)
        }
    }

    let getQuery =async (e) => {
        try{
            let response = await axios.get(queryUrl)
            setQueryUserId(response?.data?.query_data?.queryData?.user_id[0])
            
        } catch(err){
            errorNotify(err?.response?.data?.message)
        }
    }

    let approveComment = async (comment) => {

        let comment_user = comment.user_id;
        let comment_query = comment.query_id;
        let url = "http://localhost:9000/api/comment/" + comment_query + "/approve";

        let formData = new FormData();
        formData.append('user_id', comment_user);
        formData.append('cid', comment._id);

        try {
            let response = await axios.post(url, formData);
            successNotify(response?.data?.message)
        } catch (err) {
            errorNotify(err?.response?.data?.message)
        }
    }

    let checkApprove = async (data) => {
        try{
            data.map( (item)=> {
                if(item.status === "Approved"){
                    setDisApprove(true)
                }
         })
        }catch (err) {
            
        }
    }

    let getFile = (file) => {
        if (file !== "") {
            let path = "/upload/files/" + file;
            return <Link className="title" to={path} target="_blank" download>Download</Link>
        } else {
            return
        }
    }

    let getDate = (date) => {
        if (date) {
            let dateTime = date.split('-')
            let day = dateTime[2].substring(0, 2)
            let month = dateTime[1]
            let year = dateTime[0]
            return day + '-' + month + '-' + year
        }
    }

    let ApproveCheck = (status, comment) => {
        if(DisApprove){
            if(status === "Approved"){
                return (
                    <Form.Check type="switch" id="check-answer" label="Approve" checked  onChange={(e) => approveComment(comment)} disabled/>
                )
            }else{
                return (
                    <Form.Check type="switch" id="check-answer" label="Approve"  onChange={(e) => approveComment(comment)} disabled/>
                )
            }
        }else{
            if(status === "Approved"){
                return (
                    <Form.Check type="switch" id="check-answer" label="Approve" checked  onChange={(e) => approveComment(comment)} />
                )
            }else{
                return (
                    <Form.Check type="switch" id="check-answer" label="Approve"  onChange={(e) => approveComment(comment)} />
                )
            }
        }
    }

    let addSoultion = async (commentid) => {
            let SoultionFormData = new FormData();
            SoultionFormData.append('description', soultion_Des);
            SoultionFormData.append('user_id', UserId);
            SoultionFormData.append('comment_id', commentid);
            let solution_url = "http://localhost:9000/api/solutions/create"
        if(token && UserId){ 
            try {
                let response = axios.post(solution_url, SoultionFormData);
                successNotify(response?.data)
                handleClose()
            } catch (err) {
                errorNotify(err?.response?.data?.message)
            }
        }else{
            errorNotify("Please SignIn First...")
        }
    }

    let CommentCreate = () => {
        if (commentData.length > 0) {
            {
                return (
                    commentData.map((comment, index) => (
                        <Card className="col-12 my-4">
                            <Card.Header className="row queryheader">
                                <div className="col-9 d-flex justify-content-start">
                                    <div className="row">
                                        <div className="col-12 d-flex justify-content-start title">
                                            Answered by: {name}
                                        </div>
                                        <div className="col-12 d-flex justify-content-start title">
                                            Answered on: {getDate(comment.date)}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3 ">
                                    <div className="row d-flex justify-content-end">
                                        <div className="col-12 col-lg-12 col-md-12">
                                            <div className="col-12 d-flex justify-content-end title ml-2">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <HandThumbsUpFill className="text-white mx-1" size={25} onClick={incrementCount1} />
                                                        <span className="text-white mx-1">
                                                            {count1}
                                                        </span>
                                                    </div>
                                                    <div className="col-6">
                                                        <HandThumbsDownFill className="text-white mx-1" size={25} onClick={incrementCount2} />
                                                        <span className="text-white mx-1">
                                                            {count2}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                
                                                
                                            </div>
                                        </div>
                                        <div className={Access ? 'col-12 col-lg-12 col-md-12 d-flex justify-content-end' : 'd-none'}> 
                                            <Form className="col-6 d-flex justify-content-end">
                                                <Form.Group className="form-check form-switch mt-2">
                                                    {ApproveCheck(comment.status, comment)}
                                                </Form.Group>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                                

                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {comment.description}
                                </Card.Text>
                                <div className="row">
                                    <div className="col-12 d-flex justify-content-end">
                                         {getFile(comment.files)}
                                    </div>
                                    <div className="col-12 d-flex justify-content-end" onClick={handleShow}>
                                        <Button className="addsolution" > 
                                            <NodePlusFill className="text-white title" size={50} />
                                        </Button>
                                    </div>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Add Best Soultion</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                        <Form className="mt-4">
                                           
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>What problem solved by comment:</Form.Label>
                                                <Form.Control as="textarea" rows={10} onChange={(e)=>setSolutionDes(e.target.value)}/>
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
                                            </Form.Group>

                                            <div className="col-12 my-4 d-flex justify-content-center">
                                                <Button className="create-query-btn w-50" onClick={() =>addSoultion(comment._id)}>
                                                    Save Soultion
                                                </Button>
                                            </div>
                                        </Form> 
                                        <ToastContainer
                                            position="top-center"
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
                                         </Modal.Body>
                                    </Modal>
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                );
            }
        }
    }

    let CommentHeader = () => {
        if (commentData.length > 0) {
            {
                return (
                    <div className="queryHeader d-flex justify-content-center p-0 p-xl-2 p-lg-2 p-md-1 p-sm-0 w-50 w-xl-25 w-lg-25 w-md-50 w-sm-50 title">ANSWERS</div>
                );
            }
        }
    }




    return (
        <div className="Answers ml-5 ml-xl-5 ml-lg-5 ml-sm-3 ml-md-3 mb-3">
            <div className="d-flex justify-content-center mb-4">
                {CommentHeader()}
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-10 w-100">
                    {CommentCreate()}
                </div>

            </div>
        </div>
    );
};

export default Answers;






