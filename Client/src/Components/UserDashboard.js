import React from 'react';
import ReactDom from 'react-dom';


import {
    Redirect
  } from "react-router-dom";


class UserDashboard extends React.Component{


    constructor(props){
        super(props);

        this.state = {
            shouldRedirect:false,
            redirectComponent:<></>
        };

        this.redirectToProductsPage = this.redirectToProductsPage.bind(this);
    }

    redirectToProductsPage(){
        this.setState({shouldRedirect:true, redirectComponent:<Redirect to="products" />});
    }

    render(){

        return(
            this.state.shouldRedirect?this.state.redirectComponent:
            <>
           <div className="row" style={{marginTop:"10rem"}}>
                <div className="col s12 m4"></div>
                <div className="col s12 m4">
                    <div className="card" id="loginFormContainer">
                        <div className="card-content white-text">
                            <div className="card-content white-text">
                                <span className="card-title" style={{color:"black",textAlign:"center"}}>Επιλογές</span>
                                 
                                        <div className="row">
                                            <div className="input-field col s12" style={{textAlign:"center"}}>
                                                <button className="btn waves-effect waves-light dashboardButton" type="submit" onClick={this.redirectToProductsPage}>
                                                    ΕΠΕΞΕΡΓΑΣΙΑ ΠΡΟΪΟΝΤΩΝ
                                                </button>
                                            </div>
                                        </div>

                            </div>
                        </div>
                    </div>
        
                </div>
                <div className="col s12 m4"></div>
            </div>


            </>

        );
    }
}



export default UserDashboard;