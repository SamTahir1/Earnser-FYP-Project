import React, { useState  } from "react";
import { Button, Form } from 'react-bootstrap';
import axios from "axios";
import Cookies from 'universal-cookie';
import { ToastContainer, toast, Flip } from 'react-toastify';

let AddAnswers = () => {
    let cookies = new Cookies();
    let UserId = cookies.get('userid');
    let token = cookies.get('token');
    let [description,setDescription]=useState("");
    let [files,setFiles]=useState("");
    let [fileName,setFileName]=useState("");

    let query_id = window.location.pathname.split("/");
    let url = "http://localhost:9000/api/comment/"+query_id[2]+"/create";

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
    formData.append('description', description);
    formData.append('user_id', UserId);
    let file = files;
    formData.append('files', file);
    
    let handleSubmit =async (e) => {
        e.preventDefault();    
    if(token && UserId){ 
        try{
            let response = await axios.post(url, formData, config);
            successNotify(response?.data?.message);
        } catch(err){
            let errors = err.response.data.errors;
            errors.forEach((error) => {
                errorNotify(error.msg)
              })
        }
    }else{
        errorNotify("Please SignIn First...")
    }
        
    }

    let fileChange = (e) => {
        let file = e.target.files[0];
        setFiles(file)
        setFileName(e.target.files[0].name)
    }



    return (
        <div className="addAnswers ml-5 ml-xl-5 ml-lg-5 ml-sm-3 ml-md-3 my-4">
            <div className="d-flex justify-content-center mb-4">
                <div className="queryHeader d-flex justify-content-center p-0 p-xl-2 p-lg-2 p-md-1 p-sm-0 w-50 w-xl-25 w-lg-25 w-md-50 w-sm-50">ADD ANSWER</div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-10 w-100">
                <Form className="mt-4">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description: </Form.Label>
                            <Form.Control as="textarea" rows={10} onChange={(e)=>setDescription(e.target.value)}/>
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
                        <Form.Label>File: </Form.Label>
                        <Form.Group controlId="formFileMultiple" className="input-group mb-3">
                            <Form.Label className="input-group-prepend d-none d-xl-block d-lg-block d-md-block d-sm-none">
                                <span className="input-group-text">Upload</span>
                            </Form.Label>
                            <Form.Label className="custom-file">
                                <Form.Control type="file" multiple className="custom-file-input" id="inputGroupFile01" onChange={(e)=>fileChange(e)} />
                                <Form.Label className="custom-file-label" for="inputGroupFile01">Choose file</Form.Label>
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
                        <Form.Label className="d-flex justify-content-end text-dark font-weight-bold">{fileName}</Form.Label>


                        <div className="col-12 my-4 d-flex justify-content-center">
                            <Button className="create-query-btn w-50"  onClick={handleSubmit} type="submit">
                                Add Comment
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

export default AddAnswers;

