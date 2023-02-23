import React, { Component } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";


class Bill extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "data": [],
            pageNumber : 1,
        }
    }
    getConfigToken(){
        let config = {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("Token"),
                "Content-type": "application/json"
              }
        };
        return config;
    }
    getData(url) {
        let config = this.getConfigToken();
        axios.get(url, config)
            .then((response) => {
                this.setState({
                    data: response.data
                })
            });
    }


    componentDidMount = (url = "https://localhost:5001/api/v1/Bills") => {
        this.getData(url);
    }

    renderItem() {
        return this.state.data.map((item) => {
            return (
                <tr>
                    <td>{item.iddp}</td>
                    <td>{item.idGoiDV}</td>
                    <td>{item.tongTien}</td>
                    <td>{item.ghiChu}</td>
                    <td>{item.soCMTKhachHang}</td>
                    <td>{item.trangThai}</td>
                </tr>
            );
        });
    }

    renderthead() {
        return(
            <thead >
                <tr>
                    <th>ID đặt phòng</th>
                    <th>ID gọi dịch vụ</th>
                    <th>Tổng tiền</th>
                    <th>Ghi chú</th>
                    <th>Số CMT khách hàng</th>
                    <th>Trạng thái</th>
                </tr>
            </thead>
        );
    }

    render() {
        return (
            <div className="page_right-content">
                <div className="toolbar" id="toolbar">
                    <div className="section1 flex_center">
                        <h1 className="title_content">Danh sách hóa đơn</h1>
                    </div>
                </div>
                <div className="section3 tables" id="guestgrid" toolbar="toolbar" show_option="show_option">
                    <table>
                        {this.renderthead()}
                        <tbody>
                            {this.renderItem()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default Bill;