import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Badge } from "react-bootstrap";
import axios from "axios";
// import Cookies from 'universal-cookie';
 

let AllQuestions = () => {
    // let cookies = new Cookies();
    // let UserId = cookies.get('userid');
    // let token = cookies.get('token');
    let [queryData, setQueryData] = useState("");
    // let [errorMsg, seterrorMsg] = useState("");
    let url = "http://localhost:9000/api/query/view/all";
    let expireurl = "http://localhost:9000/api/query/expire";

    useEffect(() => {
        getAllQueries();
        expireQueries();
    })

    let getAllQueries = () => {
        axios
        .get(`${url}`)
        .then((res) => {
            console.log(res)
            setQueryData(res.data)
        })
        .catch((err) => {
            console.log('Error: ' + err)
          })
    }

    let expireQueries = async (e) => {

        try {
            await axios.put(expireurl);
        } catch (err) {
            // let errmsg = err?.response?.data?.message;
        }
    }

    let getExpireDate = (expiretime, date) => {
        var askedData = new Date(date);
        
        if(expiretime === 24){
            askedData.setDate(askedData.getDate() + 1)
            let expire_date = askedData.getDate();
            let expire_month = askedData.getMonth() + 1;
            let expire_year = askedData.getFullYear();
            let expire_min = askedData.getMinutes()+1;
            let expire_hour = askedData.getHours();
            return(expire_date + "-" + expire_month + "-" +expire_year + '(' +  expire_hour+':'+expire_min+')' )

        }else if(expiretime === 72){
            askedData.setDate(askedData.getDate() + 3)
            let expire_date = askedData.getDate();
            let expire_month = askedData.getMonth() + 1;
            let expire_year = askedData.getFullYear();
            let expire_min = askedData.getMinutes()+1;
            let expire_hour = askedData.getHours();
            return(expire_date + "-" + expire_month + "-" +expire_year + '(' +  expire_hour+':'+expire_min+')' )
        }else {
            askedData.setDate(askedData.getDate() + 5)
            let expire_date = askedData.getDate();
            let expire_month = askedData.getMonth() + 1;
            let expire_year = askedData.getFullYear();
            let expire_min = askedData.getMinutes()+1;
            let expire_hour = askedData.getHours();
            return(expire_date + "-" + expire_month + "-" +expire_year + '(' +  expire_hour+':'+expire_min+')' )
        }

    }

    let shortDescription = (content) => {
        if(content.length > 500){
            content =  content.substring(0, 500) + '...';
        }
        return (content)
    }

    let getTitle = (title, id) => {

        let path = '/query/' + id + '/view';
        return (
            <div className="title">
                <Link to={path}>{title}</Link>
            </div>
        )
    }
    let SingleQueryCreate = (query) => {
        if (query.title && query.description) {
            return (
                <div className="row queries-post">
                    <Card className="col-12 my-2 querybody">
                        <Card.Header className="row queryheader">
                            <div className="col-10">
                              <h6>  {getTitle(query.title, query._id)} </h6>
                            </div>
                            <div className="col-2">
                                <div className="col-12 my-1 d-flex justify-content-end">
                                    <Badge className="p-2 points" bg="primary" pill> Points {query.points} </Badge>
                                </div>
                                <div className="col-12 my-1 d-flex justify-content-end">
                                    <Badge className="p-2 pkr" bg="success" pill> PKR {query.rupees} </Badge>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="col-12 text-white">
                                <p>
                                    {shortDescription(query.description)}
                                </p>
                            </div>
                            <div className="col-12 d-flex justify-content-end title">
                                    Expire on: {getExpireDate(query.expireTime, query.date)}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            )
        }
    }
    let QueryCreate = () => {
        if (queryData.length > 0) {
            {
                return (
                    queryData.map((query, index) => (
                        SingleQueryCreate(query)
                    ))
                )
            }
        } else {
            return (
                <Card className="col-12">
                    <Card.Header className="row">
                        <div className="col-12 d-flex justify-content-center queryHeader">
                            Sorry! No Query Found.
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
                                    <div className="queryHeader header_box d-flex justify-content-center p-0 p-xl-2 p-lg-2 p-md-1 p-sm-0 w-75 w-xl-50 w-lg-50 w-md-75 w-sm-75"><h6>Query</h6></div>
                                </div>
                                <div className="container my-5">
                                    {QueryCreate()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllQuestions;