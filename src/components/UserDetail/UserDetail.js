import React from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
export class UserDetail extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            message: null,
            userId: null,
            userName: null,
            image: null,
            postList: [],
            followerList: [],
            followingList: [],
            activePage: 1
        }
    }
    componentDidMount() {
        this.getUserPost()        
    }
    getUserProfile() {
        let token = localStorage.getItem( 'token' );

        const headers = {
            'authorization': token
        }
        axios.get( "/api/user/profile", {
            headers: headers
        } ).then( ( res ) => {
            this.userId = res.data.userInfo._id;
            this.setState( {
                userId: res.data.userInfo._id,
                userName: res.data.userInfo.firstName + " " + res.data.userInfo.lastName
            } )
            console.log( res.data );
        } ).catch( ( err ) => {
            this.props.history.push( "/login" )
            alert( "Please Login First " )
        } )
    }
    componentDidCatch( err, info ) {
        console.log( "Errro ", err );
        console.log( "Info ", info )
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
    handlePageChange( pageNumber ) {
        console.log( `active page is ${pageNumber}` );
        this.setState( { activePage: pageNumber } );
    }
    getUserPost =()=> {        
        axios.get( `/api/post/by/user/by/${this.props.match.params.id}` ).then( ( res ) => {
            this.setState( {
                postList: res.data.postList,
                followingList: [],
                followerList: []
            } )
        } ).catch( err => {
            console.log( "Error : " + err );
        } )
    }
    getUserFollwer = () => {

        axios.get( `/api/post/user/follower/${this.props.match.params.id}` ).then( ( res ) => {
            this.setState( {
                postList: [],
                followerList: res.data.followerList,
                followingList: [],
            } )

        } ).catch( err => {
            console.log( "Error : " + err );
        } )
    }
    getUserFollowing = () => {
        axios.get( `/api/post/following/user/${this.props.match.params.id}` ).then( ( res ) => {
            this.setState( {
                postList: [],
                followerList: [],
                followingList: res.data.followingList,
            } )

        } ).catch( err => {
            console.log( "Error : " + err );
        } )
    }
    changeHanler = ( event ) => {
        let value = event.target.value;
        this.setState( { message: value } )
    }
    handlePost = ( event ) => {
        event.preventDefault();
        const headers = {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem( 'token' )
        }
        console.log( this.state )
        axios.post( "/api/post/create", this.state, {
            headers: headers
        } ).then( ( res ) => {
            console.log( res.data )
            this.setState( { message: "Post Add Successfully Please Refresh !!" } )
            this.props.history.push( "/home" );
        } ).catch( ( err ) => {
            console.log( "Error ", err )
        } )
    }

    render() {
        return (
            <div>
               
                <div style={{ backgroundColor: "white" }} className="container">
                    <div className="row justify-content-center">
                        <div className="job-list">
                            <div className="row">
                                <div className="col-md-4">
                                    <button onClick={this.getUserPost} className="btn btn-primary">Time Line</button>
                                </div>
                                <div className="col-md-4">
                                    <button onClick={this.getUserFollwer} className="btn btn-primary">Follow By The User</button>
                                </div>
                                <div className="col-md-4">
                                    <button onClick={this.getUserFollowing} className="btn btn-primary">Following List</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: "white" }} className="job-listing-main" >
                    <div className="container">
                        <div className="row justify-content-center">
                            
                            {this.state.postList.map( ( item, index ) => (
                                <div key={index} className="job-list" >
                                    <h5 style={{ marginBottom: "0px" }}><i className="fa fa-user margin: 15px 0px 15px 0px"></i>{item.userName}</h5>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="row justify-content-start">
                                                <p style={{ marginLeft: "10px" }}>Date : {item.date}</p>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row justify-content-end">
                                                <Link to="#" onClick={() => this.handleFollow( item._id )} > <i className="fa fa-user-plus fa-2x" style={{ color: "orange" }}></i>Follow</Link>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <p ><i className="fa fa-building margin: 15px 0px 15px 0px"></i> In Office</p> */}
                                    <div className="middle-section">
                                        <p> <b>{item.message} </b></p>
                                    </div>
                                </div>
                            ) )}
                            {this.state.followerList.map( ( item, index ) => (
                                <div key={index} className="job-list" >
                                    <table className="table" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th>User Name</th>
                                                <th>Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{item.followerName}</td>
                                                <td>{item.date}</td>
                                                <td>
                                                <Link to="#" onClick={() => this.handleFollow( item._id )} > <i className="fa fa-user-plus fa-2x" style={{ color: "orange" }}></i>Follow</Link>
                                                </td>
                                            </tr>                                            
                                        </tbody>
                                    </table>
                                </div>
                            ) )}
                            {this.state.followingList.map( ( item, index ) => (
                                <div key={index} className="job-list" >
                                    <table className="table" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>User Name</th>
                                                <th>Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{item.userName}</td>
                                                <td>{item.date}</td>
                                                <td>
                                                <Link to="#" onClick={() => this.handleFollow( item._id )} > <i className="fa fa-user-plus fa-2x" style={{ color: "orange" }}></i>Follow</Link>
                                                </td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
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
            </div>

        )
    }
}