import React from 'react';
import ReactDom from 'react-dom';
import {
    Redirect
  } from "react-router-dom";

  import { makeStyles, useTheme } from '@material-ui/core/styles';
  import Input from '@material-ui/core/Input';
  import InputLabel from '@material-ui/core/InputLabel';
  import MenuItem from '@material-ui/core/MenuItem';
  import FormControl from '@material-ui/core/FormControl';
  import ListItemText from '@material-ui/core/ListItemText';
  import Select from '@material-ui/core/Select';
  import Checkbox from '@material-ui/core/Checkbox';
  import Chip from '@material-ui/core/Chip';

  import Cookies from 'js-cookie';



  class UserEntryForm extends React.Component{



    constructor(props){

        super(props);

        this.state = {

            name:"",
            nickname:"",
            password:"",
            role:"",
            rolesFetched:[]
        };

    
        this.fetchRoles = this.fetchRoles.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNicknameChange = this.handleNicknameChange.bind(this);
        this.handlePasswordChange= this.handlePasswordChange.bind(this);
        this.submitUser = this.submitUser.bind(this);
    
     
    }

    componentDidMount(){
        
        this.fetchRoles();

    }


    
   fetchRoles(){
        
    fetch("/api/roles",{
           method:"GET",  
           headers : { 
           'Content-Type': 'application/json',
           'Accept': 'application/json'
       },
       })
       .then(res => res.json())
       .then(res => {
           console.log(res);
           
           var roleNames = [];

           for(var i=0;i<res.roles.length;i++){
                roleNames.push(res.roles[i].name);
           }

           this.setState({rolesFetched:res.roles,roleNames:roleNames});
         
       });
    }

    handleRoleChange(e){


   
        this.setState({role:e.target.value});
    }

    handleNameChange(e){
        var usersMutated = this.state.usersFetched;
    
        this.setState({name:e.target.value});
    }
    
    handleNicknameChange(e){
 
    
        this.setState({nickname:e.target.value});
    }

    handlePasswordChange(e){

        this.setState({password:e.target.value});
     
    }

    submitUser(){
        fetch("/api/users",{
            method:"POST",  
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body:(
            JSON.stringify({
                name:this.state.name,
                nickname:this.state.nickname,
                password:this.state.password,
                role:this.state.role
            })
        )
        })
        .then(res => res.json())
        .then(res => {
            
        //  this.setState({products:res.products}, () =>{
            //   console.log(res);
            
        // });
            location.reload();
        });
    }
    

    render(){


        if(Cookies.get("username") == null){
            return (

                <Redirect to="/" />
            );
        }
        else{
            return(
                <div className="row">
                <div className="col s12 m2 l4" ></div>  
                <div className="col s12 m8 l4" >
                    <div className="card" id="productFormContainer">
                        <div className="card-content white-text">
                            <div className="card-content white-text">
                                <span className="card-title" style={{color:"black",textAlign:"center"}}>Στοιχεία χρήστη</span>
                                 
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input placeholder="Ονοματεπώνυμο" id="name" type="text" class="validate" name="name" onChange={this.handleNameChange}/>
                                                <label for="name">Ονοματεπώνυμο</label>
                                            </div>
                                        </div>
    
    
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input placeholder="Όνομα χρήστη" id="nickname" type="text" class="validate" name="nickname" onChange={this.handleNicknameChange}/>
                                                <label for="nickname">Όνομα χρήστη</label>
                                            </div>
                                        </div>
    
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input placeholder="Κωδικός" id="password" type="text" class="validate" name="password" onChange={this.handlePasswordChange}/>
                                                <label for="password">Κωδικός</label>
                                            </div>
                                        </div>
                                        
                                        <div className="row">
                                            <div class="input-field col s12">
                                                <FormControl style={{width:"100%"}}>
                                                        <InputLabel id="role">Ρόλος</InputLabel>
                                                        <Select
                                                            labelId="role"
                                                            id="role"  
                                                            input={<Input />}
                                                            value={this.state.role }
                                                            onChange={this.handleRoleChange}
                                                        >
                                               
                                                            {this.state.rolesFetched.map(e => <MenuItem key={e.id} value={e.name}>{e.name}</MenuItem>)}
                                      
                                                        </Select>
                                                </FormControl>
                                            </div>
                                        </div>
    
    
    
                                        <div className="row">
                                            <div className="input-field col s12" style={{textAlign:"center"}}>
                                                <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.submitUser}>
                                                    KΑΤΑΧΩΡΗΣΗ
                                                </button>
                                            </div>
                                        </div>
    
                                   
    
                    
                         
                            </div>
                        </div>
                    </div>
        
                </div>
                <div className="col s12 m2 l4" ></div>
            </div>
    
            );
        }
      
    }
}



export default UserEntryForm;