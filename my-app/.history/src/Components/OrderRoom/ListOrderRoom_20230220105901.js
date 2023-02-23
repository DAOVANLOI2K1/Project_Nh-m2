import React, {Component} from "react";
import axios from "axios"

class ListOrderRoom extends Component{
    constructor(props){
        super(props);
        this.state = {
            showFormCreate: false,
            data: [],
            CMT: "",
            PID: ""
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
            console.log(response)
        });
    }
    postData(url){
        let config = this.getConfigToken();
        axios.get(url, config)
        .then((response) => {
            this.setState({
                data: response.data
            })
            console.log(response)
        });
    }
    handleInsert(){
        let url = "https://localhost:5001/api/v1/Rooms";
        this.postData(url);
    }
    handleFormCMTChange(value){
        if(value){
            this.setState({CMT: value});
        }
    }
    handleFormMaDVChange(value){
        if(value){
            this.setState({PID: value});
        }
    }
    componentDidMount(url = "https://localhost:5001/api/v1/Rooms?PageIndex=1&RowPerPage=500"){
        this.getData(url);
    }
    renderData(){
        return this.state.data.map(item => {
            return(
                <option value={item.pid}>
                    {item.maPhong}
                </option>
            );
        });
    }
    render(){
        if(this.props.display === false) return null;
        if(this.state.showFormCreate === false){
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
                                Thuê/đặt phòng
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
        return(
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Thuê/Đặt phòng</h5>
                    <form>
                        {/* Nhập số CMT */}
                        <div className="row mb-3">
                            <label htmlFor="CMT" className="col-sm-2 col-form-label">Số CMT</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    // value={this.props.CMT}
                                    onChange={(e) =>
                                        this.handleFormCMTChange(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {/* Chọn mã phòng */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Chọn phòng</label>
                            <div className="col-sm-10">
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    // value={this.props.MaDV}
                                    onChange={(e) =>
                                        this.handleFormMaDVChange(e.target.value)
                                    }
                                >
                                    <option value={null} selected>
                                        Chọn phòng
                                    </option>
                                    {this.renderData()}
                                </select>
                            </div>
                        </div>

                        {/* Nhập thời gian bắt đầu thuê */}
                        <div className="row mb-3">
                            <label htmlFor="ThoiGianBD" className="col-sm-2 col-form-label">Thời gian bắt đầu thuê</label>
                            <div className="col-sm-10">
                                <input
                                    type="date"
                                    className="form-control"
                                    // value={this.props.ThoiGianGoi}
                                    onChange={(e) =>
                                        this.handleFormThoiGianGoiChange(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {/* Nhập thời gian trả phòng */}
                        <div className="row mb-3">
                            <label htmlFor="ThoiGianKT" className="col-sm-2 col-form-label">Thời gian trả phòng</label>
                            <div className="col-sm-10">
                                <input
                                    type="date"
                                    className="form-control"
                                    // value={this.props.ThoiGianGoi}
                                    // onChange={(event) =>
                                    //     this.handleFormThoiGianGoiChange(event.target.value)
                                    // }
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
                                Thuê/Đặt
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
export default ListOrderRoom