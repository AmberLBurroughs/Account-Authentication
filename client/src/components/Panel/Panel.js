import React from "react";
import "./style.css";

const Panel = (props) => (
    <div id="panel">
    	<div className="panel-content">
    	{props.children}
    	</div>
    </div>
);

export default Panel;