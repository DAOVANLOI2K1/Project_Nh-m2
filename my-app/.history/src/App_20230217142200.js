import logo from './logo.svg';
import './App.css';
import Index from './Components';
import React, { Component } from 'react';
import $ from 'jquery';
import Login from './Components/Login';

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
  }
  render(){
    if(localStorage.getItem("Token")){
      return (
        <Index
        HandleSelectOptions = {this.selectOptionsEvent}/>
      );
    }
    else{
      return(
        <Login/>
      );
    }
  }
}

export default App;
