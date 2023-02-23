import React, { Component } from "react";

class Guest extends Component{

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
                            <input type="text" className="search_input ms-input" option_name="Search" placeholder="Tìm kiếm theo Tên khách hàng" />
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
                        <div className="refresh flex_center" commandtype="refresh">
                            <div className="refresh_icon" />
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="section3 tables" id="employeegrid" toolbar="toolbar" show_option="show_option">
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
                                {this.props.getItem()}
                                {this.props.renderItem()}
                            </tbody>
                        </table>
                    </div>
                    <div className="collab flex_center" id="colab_table">
                    <span>Hiển thị <span style={{fontWeight: 'bold'}} className="count_datatable">01-50/500</span> lao động</span>
                    <div className="page_navigate">
                        <i className="fas fa-angle-double-left navigate_icon prev_all" />
                        <i className="fas fa-angle-left navigate_icon prev" />
                        <ul className="pagging flex_center">
                        <li className="pagging_number active" value={0}>1</li>
                        <li className="pagging_number" value={1}>2</li>
                        <li className="pagging_number" value={2}>3</li>
                        <li className="pagging_number" value={3}>4</li>
                        <li className="pagging_number" value={4}>5</li>
                        </ul>
                        <i className="fas fa-angle-right navigate_icon next" />
                        <i className="fas fa-angle-double-right navigate_icon next_all" />
                    </div>
                    <span className="count_rows count_datatable">50 khách hàng/trang</span>
                    </div>
                </div>
        );
    }
}
export default Guest;