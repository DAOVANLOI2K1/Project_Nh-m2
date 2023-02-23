import React, { Component } from "react";

class ServiceList extends Component {
    render() {
        const styleForContainer = {
            width: 1200,
        }
        if (this.props.showListService === false ) return null;
        return (
            <div className="container" style={styleForContainer} >
                <h1 className="title_content">Danh sách dịch vụ</h1>
                <div className="search_option">
                    <input
                        type="text"
                        className="search_input ms-input"
                        option_name="Search"
                        placeholder="Tìm kiếm theo tên dịch vụ"
                        onChange={(e) => {
                            this.props.handleSearch("?search=" + e.target.value);
                        }}
                    />
                    <i className="fas fa-search search_icon search_icon" />
                    <button
                        className="add_button ms-btn"
                        commandtype="add"
                        onClick={() => this.props.turnOnServiceForm()}
                    >
                        Thêm dịch vụ
                    </button>
                </div>
                {/* end search bar */}

                <div >
                <table className="table table-bordered" id="serviceGrid">
                    <thead className="thead-dark">
                        <tr>
                            <th style={{ width: "10%" }} className="text-center">
                                STT
                            </th>
                            <th>Tên dịch vụ</th>
                            <th>Giá tiền</th>
                            <th>Hoạt động</th>
                            <th>Đơn vị</th>
                            <th style={{ width: "15%" }}>Mô tả</th>
                            <th style={{ width: "10%" }}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>{this.props.renderService()}</tbody>
                </table>
                </div>
                <div>
        </div>
            </div>
        )
    }
}

export default ServiceList;