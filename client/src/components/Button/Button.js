import React from "react";
import "./style.css";

const Button = (props) => (
    <button className={`btn ${props.float}`} onClick={props.handleBtnClick} required={props.required}> {props.children} </button> 
);

export default Button;