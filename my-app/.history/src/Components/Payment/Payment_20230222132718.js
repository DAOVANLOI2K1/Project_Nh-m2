import React, { Component } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

class Payment extends Component{
    constructor(props) {
        super(props)
        this.state = {
            "data": [],
            CMT: "",
            TongTien: []
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

    renderItem() {
        console.log(this.state.data);
        return this.state.data.map((item) => {
            return (
                <tr>
                    <td>{item.hoTen}</td>
                    <td>{item.soCMTKhachHang}</td>
                    <td>{item.tenPhong}</td>
                    <td>{item.tenDV}</td>
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
                </tr>
            </thead>
        );
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

    renderPayment() {
        return this.state.TongTien.map((item) => {
            return (
                <b>{item.TongTien}</b>
            );
        });
    }

    componentDidMount = (url = "https://localhost:5001/api/v1/Bills") => {
        this.handleValue()
      }

    handleValue() {
        const value = this.props.CMT;
        let url = "https://localhost:5001/api/v1/Bills/GetBillByGuestID?guestID=" + value;
        this.getData(url);
    }

    formatDate = dateSrc => {
        let date = new Date(dateSrc),
            year = date.getFullYear().toString(),
            month = (date.getMonth() + 1).toString().padStart(2, '0'),
            day = date.getDate().toString().padStart(2, '0');

        return `${day}/${month}/${year}`;
    }

    // In hóa đơn
    printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'pt', 'a4');
                pdf.addImage(imgData, 'PNG', 0, 0, 580, 0, undefined, false);
                pdf.save("download.pdf");
            })
    }

    render() {
        return (
            <div className="page_right-content">
                <button className="btn btn-primary" onClick={this.printDocument}>Print</button>
                <button className="btn btn-dark" onClick={this.props.turnOnPayment}>Back</button>
                <button className="btn btn-success">Thanh toán</button>
                <div id="divToPrint">
                    <div style={{ textAlign: 'center' }}>
                        <b style={{ fontSize: 30 }}>KHÁCH SẠN H2CL2</b>
                        <p style={{ fontSize: 20 }}>Địa chỉ:</p>
                        <p style={{ fontSize: 20 }}>Điện thoại:</p>
                        <br />
                        <b style={{ fontSize: 25 }}>HÓA ĐƠN</b>
                    </div>
                    <br />
                    <table style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}>
                        {this.renderthead()}
                        <tbody>
                            {this.renderItem()}
                        </tbody>
                    </table>
                    <br />
                    <p style={{ textAlign: 'center', fontSize: 20 }}>Cảm ơn quý khách và hẹn gặp lại</p>
                </div>
            </div>
        )
    };
}
export default Payment;