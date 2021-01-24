import React from "react";
import {  Link } from "react-router-dom";
export class Header extends React.Component {
    logout =() =>{
        localStorage.clear();  
         
    }
    render() {
        return ( <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" style={{fontFamily: "'Kaushan Script', cursive"}} to="/home">Social.in</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav" style={{marginLeft: "auto"}}>

                        <li className="nav-item active">
                            <Link className="nav-link" to="/home">Home <span className="sr-only">(current)</span></Link>
                        </li>                       
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={this.logout} to="/login" >Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div> );
    }
}