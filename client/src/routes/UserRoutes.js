import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import Profile from '../pages/User/Profile/Profile'

class UserRoutes extends Component {
    render(){
        return(
          <Switch>
            <Route exact path="/" component={Profile} />
            <Route exact path="/home" component={Profile} />
            <Route path="*" component={Profile} />
          </Switch>
        );
    }
}

export default UserRoutes;