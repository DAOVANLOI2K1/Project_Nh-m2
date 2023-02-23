import React, {Component} from "react";
class ListOrderRoom extends Component{
    constructor(props){
        super(props);
        this.state = {
            showFormCreate: false
        }
    }
    render(){
        if(this.props.display === false) return null;
        else if(this.showFormCreate === false){
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
    }
}
export default ListOrderRoom