
import React, { Component } from "react";
import ReactDOM from "react-dom";

class Nav extends Component {

	render(){
        return (
          <ul>
            <li>PLAYER X
            <h4 style={{margin:0}}> Win - 1 </h4>
            <h4 style={{margin:0}}> Loss - 1 </h4>
            <h4 style={{margin:0}}> Draw - 1 </h4>

            </li>
            <li>PLAYER O
            <h4 style={{margin:0}}> Win - 1 </h4>
            <h4 style={{margin:0}}> Loss - 1 </h4>
            <h4 style={{margin:0}}> Draw - 1 </h4>
            </li>
          </ul>

		)
	}
}
export default Nav;