import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    isLoggedIn: false
  }
  componentWillMount(){
    this.checkAuth();
  }

  checkAuth(){

   fetch("http://localhost:8000/user", {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    })
   .then(data => {return data.json()})
    .then(json=>{
      console.log(json);
      this.setState({
        isLoggedIn: json
      })
    })
    .catch(err=> console.log("err",err));

  }

  handleLoginSubmit(e){
    e.preventDefault();
    // console.log("click")
    var selectedButton = e.target.textContent;
    var user = {
      email: document.getElementById("user-email").value,
      local_pw: document.getElementById("user-pw").value
    }
    // console.log(user);
    // console.log(selectedButton);
    if(selectedButton === "Signup"){

      fetch("http://localhost:8000/signup", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(user),
        credentials: 'include',
        mode: 'cors'
      })
      .then(data => {return data.json()})
      .then(json=>{
        console.log("signup",json);
        console.log(json);
        this.setState({
          isLoggedIn: json
        })
      })
      .catch(err=> console.log("err",err));

    }else if(selectedButton === "Signin"){


      fetch("http://localhost:8000/signin", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=utf-8"
          // "origin": "http://localhost:3000"
        },
        body: JSON.stringify(user),
        credentials: 'include',
        mode: 'cors'
      })
      .then(data => {return data.json()})
      .then(json=>{
        console.log("signin",json);
        console.log(json);
        this.setState({
          isLoggedIn: json
        })
      })
      .catch(err=> console.log("err",err));

    }
  }

  handlelogout(){
    fetch("http://localhost:8000/logout", {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    })
    .then(data => {return data.json()})
    .then(json=>{
      console.log(json);
      this.setState({
        isLoggedIn: json
      })
    })
    .catch(err=> console.log("err",err))

  }

  renderTest(){
    if(this.state.isLoggedIn){
      return(<button onClick={this.handlelogout.bind(this)}>logout</button>)
    }else {
      return(
        <form>
          <input type="email" id="user-email" placeholder="your email"/>
          <input type="password" id="user-pw" placeholder="your password"/>
          <button onClick={this.handleLoginSubmit.bind(this)}>Signup</button>
          <button onClick={this.handleLoginSubmit.bind(this)}>Signin</button>
        </form>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.renderTest()}
      </div>
    );
  }
}

export default App;
