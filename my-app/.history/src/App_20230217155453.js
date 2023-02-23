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
  render(){
    if(localStorage.getItem("Token")){
      return (
        <Index
        HandleSelectOptions = {this.selectOptionsEvent}/>
      );
    }
    else{
      return(
        <Login
        HandleSelectOptions = {this.selectOptionsEvent}/>
      );
    }
  }
}

export default App;
