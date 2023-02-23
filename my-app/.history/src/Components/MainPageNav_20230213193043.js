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
      // Hàm render tr chứa th
    renderthead() {
        return(
            <thead>
                <tr guestId = "0">
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
      renderItem = (items) => {
          items.map((item) => {
            return(
                <tbody>
                    <tr>
                        <td>{item.maKH}</td>
                        <td>{item.hoTen}</td>
                        <td>{item.maKH}</td>
                        <td>{item.maKH}</td>
                        <td>{item.maKH}</td>
                    </tr>
                </tbody>
            );
          });
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