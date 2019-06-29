import React, {Component} from 'react'
import { Link } from "react-router-dom";
import Actions from "../../../utils/API";
import "./Home.css"

import Panel from '../../../components/Panel'
import Input from '../../../components/Input'
import Button from '../../../components/Button'

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoggedIn: false,
            loading: false,
            new: false,
            error: false,
            errorMsg: "",
            errClassName: "",
            email: "",
            local_pw: ""
        }
    }

    resetError = () => { 
        this.setState({
            errClassName: "",
            errorMsg: ""
        })
    }

    handleSubmitAuth = (e) => {
        if(this.refs.submitForm.reportValidity()) {
          e.preventDefault();
          this.setState({
              loading: true
          })
    
          const userData = {
            email: this.state.email,   
            local_pw: this.state.local_pw
          }
        
          let selectedButton = e.target.innerText;
          selectedButton = selectedButton.toLowerCase();
    
          this.refs.submitForm.reset();
    
          selectedButton === "signup" ?  this.handleSignup(userData) : this.handleLogin(userData)
        }
    }

    validateRes = (response) => {
        if(response.success){
            this.setState({
                isLoggedIn: response,
                errorMsg: "",
                errClassName: ""
            });

            window.location.href = "/"
        }
        else {
            this.setState({
                loading: false,
                errorMsg: `UH-OH!
                ${response.message}
                `,
                errClassName: "error"
            })
        } 
    }

    handleSignup = (userData) => {
        this.setState({
            new: true
        })

        Actions.handleSignup(userData)
        .then(data => {return data.json()})
        .then(response=>{
            this.validateRes(response)
        })
        .catch(err=> console.log("err",err));
    }

    handleLogin = (userData) => {
        this.setState({
            new: false
        })
        Actions.handleLogin(userData)
        .then(data => {return data.json()})
        .then(response=>{
            console.log(response)
            this.validateRes(response)
        })
        .catch(err=> console.log("err",err));
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        
        this.setState({
            [name]: value
        }); 
    }

    renderAuthForm = () => {
        return(
          <div>
            <form ref="submitForm" onClick={this.resetError}>
              <p id="form-error" className={this.state.errClassName}>{this.state.errorMsg}</p>
              <Input 
                elementID="user-email" 
                inputType="email" 
                placeholder="email" 
                img="email" 
                required={true} 
                size="3" 
                name="email" 
                handleChange={this.handleInputChange}/>
              <Input 
                elementID="user-pw" 
                inputType="password" 
                placeholder="password" 
                img="password" 
                required={true} 
                size="6" 
                name="local_pw" 
                handleChange={this.handleInputChange}/>
              <Button 
                handleBtnClick={this.handleSubmitAuth} 
                float="left">
                    LOGIN
              </Button>
              <Button 
                handleBtnClick={this.handleSubmitAuth} 
                float="right">
                    SIGNUP
              </Button>
            </form>
          </div>
        )
    }

    renderLoading = () => {
        if(this.state.new) {
            return(
                <div>
                    <h2>Creating your shiney new account!</h2>
                    <p>Please wait...</p>
                </div>
            ) 
            
        } else {
           return( <div>
                <h2>Loading your Profile!</h2>
                <p>Please wait...</p>
            </div>)
        }
    }

    render(){
        return(
            <Panel>
                {(this.state.loading)? this.renderLoading() : this.renderAuthForm()}
            </Panel>
        )
    }
}

export default Home;