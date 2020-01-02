import React, { Component } from 'react';
// import Axios from 'axios'

//add-on
import { withRouter } from "react-router";
import { Switch, Route, Link } from "react-router-dom";

//css 


//components
import './App.css';
import Navi from './component/navi.js'
import CSSignin from './component/csSignIn.js'
import Home from './component/home.js'

import about from "./component/about.js"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: []
    }
  }

  render() {
    return (
      <>
      <div className = "overlay"> </div>
        <div className="app-render">
          <div className="app-navi">
            <Navi />
          </div>
          <Switch>
            <Route path="/about" render = {about} />
            <Route path="/signin" component={CSSignin} />
            <Route path="/" component = {Home} />
          </Switch>
        </div>

      </>

    )
  }

}



export default withRouter(App);