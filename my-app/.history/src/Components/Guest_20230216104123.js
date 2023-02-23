import React, { Component } from "react";
import axios from "axios";
import $, {data, get} from "jquery";
import Pagination from "react-js-pagination";

class Guest extends Component{
    constructor(props){
        super(props)
        this.state = {
            "data": [],
            "defaultUrl": "https://localhost:5001/api/v1/Guests",
            "search": "",
            "pagenumber": 1,
            "rowsofpage": 10,
            "total": 50,
            "activePage": 1,
            "totalItemPageCount": 50
        }
    }
    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
        this.handlePaging(pageNumber, $(".search_input").val())
    }
    handlePaging(number, search){
        // let number = $(".page_navigate .active").attr("value");
        if(number !== null){
            let url = this.state.defaultUrl + "?pagenumber=" + number + 
            "&rowsofpage=" + this.state.rowsofpage;
            if(search !== ""){
                url += "&search=" + search;
            }
            this.componentDidMount(url, search);
        }
    }
    getData(url){
        axios.get(url)
        .then((response) => {
            this.setState({
                data: response.data
            });
        });
    }
    getTotalData(search){
        let url = this.state.defaultUrl + "?pagenumber=1&rowsofpage=-1";
        if(search)
        {
            url += "&search=" + search;
        }
        axios.get(url)
        .then((response) => {
            this.setState({
                total: response.data.length,
                totalItemPageCount: Math.ceil((response.data.length)/(this.state.rowsofpage))
            });
        });
    }
    componentDidMount = (url = this.state.defaultUrl + "?pagenumber=1&rowsofpage=" + this.state.rowsofpage, search = "") => {
        this.getData(url);
        this.getTotalData(search);
      }
      // Format ngày tháng
    formatDate = dateSrc => {
        let date = new Date(dateSrc),
            year = date.getFullYear().toString(),
            month = (date.getMonth() + 1).toString().padStart(2, '0'),
            day = date.getDate().toString().padStart(2, '0');

        return `${day}-${month}-${year}`;
    }
    renderItem(){
        return this.state.data.map((item) => {
            return(
                <tr>
                    <td>{item.maKH}</td>
                    <td>{item.hoTen}</td>
                    <td>{item.cmt}</td>
                    <td>{item.gioiTinh}</td>
                    <td>{item.sdt}</td>
                    <td>{item.diaChi}</td>
                    <td>{item.ghiChu}</td>
                    <td>{this.formatDate(item.ngaySinh)}</td>
                </tr>
            );
        });
      }
    handleRefresh(){
        $(".search_input").val("");
        this.handlePageChange(1, "");
    }
    render(){
        return(
                <div className="page_right-content">
                    <div className="toolbar" id="toolbar">
                    <div className="section1 flex_center">
                        <h1 className="title_content">Danh sách khách hàng</h1>
                        <div className="buttons">
                        <button className="add_button ms-btn" commandtype="add" onClick={() => this.props.getColumnConfig()}>
                            <i className="fas fa-user-plus add_icon" />
                            Thêm khách hàng
                        </button>
                        </div>
                    </div>
                    <div className="section2 flex_center" id="show_option">
                        <div className="show_options flex_center">
                        <div className="search_option">
                            <input type="text" className="search_input ms-input" option_name="Search" placeholder="Tìm kiếm theo Tên khách hàng" onChange={(e) => {
                                this.handlePaging(this.state.activePage, e.target.value)}} />
                            <i className="fas fa-search search_icon search_icon" />
                        </div>
                        {/* <select className="department_option" option_name="Department" />
                        <select className="position_option" option_name="Position" /> */}
                        </div>
                        <div className="flex_center">
                        <div className="delete flex_center" commandtype="delete">
                            <div className="delete_icon">
                            <i className="fas fa-trash" />
                            </div>
                        </div>
                        <div className="replication flex_center" commandtype="replication">
                            <div className="replication_icon">
                            <i className="fas fa-copy" />
                            </div>
                        </div>
                        <div className="refresh flex_center" commandtype="refresh" onClick={() => this.handleRefresh()}>
                            <div className="refresh_icon">
                            <i class="fa-solid fa-arrows-rotate"></i>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="section3 tables" id="guestgrid" toolbar="toolbar" show_option="show_option">
                        <div className="table" style={{display: 'none'}}>
                            <div className="col" fieldname="employeeID" datatype="guid">ID</div>
                            <div className="col" fieldname="employeeCode">Mã nhân viên</div>
                            <div className="col" fieldname="employeeName">Họ và tên</div>
                            <div className="col" fieldname="gender" datatype="enum">Giới tính</div>
                            <div className="col" fieldname="dateOfBirth" datatype="date">Ngày sinh</div>
                            <div className="col" fieldname="phoneNumber">Điện thoại</div>
                            <div className="col" fieldname="email">Email</div>
                            <div className="col" fieldname="positionName">Chức vụ</div>
                            <div className="col" fieldname="departmentName">Phòng ban</div>
                            <div className="col" fieldname="salary" datatype="money">Lương cơ bản</div>
                            <div className="col" fieldname="workStatus" datatype="enum">Tình trạng công việc</div>
                        </div>
                        <table>
                            {this.props.renderthead()}
                            <tbody>
                                {this.renderItem()}
                            </tbody>
                        </table>
                    </div>
                    <div className="collab flex_center" id="colab_table">
                    <span>Hiển thị <span style={{fontWeight: 'bold'}} className="count_datatable">01-{this.state.rowsofpage}/{this.state.total}</span> khách hàng</span>
                    <div className="page_navigate">
                        {/* <i className="fas fa-angle-double-left navigate_icon prev_all" />
                        <i className="fas fa-angle-left navigate_icon prev" /> */}
                        {/* <ul className="pagging flex_center">
                        <li className="pagging_number active" value={0}
                        onClick = {(e) => {
                        this.initEventPaging(e.target);
                        this.handle(e.target.value, $(".search_input").val())}}>1</li>
                        <li className="pagging_number" value={1}
                        onClick = {(e) => {
                        this.initEventPaging(e.target)
                        this.handle(e.target.value, $(".search_input").val())}}>2</li>
                        <li className="pagging_number" value={2}
                        onClick = {(e) => {
                        this.initEventPaging(e.target)
                        this.handle(e.target.value, $(".search_input").val())}}>3</li>
                        <li className="pagging_number" value={3}
                        onClick = {(e) => {
                        this.initEventPaging(e.target)
                        this.handle(e.target.value, $(".search_input").val())}}>4</li>
                        <li className="pagging_number" value={4}
                        onClick = {(e) => {
                        this.initEventPaging(e.target)
                        this.handle(e.target.value, $(".search_input").val())}}>5</li>
                        </ul> */}
                        {/* <i className="fas fa-angle-right navigate_icon next" />
                        <i className="fas fa-angle-double-right navigate_icon next_all" /> */}
                        <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={10}
                        totalItemsCount={this.state.totalItemPageCount * 10}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)}
                        />
                    </div>
                    <span className="count_rows count_datatable">{this.state.rowsofpage} khách hàng/trang</span>
                    </div>
                </div>
        );
    }
}
export default Guest;