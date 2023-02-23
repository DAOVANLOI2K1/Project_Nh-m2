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
    // Hàm đưa dữ liệu lên trang
    renderData(data) {
        let me = this,
            table = $("<table></table>"),
            tr_th = me.renderthead();
            // tr_td = me.rendertbody(data);
        
        table.append(tr_th);
        // table.append(tr_td);

        me.grid.html(table);
    }
      // Hàm render tr chứa th
    renderthead() {
        return(
            <thead>
                <tr>
                    <th>Mã nhân viên</th>
                    <th>Mã nhân viên</th>
                    <th>Mã nhân viên</th>
                    <th>Mã nhân viên</th>
                    <th>Mã nhân viên</th>
                </tr>
            </thead>
        );
    }
      renderItem = (items) => {
          items.map((item) => {
            return(
                <></>
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