import React, { useEffect, useState  } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormSelect} from 'react-bootstrap';
import axios from "axios";
import { ToastContainer, toast, Flip } from 'react-toastify';
import Cookies from 'universal-cookie';

let CreateAccount = () => {
    let cookies = new Cookies();
    let history = useHistory()
    let userRole = cookies.get('role');
    let [username,setUsername]=useState("");
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");
    let [role,setRole]=useState("user");
    let [showSelect,setSelect]=useState(false);   
    let url = "http://localhost:9000/api/auth/SignUp";

   

    useEffect(() => {
        if(userRole === "admin"){
            setSelect(true)
        }
    },[userRole])

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

    let config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }


    let formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    
    let handleSubmit =async (e) => {
        e.preventDefault();    
        console.log("ER")
        try{
            let response = await axios.post(url, formData, config);
            successNotify(response?.data?.message);
            redirect()
        } catch(err){
            console.log(err)
            let errors = err.response.data.errors;
            let errmsg = err?.response?.data?.message?.message;
            errors.forEach((error) => {
                errorNotify(error.msg)
            })

            if(errmsg){
                errorNotify(errmsg)
            }
        }
        
    }

    let redirect = () => { 
        setTimeout(function () {
            history.push('/');
        }, 2000);
    }



    return (
        <>
            <section className="gradient-custom">
                <div className="container py-4">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-12 col-lg-6 col-xl-5">
                            <div className="card shadow-2-strong card-registration" >
                                <div className="card-body p-4 p-md-5">
                                    <center><h1 className="mb-4 pb-2 pb-md-0 mb-md-5 ">Sign Up</h1></center>
                                    <Form>
                                        <div className="row">
                                            <div className="col-md-12 mb-4">
                                                <Form.Group className="form-outline">
                                                    <Form.Label className="form-label" for="email">Email:</Form.Label>
                                                    <Form.Control type="text" ControlId="email" className="form-control form-control-lg" placeholder="@gmail.com" onChange={(e)=>setEmail(e.target.value)}/>
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
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 mb-2">
                                                <Form.Group className="form-outline">
                                                    <Form.Label className="form-label" for="username">Username:</Form.Label>
                                                    <Form.Control type="text" ControlId="username" className="form-control form-control-lg" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
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
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 mb-4">
                                                <Form.Group className="form-outline">
                                                    <Form.Label className="form-label" for="password">Password:</Form.Label>
                                                    <Form.Control type="password" ControlId="password" className="form-control form-control-lg" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
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

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 mb-4">
                                                <Form.Group className="form-outline">
                                                    <Form.Label for="role" className={showSelect ? 'd-block' : 'd-none'}>Role:</Form.Label>
                                                    <FormSelect onChange={(e)=>setRole(e.target.value)} className={showSelect ? 'd-block' : 'd-none'}>
                                                        <option value="user">User</option>
                                                        <option value="admin">Admin</option>
                                                    </FormSelect>
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

                                            </div>
                                        </div>
                                        <div className="col-12 my-4 d-flex justify-content-center">
                                            <Button className=" w-50 singup" type="submit" onClick={handleSubmit}>Sign Up</Button>
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
                    </div>
                </div>
            </section>

        </>
    );
};
export default CreateAccount;