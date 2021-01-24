import React from "react";
import axios from "axios";
import "./Login.css";
import { Link}from "react-router-dom";

export class Login extends React.Component {   
   constructor( props ) {
      super( props );
      this.state = {
         userName: null,
         password: null
      }
   }
   formSubmit = ( event ) => {      
      event.preventDefault();
      const headers = {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': 'http://localhost:3000'
      }
      console.log( this.state )
      axios.post( "/api/user/login", this.state, {
         headers: headers
      } ).then( ( res ) => {
         console.log( res.data.token );
         localStorage.setItem( 'token', res.data.token ); 
         this.props.history.push("/home");        
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
               <div className="myform form">
                        <div className="logo mb-3">
                           <div className="col-md-12 text-center">
                              <h1>Login</h1>
                           </div>
                        </div>
                        {this.state.name}
                        <form onSubmit={this.formSubmit}>
                           <div className="form-group">
                              <label htmlFor="userName">User Name</label>
                              <input type="text" name="userName" onChange={this.changeHanler} className="form-control" id="emailLogin" aria-describedby="emailHelp" placeholder="Enter User Name" required />
                           </div>
                           <div className="form-group">
                              <label htmlFor="password">Password</label>
                              <input type="password" name="password" onChange={this.changeHanler} id="passwordLogin" className="form-control" aria-describedby="emailHelp" placeholder="Enter Password" required />
                           </div>
                           <div className="form-group">
                              <p className="text-center">By signing up you accept our <Link to="/login">Terms Of Use</Link></p>
                           </div>
                           <div className="col-md-12 text-center ">
                              <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Login</button>
                           </div>
                           <div className="col-md-12 ">
                              <div className="login-or">
                                 <hr className="hr-or" />
                                 <span className="span-or">or</span>
                              </div>
                           </div>

                           <div className="form-group">
                              <p className="text-center">Don't have account? <Link to='/signup' id="signup">Sign up here</Link></p>
                           </div>
                        </form>
                     </div>
               </div>
            </div>
         </div>
      )
   }
} 