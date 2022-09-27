import "./App.css";
import React from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import CreateQuery from "./Pages/createQuery";
import ViewQuery from "./Pages/viewQuery";
import EditQuery from "./Pages/editQuery";
import About from "./Pages/AboutUs";
import Contact from "./Pages/ContactUs";
import Profile from "./Pages/UserProfile";
import EditProfile from "./Pages/EditProfile";
import CreateProfile from "./Pages/CreateProfile";
import Sales from "./Pages/saleProducts";
import BuyProduct from "./Pages/buyProduct";
import AllProduct from "./Pages/allProduct";
import AllUsers from "./Pages/viewAllUsers";
import Questions from "./Pages/Questions";
import Solutions from "./Pages/Solutions";
import Chat from "./Pages/chat";
import ApproveProduct from "./Pages/ApproveProduct";


function App() {
    return (
        <BrowserRouter>

        
            <Switch>
                <Route exact path={["/", "/home"]} component={Home} />
                <Route exact path="/SignIn" component={SignIn} />
                <Route exact path="/SignUp" component={SignUp} />
                <Route exact path="/query/create" component={CreateQuery} />
                <Route exact path="/query/:id/view" component={ViewQuery} />
                <Route exact path="/query/:id/edit" component={EditQuery} />
                <Route exact path="/aboutus" component={About} />
                <Route exact path="/contactus" component={Contact} />
                <Route exact path="/profile/:id/view" component={Profile} />
                <Route exact path="/profile/create" component={CreateProfile} />
                <Route exact path="/profile/:id/edit" component={EditProfile} />
                <Route exact path="/virtual/sale" component={Sales} />
                <Route exact path="/product/:id/view" component={BuyProduct} />
                <Route exact path="/virtual/product" component={AllProduct} />
                <Route exact path="/users" component={AllUsers} />
                <Route exact path="/questions" component={Questions} />
                <Route exact path="/solutions" component={Solutions} />
                <Route exact path="/chat" component={Chat} />
                <Route exact path="/virtual/product/verify" component={ApproveProduct} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;