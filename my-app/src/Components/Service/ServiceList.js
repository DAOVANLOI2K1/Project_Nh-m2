import React, { Component } from "react";

class ServiceList extends Component {
    render() {
        if (this.props.showListService === false) return null;
        return (
<<<<<<< HEAD
            <div className="container" style={styleForContainer} >
                <div className="section1 flex_center">
                    <h1 className="title_content">Danh sách dịch vụ</h1>
                    <button
                            className="add_button ms-btn" id="add_button-service"
                            commandtype="add"
                            onClick={() => this.props.turnOnServiceForm()}
                        >
                            Thêm dịch vụ
                    </button>
                </div>
=======
            <div className="container" >
                <h1 className="title_content">Danh sách dịch vụ</h1>
>>>>>>> loihoangkim
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
                    <i className="fas fa-search search_icon service" />
                </div>
                {/* end search bar */}

                <div>
                    <table className="table table-bordered" id="serviceGrid">
                        <thead className="thead-dark">
                            <tr>
                                <th className="text-center" style={{width:'50px'}}>
                                    STT
                                </th>
                                <th style={{width:'200px'}}>Tên dịch vụ</th>
                                <th style={{width:'100px'}}>Giá tiền</th>
                                <th style={{width:'100px'}}>Hoạt động</th>
                                <th style={{width:'100px'}}>Đơn vị</th>
                                <th style={{width:'100px'}}>Mô tả</th>
                                <th >Thao tác</th>
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