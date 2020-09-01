import React from 'react';
import ReactDom from 'react-dom';


import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';


class Filters extends React.Component {



    constructor(props){
        super(props);

        this.state = {
           subcategoriesToRenderFilters:[],
           selectedCategoriesFilters:[],
           selectedSubategoriesFilters:[],
           categories:[],
           subcategories:[]

        };

        this.handleCategoriesSelection = this.handleCategoriesSelection.bind(this);
        this.handleSubcategoriesSelection = this.handleSubcategoriesSelection.bind(this);
        this.fetchCategories = this.fetchCategories.bind(this);
        this.fetchSubcategories = this.fetchSubcategories.bind(this);
        this.fetchFilteredProducts = this.fetchFilteredProducts.bind(this);


        console.log("PROPS");
        
        console.log(this.props);
    }



    /*fetchCategories(userProducts){
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
         
            this.setState({subcategoriesFetched:res.subcategories}, () =>{

               
            });
        });
    }*/

    componentDidMount(){
        this.fetchCategories();
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
            this.setState({categories:res.categories},() =>{
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
            this.setState({subcategories:res.subcategories},()=>{
               
            });
              
     
         
        });
    }

    fetchFilteredProducts(){
        fetch("/api/products/filter?categories="+this.state.selectedCategoriesFilters.join("|") + "&subcategories=" + this.state.selectedSubategoriesFilters.join("|"),{
            method:"GET",  
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.props.filterProducts(res.products);      
        });
    }


    handleCategoriesSelection(e){

        this.setState({subcategoriesToRenderFilters:[]});
        this.setState({selectedCategoriesFilters:e.target.value});
       
       
        this.setState({subcategoriesToRenderFilters:[]},()=>{

            var ids =[];
            var subcategoriesToRender = this.state.subcategoriesToRenderFilters;
       
    
            console.log(e.target.value);
            for(var i=0;i<e.target.value.length;i++){
                for(var y=0;y<this.state.categories.length;y++){
                    if(e.target.value[i] == this.state.categories[y].name){
                        ids.push(this.state.categories[y].id);
                    }
                }
            }
    
            console.log(ids);
    
            for(var i=0;i<this.state.subcategories.length;i++){
                console.log(this.state.subcategories[i].parentID);
                if(ids.indexOf(this.state.subcategories[i].parentID)>=0){
                    
                    subcategoriesToRender.push(this.state.subcategories[i]);
                }
            }
    
            this.setState({subcategoriesToRenderFilters:subcategoriesToRender});
        });                                                                                                      
        
      
    }  


    handleSubcategoriesSelection(e){
        this.setState({selectedSubategoriesFilters:e.target.value});
    }

    render(){
        return(

            <div className="row" style={{margin:"2rem",padding:"2rem"}}>

                <div className="col s12 m4" style={{textAlign:"center",marginTop:"2rem"}}>

                        <FormControl style={{width:"100%"}}>
                                <InputLabel id="categoriesLabel">Κατηγορίες</InputLabel>
                                <Select
                                    labelId="categoriesLabel"
                                    id="categories"  
                                    input={<Input />}
                                    multiple
                                    value={this.state.selectedCategoriesFilters}
                                    onChange={this.handleCategoriesSelection}
                                >
                              
                                    {this.state.categories.map(e => <MenuItem key={e.id} value={e.name}>{e.name}</MenuItem>)}
                                </Select>
                        </FormControl>

                </div>


                <div className="col s12 m4" style={{textAlign:"center",marginTop:"2rem"}}>

                    <FormControl style={{width:"100%"}}>
                            <InputLabel id="categoriesLabel">Υποκατηγορίες</InputLabel>
                            <Select
                                labelId="categoriesLabel"
                                id="categories"  
                                input={<Input />}
                                multiple
                                value={this.state.selectedSubategoriesFilters}
                                onChange={this.handleSubcategoriesSelection}
                            >
                        
                                {this.state.subcategoriesToRenderFilters.map(e => <MenuItem key={e.id} value={e.name}>{e.name}</MenuItem>)}
                            </Select>
                    </FormControl>

                </div>

                <div className="col s12 m4" style={{textAlign:"center",marginTop:"2rem"}}>
  
                    <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.fetchFilteredProducts}>
                        ΑΝΑΖΗΤΗΣΗ
                    </button>
                </div>
            </div>

            
        );
    }
}

export default Filters;