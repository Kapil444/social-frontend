import React from "react";
import axios from "axios";
import "./SignUp.css";
import { Link } from "react-router-dom";

export class Signup extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            userName: null,
            password: null,
            message: null,
        }
    }
    formSubmit = ( event ) => {
        event.preventDefault();
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
        console.log( this.state )
        axios.post( "/api/user/signup", this.state, {
            headers: headers
        } ).then( ( res ) => {
            console.log( res.data )
            this.setState( { message: "Register Successfully Please Login !!" } )
            this.props.history.push( "/login" );
        } ).catch( ( err ) => {
            console.log( "Error ", err )
        } )
    }
    changeHanler = ( event ) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState( { [name]: value } )
    }
    render() {

        return (
            <div className="container" >
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <div className="myform form ">
                            <div className="logo mb-3">
                                <div className="col-md-12 text-center">
                                    <h1 >Signup</h1>
                                </div>
                            </div>
                            <form onSubmit={this.formSubmit} name="registration">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" name="firstName" onChange={this.changeHanler} className="form-control" id="firstname" aria-describedby="emailHelp" placeholder="Enter Firstname" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" name="lastName" onChange={this.changeHanler} className="form-control" id="lastname" aria-describedby="emailHelp" placeholder="Enter Lastname" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" name="email" onChange={this.changeHanler} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userName">User Name</label>
                                    <input type="text" name="userName" onChange={this.changeHanler} className="form-control" id="userName" aria-describedby="emailHelp" placeholder="Enter userName" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" onChange={this.changeHanler} id="password" className="form-control" aria-describedby="emailHelp" placeholder="Enter Password" required />
                                </div>
                                <div className="col-md-12 text-center mb-3">
                                    <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Signup</button>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-group">
                                        <p className="text-center" ><Link to='/login' id="signin">Already have an account?</Link></p>
                                    </div>
                                </div>
                            </form>
                            {this.state.message != null ? <h5 className="text-danger">{this.state.message}</h5> : ""}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 