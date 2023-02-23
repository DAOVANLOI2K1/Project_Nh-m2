import React, { Component } from "react";
import axios from "axios";
import $, {data, get} from "jquery";
import Pagination from "react-js-pagination";
import Swal from "sweetalert2";

class Guest extends Component{
    constructor(props){
        super(props)
        this.state = {
            "data": [],
            "defaultUrl": "https://localhost:5001/api/v1/Guests",
            "search": "",
            "pagenumber": 1,
            "rowsofpage": 10,
            "remainingRows": 10,
            "total": 50,
            "activePage": 1,
            "totalItemPageCount": 50,
            "showFormUpdate": false
        }
    }
    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
        $("#GuestGrid").find("tr.active").removeClass("active");
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
            this.componentDidMount(url, search, number);
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
    getData(url){
        let config = this.getConfigToken();
        axios.get(url, config)
        .then((response) => {
            this.setState({
                data: response.data
            });
        });
    }
    getTotalData(search, number){
        let url = this.state.defaultUrl + "?pagenumber=1&rowsofpage=-1";
        if(search)
        {
            url += "&search=" + search;
        }
        let config = this.getConfigToken();
        axios.get(url, config)
        .then((response) => {
            let totalCeil = Math.ceil((response.data.length)/(this.state.rowsofpage));
            let totalFloor = Math.floor((response.data.length)/(this.state.rowsofpage));
            this.setState({
                total: response.data.length,
                totalItemPageCount: totalCeil,
            });
            // set Số lượng khách hàng trên từng trang hiện trên màn hình hiện tại
            let remainingRows = this.state.rowsofpage;
            if(number > totalFloor){
                remainingRows = (response.data.length) - totalFloor * (this.state.rowsofpage);
            }
            this.setState({
                remainingRows: remainingRows
            });
        });
    }
    componentDidMount = (url = this.state.defaultUrl + "?pagenumber=1&rowsofpage=" + this.state.rowsofpage, search = "", number = 1) => {
        this.getData(url);
        this.getTotalData(search, number);
      }
      // Format ngày tháng
    formatDateDisplay = dateSrc => {
        let date = new Date(dateSrc),
            year = date.getFullYear().toString(),
            month = (date.getMonth() + 1).toString().padStart(2, '0'),
            day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
    handleSelectRow(target){
        $("#GuestGrid").find("tr.active").removeClass("active");
        $(target).closest("tr").toggleClass("active");
    }
    deleteGuest(url){
        let config = this.getConfigToken();
        axios.delete(url, config)
        .then((response) => {
            url = this.state.defaultUrl + "?pagenumber=" + this.state.activePage + "&rowsofpage=" + this.state.rowsofpage; 
            if($(".search-input").val()){
                url += "&search=" + $(".search-input").val();
            }
            this.componentDidMount(url, $(".search-input").val(), this.state.activePage);
        });
    }
    handleDelete(){
        let khid = $("#GuestGrid").find("tr.active").attr("value"); 
        let url = this.state.defaultUrl + "/" + khid;
        return (
            <div>
                {Swal.fire({
                    title: 'Do you want to save the changes?',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                    denyButtonText: `Don't save`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                    Swal.fire('Saved!', '', 'success')
                    this.deleteGuest(url);
                    } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                    $("#GuestGrid").find("tr.active").removeClass("active");
                    } else{
                        $("#GuestGrid").find("tr.active").removeClass("active");
                    }
                })}
            </div>
        );
    }
    renderItem(){
        return this.state.data.map((item) => {
            return(
                <tr value={item.khid} onClick={(e) => this.handleSelectRow(e.target)}>
                    <td>{item.maKH}</td>
                    <td>{item.hoTen}</td>
                    <td>{item.cmt}</td>
                    <td>{item.gioiTinh}</td>
                    <td>{item.sdt}</td>
                    <td>{item.diaChi}</td>
                    <td>{item.ghiChu}</td>
                    <td>{this.formatDateDisplay(item.ngaySinh)}</td>
                </tr>
            );
        });
      }
    handleRefresh(){
        $(".search_input").val("");
        this.handlePageChange(1, "");
    }
    renderTable(){
        return(
        <div>
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
                        <table id="GuestGrid">
                            {this.props.renderthead()}
                            <tbody>
                                {this.renderItem()}
                            </tbody>
                        </table>
                    </div>
                    <div className="collab flex_center" id="colab_table">
                    <span>Hiển thị <span style={{fontWeight: 'bold'}} className="count_datatable">01-{this.state.remainingRows}/{this.state.total}</span> khách hàng</span>
                    <div className="page_navigate">
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
    selectGender(gender){
        if(gender === "Nam"){
            return(
                <select className="select_option form_input" id="gioiTinh">
                <option value="Nam" selected>Nam</option>
                <option value="Nữ">Nữ</option>
                </select>
            );
        }
        else{
            return(
                <select className="select_option form_input" id="gioiTinh">
                <option value="Nam">Nam</option>
                <option value="Nữ" selected>Nữ</option>
                </select>
            );
        }
    }
    handleFormUpdate(){
        let itemActive = $("#GuestGrid").find("tr.active");
        if(this.state.showFormUpdate === true && itemActive.length !== 0){
            let childsItem = $("#GuestGrid").find("tr.active td");
            let guest = {
                khid: itemActive.attr("value"),
                maKH: childsItem[0].innerText,
                hoTen: childsItem[1].innerText,
                cmt: childsItem[2].innerText,
                gioiTinh: childsItem[3].innerText,
                sdt: childsItem[4].innerText,
                diaChi: childsItem[5].innerText,
                ghiChu: childsItem[6].innerText,
                ngaySinh: childsItem[7].innerText
            }
            $("#toolbar").hide();
            return this.renderFormUpdate(guest);
        }
        $("#toolbar").show();
        return this.renderTable();
        
    }
    updateGuest(guest){
        let config = this.getConfigToken();
        let url = this.state.defaultUrl;
        axios.put(url, guest, config)
        .then((response) => {
            url += "?pagenumber=" + this.state.activePage + "&rowsofpage=" + this.state.rowsofpage; 
            if($(".search-input").val()){
                url += "&search=" + $(".search-input").val();
            }
            this.componentDidMount(url, $(".search-input").val(), this.state.activePage);
        });
    }
    handleUpdate(guest){
        $.find(".form_input").map(item => {
            if($(item).val() !== ""){
                // guest[item.id] = $(item).val();
                // console.log($(item).val());
            }
            console.log($(item));
        });
        // this.updateGuest(guest);
        // this.setState({showFormUpdate: false});
    }
    renderFormUpdate(guest){
        return(
            <div className="container">
                <div className="form">
                <div className="form_closeicon flex_center" onClick={() => this.setState({showFormUpdate: false})}>
                    <i className="fas fa-times form_icon" />
                </div>
                <div className="form_header">
                    <div className="form_header-title">
                    <h1 className="name">Thông tin khách hàng</h1>
                    </div>
                </div>
                <div className="form_content">
                    <div className="form_content-right">
                    <div className="common_infor">
                        <div className="infor-title">
                        <h1 className="name">A. Thông tin chung:</h1>
                        </div>
                        <div className="infor_form">
                        <div className="infor_form-left">
                            <label htmlFor>Mã khách hàng (<span style={{color: '#ff4747'}}>*</span>)</label>
                            <input type="text" className="ms-input form_input" id="maKH" placeholder="Mã khách hàng"/>
                            <label htmlFor=".select_option">Giới tính</label>
                            {this.selectGender(guest.gioiTinh)}
                            <label htmlFor>Số điện thoại (<span style={{color: '#ff4747'}}>*</span>)</label>
                            <input type="text" className="ms-input form_input" id="sdt" placeholder="Số điện thoại"/>
                            <label htmlFor>Địa chỉ</label>
                            <input type="Address" className="ms-input form_input" id="diaChi" placeholder="Địa chỉ"/>
                        </div>
                        <div className="infor_form-right">
                            <label htmlFor>Họ và tên (<span style={{color: '#ff4747'}}>*</span>)</label>
                            <input type="text" className="ms-input form_input" id="hoTen" placeholder="Họ và tên"/>
                            <label htmlFor>Ngày sinh</label>
                            <input type="date" className="ms-input form_input" id="ngaySinh" placeholder="Ngày sinh"/>
                            <label htmlFor>CMT (<span style={{color: '#ff4747'}}>*</span>)</label>
                            <input type="CMT" className="ms-input form_input" id="cmt" placeholder="Chứng minh thư"/>
                        </div>
                        </div>
                    </div>
                    <div className="work_infor">
                        <div className="infor-title">
                        <h1 className="name">A. Thông tin Thêm:</h1>
                        </div>
                        <div className="infor_form">
                        <div className="infor_form-left">
                            <label htmlFor>Người sửa</label>
                            <input type="Text" className="ms-input form_input" id="modifiedBy" placeholder="Tên người sửa"/>                             
                        </div>
                        <div className="infor_form-right">
                        <label htmlFor>Ghi chú</label>
                        <textarea type="Text" className="ms-input form_input" id="ghiChu" placeholder="Điền ghi chú của bạn vào đây!"/>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="form_footer flex_center">
                    <button className="ms-btn cancel_btn" onClick={() => this.setState({showFormUpdate: false})}>Hủy</button>
                    <button className="ms-btn ms-btn_icon" onClick={(e) => this.handleUpdate(guest)}><i className="far fa-save icon"/>Lưu</button>
                </div>
                </div>
            </div>
        );
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
                            Thuê phòng
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
                        <div className="delete flex_center" commandtype="delete" onClick={(e) => this.handleDelete()}>
                            <div className="delete_icon">
                            <i className="fas fa-trash" />
                            </div>
                        </div>
                        <div className="update flex_center" commandtype="update" onClick={(e) => this.setState({showFormUpdate: true})}>
                            <div className="update_icon">
                            <i class="fa-solid fa-pen-to-square"></i>
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
                    {this.handleFormUpdate()}
            </div>
        );
    }
}
export default Guest;