import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
class ListOrderRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urlApiRoomCanOrder: "https://localhost:5001/api/v1/Rooms/Can_Order",
            urlApiOrderRooms: "https://localhost:5001/api/v1/OrderRooms",
            listRoom: [],
            showFormCreate: false,
            PID: "",
            CMT: "",
            NgayBatDau: "",
            NgayKetThuc: ""
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
    //get api
    getData(url) {
        let config = this.getConfigToken();
        axios.get(url, config)
            .then((response) => {
                this.setState({
                    listRoom: response.data
                })
            });
    }
    componentDidMount(url = this.state.urlApiRoomCanOrder) {
        this.getData(url);
    }
    handleFormCMTChange(value) {
        if (value) {
            this.setState({ CMT: value });
        }
    }
    handleFormPIDChange(value) {
        if (value) {
            this.setState({ PID: value });
        }
    }
    handleFormThoiGianBDChange(value) {
        if (value) {
            this.setState({ NgayBatDau: value });
        }
    }
    handleFormThoiGianKTChange(value) {
        if (value) {
            this.setState({ NgayKetThuc: value });
        }
    }
    insertData(url) {
        let config = this.getConfigToken();
        axios.post(url, {
            pid: this.state.PID,
            cmt: this.state.CMT,
            ngayBatDau: this.state.NgayBatDau,
            ngayKetThuc: this.state.NgayKetThuc
        }, config)
            .then((response) => {
                if (response) {
                    Swal.fire('Đặt phòng thành công!', '', 'success')
                    this.setState({ showFormCreate: false });
                    this.props.componentDidMount();
                }
                else {
                    Swal.fire('Đặt phòng thất bại!', '', 'info')
                }
            })
            .catch(err => {
                Swal.fire('Có lỗi trong quá trình đặt!', '', 'error');
                console.log(err)
            });
    }
    validateOrderRoomForm = () => {
        // validate so cccd
        var numbersOnly = /^\+?[0-9]+$/;
        let errorOfSoCMT = "";
        let soCMT = document.getElementById("CMT").value;
        if (!numbersOnly.test(soCMT)) {
            errorOfSoCMT += 'Số chứng minh thư chỉ chưa số!\n';
        }
        if (soCMT.length > 12) {
            errorOfSoCMT += 'Số chứng minh có tối đa 12 số!';
        }

        // validate phòng
        let errorOfTenPhong = "";
        let tenPhong = document.getElementById("MaPhong").value;
        if (!tenPhong) {
            errorOfTenPhong += 'Cần chọn tên phòng cần thuê!\n';
        }

        // validate ngày
        let errorOfNgayDen = "";
        let ngayDen = this.state.NgayBatDau;
        if (ngayDen === "") {
            errorOfNgayDen = errorOfNgayDen + "Ngày không được bỏ trống!\n";
        }
        let errorOfNgayDi = "";
        let ngayDi = this.state.NgayKetThuc;
        if (ngayDi === "") {
            errorOfNgayDi = errorOfNgayDi + "Ngày không được bỏ trống!\n";
        }
        else if (ngayDi < ngayDen) {
            errorOfNgayDi = errorOfNgayDi + "Ngày đi phải là ngày sau ngày đến!\n";
        }
        if (errorOfNgayDen || errorOfNgayDi || errorOfSoCMT || errorOfTenPhong) {
            document.getElementById("errorOfSoCMT").innerHTML = typeof errorOfSoCMT === "undefined" ? "" : errorOfSoCMT;
            document.getElementById("errorOfTenPhong").innerHTML = typeof errorOfTenPhong === "undefined" ? "" : errorOfTenPhong;
            document.getElementById("errorOfNgayDen").innerHTML = typeof errorOfNgayDen === "undefined" ? "" : errorOfNgayDen;
            document.getElementById("errorOfNgayDi").innerHTML = typeof errorOfNgayDi === "undefined" ? "" : errorOfNgayDi;
        }
        else {
            this.alertComfirmCreate();
        }
    };
    alertComfirmCreate = () => {
        this.handleInsert();
    }
    handleInsert() {
        let url = this.state.urlApiOrderRooms;
        this.insertData(url)
    }
    renderDataPhong() {
        if (this.state.listRoom) {
            return this.state.listRoom.map(item => {
                return (
                    <option value={item.pid}>
                        {item.tenPhong}
                    </option>
                );
            })
        }
        this.componentDidMount();
        return this.state.listRoom.map(item => {
            return (
                <option value={item.pid}>
                    {item.tenPhong}
                </option>
            );
        })

    }
    render() {
        const errorMessage = {
            color: "red"
        }
        if (this.props.displayListOrderRoom === false) return null;
        if (!this.state.showFormCreate) {
            return (
                <div className="page_right-content">
                    <div className="toolbar" id="toolbar">
                        <div className="section1 flex_center">
                            <h1 className="card-title">Danh sách thuê phòng</h1>
                            <div className="row mb-3">
                            </div>
                        </div>
                        <div className="section2 flex_center" id="show_option">
                            <div className="show_options flex_center">
                                <div className="search_option">
                                    <input type="text" className="search_input ms-input" option_name="Search" placeholder="Tìm kiếm theo tên khách hàng"
                                        onChange={(e) => {
                                            this.props.handleSearch("&search=" + e.target.value);
                                        }} />
                                    <i className="fas fa-search search_icon search_icon" />
                                </div>
                            </div>
                            <div className="buttons">
                                <button className="add_button ms-btn" commandtype="add" onClick={() => this.setState({ showFormCreate: true })}>
                                    <i className="fas fa-user-plus add_icon" />
                                    Thuê/Đặt phòng
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="section3 tables" id="employeegrid" toolbar="toolbar" show_option="show_option">
                        <table className="table">
                            <thead>
                                <tr>
                                    {/* <th scope="col">IDDP</th> */}
                                    <th scope="col">Tên Phòng</th>
                                    <th scope="col">Họ tên khách thuê</th>
                                    <th scope="col">Ngày đến</th>
                                    <th scope="col">Ngày đi</th>
                                    <th scope="col">Giá tiền</th>
                                    <th scope="col">isDelete</th>
                                    <th scope="col">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.rederData()}
                            </tbody>
                        </table>
                    </div>
                    <div className="card-body">

                    </div>
                </div>
            )
        }
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Thuê/Đặt phòng</h5>
                    <form>
                        <div className="form_closeicon flex_center" onClick={() => this.setState({ showFormCreate: false })}>
                            <i className="fas fa-times form_icon" />
                        </div>
                        {/* Nhập số CMT */}
                        <div className="row mb-3">
                            <label htmlFor="CMT" className="col-sm-2 col-form-label">Số CMT</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    id="CMT"
                                    className="form-control"
                                    // value={this.props.CMT}
                                    onChange={(e) =>
                                        this.handleFormCMTChange(e.target.value)
                                    }
                                />
                                <label style={errorMessage
                                } id="errorOfSoCMT"></label>
                            </div>
                        </div>

                        {/* Chọn Phòng */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Chọn phòng</label>
                            <div className="col-sm-10">
                                <select
                                    id="MaPhong"
                                    className="form-select"
                                    aria-label="Default select example"
                                    // value={this.props.MaDV}
                                    onChange={(event) =>
                                        this.handleFormPIDChange(event.target.value)
                                    }
                                >
                                    <option value={""} selected>
                                        Chọn phòng
                                    </option>
                                    {this.renderDataPhong()}
                                </select>

                                {/* Thêm validate MaDV */}
                                <label style={errorMessage
                                } id="errorOfTenPhong"></label>
                            </div>
                        </div>

                        {/* Nhập thời gian chọn */}
                        <div className="row mb-3">
                            <label htmlFor="ThoiGianBD" className="col-sm-2 col-form-label">Thời gian Bắt đầu</label>
                            <div className="col-sm-10">
                                <input
                                    id="ThoiGianBD"
                                    type="date"
                                    className="form-control"
                                    // value={this.props.ThoiGianGoi}
                                    onChange={(event) =>
                                        this.handleFormThoiGianBDChange(event.target.value)
                                    }
                                />
                                <label style={errorMessage
                                } id="errorOfNgayDen"></label>

                            </div>
                        </div>

                        {/* Nhập thời gian chọn */}
                        <div className="row mb-3">
                            <label htmlFor="ThoiGianGoi" className="col-sm-2 col-form-label">Thời gian kết thúc</label>
                            <div className="col-sm-10">
                                <input
                                    id="ThoiGianKT"
                                    type="date"
                                    className="form-control"
                                    // value={this.props.ThoiGianGoi}
                                    onChange={(event) =>
                                        this.handleFormThoiGianKTChange(event.target.value)
                                    }
                                />
                                <label style={errorMessage
                                } id="errorOfNgayDi"></label>

                                {/* Thêm validate ThoiGianChon
                                <label style={errorLabel} id="errorOfThoiGianChon"></label> */}
                            </div>
                        </div>
                        <div className="text-center">
                            {/* Thêm dịch vụ vào bảng gọi dịch vụ */}
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.validateOrderRoomForm()}
                            >
                                Thuê/Đặt
                            </button>

                            {/* Reset lại các vùng nhập dữ liệu*/}
                            <button type="reset" className="btn btn-secondary">Nhập lại</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default ListOrderRoom