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


  import { withRouter } from 'react-router';

  class ProductEntryForm extends React.Component{



    constructor(props){

        super(props);

     

        this.state = {

            usersFetched:[],
            positionsFetched:[],
            categoriesFetched:[],
            subcategoriesFetched:[],

            subcategoriesSorted:[],
            subcategoriesToRender:[],


            name:"",
            description:"",
            code:"",
            reserve:"",
            positions:[],
            category:[],
            subcategory:[],
            users:[],
            photo:[]
        };

        this.props.history.push("/products/new");

        this.fetchUsers = this.fetchUsers.bind(this);
        this.fetchPositions = this.fetchPositions.bind(this);
        this.fetchCategories = this.fetchCategories.bind(this);
        this.fetchSubcategories = this.fetchSubcategories.bind(this);

        this.handlePositionsSelection = this.handlePositionsSelection.bind(this);
        this.handleCategoriesSelection = this.handleCategoriesSelection.bind(this);
        this.handleSubcategoriesSelection = this.handleSubcategoriesSelection.bind(this);
        this.handleUsersSelection = this.handleUsersSelection.bind(this);
        this.handlePhotoSelection = this.handlePhotoSelection.bind(this);
        this.handleProductNameChange = this.handleProductNameChange.bind(this);
        this.handleProductDescriptionChange = this.handleProductDescriptionChange.bind(this);
        this.handleProductCodeChange = this.handleProductCodeChange.bind(this);
        this.handleProductReserveChange = this.handleProductReserveChange.bind(this);

        this.submitProduct = this.submitProduct.bind(this);
     
    }

    componentDidMount(){
        
        this.fetchPositions();
    
      
   

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
                this.setState({usersFetched:res.users});
                
            });

        

    }

    fetchPositions(){
        fetch("/api/positions",{
            method:"GET",  
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.setState({positionsFetched:res.positions},() =>{
                this.fetchCategories();
            });
           
          
        });
        //.then(this.parsePositions());


    }

    fetchCategories(){
        fetch("/api/categories",{
            method:"GET",  
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.setState({categoriesFetched:res.categories},() =>{
                this.fetchSubcategories();
            });
          
        });
    }

    fetchSubcategories(){
        fetch("/api/subcategories",{
            method:"GET",  
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.setState({subcategoriesFetched:res.subcategories},()=>{
                this.fetchUsers();
            });
              
     
         
        });
    }


    handleProductNameChange(e){
        this.setState({name:e.target.value});
    }

    handleProductDescriptionChange(e){
        this.setState({description:e.target.value});
    }
    
    handleProductCodeChange(e){
        this.setState({code:e.target.value});
    }

    handleProductReserveChange(e){
        this.setState({reserve:e.target.value});
    }


    handlePositionsSelection(e){

        console.log("VALUE: " );

            this.setState({positions:e.target.value});
          
        
     
        console.log(this.state.positions);  
    }  
    
    handleCategoriesSelection(e){

        this.setState({subcategoriesToRender:[]});
        this.setState({category:e.target.value});
       
       
        this.setState({subcategoriesToRender:[]},()=>{

            var ids =[];
            var subcategoriesToRender = this.state.subcategoriesToRender;
       
    
            console.log(e.target.value);
            for(var i=0;i<e.target.value.length;i++){
                for(var y=0;y<this.state.categoriesFetched.length;y++){
                    if(e.target.value[i] == this.state.categoriesFetched[y].name){
                        ids.push(this.state.categoriesFetched[y].id);
                    }
                }
            }
    
            console.log(ids);
    
            for(var i=0;i<this.state.subcategoriesFetched.length;i++){
                console.log(this.state.subcategoriesFetched[i].parentID);
                if(ids.indexOf(this.state.subcategoriesFetched[i].parentID)>=0){
                    
                    subcategoriesToRender.push(this.state.subcategoriesFetched[i]);
                }
            }
    
            this.setState({subcategoriesToRender:subcategoriesToRender});
        });     
        
      
    }  
    
    handleSubcategoriesSelection(e){



            this.setState({subcategory:e.target.value});
          
        
     
        console.log(this.state.positions);  
    }  

        
    handleUsersSelection(e){



        this.setState({users:e.target.value});
      
    
 
        console.log(this.state.positions);  
    }  


    handlePhotoSelection(e){

        e.persist();
        console.log(e.target.files);
        this.setState({photo:[]}, () =>{

            var photo = [];
            
            for(var i=0;i<e.target.files.length;i++){
                photo.push(e.target.files[i]);    
            }

            this.setState({photo:photo}, ()=>{
                console.log(this.state.photo);
                
            });

        });

        
      
    }


    submitProduct(){
        const formData = new FormData();
    

        for(var i=0;i<this.state.photo.length;i++){
            formData.append("file"+i,this.state.photo[i]);
        }


        formData.append("name",this.state.name);
        formData.append("description",this.state.description);
        formData.append("code",this.state.code);
        formData.append("reserve",this.state.reserve);
        formData.append("positions",this.state.positions);
        formData.append("categories",this.state.category);
        formData.append("subCategories",this.state.subcategory);
        formData.append("users",this.state.users);
      

        fetch("/api/products",{
            method:"POST",  
            body:formData
        })
        .then(res => res.json())
        .then(res => {
            alert("Το προϊόν σας καταχωρήθηκε με επιτυχία!");
                location.replace("/products/new");

            
           

         
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
                                <span className="card-title" style={{color:"black",textAlign:"center"}}>Στοιχεία προϊόντος</span>
                                 
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input placeholder="Όνομα προϊόντος" id="productName" type="text" class="validate" name="productName" onChange={this.handleProductNameChange}/>
                                                <label for="productName">Όνομα προϊόντος</label>
                                            </div>
                                        </div>
    
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea placeholder="Περιγραφή προϊόντος" id="productDescription" class="materialize-textarea" onChange={this.handleProductDescriptionChange}></textarea>
                                                <label for="productDescription">Περιγραφή προϊόντος</label>
                                            </div>
                                        </div>
    
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input placeholder="Κωδικός προϊόντος" id="productName" type="text" class="validate" name="productCode" onChange={this.handleProductCodeChange}/>
                                                <label for="productCode">Κωδικός προϊόντος</label>
                                            </div>
                                        </div>
    
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input placeholder="Απόθεμα" id="productReserve" type="text" class="validate" name="productReserve" onChange={this.handleProductReserveChange}/>
                                                <label for="productReserve">Απόθεμα</label>
                                            </div>
                                        </div>
                                        
                                        <div className="row">
                                            <div class="input-field col s12">
                                                <FormControl style={{width:"100%"}}>
                                                        <InputLabel id="positionsLabel">Θέσεις αποθήκης</InputLabel>
                                                        <Select
                                                            labelId="positionsLabel"
                                                            id="positions"  
                                                            input={<Input />}
                                                            multiple
                                                            value={this.state.positions }
                                                            onChange={this.handlePositionsSelection}
                                                        >
                                               
                                                            {this.state.positionsFetched.map(e => <MenuItem key={e.id} value={e.name}>{e.name}</MenuItem>)}
                                      
                                                        </Select>
                                                </FormControl>
                                            </div>
                                        </div>
    
                                        <div className="row">
                                            <div class="input-field col s12">
                                                <FormControl style={{width:"100%"}}>
                                                        <InputLabel id="categoriesLabel">Κατηγορίες</InputLabel>
                                                        <Select
                                                            labelId="categoriesLabel"
                                                            id="categories"  
                                                            input={<Input />}
                                                            multiple
                                                            value={this.state.category }
                                                            onChange={this.handleCategoriesSelection}
                                                        >
                                                            {this.state.categoriesFetched.map(e => <MenuItem key={e.name+e.id} value={e.name} >{e.name}</MenuItem>)}
                                      
                                                        </Select>
                                                </FormControl>
                                            </div>
                                        </div>
    
                                        <div className="row">
                                            <div class="input-field col s12">
                                                <FormControl style={{width:"100%"}}>
                                                        <InputLabel id="subcategoriesLabel">Υποκατηγορίες</InputLabel>
                                                        <Select
                                                            labelId="subcategoriesLabel"
                                                            id="subcategories"  
                                                            input={<Input />}
                                                            multiple
                                                            value={this.state.subcategory }
                                                            onChange={this.handleSubcategoriesSelection}
                                                        >
                                                            {this.state.subcategoriesToRender.map(e => <MenuItem key={e.name+e.id} value={e.name} >{e.name}</MenuItem>)}
    
                                      
                                                        </Select>
                                                </FormControl>
                                            </div>
                                        </div>
    
                                        <div className="row">
                                            <div class="input-field col s12">
                                                <FormControl style={{width:"100%"}}>
                                                        <InputLabel id="usersLabel">Χρήστες</InputLabel>
                                                        <Select
                                                            labelId="usersLabel"
                                                            id="users"  
                                                            input={<Input />}
                                                            multiple
                                                            value={this.state.users }
                                                            onChange={this.handleUsersSelection}
                                                        >
                                                            {this.state.usersFetched.map(e => <MenuItem key={e.name+e.id} value={e.name} >{e.name}</MenuItem>)}
                                      
                                                        </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                        
    
                                     
    
                                        <div className="row">
                                            <div class="input-field col s12">
                                                <div class="file-field input-field">
                                                    <div class="btn">
                                                        <span>ΦΩΤΟΓΡΑΦΙΕΣ</span>
                                                        < input type="file" multiple  onChange={this.handlePhotoSelection}/>
                                                    </div>
                                                    <div class="file-path-wrapper">
                                                        <input class="file-path validate" type="text" placeholder="Ανεβάστε μία ή περισσότερες φωτογραφίες"/>
                                                     </div>
                                                </div>
                                            </div>
                                        </div>
                                  
            
    
                                        <div className="row">
                                            <div className="input-field col s12" style={{textAlign:"center"}}>
                                                <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.submitProduct}>
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



export default withRouter(ProductEntryForm);