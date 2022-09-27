import axios from "axios";
import React, { useState  } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { ToastContainer, toast, Flip } from 'react-toastify';

let CreateProfile = () => {
    let cookies = new Cookies();
    let UserId = cookies.get('userid');
    let history = useHistory()
    let [firstName,setFirstName]=useState("");
    let [lastName,setlastName]=useState("");
    let [gender,setGender]=useState("");
    let [skills,setSkills]=useState("");
    let [files,setFiles]=useState("");
    let [phone,setPhone]=useState("");
    let url = "http://localhost:9000/api/profile/" + UserId  + "/create";

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

    let redirect = () => { 
        setTimeout(function () {
            history.push('/');
        }, 2000);
    }

    let formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('gender', gender);
    formData.append('skills', skills);
    formData.append('phone', phone);

    let file = files;
    formData.append('profile', file);
    
    let  handleChange= (e) => {
        if(e==="male"){
            setGender(1)
        }else{
            setGender(0);
        }
    };

    let handleSubmit =async (e) => {
        e.preventDefault();    
        try{
            let response = await axios.post(url, formData, config);
            successNotify(response?.data?.message);
            redirect()
        } catch(err){
            let errors = err?.response?.data?.errors;
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

    let fileChange = (e) => {
        let file = e.target.files[0];
        setFiles(file)
    }

    return (
        <div className="createQuery mx-xl-5 mx-lg-5 mx-md-4 mx-sm-4 mx-xs-2">
            <div className="row">
                <div className="col-12 mt-4 w-100">
                    <div className="d-flex justify-content-center">
                        <Form.Label className="queryHeader d-flex justify-content-center p-0 p-xl-2 p-lg-2 p-md-1 p-sm-0 w-75 w-xl-50 w-lg-50 w-md-75 w-sm-75">Create Profile</Form.Label>
                    </div>
                    <Form>
                        
                        <Form.Group className="mb-3 mt-4" controlId="formBasicQuery">
                            <Form.Label>First Name</Form.Label>
                            
                            <Form.Control type="text" placeholder="Enter First Name" onChange={(e)=>setFirstName(e.target.value)} />
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
                        <Form.Group className="mb-3 " controlId="formBasicQuery">
                            <Form.Label>Last Name</Form.Label>
                           
                            <Form.Control type="text" placeholder="Enter Last Name" onChange={(e)=>setlastName(e.target.value)}/>
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

                        <Form.Group controlId="formGender" className="mb-3" >
                            <Form.Label>Gender</Form.Label><br />
                            
                            <Form.Group className="custom-control custom-radio custom-control-inline">
                                <Form.Control type="radio" id="Male" value="male" name="Gender" className="custom-control-input" onChange={(e)=>handleChange(e.target.value)}/>
                                <Form.Label className="custom-control-label" for="Male">Male</Form.Label>
                            </Form.Group>
                            <Form.Group className="custom-control custom-radio custom-control-inline">
                                <Form.Control type="radio" id="Female" value="female" name="Gender" className="custom-control-input" onChange={(e)=>handleChange(e.target.value)}/>
                                <Form.Label className="custom-control-label" for="Female">Female</Form.Label>
                            </Form.Group>
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
                        <Form.Group className="mb-3 " controlId="formBasicQuery">
                            <Form.Label>Skills</Form.Label>
                           
                            <Form.Control type="text" onChange={(e)=>setSkills(e.target.value)}/>
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
                        <Form.Group controlId="formPhone" className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            
                            <Form.Control type="tel" placeholder="Enter Phone No:" name="phone" onChange={(e)=>setPhone(e.target.value)}/> 
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
                        <Form.Label>Files</Form.Label>
                        <Form.Group controlId="formFile" className="input-group mb-3">
                            <Form.Label className="input-group-prepend d-none d-xl-block d-lg-block d-md-block d-sm-none">
                                <span className="input-group-text">Upload Profile</span>
                            </Form.Label>
                            <Form.Label className="custom-file">
                                <Form.Control type="file" className="custom-file-input" name="files" id="inputGroupFile01" onChange={(e)=>fileChange(e)} />
                                <Form.Label className="custom-file-label" for="inputGroupFile01">Choose Profile</Form.Label>
                            </Form.Label>
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
                        <Form.Group>
                            <div className="col-12 my-4 d-flex justify-content-center">
                                <Button  type="submit" className="form-btn w-50" onClick={handleSubmit}>
                                    Create Profile
                                </Button>
                            </div>
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
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default CreateProfile;