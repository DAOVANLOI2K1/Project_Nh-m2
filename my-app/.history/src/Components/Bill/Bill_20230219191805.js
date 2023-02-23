import React, { Component } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";


class Bill extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "data": [],
            pageNumber : 1,
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
    getData(url) {
        let config = this.getConfigToken();
        axios.get(url, config)
            .then((response) => {
                this.setState({
                    data: response.data
                })
            });
    }

     handlePageChange(pageNumber) {
         console.log(`active page is ${pageNumber}`);
         //this.setState({activePage: pageNumber});
       }

    handLeaging(pageNumber) {
        let url =
          "https://localhost:5001/api/v1/Bills?pageNumber="+pageNumber+"&pageSize=10";
          console.log(url);
        this.componentDidMount(url);
      }


    componentDidMount = (url = "https://localhost:5001/api/v1/Bills") => {
        this.getData(url);
    }

    renderItem() {
        return this.state.data.map((item) => {
            return (
                <tr>
                    <td>{item.IDDP}</td>
                    <td>{item.IDGoiDV}</td>
                    <td>{item.TongTien}</td>
                    <td>{item.GhiChu}</td>
                    <td>{item.KHID}</td>
                </tr>
            );
        });
    }

    renderthead() {
        return(
            <thead>
                <tr>
                    <th>ID đặt phòng</th>
                    <th>ID gọi dịch vụ</th>
                    <th>Tổng tiền</th>
                    <th>Ghi chú</th>
                    <th>ID khách hàng</th>
                </tr>
            </thead>
        );
    }

    render() {
        return (
            <div className="page_right-content">
                <div className="toolbar" id="toolbar">
                    <div className="section1 flex_center">
                        <h1 className="title_content">Danh sách hóa đơn</h1>
                    </div>
                    <button className="add_button ms-btn" commandtype="add" onClick={() => this.props.getColumnConfig()}>
                            <i className="fas fa-user-plus add_icon" />
                            Tạo hóa đơn
                        </button>
                </div>
                <div className="section3 tables" id="guestgrid" toolbar="toolbar" show_option="show_option">
                    <table>
                        {this.renderthead()}
                        <tbody>
                            {this.renderItem()}
                        </tbody>
                    </table>
                </div>
                <div>
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={10}
                        totalItemsCount={450}
                        pageRangeDisplayed={5}
                        onChange={this.handLeaging.bind(this)}
                    />
                </div>
            </div>
        );
    }
}
export default Bill;