import React, {Component} from "react";

class FormGuest extends Component{
    render(){
        return(
            <div className="container flex_center">
                <div className="form">
                <div className="form_closeicon flex_center">
                    <i className="fas fa-times form_icon" />
                </div>
                <div className="form_header">
                    <div className="form_header-title">
                    <h1 className="name">Thông tin nhân viên</h1>
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
                            <label htmlFor>Mã nhân viên (<span style={{color: '#ff4747'}}>*</span>)</label>
                            <input type="text" className="ms-input form_input" placeholder="Mã nhân viên" />
                            <label htmlFor>Giới tính</label>
                            <select className="select_option">
                            <option value="Male" selected>Nam</option>
                            <option value="Female">Nữ</option>
                            <option value="Unknown">Khác</option>
                            </select>
                            <label htmlFor>Số điện thoại (<span style={{color: '#ff4747'}}>*</span>)</label>
                            <input type="number" className="ms-input form_input" placeholder="Số điện thoại" />
                        </div>
                        <div className="infor_form-right">
                            <label htmlFor>Họ và tên (<span style={{color: '#ff4747'}}>*</span>)</label>
                            <input type="text" className="ms-input form_input" placeholder="Họ và tên" />
                            <label htmlFor>Ngày sinh</label>
                            <input type="date" className="ms-input form_input" placeholder="Ngày sinh" />
                            <label htmlFor>Email (<span style={{color: '#ff4747'}}>*</span>)</label>
                            <input type="email" className="ms-input form_input" placeholder="Email" />
                        </div>
                        </div>
                    </div>
                    <div className="work_infor">
                        <div className="infor-title">
                        <h1 className="name">A. Thông tin công việc:</h1>
                        </div>
                        <div className="infor_form">
                        <div className="infor_form-left">
                            <label htmlFor>Chức vụ</label>
                            <select className="select_option">
                            <option value="General" selected>Giám đốc</option>
                            <option value="Employee">Nhân viên</option>
                            <option value="Other">Khác</option>
                            </select>
                            <label htmlFor>Lương cơ bản</label>
                            <input type="number" className="ms-input form_input" />                             
                        </div>
                        <div className="infor_form-right">
                            <label htmlFor>Phòng ban</label>
                            <select className="select_option">
                            <option value="Marketing" selected>Maketing</option>
                            <option value="Dev">Developer</option>
                            <option value="Other">Khác</option>
                            </select>
                            <label htmlFor>Tình trạng công việc</label>
                            <select className="select_option">
                            <option value="Trying_out" selected>Đang thử việc</option>
                            <option value="Working">Đang làm việc</option>
                            <option value="Has_retired">Đã nghỉ việc</option>
                            </select>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="form_footer flex_center">
                    <button className="ms-btn cancel_btn">Hủy</button>
                    <button className="ms-btn ms-btn_icon"><i className="far fa-save icon" />Lưu</button>
                </div>
                </div>
            </div>
        );
    }
}
export default FormGuest;