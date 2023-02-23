import React, { Component } from "react";
import Guest from "./Guest";
import $, { get } from "jquery";
import axios from "axios";

class MainPageNav extends Component{
    constructor(pros){
        super(pros)
        this.state = {
            "data": [];
        }
    }
    getItem(){
        let me = this;
        // $.ajax({
        //     url: "https://localhost:5001/api/v1/Guests?pagenumber=1&rowsofpage=10",
        //     method: "Get",
        //     async: true,
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     crossDomain: true,
        //     contentType: "application/json;charset=utf-8",
        //     dataType: "json",
        //     success: function (response) {
        //        console.log(typeof(MainPageNav.renderItem(response)))
        //     },
        //     error: function (errormessage) {
        //         console.log(errormessage.responseText);
        //     }
        // })
        axios.get("https://localhost:5001/api/v1/Guests?pagenumber=1&rowsofpage=10")
        .then((response) => {
            this.setState({
                data: response
            })
        })
      }
      // Hàm render tr chứa th
    renderthead() {
        return(
            <thead>
                <tr>
                    <th>Mã khách hàng</th>
                    <th>Tên khách hàng</th>
                    <th>Số CMT</th>
                    <th>Giới tính</th>
                    <th>Số Điện thoại</th>
                    <th>Địa chỉ</th>
                    <th>Ghi Chú</th>
                    <th>Ngày sinh</th>
                </tr>
            </thead>
        );
    }
    renderItem = function(items){
          console.log(items);
      }
    render(){
        return(
            <Guest
            getItem = {this.getItem}
            renderthead = {this.renderthead}/>
        );
    }
}
export default MainPageNav;