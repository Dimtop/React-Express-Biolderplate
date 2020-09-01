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

class ProductPageAdmin extends React.Component{


    constructor(props){
        super(props);

        this.state = {
            products:[],
            userProducts:[],
            parsedPositions:[],

            positions:[],
            positionsFetched:[],
            categoriesFetched:[],
            subcategoriesFetched:[],
            subcategoriesToRender:[],
            usersFetched:[]
            
        }


        this.fetchProducts = this.fetchProducts.bind(this);
        this.parseProducts = this.parseProducts.bind(this);
        this.parsePhotoLink = this.parsePhotoLink.bind(this);
        this.parsePositions = this.parsePositions.bind(this);
        this.handleReserveChange = this.handleReserveChange.bind(this);
        this.handleDataChange = this.handleDataChange.bind(this);

        this.fetchPositions = this.fetchPositions.bind(this);
        this.fetchCategories = this.fetchCategories.bind(this);
        this.fetchSubcategories = this.fetchSubcategories.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);

        this.handlePositionsSelection = this.handlePositionsSelection.bind(this);
        this.handleCategorySelection = this.handleCategorySelection.bind(this);
        this.handleSubcategorySelection = this.handleSubcategorySelection.bind(this);
        this.handleUserSelection = this.handleUserSelection.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }


    componentDidMount(){
      
      
        this.fetchProducts();
 
        this.fetchPositions();
       // this.fetchCategories();

        
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

    fetchProducts(){
        
        fetch("/api/products",{
               method:"GET",  
               headers : { 
               'Content-Type': 'application/json',
               'Accept': 'application/json'
           },
           })
           .then(res => res.json())
           .then(res => {
               console.log(res);
               this.setState({products:res.products}, () =>{
                  
                   this.fetchCategories();
                  
               });
               
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
          
            this.setState({positionsFetched:res.positions});
            //this.setState({positions:this.state.userProducts.map(e=>e.positions)})
        
        });
      


    }


    fetchCategories(userProducts){
        fetch("/api/categories",{
            method:"GET",  
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        })
        .then(res => res.json())
        .then(res => {
           
            this.setState({categoriesFetched:res.categories}, () =>{
                this.fetchSubcategories(this.state.products);
            });
        });
    }

    fetchSubcategories(userProducts){

        
        fetch("/api/subcategories",{
            method:"GET",  
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        })
        .then(res => res.json())
        .then(res => {
         
            this.setState({subcategoriesFetched:res.subcategories}, () =>{

                var subcategoriesToRender = [];
                var categoryNames = [];
                var categoryIds = [];
                
                for(var i=0;i<userProducts.length;i++){
                        categoryIds[i] = [];
                        for(var y=0;y<this.state.categoriesFetched.length;y++){
                            if(userProducts[i].category.split("|").indexOf(this.state.categoriesFetched[y].name) >=0){
                                categoryIds[i].push(this.state.categoriesFetched[y].id);
                            }
                        
                    }    
                }

                for(var y=0;y<categoryIds.length;y++){
                    categoryNames[y] = [];
                    for(var i=0;i<this.state.categoriesFetched.length;i++){
                    
                        if(categoryIds[y].indexOf(this.state.categoriesFetched[i].id)>=0){
                            categoryNames[y].push(this.state.categoriesFetched[i].name);
                           
                        }
                    }
                }

                for(var i=0;i<categoryIds.length;i++){
                    subcategoriesToRender[i] = [];
                    for(var y=0;y<this.state.subcategoriesFetched.length;y++){
                        if(categoryIds[i].indexOf(this.state.subcategoriesFetched[y].parentID)>=0){
                            subcategoriesToRender[i].push(this.state.subcategoriesFetched[y].name);
                        }
                    }
                }

               
                   this.setState({subcategoriesToRender:subcategoriesToRender},() =>{
                            this.setState({userProducts:userProducts}, () =>{
                                this.fetchUsers();
                                this.setState({shouldShowProductsArray:userProducts.map(e=>false)});
                    
                            //  this.parsePositions();
                            
                        });
                   });
                
            
        
               /* for(var i=0;i<this.state.subcategoriesFetched.length;i++){
                    console.log(this.state.subcategoriesFetched[i].parentID);
                    if(ids.indexOf(this.state.subcategoriesFetched[i].parentID)>=0){
                        
                        subcategoriesToRender.push(this.state.subcategoriesFetched[i]);
                    }
                }*/
            });
        });
    }

   parseProducts(){


        var users = [];
        var userProducts = []
     
        for(var i=0;i<this.state.products.length;i++){
            users = this.state.products[i].users.split("|");
          
            for(var y=0;y<users.length;y++){
            
                if(users[y] == Cookies.get("username")){
                    userProducts.push(this.state.products[i]);
                }
            }
        }

           return userProducts;// this.fetchCategories(userProducts);
        
         

      

  
   }

   parsePhotoLink(link){
        for(var i=0;i<link.length;i++){
            link[i].replace(",","/");
        }

        return link;
   }


   parsePositions(){


    for(var i=0;i<this.state.userProducts.length;i++){
       
        var positionsToFetch = this.state.userProducts[i].positions.split("|");
        fetch("/api/positions/parsed",{
            method:"POST",  
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body:(
            JSON.stringify({positionsToFetch:positionsToFetch})
        )
        })
        .then(res => res.json())
        .then(res => {
            console.log( res.positions.map(e=>e.name + " ").join(""));
            this.setState(prevState => {
                var products = Object.assign({}, prevState.userProducts); 
                products[i].positions =  res.positions.map(e=>e.name + " ").join("");
                return {products};

            });// =
            
        });

    }
   
   }

   handleDataChange(e){
        fetch("/api/products/update",{
            method:"POST",  
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body:(
            JSON.stringify({products:this.state.userProducts})
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


    handleNameChange(e){


        var userProductsMutated = this.state.userProducts;

        for(var i=0;i<userProductsMutated.length;i++){
            if(userProductsMutated[i].id == e.target.id.replace("name","")){
                userProductsMutated[i].name = e.target.value;
            }
        }

        this.setState({userProducts:userProductsMutated});


    }

    
    handleCodeChange(e){


        var userProductsMutated = this.state.userProducts;

        for(var i=0;i<userProductsMutated.length;i++){
            if(userProductsMutated[i].id == e.target.id.replace("code","")){
                userProductsMutated[i].code = e.target.value;
            }
        }

        this.setState({userProducts:userProductsMutated});


    }


   handleReserveChange(e){



    var minus = document.getElementById("removeReserve" + e.target.id).value ==""?0:document.getElementById("removeReserve" + e.target.id).value;
    var plus = document.getElementById("addReserve"+ e.target.id).value==""?0:document.getElementById("addReserve" + e.target.id).value;
    var reserve = document.getElementById("reserve"+ e.target.id).innerHTML.replace("Απόθεμα: ", "");
    var id = e.target.id;
    console.log(document.getElementById("reserve"+ e.target.id).innerHTML.replace("Απόθεμα: ", ""));



    fetch("/api/products/reserve?id=" + e.target.id,{
        method:"GET",  
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
      
      
        var total = Number(res.reserve[0].reserve) + Number(plus) - Number(minus); 
            
        fetch("/api/products/reserve",{
            method:"POST",  
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body:(
            JSON.stringify({total:total,id:id})
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
    });

   }

   
   handleUserSelection(e){

    console.log(e.target.value);

    var userProductsMutated = this.state.userProducts;
    
    for(var i=0;i<userProductsMutated.length;i++){
        if(userProductsMutated[i].id == e.target.name.replace("users","")){
            userProductsMutated[i].users = e.target.value.join("|");
        }
    }

    this.setState({userProducts:userProductsMutated}, () =>{
        console.log(this.state.userProducts)
    });



  
}  


   handlePositionsSelection(e){

        console.log(e.target);

        var userProductsMutated = this.state.userProducts;

        for(var i=0;i<userProductsMutated.length;i++){
            if(userProductsMutated[i].id == e.target.name.replace("positions","")){
                userProductsMutated[i].positions = e.target.value.join("|");
            }
        }

        this.setState({userProducts:userProductsMutated});

    
 
      
    }  

    handleCategorySelection(e){

       

        var userProductsMutated = this.state.userProducts;

        var subcategoriesToRenderMutated = this.state.subcategoriesToRender;

        var productID =  e.target.name.replace("categories","");
        var productIndex = -1;

        for(var i=0;i<this.state.userProducts.length;i++){
          
            if(this.state.userProducts[i].id == productID){
                productIndex = i;
                break;
            }
        }

        for(var i=0;i<userProductsMutated.length;i++){
            if(userProductsMutated[i].id == e.target.name.replace("categories","")){
                userProductsMutated[i].category = e.target.value.join("|");
            }
        }


      
        var categoryIds = [];
        var categoryNames = [];
                
            
        for(var y=0;y<this.state.categoriesFetched.length;y++){
                if(e.target.value.indexOf(this.state.categoriesFetched[y].name) >=0){
                    categoryIds.push(this.state.categoriesFetched[y].id);
                }
        }

        for(var y=0;y<categoryIds.length;y++){
            categoryNames = [];
            for(var i=0;i<this.state.categoriesFetched.length;i++){
                if(categoryIds.indexOf(this.state.categoriesFetched[i].id)>=0){
                    categoryNames.push(this.state.categoriesFetched[i].name);
                   
                }
            }
        }
        
        var semiSubcategoriesToRenderMutated = [];

      
            for(var y=0;y<this.state.subcategoriesFetched.length;y++){
                if(categoryIds.indexOf(this.state.subcategoriesFetched[y].parentID) >= 0){

                    semiSubcategoriesToRenderMutated.push(this.state.subcategoriesFetched[y].name);
               
                }
            }

     
       
   

                for(var y=0;y<this.state.userProducts[productIndex].subcategory.split("|").length;y++){
                  
                    if(semiSubcategoriesToRenderMutated.indexOf(this.state.userProducts[productIndex].subcategory.split("|")[y]) < 0){
                       
                        if(this.state.userProducts[productIndex].subcategory.split("|")[y] != ""){
                            console.log(this.state.userProducts[productIndex].subcategory.split("|").length);
                            userProductsMutated[productIndex].subcategory =  userProductsMutated[productIndex].subcategory.replace(this.state.userProducts[productIndex].subcategory.split("|")[y]+"|","");
                        }
                       
                    }
                }
            

        subcategoriesToRenderMutated[productIndex] = semiSubcategoriesToRenderMutated;


        console.log(this.state.userProducts[productIndex].subcategory);


        this.setState({userProducts:userProductsMutated}, () =>{
            this.setState({subcategoriesToRender:subcategoriesToRenderMutated}, () => {
                this.forceUpdate();
            });
            
        });

        
       
    
 
        
    }  

    handleSubcategorySelection(e){

       

        var userProductsMutated = this.state.userProducts;


        for(var i=0;i<userProductsMutated.length;i++){
            if(userProductsMutated[i].id == e.target.name.replace("subcategories","")){
              
                userProductsMutated[i].subcategory = e.target.value.join("|");
                userProductsMutated[i].subcategory = userProductsMutated[i].subcategory+ "|";
                //console.log( userProductsMutated[i].subcategory);
            }
        }
        
       
        this.setState({userProducts:userProductsMutated}, () =>{
         
        });
            
        
    }  



    handleDelete(e){


        var id = e.target.id.replace("delete","");
    
        if(confirm("Θέλετε να διαγράψετε το προϊόν οριστικά;")){
            fetch("/api/products",{
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

        console.log(this.state.userProducts);
       
        return(

        
                <div class="row">
                      {this.state.userProducts.map(function(e,i){
                        
                      
                            return(
                            <div class="col s12 m4 l3">
                                <div className="card">
                                    <div>
                                        <div class="card-image">
                                        <img src={e.photo} />
                                        </div>
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
                                                                            <Typography style={{fontWeight:"bold"}}>Όνομα</Typography>
                                                                        </div>
                                                                        <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                            <input id={"name"+e.id} type="text" class="validate" name="name" value={e.name} onChange={this.handleNameChange}/>                
                                                                        </div>
                                                                 
                                                                        <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                            <Typography style={{fontWeight:"bold"}}>Κωδικός</Typography>
                                                                        </div>
                                                                        <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                            <input id={"code"+e.id} type="text" class="validate" name="code" value={e.code} onChange={this.handleCodeChange}/>  
                                                                        </div>
                                                                  
                                                                        <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                            <Typography style={{fontWeight:"bold"}}>Θέση</Typography>
                                                                        </div>
                                                                        <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                  
                                                                                        <FormControl style={{width:"100%"}}>
                                                                                              
                                                                                                <Select
                                                                                                  
                                                                                                    name={"positions" + e.id}  
                                                                                                    input={<Input />}
                                                                                                    multiple
                                                                                                    value={e.positions.split("|")}
                                                                                                    onChange={this.handlePositionsSelection}
                                                                                                >
                                                                                    
                                                                                                    {this.state.positionsFetched.map(e => <MenuItem key={e.id} value={e.name}>{e.name}</MenuItem>)}
                                                                            
                                                                                                </Select>
                                                                                        </FormControl>
                                                                               
                                                                                </div>
                                                                       

                                                                        <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                            <Typography style={{fontWeight:"bold"}}>Κατηγορίες</Typography>
                                                                        </div>
                                                                        <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                                        <FormControl style={{width:"100%"}}>
                                                                                               
                                                                                                <Select
                                                                                                   
                                                                                                    name={"categories" + e.id}  
                                                                                                    input={<Input />}
                                                                                                    multiple
                                                                                                    value={e.category.split("|")}
                                                                                                    onChange={this.handleCategorySelection}
                                                                                                >
                                                                                    
                                                                                                    {this.state.categoriesFetched.map(e => <MenuItem key={e.id} value={e.name}>{e.name}</MenuItem>)}
                                                                            
                                                                                                </Select>
                                                                                        </FormControl>
                                                                        </div>

                                                                        <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                            <Typography style={{fontWeight:"bold"}}>Υποκατηγορίες</Typography>
                                                                        </div>
                                                                        <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                        <FormControl style={{width:"100%"}}>
                                                                                               
                                                                                               <Select
                                                                                                  
                                                                                                   name={"subcategories" + e.id}  
                                                                                                   input={<Input />}
                                                                                                   multiple
                                                                                                    value={e.subcategory.split("|").filter(e=>e!="")}
                                                                                                    onChange={this.handleSubcategorySelection}
                                                                                               >
                                                                                   
                                                                                                    {this.state.subcategoriesToRender[i].map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
                                                                           
                                                                                               </Select>
                                                                                       </FormControl>
                                                                        </div>

                                                                        
                                                                        <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                            <Typography style={{fontWeight:"bold"}}>Χρήστες</Typography>
                                                                        </div>
                                                                        <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                        <FormControl style={{width:"100%"}}>
                                                                                               
                                                                                               <Select
                                                                                                  
                                                                                                   name={"users" + e.id}  
                                                                                                   input={<Input />}
                                                                                                   multiple
                                                                                                    value={e.users.split("|")}
                                                                                                    onChange={this.handleUserSelection}
                                                                                               >
                                                                                   
                                                                                                    {this.state.usersFetched.map(e => <MenuItem key={"user"+e.id} value={e.nickname}>{e.nickname}</MenuItem>)}
                                                                           
                                                                                               </Select>
                                                                                       </FormControl>
                                                                        </div>
                                                                    </div>
                                                                </AccordionDetails>
                                                            </Accordion>
                                                            <div className="row">
                                                        <div className="input-field col s12" style={{textAlign:"center"}}>
                                                            <button className="btn waves-effect waves-light" type="submit" name="action" id={e.id} onClick={this.handleDataChange}>
                                                                ΑΠΟΘΗΚΕΥΣΗ
                                                            </button>
                                                        </div>
                                                    </div>
                                                                                                                
                                                        </div>
                                                    </div>
                                                    

                                            

                                                    <div className="row">
                                                        <div className="input-field col s12" style={{textAlign:"center"}}>
                                                            <Accordion>
                                                                <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls="panel1a-content"
                                                                id="panel1a-header"
                                                                >
                                                                <Typography id={"reserve"+e.id}>{"Απόθεμα: " +e.reserve}</Typography>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <div className="input-field col s12" style={{textAlign:"center"}}>
                                                                        <input  id={"addReserve"+e.id} type="text" class="validate" name="addReserve"/>
                                                                        <label for={"addReserve"+e.id}>Προσθήκη</label>
                                                                    </div>
                                                                    <div className="input-field col s12" style={{textAlign:"center"}}>
                                                                        <input  id={"removeReserve"+e.id} type="text" class="validate" name="addReserve"/>
                                                                        <label for={"removeReserve"+e.id}>Αφαίρεση</label>
                                                                    </div>
                                                                </AccordionDetails>
                                                            </Accordion>
                                                                                                                
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="input-field col s12" style={{textAlign:"center"}}>
                                                            <button className="btn waves-effect waves-light" type="submit" name="action" id={e.id} onClick={this.handleReserveChange}>
                                                                ΑΠΟΘΗΚΕΥΣΗ
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="input-field col s12" style={{textAlign:"center"}}>
                                                            <button className="btn waves-effect waves-light" style={{backgroundColor:"red"}} type="submit" name="action" id={"delete" + e.id} onClick={this.handleDelete}>
                                                                ΔΙΑΓΡΑΦΗ
                                                            </button>
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



export default ProductPageAdmin;

// <img src={e.photo.split("|")[0].split("").map(e=>e==","?"\\":e).join("")}/>
//  