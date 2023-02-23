import logo from './logo.svg';
import './App.css';
import Index from './Components';
import React, { Component } from 'react';
import $ from 'jquery';

class App extends Component {
  constructor(pros){
    super(pros)
    
    this.state = {
      "target": ""
    }
  }
  selectOptionsEvent(target){
    $("#sidebar-nav").find(".nav-link").addClass("collapsed");
    $(target).closest(".nav-link").toggleClass("collapsed");
    this.setState({target: $(target).closest("nav-item")})
  }
  render(){
    return (
      <Index
      HandleSelectOptions = {this.selectOptionsEvent}
      navOption = {this.state.target}/>
    );
  }
}

export default App;
