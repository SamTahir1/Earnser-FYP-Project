import React, {  useState  } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form} from 'react-bootstrap';
import axios from "axios";
import Cookies from 'universal-cookie';
import { ToastContainer, toast, Flip } from 'react-toastify';

let CreateSale = () => {
    let cookies = new Cookies();
    let UserId = cookies.get('userid');
    let token = cookies.get('token');
    let history = useHistory()
    let [title,setTitle]=useState("");
    let [description,setDescription]=useState("");
    let [features,setFeatures]=useState("");
    let [installation,setInstallation]=useState("");
    let [rupees,setRupees]=useState("");
    let [files,setFiles]=useState("");
    let [productName,setProduct]=useState("");

    let url = "http://localhost:9000/api/product/create";

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
    formData.append('title', title);
    formData.append('description', description);
    formData.append('features', features);
    formData.append('installation', installation);
    formData.append('rupees', rupees);
    formData.append('user_id', UserId);

    let file = files;
    formData.append('product', file);

    let handleSubmit =async (e) => {
        e.preventDefault();   
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
                errorNotify(errmsg.message)
            }
        }
    }else{
        errorNotify("Please SignIn First...")
    }
        
    }

    let redirect = () => {
        setTimeout(function () {
            history.push('/virtual/product');
        }, 2000);
    }
    // let setdata = () => {
    //     var data = features.split("\n")
    //     // data = features.split("\n")
    //     data = features.split("\u2022")
    
    // }

    let fileChange = (e) => {
        let file = e.target.files[0];
        setFiles(file)
        setProduct(e.target.files[0].name)
    }

    let bullet = "\u2022";
    let bulletWithSpace = `${bullet} `;
    let enter = 13;
    
    
    let handleInstallationInput = (event) => {
      let { keyCode, target } = event;
      let { selectionStart, value } = target;
      
      if (keyCode === enter) {

        target.value = [...value]
          .map((c, i) => i === selectionStart - 1
            ? `\n${bulletWithSpace}`
            : c
          )
          .join('');
          
        target.selectionStart = selectionStart+bulletWithSpace.length;
        target.selectionEnd = selectionStart+bulletWithSpace.length;
      }
      
      if (value[0] !== bullet) {
        target.value = `${bulletWithSpace}${value}`;
      }

      setInstallation(event.target.value)
      console.log(installation)
    }
    let handlefeatureInput = (event) => {
        let { keyCode, target } = event;
        let { selectionStart, value } = target;
        
        if (keyCode === enter) {
  
          target.value = [...value]
            .map((c, i) => i === selectionStart - 1
              ? `\n${bulletWithSpace}`
              : c
            )
            .join('');
            
          target.selectionStart = selectionStart+bulletWithSpace.length;
          target.selectionEnd = selectionStart+bulletWithSpace.length;
        }
        
        if (value[0] !== bullet) {
          target.value = `${bulletWithSpace}${value}`;
        }

        setFeatures(event.target.value)
      }
    return (
        <div className="createQuery mx-1 mx-xl-5 mx-lg-5 mx-sm-2 mx-md-2 my-5 ">
            <div className="row">
                <div className="col-12 w-100">
                    <div className="d-flex justify-content-center">
                        <Form.Label className="queryHeader d-flex justify-content-center p-0 p-xl-2 p-lg-2 p-md-1 p-sm-0 w-75 w-xl-50 w-lg-50 w-md-75 w-sm-75">Add New Virtual Product</Form.Label>
                    </div>
                    <div id="timer">

                    </div>
                    <Form className="mt-4">
                        <h5 className="text-center text-dark font-weight-bold">You can sell products that are downloadable</h5>
                        <Form.Group className="mb-3 " controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="What is your product title?" onChange={(e)=>setTitle(e.target.value)} />
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
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Premium Features</Form.Label>
                            <Form.Control as="textarea" rows={10} onKeyUp={(e)=>handlefeatureInput(e)}/>
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
                            <Form.Label>Quick installation</Form.Label>
                            <Form.Control as="textarea" rows={10} onKeyUp={(e)=>handleInstallationInput(e)}/>
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
                        <Form.Label>Price</Form.Label>
                        <Form.Group className="input-group mb-3">
                            <Form.Label className="input-group-prepend">
                                <span className="input-group-text">RS</span>
                            </Form.Label>
                            <Form.Control type="number" className="form-control" aria-label="Amount (to the nearest ppkr)" placeholder="Price for product?" onChange={(e)=>setRupees(e.target.value)}/>
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
                        <Form.Label>Product</Form.Label>
                        <p className="text-dark text-center font-weight-bold">Product file should be .zip</p>
                        <Form.Group controlId="formFileMultiple" className="input-group mb-3">
                            <Form.Label className="input-group-prepend d-none d-xl-block d-lg-block d-md-block d-sm-none">
                                <span className="input-group-text">Upload</span>
                            </Form.Label>
                            <Form.Label className="custom-file">
                                <Form.Control type="file" multiple className="custom-file-input" name="files" id="inputGroupFile01" onChange={(e)=>fileChange(e)}/>
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
                        <Form.Label className="d-flex justify-content-end text-dark font-weight-bold">{productName}</Form.Label>

                        <div className="col-12 my-4 d-flex justify-content-center">
                            <Button className="create-query-btn w-50"  onClick={handleSubmit}  type="submit">
                                Add Virtual Product
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

export default CreateSale;
