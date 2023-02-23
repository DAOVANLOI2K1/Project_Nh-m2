import React, { Component } from "react";
import Guest from "./Guest/Guest";
import $, { get } from "jquery";
import axios from "axios";
import Service from "./Service/Service";
import Account from "./Account/Account";
import Room from "./Room/Room";
import OrderRoom from "./OrderRoom/OrderRoom";
import Bill from "./Bill/Bill";
import OrderService from "./OrderService/OrderService";
import HomePage from "./HomePage";

class MainPageNav extends Component{
    render(){
        let navScreen = this.props.navScreen
        switch(navScreen){
            case "trang chủ":
                return(
                    <HomePage/>
                );
            case "khách hàng":
                return(
                    <Gues/>
                );
            case "dịch vụ":
                return(
                    <Service/>
                );
            case "phòng":
                return(
                    <Room/>
                );
            case "hóa đơn":
                return(
                    <Bill/>
                );
            case "thuê phòng":
                return(
                    <OrderRoom/>
                );
            case "gọi dịch vụ":
                return(
                    <OrderService/>
                );
            case "tài khoản":
                return(
                    <Account/>
                );
            default:
                break;
        }
    }
}
export default MainPageNav;