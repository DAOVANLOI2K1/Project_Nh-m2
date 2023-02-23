import React, { Component } from "react";
import axios from "axios";
import html2canvas from "html2canvas"; //npm install html2canvas
import jsPDF from "jspdf"; // npm install jspdf --save

class Payment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "data": [],
            "dataService": [],
            "dataCustomer": [],
            CMT: "",
            TongTien: []
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
    // Lấy các phòng đã đặt theo CMT của khách hàng
    getData(url) {

        axios.get(url)
            .then((response) => {
                this.setState({
                    data: response.data
                })
            });
    }

    // Lấy các dịch vụ đã gọi theo CMT của khách hàng
    getDataService(url) {
        axios.get(url)
            .then((response) => {
                this.setState({
                    dataService: response.data
                })
            });
    }

    // Lấy thông tin khách hàng theo CMT
    getDataCustomer(url) {
        axios.get(url)
            .then((response) => {
                this.setState({
                    dataCustomer: response.data
                })
            });
    }

    // Lấy tổng tiền
    getPayment(url) {
        axios.get(url)
            .then((response) => {
                this.setState({
                    TongTien: response.data
                })
            });
    }

    renderthead() {
        return (
            <thead>
                <tr>
                    <th>Mã phòng</th>
                    <th>Tên phòng</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                </tr>
            </thead>
        );
    }

    renderItem() {
        return this.state.data.map((item) => {
            return (
                <tr>
                    <td>{item.MaPhong}</td>
                    <td>{item.TenPhong}</td>
                    <td>{this.formatDate(item.NgayBatDau)}</td>
                    <td>{this.formatDate(item.NgayKetThuc)}</td>
                </tr>
            );
        });
    }

    renderthead2() {
        return (
            <thead>
                <tr>
                    <th>Mã dịch vụ</th>
                    <th>Tên dịch vụ</th>
                    <th>Thời gian gọi</th>
                    <th>Số lượng</th>
                </tr>
            </thead>
        );
    }

    renderItem2() {
        return this.state.dataService.map((item) => {
            return (
                <tr>
                    <td>{item.MaDV}</td>
                    <td>{item.TenDV}</td>
                    <td>{this.formatDate(item.ThoiGianGoi)}</td>
                    <td>{item.SoLuong}</td>
                </tr>

            );
        });
    }

    renderCustomer() {
        return this.state.dataCustomer.map((item) => {
            return (
                <div style={{ fontSize: 20 }}>
                    <p style={{ marginBottom: 10 }}>Khách hàng: {item.HoTen}</p>
                    <p style={{ marginBottom: 10 }}>Địa chỉ: {item.DiaChi}</p>
                    <p style={{ marginBottom: 10 }}>Điện thoại: {item.SDT}</p>
                </div>
            );
        });
    }

    renderPayment() {
        return this.state.TongTien.map((item) => {
            return (
                <b>{item.TongTien}</b>
            );
        });
    }

    // Gọi api
    handleSearch(search) {
        let url = "https://localhost:5001/api/v1/Bills/GetOrderRoom?customerID=" + search;
        let url2 = "https://localhost:5001/api/v1/Bills/GetOrderService?customerID=" + search;
        let url3 = "https://localhost:5001/api/v1/Bills/GetPayment?customerID=" + search;
        let url4 = "https://localhost:5001/api/v1/Bills/GetCustomer?customerID=" + search;
        this.getData(url);
        this.getDataService(url2);
        this.getPayment(url3);
        this.getDataCustomer(url4);
    }

    formatDate = dateSrc => {
        let date = new Date(dateSrc),
            year = date.getFullYear().toString(),
            month = (date.getMonth() + 1).toString().padStart(2, '0'),
            day = date.getDate().toString().padStart(2, '0');

        return `${day}/${month}/${year}`;
    }

    // In hóa đơn PDF
    printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                // const pdf = new jsPDF('p', 'pt', 'letter', false);
                const pdf = new jsPDF('p', 'pt', 'a4'); 
                pdf.addImage(imgData, 'PNG', 0, 0, 580, 0, undefined, false);
                // pdf.output('dataurlnewwindow');
                pdf.save("download.pdf");
            })
    }

    render() {
        return (
            <div className="page_right-content">
                <div className="show_options flex_center">
                    <div className="search_option">
                        <input type="text" className="search_input ms-input" option_name="Search" placeholder="Tìm kiếm theo Tên khách hàng" onChange={(e) => {
                            this.handleSearch(e.target.value);
                        }} />
                        <i className="fas fa-search search_icon search_icon" />
                    </div>
                </div>
                <button className="btn btn-primary" onClick={this.printDocument}>Print</button>

                {/* DIV để in ra PDF */}
                <div id="divToPrint">

                    <div style={{ textAlign: 'center' }}>
                        <b style={{ fontSize: 30 }}>KHÁCH SẠN H2CL2</b>
                        <p style={{ fontSize: 20 }}>Địa chỉ:</p>
                        <p style={{ fontSize: 20 }}>Điện thoại:</p>
                        <br />
                        <b style={{ fontSize: 25 }}>HÓA ĐƠN</b>
                    </div>
                    <br />
                    
                    {/* Thông tin khách hàng */}
                    <div style={{ fontSize: 20 }}>
                        {this.renderCustomer()}
                    </div>
                    <br />

                    {/* Thông tin các phòng đã đặt */}
                    <h6 className="title_content">Các phòng đã đặt</h6>
                    <table style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}>
                        {this.renderthead()}
                        <tbody>
                            {this.renderItem()}
                        </tbody>
                    </table>

                    {/* Thông tin các dịch vụ đã gọi */}
                    <h6 className="title_content">Các dịch vụ đã gọi</h6>
                    <table style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}>
                        {this.renderthead2()}
                        <tbody>
                            {this.renderItem2()}
                        </tbody>
                    </table>

                    {/* Tổng tiền phải thanh toán */}
                    <p style={{ fontSize: 25 }}>Tổng tiền: {this.renderPayment()}</p>
                    <br />
                    <p style={{ textAlign: 'center', fontSize: 20 }}>Cảm ơn quý khách và hẹn gặp lại</p>
                </div>
            </div>
        )
    };
}
export default Payment;