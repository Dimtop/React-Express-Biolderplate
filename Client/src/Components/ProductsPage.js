import React from 'react';
import ReactDom from 'react-dom';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Cookies from 'js-cookie';

import ProductPageUser from './ProductPageUser';
import ProductPageAdmin from './ProductPageAdmin';

import {
    Redirect
  } from "react-router-dom";



class ProductPage extends React.Component{


    constructor(props){
        super(props);

        var componentToRender = <Redirect to="/" />;

        switch(Cookies.get("role")){
            case "Admin":
                componentToRender = <ProductPageAdmin />
                break;
            case "User":
                componentToRender = <ProductPageUser />
                break;
            default:
                componentToRender = <Redirect to="/" />
                break;

        }

        this.state = {
            componentToRender : componentToRender
        }


    }



    render(){

        return(
            <>
            {this.state.componentToRender}
            </>
        );
    }
}



export default ProductPage;

// <img src={e.photo.split("|")[0].split("").map(e=>e==","?"\\":e).join("")}/>