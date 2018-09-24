import React from "react";
import "./style.css";

class Input extends React.Component {
	
	render(){
		const inputStyles = {
			background: `url(./assets/img/${this.props.img}.png) no-repeat 16px`,
			backgroundSize: `16px`
		}
		return(
			<input id={this.props.elementID} className="input" type={this.props.inputType} placeholder={this.props.placeholder} style={inputStyles} required={this.props.required} minLength={this.props.size} size={this.props.size}/>
		);
	}
}

export default Input;



