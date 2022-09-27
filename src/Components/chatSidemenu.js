import React, { useState } from "react";
import {  Row, Col, ListGroup } from "react-bootstrap";
// import Cookies from 'universal-cookie';


let ChatSidemenu = () => {
    // let cookies = new Cookies();
    // console.log(cookies.get('token')) 
    let rooms = ['gerneral', 'queries', 'products'];

    return (
        <>
            <Row className="mt-5 mb-2 ml-3">
                <Col md={12} lg={12} sm={12}>
                    <h2>Avaiable Rooms</h2>
                </Col>
                <Col md={12} lg={12} sm={12}>
                    <ListGroup>
                        {rooms.map((room, index) => (
                            <ListGroup.Item key={index}>{room}</ListGroup.Item>
                        )
                        
                        )}
                    </ListGroup>
                </Col>
                <Col md={12} lg={12} sm={12} className="mt-4">
                    <h2>Members</h2>
                </Col>
            </Row>
        </>
    );
};

export default ChatSidemenu;