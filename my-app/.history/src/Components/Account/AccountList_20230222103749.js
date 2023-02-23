import React, { Component } from "react";

class AccountList extends Component {
    render() {
        if (this.props.showListAccount === false) return null;
        return (
            <div className="container">
                <div className="toolbar" id="toolbar">
                    <div className="section1">
                        <h1 className="title_content">Danh sách tài khoản</h1>
                        <div className="buttons">
                            <button className="add_button ms-btn" commandtype="add"
                                onClick={() => this.props.renderFormAccount()}
                            >
                                <i className="fas fa-user-plus add_icon" />
                                Thêm tài khoản
                            </button>
                        </div>
                    </div>
                    <div className="section2 flex_center" id="show_option">
                        <div className="show_options flex_center"></div>
                        <div className="flex_center">
                        </div>
                    </div>
                </div>
                <div className="section" id="TKID" toolbar="toolbar" show_option="show_option">
                    <table class="layout display responsive-table">
                        <thead>
                            <tr>
                                <th>Họ tên</th>
                                <th>Số điện thoại</th>
                                <th>Tên đăng nhập</th>
                                <th>Role</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>{this.props.renderAccount()}</tbody>
                    </table>
                </div>
            </div>
        )
    }

}

export default AccountList;