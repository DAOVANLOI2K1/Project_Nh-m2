import React, {Component} from "react";
import axios from "axios";
class ListOrderRoom extends Component{
    constructor(props){
        super(props);
        this.state = {
            showFormCreate: false,
            CMT: "",
            PID: "",
            NgayBatDau: "",
            NgayKetThuc: ""
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
    //get api
    getData(url){
        let config = this.getConfigToken();
        axios.get(url, config)
        .then((response) => {
            this.setState({
                data: response.data
            })
        });
    }
    componentDidMount(url = "https://localhost:5001/api/v1/Rooms?PageIndex=1&RowPerPage=500"){
        this.getData(url);
    }
    render(){
        if(this.props.display === false) return null;
        if(!this.state.showFormCreate){
            return(
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
                        <button className="add_button ms-btn" commandtype="add" onClick={() => this.setState({showFormCreate: true})}>
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
                                <th scope="col">IDDP</th>
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
                    <h5 className="card-title">Thuê/Đặt dịch vụ</h5>
                    <form>
                        {/* Nhập số CMT */}
                        <div className="row mb-3">
                            <label htmlFor="CMT" className="col-sm-2 col-form-label">Số CMT</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    id="CMT"
                                    className="form-control"
                                    // value={this.props.CMT}
                                    // onChange={(event) =>
                                    //     this.handleFormCMTChange(event.target.value)
                                    // }
                                />
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
                                    // onChange={(event) =>
                                    //     this.handleFormMaDVChange(event.target.value)
                                    // }
                                >
                                    <option value={""} selected>
                                        Chọn phòng
                                    </option>
                                    {/* {this.renderItemService()} */}
                                </select>

                                {/* Thêm validate MaDV
                                <label style={errorLabel} id="errorOfMaDV"></label> */}
                            </div>
                        </div>

                        {/* Nhập thời gian chọn */}
                        <div className="row mb-3">
                            <label htmlFor="ThoiGianGoi" className="col-sm-2 col-form-label">Thời gian Bắt đầu</label>
                            <div className="col-sm-10">
                                <input
                                    id="ThoiGianBD"
                                    type="date"
                                    className="form-control"
                                    // value={this.props.ThoiGianGoi}
                                    // onChange={(event) =>
                                    //     this.handleFormThoiGianGoiChange(event.target.value)
                                    // }
                                />

                                {/* Thêm validate ThoiGianChon
                                <label style={errorLabel} id="errorOfThoiGianChon"></label> */}
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
                                    // onChange={(event) =>
                                    //     this.handleFormThoiGianGoiChange(event.target.value)
                                    // }
                                />

                                {/* Thêm validate ThoiGianChon
                                <label style={errorLabel} id="errorOfThoiGianChon"></label> */}
                            </div>
                        </div>
                        <div className="text-center">
                            {/* Thêm dịch vụ vào bảng gọi dịch vụ */}
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.handleInsert()}
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