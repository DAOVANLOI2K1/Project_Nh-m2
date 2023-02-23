import React, { Component } from "react";
import Guest from "./Guest";
import $, { get } from "jquery";

class MainPageNav extends Component{
    getItem(){
        $.ajax({
            url: "https://localhost:5001/api/v1/Guests?pagenumber=1&rowsofpage=10",
            method: "Get",
            async: true,
            headers: {
                "Content-Type": "application/json"
            },
            crossDomain: true,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (response) {
                console.log(response)
            },
            error: function (errormessage) {
                console.log(errormessage.responseText);
            }
        })
      }
      renderItem = (items) => {
          items
      }
    render(){
        return(
            <Guest
            getItem = {this.getItem}/>
        );
    }
}
export default MainPageNav;