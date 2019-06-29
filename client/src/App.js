import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import UserRoutes from './routes/UserRoutes'
import GuestRoutes from './routes/GuestRoutes'
import Actions from "./utils/API";

import logo from './beary2.png';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }
  
  componentWillMount(){
    this.checkAuth();
  }
  
  // check user validation serverside
  checkAuth(){
    Actions.checkAuth()
      .then(data => {return data.json()})
      .then(response => {
        this.setState({
          isLoggedIn: response
        })
      })
      .catch(err => console.log("err", err));
  }

  // routing for unauthorized users
  guestRouting = () => {
    return(
      <Router>
        <div className="App">
          <section className="App-skew">
          </section>
          <header>
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">USER ACCOUNT DEMO</h1>
          </header>
          <div className="content">
            <Switch>
              <Route path="*" component={GuestRoutes} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }

  // routing for authorized users
  userRouting = () => {
    return(
      <Router>
        <div className="App">
          <section className="App-skew">
          </section>
          <header>
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">USER ACCOUNT DEMO</h1>
          </header>
          <div className="content">
            <Switch>
              <Route exact path="/" component={UserRoutes} />
              <Route exact path="/account" component={UserRoutes} />
              <Route path="/account/*" component={UserRoutes} />
              <Route path="/profile" component={UserRoutes} />
              <Route path="/profile/*" component={UserRoutes} />
              <Route path="*" component={GuestRoutes} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }

  // send user to proper route accounting to authentication
  render() {
    switch(this.state.isLoggedIn){
      case false:
        return this.guestRouting()
      case true:
        return this.userRouting()
      default:
        return this.guestRouting()
    }
  }
}

export default App;
