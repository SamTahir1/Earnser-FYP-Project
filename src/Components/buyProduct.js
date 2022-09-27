import React, { useEffect, useState  } from "react";
import { Card, Button, Badge, Modal, Form, Image } from 'react-bootstrap';
import { Check2Circle } from 'react-bootstrap-icons';
import axios from "axios";
import easypaisa from "../images/easypaisa.png";

let BuyProduct = () => {
    let [show, setShow] = useState(false);
    let handleClose = () => setShow(false);
    let handleShow = () => setShow(true);
    let product_id = window.location.pathname.split("/");
    let [title,setTitle]=useState("");
    let [description,setDescription]=useState("");
    let [features,setFeatures]=useState("");
    let [installation,setInstallation]=useState("");
    let [rupees,setRupees]=useState("");
    let [name,setName]=useState("");
    // let [file,setFile]=useState("");
    // let [date,setDate]=useState(""); 
    // let [errorMsg,seterrorMsg]=useState(""); 
    let url = "http://localhost:9000/api/product/"+product_id[2]+"/view";

    useEffect(() => {
        getProduct();
   });

    let getProduct =async (e) => {
        try{
            let response = await axios.get(url);
            var productsData = response?.data?.product_data;
            setTitle(response?.data?.product_data?.productData?.title)
            setDescription(response?.data?.product_data?.productData?.description)
            setFeatures(productsData.productData.features)
            setInstallation(productsData.productData.installation)
            setRupees(response?.data?.product_data?.productData?.rupees)
            setName(response?.data?.product_data?.FullName)
            // setFile(response?.data?.product_data?.productData?.product)
            // setDate(response?.data?.product_data?.productData?.date)
        } catch(err){
            // let errmsg = err?.response?.data?.message;
            // seterrorMsg(errmsg)
        }
    }


    let downloadProduct = (file) => {
        if(file !== ""){
            let path = "../../api/public/upload/files/"+file;

            return(
                    <Button className="create-query-btn w-50" href={path} target="_blank" download>
                        Pay & Buy Product
                    </Button>
            )
        }else{
           return
       }   
    }


    return (
        <div className="createQuery mx-1 mx-xl-3 mx-lg-3 mx-sm-1 mx-md-1 my-5 ">
            <div className="row">
                <div className="col-12 w-100">
                    <div className="d-flex justify-content-center">
                        <div className="plugin-banner" id="plugin-banner-advanced-custom-fields"></div>
                    </div>
                    <header className="row my-5">	
                        <div className="col-8">
                            <h1 className="">{title}</h1>		
                            <span className="byline">By <span className="author vcard"><a className="url">{name}</a></span></span>
                        </div>
                        <div className="col-4 col-lg-4 col-md-4 d-flex justify-content-end pr-3">			
                                <Button className="create-query-btn h-50"   onClick={handleShow}>
                                        Buy Product
                                </Button>
                        </div>

                    </header>
                    <div className="row">
                        <div className="col-8">
                            <div className="description">
                                <div>
                                    <h1 className="plugin-title">Description</h1>
                                </div>
                                <div>
                                    <p className="plugin-title">{description} </p>
                                </div>
                            </div>

                            <div className="features">
                                <div>
                                    <h1 className="plugin-title">Premium Features</h1>
                                </div>
                                <html>
                                    <head>

                                    </head>
                                    <body>

                                    {features}
                                    </body>
                                </html>

                            </div>

                            <div>
                                <div>
                                    <h1 className="plugin-title">Quick installation</h1>
                                    {installation}
                                </div>
                                
                            </div>
                        </div>
                        <div className="col-4">
                            <Card>
                            <Card.Header>
                                <div className="row">
                                    <div className="col-7">Regular License</div>  
                                    <div className="col-5 my-1 d-flex justify-content-end">
                                        <Badge className="p-2 pkr" bg="success" pill> PKR {rupees} </Badge>
                                    </div>  
                                </div>    
                            </Card.Header>
                            <Card.Body>
                                <div className="row">
                                    <div className="col-2"><Check2Circle size={25} /></div>  
                                    <div className="col-10">Quality checked by Earnser</div>  
                                </div>  
                                <div className="row">
                                    <div className="col-2"><Check2Circle size={25} /></div>  
                                    <div className="col-10">Updated Features</div>  
                                </div> 
                                <div className="row">
                                    <div className="col-2"><Check2Circle size={25} /></div>  
                                    <div className="col-10">Active Installation</div>  
                                </div> 
                                <div className="row d-flex justify-content-center">			
                                    <Button className="col-10 mt-4 mb-2 px-5 create-query-btn h-50"   onClick={handleShow}>
                                        Buy Product
                                    </Button>
                                </div>
                            </Card.Body>
                            </Card>
                        </div>
                    </div>
                    
                    <div className="col-12 mb-4 mt-5 d-flex justify-content-center">
                        <Button className="create-query-btn w-50 mt-5"   onClick={handleShow}>
                            Buy Product
                        </Button>
                    </div>
                    <Modal className="mt-5" show={show} onHide={handleClose}>
                            <Modal.Header className="d-flex justify-content-center">
                                <Image className="w-50 h-50" src={easypaisa} /> 
                            </Modal.Header>
                            <Modal.Body>
                            <Form className="mt-4">
                                <p className="error text-success text-center"></p>
                                <Form.Label>Easypaisa Phone</Form.Label>
                                    <p className="error text-danger text-center"></p>
                                    <Form.Group className="input-group mb-3">
                                        <Form.Label className="input-group-prepend">
                                            <span className="input-group-text">+92</span>
                                        </Form.Label>
                                        <Form.Control type="number" className="form-control" aria-label="Amount (to the nearest ppkr)" placeholder="Who many rupees for Query?" onChange={(e)=>setRupees(e.target.value)}/>
                                        <Form.Label className="input-group-append">
                                        </Form.Label>
                                </Form.Group>
                                <Form.Label>Rupees</Form.Label>
                                    <p className="error text-danger text-center"></p>
                                    <Form.Group className="input-group mb-3">
                                        <Form.Label className="input-group-prepend">
                                            <span className="input-group-text">RS</span>
                                        </Form.Label>
                                        <Form.Control type="number" className="form-control" aria-label="Amount (to the nearest ppkr)" placeholder="Who many rupees for Query?" onChange={(e)=>setRupees(e.target.value)}/>
                                        <Form.Label className="input-group-append">
                                        </Form.Label>
                                </Form.Group>

                                <div className="col-12 my-4 d-flex justify-content-center">
                                    {downloadProduct()}
                                </div>
                            </Form> 
                                </Modal.Body>
                        </Modal>
                </div>
            </div>
        </div>
    );
};

export default BuyProduct;
