import React, { useState  } from "react";
import { Button, Form } from 'react-bootstrap';
import { ToastContainer, toast, Flip } from 'react-toastify';
import axios from "axios";

let ContactUsDesign = () => {
    let [name,setName]=useState("");
    let [email,setEmail]=useState("");
    let [msg,setMsg]=useState("");
    let url = "http://localhost:9000/api/send/mail";
    let config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }

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


    let formData = new FormData();
    formData.append('senderName', name);
    formData.append('senderMail', email);
    formData.append('senderMsg', msg);

    let handleSubmit =async (e) => {
        e.preventDefault();    

        try{
            let response = await axios.post(url, formData, config);
            successNotify(response?.data?.message);
            console.log(response.data)
        } catch(errors){
            console.log(errors.response)
            console.log(errors.response.data.errors)
            let resError = errors.response.data.errors;
            let errmsg = errors?.response?.data?.message;
            if(resError){
                resError.forEach((error) => {
                    errorNotify(error.msg)
                })
            }
            if(errmsg){
                errorNotify(errmsg)
            }
        }
        
    }


    return (
        <div className="createQuery mx-1 mx-xl-5 mx-lg-5 mx-sm-2 mx-md-2 my-5 ">
            <div className="row">
                <div className="col-12 w-100">
                    <div className="d-flex justify-content-center">
                        <Form.Label className="queryHeader d-flex justify-content-center p-0 p-xl-2 p-lg-2 p-md-1 p-sm-0 w-75 w-xl-50 w-lg-50 w-md-75 w-sm-75">Contact Us</Form.Label>
                    </div>
                    <Form className="mt-4">
                        <Form.Group className="mb-3 " controlId="formName">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" placeholder="What is your Name?" onChange={(e)=>setName(e.target.value)}/>
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
                        <Form.Group className="mb-3 " controlId="formEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" placeholder="What is your Email?" onChange={(e)=>setEmail(e.target.value)}/>
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
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
                            <Form.Label>Message:</Form.Label>
                            <Form.Control as="textarea" rows={10}  onChange={(e)=>setMsg(e.target.value)}/>
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
                            <Button className="create-query-btn w-50" type="submit" onClick={handleSubmit}>
                                Send Message
                            </Button>
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
                        </div>
                    </Form>
                </div>
            </div>

        </div>




    );
};

export default ContactUsDesign;