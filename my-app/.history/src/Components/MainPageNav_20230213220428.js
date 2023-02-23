import React, { Component } from "react";
import Guest from "./Guest";
import $, { get } from "jquery";
import axios from "axios";

class MainPageNav extends Component{
    componentDidMount = () => {
        axios.get("https://localhost:5001/api/v1/Guests?pagenumber=1&rowsofpage=10")
        .then((response) => {
            this.setState({
                data: response.data
            })
        });
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
    renderItem(){
        return this.state.data.map((item) => {
            return(
                <tr>
                    <td>{item.maKH}</td>
                    <td>{item.maKH}</td>
                    <td>{item.maKH}</td>
                    <td>{item.maKH}</td>
                    <td>{item.maKH}</td>
                    <td>{item.maKH}</td>
                    <td>{item.maKH}</td>
                    <td>{item.maKH}</td>
                </tr>
            );
        });
      }
    render(){
        return(
            <Guest
            renderthead = {this.renderthead}
            renderItem = {this.renderItem}/>
        );
    }
}
export default MainPageNav;