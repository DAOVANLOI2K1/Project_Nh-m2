import React, { Component } from "react";
import Guest from "./Guest";
import $, { get } from "jquery";

class MainPageNav extends Component{
    // Hàm lấy khung column
    getColumnConfig() {
           let columnDefault = {
                FieldName: "",
                DataType: "string",
                Text: ""
            },
            columns = [];

        $("#employeegrid").find(".col").each(function() {
            let column = {...columnDefault},
                that = $(this);

            Object.keys(columnDefault).filter(function(colName) {
                let value = that.attr(colName);

                if(value) {
                    column[colName] = value;
                }

                column.Text = that.text();
            });
            columns.push(column);
        });
        return columns;
    }
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
      // Hàm add class cell
    hideID(target, dataType) {
        if(dataType) {
            switch(dataType) {
                case "guid":
                    target.hide();
                    break;
                default:
                    break;
            }
        }
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
        
        this.getColumnConfig().filter(function(column) {
            let text = column.Text,
                dataType = column.DataType;
            
                return(
                    <tr >{text}</tr>
                );
        });
        thead.append(tr)
        return thead;
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