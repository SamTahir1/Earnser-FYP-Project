import React, { useState  } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Modal, Image} from 'react-bootstrap';
import axios from "axios";
import Cookies from 'universal-cookie';
import easypaisa from "../images/easypaisa.png";
import { ToastContainer, toast, Flip } from 'react-toastify';

let CreateQuery = () => {
    let [show, setShow] = useState(false);

    let cookies = new Cookies();
    let UserId = cookies.get('userid');
    let token = cookies.get('token');
    let history = useHistory()
    let [title,setTitle]=useState("");
    let [description,setDescription]=useState("");
    let [points,setPoints]=useState("");
    let [rupees,setRupees]=useState("");
    let [expireTime,setexpireTime]=useState(24);
    let [skills,setSkills]=useState("");
    let [files,setFiles]=useState("");
    let [fileName,setFileName]=useState("");

    let handleClose = () => setShow(false);
    let handleShow = () => setShow(true);

    let url = "http://localhost:9000/api/query/create";

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
    formData.append('title', title);
    formData.append('description', description);
    formData.append('points', points);
    formData.append('rupees', rupees);
    formData.append('skills', skills);
    formData.append('expiretime', expireTime);
    formData.append('user_id', UserId);

    let file = files;
    formData.append('files', file);

    let handleSubmit =async (e) => {
        e.preventDefault();   
        handleClose() 
        if(token && UserId){ 
            try{
                let response = await axios.post(url, formData, config);
                successNotify(response?.data?.message)
                redirect()
                
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
                    setTimeout(function () {
                        history.push('/SignIn');
                    }, 2000);
                }
            }
        }else{
            errorNotify("Please SignIn First...")
        }
        
    }

    let redirect = () => { 
        setTimeout(function () {
            history.push('/');
        }, 2000);
    }

    let  handleTime= (e) => {
        setexpireTime(e);
    };
    
    let fileChange = (e) => {
        let file = e.target.files[0];
        setFiles(file)
        setFileName(e.target.files[0].name)
    }


    return (
        <div className="createQuery mx-1 mx-xl-5 mx-lg-5 mx-sm-2 mx-md-2 my-5 ">
            <div className="row">
                <div className="col-12 w-100">
                    <div className="d-flex justify-content-center">
                        <Form.Label className="queryHeader d-flex justify-content-center p-0 p-xl-2 p-lg-2 p-md-1 p-sm-0 w-75 w-xl-50 w-lg-50 w-md-75 w-sm-75">Add New Query</Form.Label>
                    </div>

                    <Form className="mt-4">
                        <Form.Group className="mb-3 " controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="What is your Query?" controlId="querytitle" onChange={(e)=>setTitle(e.target.value)} />
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
                            <Form.Control type="number" placeholder="How many points for Query?" controlId="querypints" onChange={(e)=>setPoints(e.target.value)} />
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
                        <Form.Label>Rupees</Form.Label>
                        <Form.Group className="input-group mb-3" controlId="formRupees">
                            <Form.Label className="input-group-prepend">
                                <span className="input-group-text">RS</span>
                            </Form.Label>
                            <Form.Control type="number" className="form-control" aria-label="Amount (to the nearest ppkr)" placeholder="How many rupees for Query?"  controlId="queryrupees" onChange={(e)=>setRupees(e.target.value)}/>
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
                        <Form.Group controlId="formGender" className="mb-3" >
                            <Form.Label>Expire Time</Form.Label><br />
                            <Form.Group className="custom-control custom-radio custom-control-inline">
                                <Form.Control type="radio" id="oneday" value="24" name="expiretime" controlId="queryone" defaultChecked className="custom-control-input" onChange={(e)=>handleTime(e.target.value)}/>
                                <Form.Label className="custom-control-label selected" for="oneday">One Day</Form.Label>
                            </Form.Group>
                            <Form.Group className="custom-control custom-radio custom-control-inline">
                                <Form.Control type="radio" id="threeDays" value="72" name="expiretime" controlId="querythree" className="custom-control-input" onChange={(e)=>handleTime(e.target.value)}/>
                                <Form.Label className="custom-control-label" for="threeDays">Three Day's</Form.Label>
                            </Form.Group>
                            <Form.Group className="custom-control custom-radio custom-control-inline">
                                <Form.Control type="radio" id="fiveDays" value="120" name="expiretime" controlId="queryfive" className="custom-control-input" onChange={(e)=>handleTime(e.target.value)}/>
                                <Form.Label className="custom-control-label" for="fiveDays">Five day's</Form.Label>
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
                        <Form.Group className="mb-3 " controlId="formBasicTitle">
                            <Form.Label>Skills</Form.Label>
                            <Form.Control type="object" controlId="queryskills" placeholder="What skills required for your query?" onChange={(e)=>setSkills(e.target.value)} />
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
                                <Form.Control type="file" multiple className="custom-file-input" controlId="queryfiles" name="files" id="inputGroupFile01" onChange={(e)=>fileChange(e)}/>
                                <Form.Label className="custom-file-label" for="inputGroupFile01">Choose file</Form.Label>
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
                        <Form.Label className="d-flex justify-content-end text-dark font-weight-bold">{fileName}</Form.Label>


                        <Form.Group className="mb-3" controlId="exampleFormDes">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={10} controlId="querydes" onChange={(e)=>setDescription(e.target.value)}/>
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
                            <Button className="create-query-btn w-50"  onClick={handleShow}>
                                Add Query
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
                        <Modal className="mt-5" show={show} onHide={handleClose}>
                            <Modal.Header className="d-flex justify-content-center">
                                <Image className="w-50 h-50" src={easypaisa} /> 
                            </Modal.Header>
                            <Modal.Body>
                            <Form className="mt-4">
                                <Form.Label>Easypaisa Phone</Form.Label>
                                    <Form.Group className="input-group mb-3" controlId="phone">
                                        <Form.Label className="input-group-prepend">
                                            <span className="input-group-text">+92</span>
                                        </Form.Label>
                                        <Form.Control type="number" className="form-control" aria-label="Amount (to the nearest ppkr)" placeholder="Who many rupees for Query?" onChange={(e)=>setRupees(e.target.value)}/>
                                        <Form.Label className="input-group-append">
                                        </Form.Label>
                                    </Form.Group>
                                <Form.Label>Rupees</Form.Label>
                                    <Form.Group className="input-group mb-3" controlId="sendRupees">
                                        <Form.Label className="input-group-prepend">
                                            <span className="input-group-text">RS</span>
                                        </Form.Label>
                                        <Form.Control type="number" className="form-control" aria-label="Amount (to the nearest ppkr)" placeholder="Who many rupees for Query?" onChange={(e)=>setRupees(e.target.value)}/>
                                        <Form.Label className="input-group-append">
                                        </Form.Label>
                                </Form.Group>

                                <div className="col-12 my-4 d-flex justify-content-center">
                                    <Button className="create-query-btn w-50" onClick={handleSubmit} type="submit">
                                        Pay & Create Query
                                    </Button>
                                </div>
                            </Form> 
                           
                                </Modal.Body>
                        </Modal>
                    </Form>
                </div>
            </div>
            
        </div>




    );
};

export default CreateQuery;
