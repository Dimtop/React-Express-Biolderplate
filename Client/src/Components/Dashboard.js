import React from 'react';
import ReactDom from 'react-dom';

import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

import {
    Redirect
  } from "react-router-dom";

  import Cookies from 'js-cookie';

class Dashboard extends React.Component{


    constructor(props){
        super(props);

        console.log(this.props);

        var componentToRender = null;

        var role = Cookies.get("role"); 
      
            switch(role){
                case "Admin":
                    componentToRender = <AdminDashboard />
                    break;
                case "User":
                    componentToRender = <UserDashboard />
                    break;
                default:
                    componentToRender = <Redirect to="/" />;
                    break;
            }

          
        

        this.state = {
            componentToRender:componentToRender
        };
    }



    render(){

       
        return(
            <>
           {this.state.componentToRender}
            </>
        );
    }
}



export default  Dashboard;