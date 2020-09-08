import React from 'react';
import ReactDom from 'react-dom';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Cookies from 'js-cookie';

import { withRouter } from 'react-router';

import Filters from './Filters';

class ProductPageUser extends React.Component{


    constructor(props){
        super(props);

        this.state = {
            products:[],
            userProducts:[],
            parsedPositions:[],
            
        }

        this.props.history.push("/products");

        this.fetchProducts = this.fetchProducts.bind(this);
        this.parseProducts = this.parseProducts.bind(this);
        this.parsePhotoLink = this.parsePhotoLink.bind(this);
        this.parsePositions = this.parsePositions.bind(this);
        this.handleReserveChange = this.handleReserveChange.bind(this);

        this.filterProducts = this.filterProducts.bind(this);

    }


    componentDidMount(){

        this.fetchProducts();
        
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
                  // this.parseProducts();
                  
               });
               
           });
   }

   parseProducts(){


        var users = [];
        var userProducts = []
     
        for(var i=0;i<this.state.products.length;i++){
            users = this.state.products[i].users.split("|");
            console.log("Users:");   console.log(users);
            for(var y=0;y<users.length;y++){
            
                if(users[y] == Cookies.get("username")){
                    userProducts.push(this.state.products[i]);
                }
            }
        }

        this.setState({userProducts:userProducts}, () =>{
            this.setState({shouldShowProductsArray:userProducts.map(e=>false)});
          //  this.parsePositions();
        });

  
   }

   parsePhotoLink(link){
        for(var i=0;i<link.length;i++){
            link[i].replace(",","/");
        }

        return link;
   }


   parsePositions(){


    for(var i=0;i<this.state.products.length;i++){
        console.log("pos");
        var positionsToFetch = this.state.products[i].positions.split("|");
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
                var products = Object.assign({}, prevState.products); 
                products[i].positions =  res.positions.map(e=>e.name + " ").join("");
                return {products};

            });// =
            
        });

    }
   
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
                alert("Η αλλαγή έγινε με επιτυχία.");
            //  this.setState({products:res.products}, () =>{
                //   console.log(res);
                
            // });
              //location.reload();
              
            });
        });

   }



   filterProducts(productsFiltered){
    this.setState({products:productsFiltered});
    }



    render(){

        console.log("Products: ");
        console.log(this.state.userProducts);
        return(
        
            <>
                <Filters filterProducts={this.filterProducts}/>
                <div class="row">
                      {this.state.products.map(function(e){
                           
                      
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
                                                                            <Typography>{e.name}</Typography>
                                                                        </div>
                                                                 
                                                                        <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                            <Typography style={{fontWeight:"bold"}}>Κωδικός</Typography>
                                                                        </div>
                                                                        <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                            <Typography>{e.code}</Typography>
                                                                        </div>
                                                                  
                                                                        <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                            <Typography style={{fontWeight:"bold"}}>Θέση</Typography>
                                                                        </div>
                                                                        <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                            <Typography>{e.positions.split("|").join(" ")}</Typography>
                                                                        </div>

                                                                        <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                            <Typography style={{fontWeight:"bold"}}>Κατηγορίες</Typography>
                                                                        </div>
                                                                        <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                            <Typography>{e.category.split("|").join(", ")}</Typography>
                                                                        </div>

                                                                        <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                            <Typography style={{fontWeight:"bold"}}>Υποκατηγορίες</Typography>
                                                                        </div>
                                                                        <div className="input-field col s6" style={{textAlign:"center"}}>
                                                                            <Typography>{e.subcategory.split("|").join(", ")}</Typography>
                                                                        </div>
                                                                    </div>
                                                                </AccordionDetails>
                                                            </Accordion>
                                                                                                                
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

                                                
                                                                
                                        </div>
                                
                                    </div>
                                    </div>
                            </div>
                            );
                     
                        },this)}
                        
                 
                </div>

                </>
          
        );
    }
}



export default withRouter(ProductPageUser);

// <img src={e.photo.split("|")[0].split("").map(e=>e==","?"\\":e).join("")}/>