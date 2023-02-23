import React, { Component } from "react";
import Guest from "./Guest";
import $, { get } from "jquery";
import axios from "axios";

class MainPageNav extends Component{
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
    render(){
        if(this.props.navScreen === "khách hàng"){
            return(
                <Guest
                renderthead = {this.renderthead}/>
            );
        }
        else if(this.props.navScreen === "khách hàng")
    }
}
export default MainPageNav;