import React, { Component } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import Payment from "../Payment/Payment";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


class Bill extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "data": [],
            pageNumber: 1,
            showPayment: false,
            showList: true,
            CMT: "",
        }
    }
    getConfigToken() {
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
                console.log(response)
            });
    }


    componentDidMount = (url = "https://localhost:5001/api/v1/Bills") => {
        this.getData(url);
    }

    turnOnPayment = (cmt) => {
        this.setState({
            showList: !this.state.showList,
            CMT: cmt
        })
    }

    renderbuttonThanhToan(status, cmt) {
        if (status === "Chưa thanh toán") {
            return (<td>
                this.RoomUpdateShowForm(item)<button type="button" className="btn btn-success btn-sm" onClick={() => this.turnOnPayment(cmt)}>Thanh Toán</button></td>);
        }
    }

    renderItem() {
        console.log(this.state.data);
        return this.state.data.map((item) => {
            return (
                <tr>
                    <td>{item.hoTen}</td>
                    <td>{item.soCMTKhachHang}</td>
                    <td>{item.tenPhong}</td>
                    <td>{item.tenDV}</td>
                    <td>{item.trangThai}</td>
                    {this.renderbuttonThanhToan(item.trangThai, item.soCMTKhachHang)}
                </tr>

            );
        });
    }

    renderthead() {
        return (
            <thead>
                <tr>
                    <th>Họ tên</th>
                    <th>Số CMT khách hàng</th>
                    <th>Tên phòng</th>
                    <th>Tên dịch vụ</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
        );
    }

    render() {
        if (this.state.showList === true) {
            return (
                <div className="page_right-content">
                    <div className="toolbar" id="toolbar">
                        <div className="section1 flex_center">
                            <h1 className="title_content">Danh sách hóa đơn</h1>
                        </div>
                    </div>
                    <div className="section3 tables" id="billGrid" toolbar="toolbar" show_option="show_option">
                        <table>
                            {this.renderthead()}
                            <tbody>
                                {this.renderItem()}
                            </tbody>
                        </table>
                    </div>
                    <div>

                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Payment
                        turnOnPayment = {this.turnOnPayment}
                        CMT = {this.state.CMT}
                    />
                </div>
            )
        }
    }
}
export default Bill;