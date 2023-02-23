import React, { Component } from "react";
import axios from "axios";
import $, { data, get } from "jquery";

class OrderService extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "data": [],
            CMT: "",
            MaPhong: "",
            DVID: "",
            ThoiGianGoi: "",
            resultInsert: '',
            resultInsertAlert: false,
            showServiceForm: false
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
    // Gọi api lấy data cho bảng chọn dịch vụ
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

    // Gọi api thêm bản ghi vào bảng GoiDichVu
    postData(url) {
        let config = this.getConfigToken();
        axios
            .post("https://localhost:5001/api/v1/Accounts", {
                hoten: this.state.hoten,
                SDT: this.state.soDienThoai,
                TenDangNhap: this.state.tenDangNhap,
                MatKhau: this.state.password,
                Role: this.state.vaiTro,
            }, config)
            .then(response => {
                if (response.data) {
                    this.setState({
                        isInsertSuccess: true,
                    })
                }
                else {
                    this.setState({
                        isInsertSuccess: false,
                    })
                }
            })
            .catch(error => {
                this.setState({
                    isInsertSuccess: false,
                })
            });
    }

    handleInsert(){
        let url = "https://localhost:5001/api/v1/OrderServices?CMT="+ this.state.CMT +"&MaPhong="+ this.state.MaPhong +"&DVID="+ this.state.MaDV +"&ThoiGianGoi="+ this.state.ThoiGianGoi;
        this.postData(url);
      }

    componentDidMount = (url = "https://localhost:5001/api/v1/Services") => {
        this.getData(url);
    }

    // Chọn tên dịch vụ, value là DVID
    renderItemService() {
        return this.state.data.map((item) => {
            return (
                <option value={item.dvid}>{item.tenDV}</option>
            );
        });
    }

    handleFormCMTChange(value){
        this.setState({
            CMT: value,
        });
    };

    handleFormMaPhongChange(value){
        this.setState({
            MaPhong: value,
        });
    };

    handleFormMaDVChange(value){
        this.setState({
            MaDV: value,
        });
    };

    handleFormThoiGianGoiChange(value){
        this.setState({
            ThoiGianGoi: value,
        });
    };

    formatDate = dateSrc => {
        let date = new Date(dateSrc),
            year = date.getFullYear().toString(),
            month = (date.getMonth() + 1).toString().padStart(2, '0'),
            day = date.getDate().toString().padStart(2, '0');

        return `${day}/${month}/${year}`;
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Gọi dịch vụ</h5>
                    <form>
                        {/* Nhập số CMT */}
                        <div className="row mb-3">
                            <label htmlFor="CMT" className="col-sm-2 col-form-label">Số CMT</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.props.CMT}
                                    onChange={(event) =>
                                        this.handleFormCMTChange(event.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {/* Nhập mã phòng */}
                        <div className="row mb-3">
                            <label htmlFor="MaPhong" className="col-sm-2 col-form-label">Phòng</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.props.MaPhong}
                                    onChange={(event) =>
                                        this.handleFormMaPhongChange(event.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {/* Chọn dịch vụ */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Chọn dịch vụ</label>
                            <div className="col-sm-10">
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    value={this.props.MaDV}
                                    onChange={(event) =>
                                        this.handleFormMaDVChange(event.target.value)
                                    }
                                >
                                    <option value={null} selected>
                                        Chọn dịch vụ
                                    </option>
                                    {this.renderItemService()}
                                </select>
                            </div>
                        </div>

                        {/* Nhập thời gian chọn */}
                        <div className="row mb-3">
                            <label htmlFor="ThoiGianGoi" className="col-sm-2 col-form-label">Thời gian chọn</label>
                            <div className="col-sm-10">
                                <input
                                    type="date"
                                    className="form-control"
                                    value={this.props.ThoiGianGoi}
                                    onChange={(event) =>
                                        this.handleFormThoiGianGoiChange(event.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            {/* Thêm dịch vụ vào bảng gọi dịch vụ */}
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.handleInsert()}
                            >
                                Đặt dịch vụ
                            </button>

                            {/* Reset lại các vùng nhập dữ liệu*/}
                            <button type="reset" className="btn btn-secondary">Reset</button>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}
export default OrderService;