import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import Home from '../pages/Guest/Home/Home'
import NoMatch from '../pages/Guest/NoMatch/NoMatch'

class GuestRoutes extends Component {
  
    render(){
        return(
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/profile" component={Home}/>
            <Route exact path="/account" component={Home}/>
            <Route path="*" component={NoMatch} />
          </Switch>
        );
    }
}

export default GuestRoutes;