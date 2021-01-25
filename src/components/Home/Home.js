import React from "react";
import "./Home.css";
import Pagination from "react-js-pagination";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Post } from "../../models/Post";
export class Home extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            postList: [Post],
            activePage: 1
        }
    }
    componentDidMount() {
        // let fetchRes = fetch(
        //     "/api/post/get/all" );
        // fetchRes.then( res =>
        //     res.json() ).then( d => {
        //         this.setState( {
        //             postList: d.postList
        //         } )
        //     } ) 

        axios.get( "/api/post/get/all" ).then( ( res ) => {
            console.log( res.data );
            this.setState( {
                postList: res.data.postList
            } )

        } ).catch( err => {
            console.log( "Error : " + err );
        } )
    }
    handlePageChange( pageNumber ) {
        console.log( `active page is ${pageNumber}` );
        this.setState( { activePage: pageNumber } );
    }
    handleFollow = ( userId ) => {
        if ( localStorage.getItem( 'token' ) ) {
            const headers = {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem( 'token' )
            }
            let user = {
                user_id: userId
            }
            axios.post( "/api/post/follow", user, {
                headers: headers
            } ).then( ( res ) => {
                alert( "Follow Successfully" );
            } ).catch( ( err ) => {

                if ( err.response.status === 419 ) {
                    alert( "Already Follow" );
                }
                console.log( "Error ", err )
            } )
        } else {
            alert( "Please Login Before Follow !!" );
            this.props.history.push( "/login" );
        }
    }
    render() {
        if(this.state.postList){
            return (            
                <div style={{ backgroundColor: "white" }} className="job-listing-main" >
                    <div className="container">
                        <div className="row justify-content-center">
                            {this.state.postList.map( ( item, index ) => (
                                <div key={index} className="job-list" >
                                    <h5 style={{ marginBottom: "0px" }}><Link to={`/user/detail/${item.userId}`}><i className="fa fa-user margin: 15px 0px 15px 0px"></i>{item.userName}</Link></h5>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="row justify-content-start">
                                                <p style={{ marginLeft: "10px" }}>Date : {item.date}</p>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row justify-content-end">
                                                <Link to="#" onClick={() => this.handleFollow( item.userId )} > <i className="fa fa-user-plus fa-2x" style={{ color: "orange" }}></i>Follow</Link>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <p ><i className="fa fa-building margin: 15px 0px 15px 0px"></i> In Office</p> */}
                                    <div className="middle-section">
                                        <p> <b>{item.message} </b></p>
                                    </div>
                                </div>
                            ) )}
                        </div>
                        <div className="form-control center">
                            <Pagination activePage={this.state.activePage}
                                itemsCountPerPage={10}
                                totalItemsCount={450}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange.bind( this )}
                            />
                        </div>
                    </div>
                </div>
    
            )
        }else{
            return <h1 style={{color:"white"}}>No data Available</h1>
        }
        
    }
}