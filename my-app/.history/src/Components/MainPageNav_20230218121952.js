import React, { Component } from "react";
import Guest from "./Guest";
import $, { get } from "jquery";
import axios from "axios";
import RoomType from "./RoomType";
import Service from "./Service";

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
        let navScreen = this.props.navScreen
        switch(navScreen){
            case "trang chủ":
                return(
                    <div>
                );
            case "khách hàng":
                return(
                    <Guest
                    renderthead = {this.renderthead}
                    config = {this.getConfigToken}/>
                );
            case "dịch vụ":
                return(
                    <Service
                    config = {this.getConfigToken}/>
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
                    <div>gọi dịch vụ</div>
                );
            default:
                break;
        }
    }
}
export default MainPageNav;