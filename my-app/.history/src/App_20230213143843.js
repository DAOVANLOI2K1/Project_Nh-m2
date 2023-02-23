import logo from './logo.svg';
import './App.css';
import Index from './Components';
import React, { Component } from 'react';

class App extends Component {
  constructor(pros){
    super(pros)
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
    const on = (type, el, listener, all = false) => {
      if (all) {
        select(el, all).forEach(e => e.addEventListener(type, listener))
      } else {
        select(el, all).addEventListener(type, listener)
      }
    }
    this.state = {
      "select": select,
      "on": on
    }
  }
  selectOptionsEvent(target){
    target.classList.toggle("collapsed");
  }
  render(){
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
      <Index
      HandleSelectOptions = {this.selectOptionsEvent}/>
    );
  }
}

export default App;
