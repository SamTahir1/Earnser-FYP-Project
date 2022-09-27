import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Flip } from 'react-toastify';
import { Form } from "react-bootstrap";
import axios from "axios";
// import Cookies from 'universal-cookie';
import Table from 'react-bootstrap/Table';


let ApproveProduct = () => {
    // let cookies = new Cookies();
    // let UserRole = cookies.get('role');
    let [productData, setProductData] = useState("");
    let url = "http://localhost:9000/api/product/view/all";

    useEffect(() => {
        getAllProducts();
    })
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

    let getAllProducts = async (e) => {

        try {
            let response = await axios.get(url);
            setProductData(response?.data);
        } catch (err) {
            // let errmsg = err?.response?.data?.message;
            // seterrorMsg(errmsg)
        }
    }

    let approveProduct = async (qid) => {

        let approveUrl = "http://localhost:9000/api/product/" + qid + "/approve";
        try {
            await axios.post(approveUrl);
            successNotify("Successfully Approve the Product")

        } catch (err) {
            errorNotify(err?.response?.data?.message)
        }
    }


    let ApproveCheck = (status, id) => {
        if(status === "Approved"){
            return (
                <Form.Check type="switch" id="check-product" checked  onChange={(e) =>  approveProduct(id) } />
            )
        }else{
            return (
                <Form.Check type="switch" id="check-product" onChange={(e) => approveProduct(id) } />
            )
        }
    }

    let ProductCreate = () => {
        return (
            <>
                <Table striped bordered hover size="sm" variant="dark">
                    <thead>
                        <tr>
                            <th className="title">No.</th>
                            <th className="title">Product Title</th>
                            <th className="title">Ruppees</th>
                            <th className="title">Status</th>
                            <th className="title">Approve</th>
                        </tr>
                    </thead>
                    <tbody>
                        {


                            productData.length &&
                            productData.map((data, index) => {
                                return (
                                    <tr key={index}>

                                        <td>{index}</td>
                                        <td>{data.title}</td>
                                        <td>{data.rupees}</td>
                                        <td>{data.status}</td>
                                        <td>


                                            <Form>

                                                <Form.Group className="form-check form-switch">
                                                {ApproveCheck(data.status,data._id)}
                                                </Form.Group>

                                            </Form>
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

                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </>

        )
    }
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="createQuery mx-1 mx-xl-3 mx-lg-3 mx-sm-1 mx-md-1 my-5 ">
                        <div className="row">
                            <div className="col-12 w-100">
                                <div className="d-flex justify-content-center">
                                    <div className="queryHeader header_box d-flex justify-content-center p-0 p-xl-2 p-lg-2 p-md-1 p-sm-0 w-75 w-xl-50 w-lg-50 w-md-75 w-sm-75"><h6>VERIFY PRODUCTS</h6></div>
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

export default ApproveProduct;