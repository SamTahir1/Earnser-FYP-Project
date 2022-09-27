import React, { useEffect, useState  } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
import axios from "axios";
import Cookies from 'universal-cookie';
import { ToastContainer, toast, Flip } from 'react-toastify';

let EditQuery = () => {
    let query_id = window.location.pathname.split("/");
    let history = useHistory()
    let cookies = new Cookies();
    let UserId = cookies.get('userid');
    let [title,setTitle]=useState("");
    let [description,setDescription]=useState("");
    let [points,setPoints]=useState("");
    let [rupees,setRupees]=useState("");
    // let [name,setName]=useState("");
    let [skills,setSkills]=useState("");
    let [files,setFiles]=useState("");


    // let [date,setDate]=useState(""); 
 
    let fetchUrl = "http://localhost:9000/api/query/"+query_id[2]+"/update";
    let url = "http://localhost:9000/api/query/"+query_id[2]+"/view";
    let deleteurl = "http://localhost:9000/api/query/"+query_id[2]+"/delete";

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
        getQuery();
   });

    let getQuery =async (e) => {
        try{
            let response = await axios.get(url);
            setTitle(response?.data?.query_data?.queryData?.title)
            setDescription(response?.data?.query_data?.queryData?.description)
            setPoints(response?.data?.query_data?.queryData?.points)
            setRupees(response?.data?.query_data?.queryData?.rupees)
            // setName(response?.data?.query_data?.FullName)
            setFiles(response?.data?.query_data?.queryData?.files)
            // setDate(response?.data?.query_data?.queryData?.date)
        } catch(err){
            let errmsg = err?.response?.data?.message;
            errorNotify(errmsg)
        }
    }
    

    let config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }

    let formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('points', points);
    formData.append('rupees', rupees);
    formData.append('skills', skills);
    formData.append('user_id', UserId);

    let file = files;
    formData.append('files', file);

    let handleSubmit =async (e) => {
        e.preventDefault();    
        try{
            let response = await axios.put(fetchUrl, formData, config);
            successNotify(response?.data?.message);
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

    let deleteQuery =async (e) => {
        try{
            let response = await axios.delete(deleteurl);
            successNotify(response?.data?.message)
            redirect()

        } catch(err){
            let errmsg = err?.response?.data?.message;
            errorNotify(errmsg)
        }
    }

    let redirect = () => {
            history.push('/');
    }

    let getFile = (files) => {

        if(files !== ""){
            // files.map((file, index) => (
               let path = "../../api/public/upload/files/"+file;
                return( <Link to={path} target="_blank" download>{file}</Link>) 
            // ))
        }else{
        return
    }   
    }

    let fileChange = (e) => {
        let file = e.target.files[0];
        setFiles(file)
    }

    return (
        <div className="createQuery mx-1 mx-xl-5 mx-lg-5 mx-sm-2 mx-md-2 my-5 ">
            <div className="row">
                <div className="col-12 w-100">
                    <div className="d-flex justify-content-center">
                        <Form.Label className="queryHeader d-flex justify-content-center p-0 p-xl-2 p-lg-2 p-md-1 p-sm-0 w-75 w-xl-50 w-lg-50 w-md-75 w-sm-75">Edit Query</Form.Label>
                    </div>
                    <Form className="mt-4">
                        <Form.Group className="mb-3 " controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control value={title} onChange={(e)=>setTitle(e.target.value)}/>
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
                        <Form.Group className="mb-3 " controlId="formBasicPoints">
                            <Form.Label>Points</Form.Label>
                            <Form.Control value={points} type="number" onChange={(e)=>setPoints(e.target.value)} placeholder="Who many points for Query?" />
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
                        <Form.Label>Rupess</Form.Label>
                        <Form.Group className="input-group mb-3">
                            <Form.Label className="input-group-prepend">
                                <span className="input-group-text">RS</span>
                            </Form.Label>
                            <Form.Control onChange={(e)=>setRupees(e.target.value)} type="number" value={rupees} className="form-control" aria-label="Amount (to the nearest ppkr)" placeholder="Who many rupees for Query?" />
                            <Form.Label className="input-group-append">
                                <span className="input-group-text">.00</span>
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
                        <Form.Label>Files</Form.Label>
                        <Form.Group controlId="formFileMultiple" className="input-group mb-3">
                            <Form.Label className="input-group-prepend d-none d-xl-block d-lg-block d-md-block d-sm-none">
                                <span className="input-group-text">Upload</span>
                            </Form.Label>
                            <Form.Label className="custom-file">
                                <Form.Control type="file" multiple className="custom-file-input" name="files" id="inputGroupFile01" onChange={(e)=>fileChange(e)}/>
                                <Form.Label className="custom-file-label" for="inputGroupFile01">Choose file</Form.Label>
                            </Form.Label>
                            {getFile(files)}
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


                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" value={description} rows={10} onChange={(e)=>setDescription(e.target.value)} />
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
                            <Button className="edit-query-btn w-50"  onClick={handleSubmit}  type="submit">
                                Edit Query
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
                        <div className="col-12 my-4 d-flex justify-content-center">
                            <Button className="delete-query-btn w-50"  onClick={deleteQuery} type="submit">
                                Delete Query
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

export default EditQuery;

