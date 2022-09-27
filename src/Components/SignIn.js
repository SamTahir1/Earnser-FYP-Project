import React, { useEffect, useState  } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from 'universal-cookie';
import { ToastContainer, toast, Flip } from 'react-toastify';

let SignIn = () => {
    let cookies = new Cookies();
    let history = useHistory()
    let [username,setUsername]=useState("");
    let [password,setPassword]=useState("");
    let url = "http://localhost:9000/api/auth/Signin";

    let successNotify = () =>  toast.success("Successfully login", {
        position: "top-center",
        autoClose: 3000,
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

    useEffect(() => {

        // if(token){
        //     history.push('/home');
        // }
    })

    let handleSubmit =async (e) => {
        e.preventDefault();    
        try{
            let response = await axios.post(url, {
                "username": username,
                "password": password,
             });
                cookies.set('token', response?.data?.accessToken);
                cookies.set('userid', response?.data?.id);
                cookies.set('role', response?.data?.role);
                cookies.set('name', response?.data?.username);
            if(response?.status === 200){
                successNotify();
                redirect()
            }
        } catch(err){
            let errors = err.response.data.errors;
            let errmsg = err?.response?.data?.message;
            if(errors){
                errors.forEach((error) => {
                    errorNotify(error.msg)
                })
            }
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
            <section className="vh-100 gradient-custom">
                <div className="container py-4 h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-12 col-lg-6 col-xl-5">
                            <div className="card shadow-2-strong card-registration" >
                                <div className="card-body p-4 p-md-5">
                                    <h1 className="mb-4 pb-2 pb-md-0 mb-md-4 d-flex justify-content-center">Sign In</h1>
                                    <form>

                                        <div className="row">
                                            <div className="col-md-12 mb-4">

                                                <div className="form-outline">
                                                    <label className="form-label">Username:</label>
                                                    <input type="text" id="username" onChange={(e)=>setUsername(e.target.value)} name="username" className="form-control form-control-lg" />
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

                                        <div className="row">
                                            <div className="col-md-12 mb-4">
                                                <div className="form-outline">
                                                    <label className="form-label">Password:</label>
                                                    <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)} name="password" className="form-control form-control-lg" />
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

                                        <div className="mt-4 col-12 d-flex justify-content-center  pt-2">
                                            <input className="btn btn-primary btn-md login-btn w-75" onClick={handleSubmit} type="submit" value="Login" />
                                            <ToastContainer
                                                position="top-center"
                                                autoClose={3000}
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
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignIn;