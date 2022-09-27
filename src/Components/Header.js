import React, { useEffect, useState  } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, Container, FormControl, Form, Button } from 'react-bootstrap'
import { useLocation, Link } from 'react-router-dom';
import Logo from '../images/logo.png';
import Cookies from 'universal-cookie';
import axios from "axios";

let Header = () => {
    let cookies = new Cookies();
    let UserId = cookies.get('userid');
    let token = cookies.get('token');
    let UserRole = cookies.get('role');
    let history = useHistory()
    let [username,setUsername]=useState([]);
    // let [errorMsg,seterrorMsg]=useState("");

    let profilePath = "/profile/"+UserId+"/view";
    let fetchUrl = "http://localhost:9000/api/user/"+UserId;

    useEffect(() => {
        if(UserId && token && UserRole){
            fetchData();
        }
   });

   const fetchData =async (e) => {
    try{
        let response = await axios.get(fetchUrl);

        setUsername(response?.data?.user?.username.toUpperCase())
    } catch(err){
        // let errmsg = err?.response?.data?.message;
        // seterrorMsg(errmsg)
    }
}

    let usePathname = () => {
        let location = useLocation()
        let path = location.pathname.split('/')
        let pathName = path[1].toUpperCase()
    
        return pathName
    }

    let removeJTW = (token) => {
        if(token && UserId && UserRole){
            cookies.remove('userid');
            cookies.remove('token');
            cookies.remove('role');
            history.push('/');
        }
    }


    let  getHeaderRight= (token) => {

        if(token && UserId && UserRole){
            return(
                <Nav className="col-4 justify-content-end">
                    <span className="px-1">
                        <Link className="link" to={profilePath}>{username}</Link>
                    </span>
                    <span className="px-1">
                        <Button className="btn btn-primary addQuery mx-2 px-4" onClick={removeJTW.bind(token)}>Log Out</Button>
                    </span>
    
                </Nav>
            )
            
        }else{
            return(
                <Nav className="col-4 justify-content-end">
                    <span className="">
                        <Button type="button" className="btn signin btn-primary btn-sm mx-2 px-4 text-dark"><Link className="link" to='/SignIn'>Sign In</Link></Button>
                    </span>
                    <span className="">
                        <Button type="button" className="btn signup btn-secondary  btn-sm mx-2 px-4 text-dark"><Link className="link" to='/SignUp'>Sign Up</Link></Button>
                    </span>

                </Nav>
            );
        }
    };

    return (

        <Navbar className="headerBar borderheader" bg="dark" expand="lg">
            <Container fluid={true} >
                <Navbar.Brand className="col-6 col-lg-3 col-md-6 m-0 p-0 w-50 logo"><Link className="link" to='/home'><img src={Logo} alt="EARNSER" className="w-75" /></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="col-2">
                        <span className="col-3 pageName" /><Nav.Link className="text-white">{usePathname()}</Nav.Link>
                    </Nav>
                        <Form className="d-flex col-6">
                            <FormControl
                                type="search"
                                placeholder="Search Queries"
                                className="me-2"
                                aria-label="Search"
                            />
                            {/* <Button variant="outline-success ml-2">Search</Button> */}
                        </Form>
                        {getHeaderRight(token)}
                        
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;