import React from 'react';
import ReactDom from 'react-dom';


import Header from './Header';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import ProductEntryForm from './ProductEntryForm';
import ProductPage from './ProductsPage';
import UsersPage from './UsersPage';
import UserEntryForm from './UserEntryForm';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
  
  import Cookies from 'js-cookie';




class App extends React.Component{

    



    constructor(props){
        super(props);

        this.state = {
            userID : "",
            userRole:-1,
            isLoggedIn: false,
            dashboardComponent: <Redirect to="/" />
        };

        this.passUserData = this.passUserData.bind(this);

        

    }


    passUserData(userData){
        this.setState({
            userID:userData.id,
            userRole:userData.role,
            isLoggedIn:true
        });

     
    }
    

    render(){
        /*fetch("/api/test",{
            method:"GET",  
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res.test);
        });*/
        return(
            <>


            <Router>
                <div>
               
                    <Route exact  path="/">
                        <Header />
                        <LoginForm passUserData={this.passUserData}/>     
                    </Route>
                    <Route exact path="/dashboard">   
                            <Header />
                            <Dashboard isLoggedIn={this.state.isLoggedIn} userRole={this.state.userRole} userID={this.state.userID}/>
                    </Route>
                    <Route exact path="/products">   
                        <Header />
                        <ProductPage />
                    </Route>
                    <Route exact path="/products/new">   
                        <Header />
                        <ProductEntryForm />
                    </Route>
                    <Route exact path="/users">   
                        <Header />
                        <UsersPage />
                    </Route>
                    <Route exact path="/users/new">   
                        <Header />
                        <UserEntryForm />
                    </Route>
                </div>
            </Router>

            </>

        );
    }
}


export default App;