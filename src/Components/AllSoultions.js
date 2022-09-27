import React, { useEffect, useState } from "react";
import { Card} from "react-bootstrap";
import axios from "axios";
import Cookies from 'universal-cookie';
import { ToastContainer, toast, Flip } from 'react-toastify';
 

let AllSoultions = () => {
    let cookies = new Cookies();
    let UserId = cookies.get('userid');
    let [SolutionData, setSolutionData] = useState("");
    let solution_url = "http://localhost:9000/api/solutions/" + UserId;

    useEffect(() => {
        getAllSoultions();
    })

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

    let getAllSoultions = async (e) => {

        try {
            let response = await axios.get(solution_url);
            setSolutionData(response?.data);
        } catch (err) {
            let errmsg = err?.response?.data?.message;
            errorNotify(errmsg)
        }
    }

    let getSolDes = (des) => {
        if(des){

            return (
                <div className="row solDes py-3 px-2">
                    <div className="col-2 title text-bold">
                       Useful For:
                    </div>
                    <div className="col-10 text-white">
                        {des}
                    </div>
                </div>
        )
    }
}

    let SingleSoultionCreate = (solution) => {
            return (
                <div className="row queries-post my-5">
                    <Card className="col-12 querybody">
                        <Card.Body className="row">
                            <div className="col-12">
                            {solution.comment_des}
                            </div>
                        </Card.Body>
                        {getSolDes(solution.soluDes)}
                        

                    </Card>
                </div>
            )
    }

    let SoultionCreate = () => {
        if (SolutionData.length > 0) {
            {
                return (
                    SolutionData.map((solution, index) => (
                        SingleSoultionCreate(solution)
                    ))
                )
            }
        } else {
            return (
                <Card className="col-12">
                    <Card.Header className="row">
                        <div className="col-12 d-flex justify-content-center queryHeader">
                            Sorry! No Best Solution Found.
                        </div>
                    </Card.Header>
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
                                    <div className="queryHeader header_box d-flex justify-content-center p-0 p-xl-2 p-lg-2 p-md-1 p-sm-0 w-75 w-xl-50 w-lg-50 w-md-75 w-sm-75"><h6>Best Solutions</h6></div>
                                </div>
                                <div className="container my-5">
                                    {SoultionCreate()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllSoultions;