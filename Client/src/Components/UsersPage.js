import React from 'react';
import ReactDom from 'react-dom';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

import Cookies from 'js-cookie';

import {
    Redirect
  } from "react-router-dom";


class UsersPage extends React.Component{


    constructor(props){
        super(props);

        this.state = {
            usersFetched:[],
            rolesFetched:[],
            roleNames:[]
            
        }



        this.fetchUsers = this.fetchUsers.bind(this);
        this.fetchRoles = this.fetchRoles.bind(this);

        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleDataChange = this.handleDataChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNicknameChange = this.handleNicknameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }

    componentDidMount(){
        this.fetchUsers();
       
    }
   
    fetchUsers(){
        
        fetch("/api/users",{
               method:"GET",  
               headers : { 
               'Content-Type': 'application/json',
               'Accept': 'application/json'
           },
           })
           .then(res => res.json())
           .then(res => {
               console.log(res);

               this.setState({usersFetched:res.users},()=>{
                this.fetchRoles();
               });
             
           });

       

   }

   handleDataChange(e){
    fetch("/api/users/update",{
        method:"POST",  
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body:(
        JSON.stringify({users:this.state.usersFetched})
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


    var usersMutated = this.state.usersFetched;


    for(var i=0;i<usersMutated.length;i++){
        if(usersMutated[i].id == e.target.name.replace("role","")){
            usersMutated[i].role = e.target.value;
        }
    }

    console.log(usersMutated);
    this.setState({usersFetched:usersMutated});


}

handleNameChange(e){
    var usersMutated = this.state.usersFetched;


    for(var i=0;i<usersMutated.length;i++){
        if(usersMutated[i].id == e.target.id.replace("name","")){
            usersMutated[i].name = e.target.value;
        }
    }

    console.log(usersMutated);
    this.setState({usersFetched:usersMutated});
}

handleNicknameChange(e){
    var usersMutated = this.state.usersFetched;


    for(var i=0;i<usersMutated.length;i++){
        if(usersMutated[i].id == e.target.id.replace("nickname","")){
            usersMutated[i].nickname = e.target.value;
        }
    }

    console.log(usersMutated);
    this.setState({usersFetched:usersMutated});
}


handlePasswordChange(e){
    var usersMutated = this.state.usersFetched;


    for(var i=0;i<usersMutated.length;i++){
        if(usersMutated[i].id == e.target.id.replace("password","")){
            usersMutated[i].password = e.target.value;
        }
    }

    console.log(usersMutated);
    this.setState({usersFetched:usersMutated});
}

handleDelete(e){


    var id = e.target.id.replace("delete","");

    if(confirm("Θέλετε να διαγράψετε τον χρήστη οριστικά;")){
        fetch("/api/users",{
            method:"DELETE",  
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body:(
            JSON.stringify({id:id})
        )
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
        //  this.setState({products:res.products}, () =>{
            //   console.log(res);
            
        // });
          location.reload();
          
        });
    
    }
    
   }





    render(){

    
       if(Cookies.get("username") == null){
           return (
            <Redirect to="/" />
           );
       }
       else{
        return(

        
            <div class="row">
                  {this.state.usersFetched.map(function(e,i){
                    
                  
                        return(
                        <div class="col s12 m4 l3">
                            <div className="card">
                                <div>
                                    <div className="card-content white-text">
                                        <span className="card-title" style={{color:"black",textAlign:"center"}}>{e.name}</span>

                                            <div className="row">
                                                    <div className="input-field col s12" style={{textAlign:"center"}}>
                                                        <Accordion>
                                                            <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header"
                                                            >
                                                            <Typography>Πληροφορίες</Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <div className="row">
                                                                    <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                        <Typography style={{fontWeight:"bold"}}>Ονοματεπώνυμο</Typography>
                                                                    </div>
                                                                    <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                        <input id={"name"+e.id} type="text" class="validate" name="name" value={e.name} onChange={this.handleNameChange}/>                
                                                                    </div>
                                                             
                                                                    <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                        <Typography style={{fontWeight:"bold"}}>Όνομα χρήστη</Typography>
                                                                    </div>
                                                                    <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                        <input id={"nickname"+e.id} type="text" class="validate" name="nickname" value={e.nickname} onChange={this.handleNicknameChange}/>  
                                                                    </div>

                                                                    <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                        <Typography style={{fontWeight:"bold"}}>Κωδικός</Typography>
                                                                    </div>
                                                                    <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                        <input id={"password"+e.id} type="text" class="validate" name="password" value={e.password} onChange={this.handlePasswordChange}/>  
                                                                    </div>
                                                              
                                                                    <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                        <Typography style={{fontWeight:"bold"}}>Ρόλος</Typography>
                                                                    </div>
                                                                    <div className="input-field col s6" style={{textAlign:"center"}}>
                                                              
                                                                                    <FormControl style={{width:"100%"}}>
                                                                                          
                                                                                            <Select
                                                                                              
                                                                                                name={"role" + e.id}  
                                                                                                input={<Input />}
                                                                                                
                                                                                                value={e.role}
                                                                                                onChange={this.handleRoleChange}
                                                                                            >
                                                                                
                                                                                                {this.state.rolesFetched.map(e => <MenuItem key={e.id} value={e.name}>{e.name}</MenuItem>)}
                                                                        
                                                                                            </Select>
                                                                                    </FormControl>
                                                                           
                                                                            </div>
                                                                   

                                                    <div className="input-field col s12" style={{textAlign:"center"}}>
                                                        <button className="btn waves-effect waves-light" type="submit" name="action" id={e.id} onClick={this.handleDataChange}>
                                                            ΑΠΟΘΗΚΕΥΣΗ
                                                        </button>
                                                    </div>
                                                    <div className="input-field col s12" style={{textAlign:"center"}}>
                                                            <button className="btn waves-effect waves-light" style={{backgroundColor:"red"}} type="submit" name="action" id={"delete" + e.id} onClick={this.handleDelete}>
                                                                ΔΙΑΓΡΑΦΗ
                                                            </button>
                                                        </div>
                                                </div>

                                        

                                        

                                                            </AccordionDetails>
                                                        </Accordion>
                                                                                                            
                                                    </div>
                                                </div>

                                       
                                                            
                                    </div>
                            
                                </div>
                                </div>
                        </div>
                        );
                 
                    },this)}
                    
             
            </div>
      
    );
       }
       
    }
}



export default UsersPage;

// <img src={e.photo.split("|")[0].split("").map(e=>e==","?"\\":e).join("")}/>
//  