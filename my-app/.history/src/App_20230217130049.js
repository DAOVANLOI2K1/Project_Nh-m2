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
  }
  render(){
    return (
      <Index
      test = {10}
      HandleSelectOptions = {this.selectOptionsEvent}/>
    );
  }
}

export default App;
