import React, { useEffect, useState  } from "react";
import { Button, Form } from 'react-bootstrap';
import axios from "axios";
import Cookies from 'universal-cookie';
import { ToastContainer, toast, Flip } from 'react-toastify';

let EditProfile = () => {
    let cookies = new Cookies();
    let UserId = cookies.get('userid');
    // let [profile,setProfile]=useState("");
    let [firstname,setFirstName]=useState("");
    let [lastname,setLastName]=useState("");
    let [gender,setGender]=useState(0);
    let [phone,setPhone]=useState("");
    let [skills,setSkills]=useState("");
    let [files,setFiles]=useState("");
    let [profileName,setProfileName]=useState("");

    let fetchUrl = "http://localhost:9000/api/profile/"+UserId+"/view";
    let url = "http://localhost:9000/api/profile/"+UserId+"/update";

    
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
    

    useEffect(() => {
        getProfile();
        // if(success){
            // history.push('/home');
        // }
   },[]);

   let getProfile =async (e) => {
    try{
        let response = await axios.get(fetchUrl); 
        // setProfile(response?.data?.data_user_profile?.[0]?.profile)
        setFirstName(response?.data?.data_user_profile?.[0]?.firstName)
        setLastName(response?.data?.data_user_profile?.[0]?.lastName)
        setPhone(response?.data?.data_user_profile?.[0]?.phone)
        setSkills(response?.data?.data_user_profile?.[0]?.skills)
        handleGender(response?.data?.data_user_profile?.[0]?.gender)
    } catch(err){
        let errmsg = err?.response?.data?.message;
        errorNotify(errmsg)
    }
}


let  handleGender = (e) => {

    if(e===true){
        setGender(1)
    }else{
        setGender(0);
    }
};

let config = {     
    headers: { 'content-type': 'multipart/form-data' }
}

let formData = new FormData();
formData.append('firstName', firstname);
formData.append('lastName', lastname);
formData.append('gender', gender);
formData.append('skills', skills);
// formData.append('profile', profile);
formData.append('phone', phone);

let file = files;
formData.append('profile', file);

let handleSubmit =async (e) => {
    e.preventDefault();    
    try{
        let response = await axios.put(url, formData, config)
        successNotify(response?.data?.message)
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
    let  handleChange= (e) => {
        if(e==="male"){
            setGender(1)
        }else{
            setGender(0);
        }
    };
    let fileChange = (e) => {
        setProfileName( e.target.files[0].name)
        let file = e.target.files[0];
        setFiles(file)
    }


    return (
        <div className="createQuery mx-xl-5 mx-lg-5 mx-md-4 mx-sm-4 mx-xs-2">
            <div className="row">
                <div className="col-12 mt-4 w-100">
                    <div className="d-flex justify-content-center">
                        <Form.Label className="queryHeader d-flex justify-content-center p-0 p-xl-2 p-lg-2 p-md-1 p-sm-0 w-75 w-xl-50 w-lg-50 w-md-75 w-sm-75">Edit Profile</Form.Label>
                    </div>
                    <Form>
                       
                        <Form.Group className="mb-3 mt-4" controlId="formBasicQuery">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={firstname} onChange={(e)=>setFirstName(e.target.value)} placeholder="Enter First Name" />
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
                            <Form.Control type="text" placeholder="Enter Last Name" value={lastname} onChange={(e)=>setLastName(e.target.value)}/>
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

                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>Gender</Form.Label><br />
                            <Form.Group className="custom-control custom-radio custom-control-inline mx-5">
                                <Form.Control type="radio" id="Male"  checked={1 === gender}  name="Gender" value="male" onChange={(e)=>handleChange(e.target.value)} className="custom-control-input" />
                                <Form.Label className="custom-control-label"  for="Male">Male</Form.Label>
                            </Form.Group>
                            <Form.Group className="custom-control custom-radio custom-control-inline">
                                <Form.Control type="radio" id="Female" checked={0 === gender} name="Gender" value="female" onChange={(e)=>handleChange(e.target.value)} className="custom-control-input" />
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
                            <Form.Control type="text" value={skills} onChange={(e)=>setSkills(e.target.value)}/>
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
                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>Phone </Form.Label>
                            <Form.Control type="tel" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Enter Phone No" />
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
                        <Form.Label>Select Profile </Form.Label>
                        <Form.Group controlId="formFile" className="input-group mb-3">
                            <Form.Label className="input-group-prepend d-none d-xl-block d-lg-block d-md-block d-sm-none">
                                <span className="input-group-text">Upload Profile</span>
                            </Form.Label>
                            <Form.Label className="custom-file">
                                <Form.Control type="file" className="custom-file-input" name="files" id="inputGroupFile01" onChange={(e)=>fileChange(e)}/>
                                <Form.Label className="custom-file-label" for="inputGroupFile01">Choose Profile</Form.Label>
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
                            </Form.Label>
                        </Form.Group>
                            <div className="d-flex justify-content-end text-dark font-weight-bold">
                                {profileName}
                            </div>
                        <Form.Group>
                            <div className="col-12 my-5 d-flex justify-content-center">
                                <Button  type="submit" className="create-query-btn w-50 text-dark mb-5" onClick={handleSubmit} >
                                    Edit
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
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;