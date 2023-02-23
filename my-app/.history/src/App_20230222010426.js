import logo from './logo.svg';
import './App.css';
import Index from './Components';
import React, { Component } from 'react';
import $ from 'jquery';
import Login from './Components/Login';
import Admin from './Components/Admin';
import { Router } from 'react-router';
import 

class App extends Component {
  constructor(pros){
    super(pros)
    
    this.state = {
      "target": ""
    }
  }
  render(){
    if(localStorage.getItem("Token")){
      if(localStorage.getItem("Role") === "Nhân Viên"){
        return (
          <Index
          userName = {localStorage.getItem("UserName")}/>
        );
      }
      return(
        <Admin/>
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
