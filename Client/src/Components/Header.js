import React from 'react';
import ReactDom from 'react-dom';

import Cookies from 'js-cookie';

class Header extends React.Component{


    constructor(props){

        super(props);

        this.clearCookies = this.clearCookies.bind(this)
    }


    clearCookies(){
        Cookies.remove("username");
        Cookies.remove("id");
        Cookies.remove("role");
    }

    render(){
    
        if(Cookies.get("username")  == null){
            return(
            
               
                
            
                <>       
                    <nav id="header">
                        <div className="nav-wrapper">
                        <img  className="brand-logo" id="logo" src="media/logo.png" />
                            
                        </div>
                    </nav>

                   
                </>
                
               
        


            );
        }
        else{
                return( 
                            <>       
                            <nav id="header">
                                <div className="nav-wrapper">
                                <img  className="brand-logo" id="logo" src="/public/media/logo.png" />
                                    <p data-target="mobile-demo" className="sidenav-trigger"><i style={{color:"black"}} className="material-icons">menu</i></p>
                                    <ul className="right hide-on-med-and-down">
                                    <li><a href="/" className="menuItem" onClick={this.clearCookies}>Logout</a></li>
                                    <li><a href="/dashboard" className="menuItem">Dashboard</a></li>
                                    </ul>
                                </div>
                            </nav>

                            <ul className="sidenav" id="mobile-demo">
                                <li><a href="/" className="menuItem">Login</a></li>  
                                <li><a href="/dashboard" className="menuItem">Dashboard</a></li>  
                            </ul>
                        </>

                );
        }
       
     
    }
}


export default Header;