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
        // if(this.props.navScreen === "khách hàng"){
        //     return(
        //         <Guest
        //         renderthead = {this.renderthead}/>
        //     );
        // }
        // else if(this.props.navScreen !== "khách hàng"){
        //     return(
        //         <div>Hello</div>
        //     );
        // }
        let navScreen = this.props.navScreen
        switch(navScreen){
            case "khách hàng":
                return(
                    <Guest
                    renderthead = {this.renderthead}/>
                );
            case "dịch vụ":
                return(
                    <div>Dịch vụ</div>
                );
            case "phòng":
                return(
                    <div>Phòng</div>
                );
            case "hóa đơn":
                return(
                    <div>Hóa đơn</div>
                );
            case "thuê phòng":
                return(
                    <div>Thuê phòng</div>
                );
            case "gọi dịch vụ":
                return(
                    <div>Gọi dịch vụ</div>
                );
            default:
                break;
        }
    }
}
export default MainPageNav;