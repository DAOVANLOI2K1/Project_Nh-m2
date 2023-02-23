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
            "showFormUpdate": false,
            "showFormCreate": false
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
    handleDelete(target){
        let khid = $(target).closest("tr").attr("value"); 
        let url = this.state.defaultUrl + "/" + khid;
        if(khid != null){
            return (
                <div>
                    {Swal.fire({
                        title: 'Bạn có chắc muốn xóa khách hàng này?',
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: 'Xóa',
                        denyButtonText: 'Hủy',
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                        Swal.fire('Deleted!', '', 'success')
                        this.deleteGuest(url);
                        } else if (result.isDenied) {
                        Swal.fire('Đã hủy xóa!', '', 'info')
                        $("#GuestGrid").find("tr.active").removeClass("active");
                        }
                    })}
                </div>
            );
        }
        return (
            Swal.fire("Bạn cần chọn khách hàng trước khi xóa!")
        );
    }
     // Hàm render tr chứa th
     renderthead() {
        return(
            <thead>
                <tr>
                    <th>Mã khách hàng</th>
                    <th>Tên khách hàng</th>
                    <th>Số CMT</th>
                    <th>Giới tính</th>
                    <th>Số Điện thoại</th>
                    <th>Địa chỉ</th>
                    <th style={{display: "none"}}>Ghi Chú</th>
                    <th>Ngày sinh</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
        );
    }
    renderItem(){
        return this.state.data.map((item) => {
            return(
                <tr value={item.khid}>
                    <td>{item.maKH}</td>
                    <td>{item.hoTen}</td>
                    <td>{item.cmt}</td>
                    <td>{item.gioiTinh}</td>
                    <td>{item.sdt}</td>
                    <td>{item.diaChi}</td>
                    <td style={{display: "none"}}>{item.ghiChu}</td>
                    <td>{this.formatDateDisplay(item.ngaySinh)}</td>
                    <td>
                        <div className="flex_center">
                            <div className="update" onClick={(e) => {this.handleForm(e.target)}}>
                                <i class="fa-solid fa-pen-to-square"></i>
                            </div>
                            <div onClick={(e) => this.handleDelete(e.target)}>
                                <i className="fas fa-trash delete_icon" />
                            </div>
                        </div>
                    </td>
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
                            {this.renderthead()}
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
    handleForm(target){
        if(target != null){
            if(this.state.showFormUpdate === true){
                let childsItem = $(target).closest("tr").find("td");
                let guest = {
                    khid: $(target).closest("tr").attr("value"),
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
            if(this.state.showFormCreate === true){
                $("#toolbar").hide();
                return this.renderFormCreate();
            }
        }
        $("#toolbar").show();
        return this.renderTable();
    }
    updateGuest(guest){
        let config = this.getConfigToken();
        let url = this.state.defaultUrl;
        axios.put(url, guest, config)
        .then((response) => {
            if(response){
                url += "?pagenumber=" + this.state.activePage + "&rowsofpage=" + this.state.rowsofpage; 
                if($(".search-input").val()){
                    url += "&search=" + $(".search-input").val();
                }
                this.componentDidMount(url, $(".search-input").val(), this.state.activePage);
            }

        });
    }
    createGuest(guest){
        let config = this.getConfigToken();
        let url = this.state.defaultUrl;
        axios.post(url, guest, config)
        .then((response) => {
            url += "?pagenumber=" + this.state.activePage + "&rowsofpage=" + this.state.rowsofpage; 
            if($(".search-input").val()){
                url += "&search=" + $(".search-input").val();
            }
            this.componentDidMount(url, $(".search-input").val(), this.state.activePage);
        });
    }
    validateFormUpdate(guest){
        let isValidate = true;
       // Thêm validate CMT
       let errorOfCMT = "";
       if (guest.cmt === "") {
           errorOfCMT = errorOfCMT + "Chứng minh thư không được bỏ trống!\n";
       }

       // Thêm validate SĐT
       let errorOfSDT = "";
       var numbersOnly = /^[0-9]+$/;
        if (!numbersOnly.test(guest.sdt)) {
            errorOfSDT += 'Số điện thoại chỉ chứa số';
        }
        if (guest.sdt.length > 20) {
            errorOfSDT = errorOfSDT + "Số điện thoại không vượt quá 20 ký tự!\n";
        }
       if (guest.sdt === "") {
           errorOfSDT = errorOfSDT + "Số điện thoại không được bỏ trống!\n";
       }
       var firstPhoneNumber = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if(!firstPhoneNumber.test(guest.sdt)){
            errorOfSDT += 'Đầu số không hợp lệ!';
        }

       // Thêm validate Họ Tên
       let errorOfHoTen = "";
       if (guest.hoTen > 100) {
        errorOfHoTen = errorOfHoTen + "Số điện thoại không được bỏ trống!\n";
        }
       if (guest.hoTen === "") {
           errorOfHoTen = errorOfHoTen + "Tên khách hàng không được bỏ trống!\n";
       }
       // Thêm validate Ngày sinh
       let errorOfNgaySinh = "";
       if (guest.ngaySinh === "") {
           errorOfNgaySinh = errorOfNgaySinh + "Ngày sinh không được bỏ trống!\n";
       }
       // Thêm validate Người tạo
       let errorOfModifiedBy = "";
       if (guest.modifiedBy === "") {
           errorOfModifiedBy = errorOfModifiedBy + "Tên người sửa không được bỏ trống!\n";
       }

       // Thêm hiện các dòng validate
       if (errorOfCMT || errorOfHoTen || errorOfSDT || errorOfNgaySinh || errorOfModifiedBy) {
           Swal.fire(
               'Cảnh báo\n\n Dữ liệu không hợp lệ',
               '',
               'error'
           )
           document.getElementById("errorOfCMT").innerHTML = typeof errorOfCMT === "undefined" ? "" : errorOfCMT;
           document.getElementById("errorOfHoTen").innerHTML = typeof errorOfHoTen === "undefined" ? "" : errorOfHoTen;
           document.getElementById("errorOfSDT").innerHTML = typeof errorOfSDT === "undefined" ? "" : errorOfSDT;
           document.getElementById("errorOfNgaySinh").innerHTML = typeof errorOfNgaySinh === "undefined" ? "" : errorOfNgaySinh;
           document.getElementById("errorOfModifiedBy").innerHTML = typeof errorOfModifiedBy === "undefined" ? "" : errorOfModifiedBy;
           isValidate = false;
       }
        return isValidate;
    }
    validateFormCreate(guest){
        let isValidate = true;
        // Thêm validate CMT
        let errorOfCMT = "";
        if (guest.cmt === "") {
            errorOfCMT = errorOfCMT + "Chứng minh thư không được bỏ trống!\n";
        }

        // Thêm validate MakH
        let errorOfMaKH = "";
        if (guest.maKH === "") {
            errorOfMaKH = errorOfMaKH + "Mã khách hàng không được bỏ trống!\n";
        }

        // Thêm validate SĐT
        let errorOfSDT = "";
        var numbersOnly = /^[0-9]+$/;
        if (!numbersOnly.test(guest.sdt)) {
            errorOfSDT += 'Số điện thoại chỉ chứa số';
        }
        if (guest.sdt === "") {
            errorOfSDT = errorOfSDT + "Số điện thoại không được bỏ trống!\n";
        }
        var firstPhoneNumber = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if(!firstPhoneNumber.test(guest.sdt)){
            errorOfSDT += 'Đầu số không hợp lệ!';
        }

        // Thêm validate Họ Tên
        let errorOfHoTen = "";
        if (guest.hoTen === "") {
            errorOfHoTen = errorOfHoTen + "Tên khách hàng không được bỏ trống!\n";
        }
        // Thêm validate Ngày sinh
        let errorOfNgaySinh = "";
        if (guest.ngaySinh === "") {
            errorOfNgaySinh = errorOfNgaySinh + "Ngày sinh không được bỏ trống!\n";
        }
        // Thêm validate Người tạo
        let errorOfCreateBy = "";
        if (guest.createBy === "") {
            errorOfCreateBy = errorOfCreateBy + "Tên người tạo không được bỏ trống!\n";
        }

        // Thêm hiện các dòng validate
        if (errorOfCMT || errorOfMaKH || errorOfHoTen || errorOfSDT || errorOfNgaySinh || errorOfCreateBy) {
            Swal.fire(
                'Cảnh báo\n\n Dữ liệu không hợp lệ',
                '',
                'error'
            )
            document.getElementById("errorOfCMT").innerHTML = typeof errorOfCMT === "undefined" ? "" : errorOfCMT;
            document.getElementById("errorOfMaKH").innerHTML = typeof errorOfMaKH === "undefined" ? "" : errorOfMaKH;
            document.getElementById("errorOfHoTen").innerHTML = typeof errorOfHoTen === "undefined" ? "" : errorOfHoTen;
            document.getElementById("errorOfSDT").innerHTML = typeof errorOfSDT === "undefined" ? "" : errorOfSDT;
            document.getElementById("errorOfNgaySinh").innerHTML = typeof errorOfNgaySinh === "undefined" ? "" : errorOfNgaySinh;
            document.getElementById("errorOfCreateBy").innerHTML = typeof errorOfCreateBy === "undefined" ? "" : errorOfCreateBy;
            isValidate = false;
        }
        return isValidate;
    }
    handleUpdate(guest){
        $.find(".form_input").map(item => {
            guest[item.id] = $(item).val();
        });
        if(this.validateFormUpdate(guest)){
            return (
                <div>
                    {Swal.fire({
                        title: 'Do you want to save the changes?',
                        showDenyButton: false,
                        showCancelButton: true,
                        confirmButtonText: 'Lưu',
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                        Swal.fire('Đã lưu!', '', 'success')
                        this.updateGuest(guest);
                        this.setState({showFormUpdate: false});
                        }else{
                            $("#GuestGrid").find("tr.active").removeClass("active");
                        }
                    })}
                </div>
            );
        }
    }
    handleCreate(){
        let guest = {};
        $.find(".form_input").map(item => {
            guest[item.id] = $(item).val();
        });
        if(this.validateFormCreate(guest)){
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
                        this.createGuest(guest);
                        this.setState({showFormCreate: false});
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
    }
    renderFormUpdate(guest){
        const errorLabel = {
            color: "red",
            padding: "10px",
        }
        let childsItem = $(target).closest("tr").find("td");
        let guest = {
            khid: $(target).closest("tr").attr("value"),
            maKH: childsItem[0].innerText,
            hoTen: childsItem[1].innerText,
            cmt: childsItem[2].innerText,
            gioiTinh: childsItem[3].innerText,
            sdt: childsItem[4].innerText,
            diaChi: childsItem[5].innerText,
            ghiChu: childsItem[6].innerText,
            ngaySinh: childsItem[7].innerText
        }
        return(
            <div className="container">
                <div className="form">
                {/* <div className="form_closeicon flex_center" onClick={() => this.setState({showFormUpdate: false})}>
                    <i className="fas fa-times form_icon" />
                </div> */}
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
                            {/* <label htmlFor>Mã khách hàng (<span style={{color: '#ff4747'}}>*</span>)</label>
                            <input type="text" className="ms-input form_input" id="maKH" placeholder="Mã khách hàng"/> */}
                            <label htmlFor>Họ và tên(<span style={{color: '#ff4747'}}>*</span>)</label>
                            <input type="text" className="ms-input form_input" id="hoTen" defaultValue={guest.hoTen}/>
                            {/* Thêm dòng validate Tên khách hàng */}
                            <label className="errorText" style={errorLabel} id="errorOfHoTen"></label>
                            <label htmlFor>Số điện thoại(<span style={{color: '#ff4747'}}>*</span>)</label>
                            <input type="text" className="ms-input form_input" id="sdt" defaultValue={guest.sdt}/>
                            {/* Thêm dòng validate số điên thoại */}
                            <label className="errorText" style={errorLabel} id="errorOfSDT"></label>
                            <label htmlFor>Địa chỉ</label>
                            <input type="Address" className="ms-input form_input" id="diaChi" defaultValue={guest.diaChi}/>

                        </div>
                        <div className="infor_form-right">
                            <label htmlFor=".select_option">Giới tính</label>
                            {this.selectGender(guest.gioiTinh)}
                            {/* Thêm dòng validate giới tính */}
                            <label className="errorText" style={errorLabel} id="errorOfGender"></label>
                            <label htmlFor>Ngày sinh(<span style={{color: '#ff4747'}}>*</span>)</label>
                            <input type="date" className="ms-input form_input" id="ngaySinh" defaultValue={guest.ngaySinh}/>
                            {/* Thêm dòng validate ngày sinh */}
                            <label className="errorText" style={errorLabel} id="errorOfNgaySinh"></label>
                            <label htmlFor>CMT(<span style={{color: '#ff4747'}}>*</span>)</label>
                            <input type="CMT" className="ms-input form_input" id="cmt" defaultValue={guest.cmt}/>
                            {/* Thêm dòng validate CMT */}
                            <label className="errorText" style={errorLabel} id="errorOfCMT"></label>
                        </div>
                        </div>
                    </div>
                    <div className="work_infor">
                        <div className="infor-title">
                        <h1 className="name">A. Thông tin Thêm:</h1>
                        </div>
                        <div className="infor_form">
                        <div className="infor_form-left">
                            <label htmlFor>Người sửa  (<span style={{color: '#ff4747'}}>*</span>)</label>
                            <input type="Text" className="ms-input form_input" id="modifiedBy" placeholder="Tên người sửa" defaultValue={localStorage.getItem("EmployeeName")}
                            onChange={(e) => $(e.target).removeClass("required")}/>
                            {/* Thêm dòng validate người sửa */}
                           <label className="errorText" style={errorLabel} id="errorOfModifiedBy"></label>                           
                        </div>
                        <div className="infor_form-right">
                        <label htmlFor>Ghi chú</label>
                        <textarea type="Text" className="ms-input form_input" id="ghiChu" defaultValue={guest.ghiChu}/>
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
    renderFormCreate(){
        const errorLabel = {
            color: "red",
            padding: "10px",
        }
        return(
            <div className="container">
                <div className="form">
                {/* <div className="form_closeicon flex_center" onClick={() => this.setState({showFormCreate: false})}>
                    <i className="fas fa-times form_icon" />
                </div> */}
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
                            {/* Thêm dòng validate Mã khách hàng */}
                            <label className="errorText" style={errorLabel} id="errorOfMaKH"></label>
                            <label htmlFor=".select_option" >Giới tính(<span style={{color: '#ff4747'}}>*</span>)</label>
                            <select className="select_option form_input" id="gioiTinh">
                            <option value="Nam" selected>Nam</option>
                            <option value="Nữ">Nữ</option>
                            </select>
                            {/* Thêm dòng validate giới tính */}
                            <label className="errorText" style={errorLabel} id="errorOfGender"></label>
                            <label htmlFor>Số điện thoại(<span style={{color: '#ff4747'}}>*</span>)</label>
                            <input type="text" className="ms-input form_input" id="sdt" placeholder="Số điện thoại"/>
                            {/* Thêm dòng validate số điên thoại */}
                                <label className="errorText" style={errorLabel} id="errorOfSDT"></label>
                            <label htmlFor>Địa chỉ</label>
                            <input type="Address" className="ms-input form_input" id="diaChi" placeholder="Địa chỉ"/>
                            {/* Thêm dòng validate Address */}
                            <label className="errorText" style={errorLabel} id="errorOfAddress"></label>
                        </div>
                        <div className="infor_form-right">
                            <label htmlFor>Họ và tên(<span style={{color: '#ff4747'}}>*</span>)</label>
                            <input type="text" className="ms-input form_input" id="hoTen" placeholder="Họ tên khách hàng"/>
                            {/* Thêm dòng validate Tên khách hàng */}
                            <label className="errorText" style={errorLabel} id="errorOfHoTen"></label>
                            <label htmlFor>Ngày sinh(<span style={{color: '#ff4747'}}>*</span>)</label>
                            <input type="date" className="ms-input form_input" id="ngaySinh"/>
                            {/* Thêm dòng validate ngày sinh */}
                            <label className="errorText" style={errorLabel} id="errorOfNgaySinh"></label>
                            <label htmlFor>CMT(<span style={{color: '#ff4747'}}>*</span>)</label>
                            <input type="CMT" className="ms-input form_input" id="cmt" placeholder="Số chứng minh thư"/>
                            {/* Thêm dòng validate CMT */}
                            <label className="errorText" style={errorLabel} id="errorOfCMT"></label>
                        </div>
                        </div>
                    </div>
                    <div className="work_infor">
                        <div className="infor-title">
                        <h1 className="name">A. Thông tin Thêm:</h1>
                        </div>
                        <div className="infor_form">
                        <div className="infor_form-left">
                            <label htmlFor>Người tạo  (<span style={{color: '#ff4747'}}>*</span>)</label>
                            <input type="Text" className="ms-input form_input" id="createBy" placeholder="Tên người tạo" defaultValue={localStorage.getItem("EmployeeName")}
                            onChange={(e) => $(e.target).removeClass("required")}/>
                           {/* Thêm dòng validate người tạo */}
                           <label className="errorText" style={errorLabel} id="errorOfCreateBy"></label>
                        </div>
                        <div className="infor_form-right">
                        <label htmlFor>Ghi chú</label>
                        <textarea type="Text" className="ms-input form_input" id="ghiChu" placeholder="Ghi chú"/>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="form_footer flex_center">
                    <button className="ms-btn cancel_btn" onClick={() => this.setState({showFormCreate: false})}>Hủy</button>
                    <button className="ms-btn ms-btn_icon" onClick={(e) => this.handleCreate()}><i className="far fa-save icon"/>Lưu</button>
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
                        <button className="add_button ms-btn" commandtype="add" onClick={() => this.setState({showFormCreate: true})}>
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
                        {/* <div className="delete flex_center" commandtype="delete" onClick={(e) => this.handleDelete()}>
                            <div className="delete_icon">
                            <i className="fas fa-trash" />
                            </div>
                        </div> */}
                        {/* <div className="update flex_center" commandtype="update" onClick={(e) => {this.setState({showFormUpdate: true});
                    this.handleUpdateIcon()}}> */}
                            {/* <div className="update_icon">
                            <i class="fa-solid fa-pen-to-square"></i>
                            </div>
                        </div> */}
                        <div className="refresh flex_center" commandtype="refresh" onClick={() => this.handleRefresh()}>
                            <div className="refresh_icon">
                            <i class="fa-solid fa-arrows-rotate"></i>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                    {this.renderTable()}
            </div>
        );
    }
}
export default Guest;