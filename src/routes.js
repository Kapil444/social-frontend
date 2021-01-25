import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Profile } from './components/Profile/Profile';
import { Home } from './components/Home/Home';
import { Signup } from './components/SignUp/SignUp';
import { UserDetail } from './components/UserDetail/UserDetail';

const Routes = () => {
    return <Switch>
        <Route exact path="/*" component={Home} />
        <Route exact path="/login" component={Login} />   
        <Route exact path="/signup" component={Signup} />  
        <Route exact path="/user/detail/:id" component={UserDetail} />     
        <Route path="/home" component={Home} />
        <Route path="/profile" component={Profile} />
    </Switch>;
};

export default Routes;
