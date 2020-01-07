import React, { Component } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom';
import '../css/home.css'
const user_logo = require('../images/user_icon_1.png')


class Home extends Component {
 constructor(props) {
  super(props);
  this.state = {
   today: []
  }
 }

 convert24 = (time) => {
  var hours = time[0] + time[1]
  var AmOrPm = hours >= 12 ? 'pm' : 'am';
  hours = (hours % 12) || 12;
  var minutes = time[3] + time[4]
  var finalTime = hours + ":" + minutes + " " + AmOrPm;
  return finalTime
 }

 getToday = () => {
  Axios.get('/api/log/today').then((res) => {
   console.log(res)
   this.setState({
    today: res.data.result
   }
   )
  })

 }


 mapTodayCS = (array) => {
  let elMap = array.map((el, i) => {
   return (
     <li id="volunteer" key = {i}> 
     <img src = {user_logo} width= "25px"/>
      <p> {el.first_name} {el.last_name} </p>
     <p>{this.convert24(el.start_time)} to {this.convert24(el.end_time)} </p>
     </li>
   )
  })

  return elMap
 }

 componentDidMount() {
  this.getToday()
 }


 render() {
  return (
   <div className="home">
    <div className="home-left">
     <div id="left_container">
      <h1>Volunteer Service Log</h1>
      <p>A simple and quick web application to sign in your community volunteers tracker for your organization.</p>
      <NavLink id="home_button" to="/signin"> Start </NavLink>
     </div>
    </div>
    <div className="home-right">
    <div id = "right-container"> 
      <h2> Current Volunteers:</h2>
      <ul>
      <li> John Smith 8:00 AM to 6:00 PM</li>
      <li> Jane Smith 12:00 PM to 5:00 PM </li>
      <li> Jonna Smith 2:00 PM to 5:00 PM</li>

      {this.mapTodayCS(this.state.today)}
      </ul>
    </div>
    </div>
   </div>
  )
 }



}

export default withRouter(Home);
