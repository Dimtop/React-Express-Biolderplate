import React from 'react';
import ReactDom from 'react-dom';
import {
    Redirect
  } from "react-router-dom";


  import { withRouter } from 'react-router';

class LoginForm extends React.Component{


    constructor(props){
        super(props);

        this.state = {
            
            errorMessage :"" ,
            nickname:"",
            password:"",
            loggedIn:false,
            redirectComponent:<Redirect to="/dashboard" />
        };

        this.props.history.push("/");

        this.loginPost = this.loginPost.bind(this);
        this.setStateNickname = this.setStateNickname.bind(this);
        this.setStatePassword = this.setStatePassword.bind(this);
    }

    setStateNickname(e){
        
        var value = e.target.value;
        this.setState({nickname:value});
    
    }
    setStatePassword(e){

        var value = e.target.value;
        this.setState({password:value});
    }

    loginPost(){

       

        fetch("/api/login",{
            method:"POST",  
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           },
           body:JSON.stringify({
               nickname:this.state.nickname,
               password:this.state.password
           })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if(res.user == "none"){
             
                this.setState({errorMessage:res.errorMessage});
                this.props.passUserData({id:-1,role:-1});
            }
            else{
             
                this.props.passUserData({id:res.user.id,role:res.user.role});
                this.setState({loggedIn:true});
            }
        });
    }



    render(){

       
        return(
            this.state.loggedIn?this.state.redirectComponent:
            <div className="row ">
                <div className="col s12 l4"></div>
                <div className="col s12 l4" style={{marginTop:"10rem"}}>
                    <div className="card" id="loginFormContainer">
                        <div className="card-content white-text">
                            <div className="card-content white-text">
                                <span className="card-title" style={{color:"black",textAlign:"center"}}>Σύνδεση</span>
                                 
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input placeholder="Όνομα χρήστη" id="name" type="text" class="validate" name="nickname" onChange={this.setStateNickname}/>
                                                <label for="first_name">Όνομα χρήστη</label>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input placeholder="Κωδικός" id="password" type="password" class="validate" name="password" onChange={e=>this.setStatePassword(e)}/>
                                                <label for="password">Κωδικός</label>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12" style={{textAlign:"center"}}>
                                                <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.loginPost}>
                                                    Συνδεση
                                                </button>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12" style={{textAlign:"center"}}>
                                                <p className="errorMessage">{this.state.errorMessage}</p>
                                            </div>
                                        </div>
                    
                         
                            </div>
                        </div>
                    </div>
        
                </div>
                <div className="col s12 m4"></div>
            </div>
        
        

        );
    }
}



export default withRouter(LoginForm);