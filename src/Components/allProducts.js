import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Badge } from "react-bootstrap";
import axios from "axios";
// import Cookies from 'universal-cookie';



let ViewProduct = () => {
    // let cookies = new Cookies();
    // let UserRole = cookies.get('role');
    let [productData, setProductData] = useState("");
    // let [errorMsg, seterrorMsg] = useState("");
    let url = "http://localhost:9000/api/product/view/all";

    useEffect(() => {
        getAllProducts();
    })



    let getAllProducts = async (e) => {

        try {
            let response = await axios.get(url);
            setProductData(response?.data);
        } catch (err) {
            // let errmsg = err?.response?.data?.message;
            // seterrorMsg(errmsg)
        }
    }



    let shortDescription = (content) => {
        // let len = content.length;
        return (content)
        // console.log(content)
        // if(content.length>10){
        //     // return 'content'
        //     // return(content.substring(0, 10) + "...")
        // }else{
        //     return content
        // }

    }

    let getTitle = (title, id) => {

        let path = '/product/' + id + '/view';
        return (
            <div className="title">
                <Link to={path}>{title}</Link>
            </div>
        )

    }
    let SingleProductCreate = (product) => {
        if (product.title && product.description && product.status === "Approved") {
            return (
                <div className="row queries-post">
                    <Card className="col-12 my-2">
                        <Card.Header className="row">
                            <div className="col-10">
                              <h6>  {getTitle(product.title, product._id)} </h6>
                            </div>
                            <div className="col-2">
                               
                                <div className="col-12 my-1 d-flex justify-content-end">
                                    <Badge className="p-2 pkr" bg="success" pill> PKR {product.rupees} </Badge>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="col-12">
                                <p>
                                    {shortDescription(product.description)}
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            )
        }
    }
    let ProductCreate = () => {
        if (productData.length > 0) {
            {
                return (
                    productData.map((product, index) => (
                        SingleProductCreate(product)
                    ))
                )
            }
        } else {
            return (
                <Card className="col-12">
                    <Card.Header className="row">
                        <div className="col-12 d-flex justify-content-center">
                            Sorry! No Product Founded.
                        </div>
                    </Card.Header>
                </Card>
            )
        }
    }
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="createQuery mx-1 mx-xl-3 mx-lg-3 mx-sm-1 mx-md-1 my-5 ">
                        <div className="row">
                            <div className="col-12 w-100">
                                <div className="d-flex justify-content-center">
                                    <div className="queryHeader header_box d-flex justify-content-center p-0 p-xl-2 p-lg-2 p-md-1 p-sm-0 w-75 w-xl-50 w-lg-50 w-md-75 w-sm-75"><h6>PRODUCTS</h6></div>
                                </div>
                                <div className="container my-5">
                                    {ProductCreate()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewProduct;