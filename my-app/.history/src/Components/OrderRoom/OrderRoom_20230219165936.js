import React, { Component } from "react";
import axios from "axios";
import OrderRoomUpdatetForm from "./OrderRoomUpdateForm";
import ListOrderRoom from "./ListOrderRoom";
import Swal from "sweetalert2";
class OrderRoom extends Component{
    constructor(props){
        super(props);
        this.state={
            data: [],
            ShowForm: false,
            AddShowForm: false,
            display: true,

            ngayBatDau: '',
            ngayKetThuc: '',
            giaTien: 0,
            isDelete: '',
            tenPhong: '',
            hoTen: '',
            // for update
            iddp: "",
        }
    }
    handleFormiddpChange = (value) =>{
        this.setState({
            iddp:value
        })
    }
    handleFormTenPhongChange = (value) =>{
        this.setState({
            tenPhong:value
        })
    }
    handleFormHoTenChange = (value) =>{
        this.setState({
            hoTen:value
        })
    }
    handleFormNgayBDChange = (value) =>{
        this.setState({
            ngayBatDau:value
        })
    }
    handleFormNgayKTChange = (value) =>{
        this.setState({
            ngayKetThuc:value
        })
    }
    handleFormGiaChange = (value) =>{
        this.setState({
            giaTien:value
        })
    }
    handleFormisDeleteChange = (value) =>{
        this.setState({
            isDelete:value
        })
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
    //get api
    getData(url){
        let config = this.getConfigToken();
        axios.get(url, config)
        .then((response) => {
            this.setState({
                data: response.data
            })
        });
    }
    componentDidMount = (url = "https://localhost:5001/api/v1/OrderRooms?PageIndex=1&RowPerPage=500") => {
        this.getData(url);
    }
    // Format ngày tháng
    formatDate = dateSrc => {
        let date = new Date(dateSrc),
            year = date.getFullYear().toString(),
            month = (date.getMonth() + 1).toString().padStart(2, '0'),
            day = date.getDate().toString().padStart(2, '0');

        return `${day}/${month}/${year}`;
    }
    // HTTP PUT 
    OrderRoomUpdateShowForm = (OrderRoom) => {
        this.setState({
        iddp: OrderRoom.iddp,
        tenPhong: OrderRoom.tenPhong,
        hoTen: OrderRoom.hoTen,
        ngayBatDau: OrderRoom.ngayBatDau,
        ngayKetThuc: OrderRoom.ngayKetThuc,
        giaTien: OrderRoom.giaTien,
        isDelete: OrderRoom.isDelete,
        ShowForm: !this.state.ShowForm,
        display: !this.state.display
        });
    };

    OrderRoomUpdateCloseForm = () => {
        this.setState({
            ShowForm: !this.state.ShowForm,
            display: !this.state.display
        })
    }

    putData = (iddp) => {
        var url = "https://localhost:5001/api/v1/OrderRooms";
        let config = this.getConfigToken();
        cons
        axios.put(url, {
            iddp: iddp,
            giaTien: this.state.giaTien,
            ngayBatDau: this.state.ngayBatDau,
            ngayKetThuc: this.state.ngayKetThuc,
            isDelete: this.state.isDelete,
        }, config)
        .then(response => {
            if(this.state.giaTien<=0 || !this.state.giaTien){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Giá không hợp lệ!',
                })
            }
            else {
                if (response.data) {
                    Swal.fire('Sửa thành công')
                    this.OrderRoomUpdateCloseForm()
                    this.componentDidMount();
                }
                else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Sửa thất bại!',
                })
                }
            }
            console.log(response);
            console.log(response.data);
        })
        .catch(error => {
            if (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Thông tin không hợp lệ!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
                console.log(error)
            }
        });
    };
    rederData =()=>{
        return this.state.data.map((item) => {
            return(
                <tr key={item.iddp}>
                    <td>{item.iddp}</td>
                    <td idp = {item.pid}>{item.tenPhong}</td>
                    <td khid = {item.khid}>{item.hoTen}</td>
                    <td>{this.formatDate(item.ngayBatDau)}</td>
                    <td>{this.formatDate(item.ngayKetThuc)}</td>
                    <td>{item.giaTien}</td>
                    <td>{item.isDelete}</td>
                    <td><button type="button" className="btn btn-warning btn-sm" onClick={() =>this.OrderRoomUpdateShowForm(item)}>Sửa</button></td>
                </tr>
            );
        });
   }  
    handleSearch(search){
        let url = "https://localhost:5001/api/v1/OrderRooms?PageIndex=1&RowPerPage=10" + search;
        console.log(url)
        this.componentDidMount(url);
    }
    render(){
        return(
            <div className="page_right-content">
                <ListOrderRoom
                    getData={this.getData}
                    componentDidMount={this.componentDidMount}
                    OrderRoomInsertShowForm={this.OrderRoomInsertShowForm}
                    AddShowForm={this.state.AddShowForm}
                    formatDate={this.formatDate}
                    rederData={this.rederData}
                    handleSearch={this.handleSearch}
                    display={this.state.display}
                    OrderRoomUpdateShowForm={this.OrderRoomUpdateShowForm}
                />
                <OrderRoomUpdatetForm
                    OrderRoomUpdateShowForm={this.OrderRoomUpdateShowForm}
                    ShowForm={this.state.ShowForm}
                    handleFormiddpChange={this.handleFormiddpChange}
                    handleFormNgayBDChange={this.handleFormNgayBDChange}
                    handleFormNgayKTChange={this.handleFormNgayKTChange}
                    handleFormGiaChange={this.handleFormGiaChange}
                    handleFormisDeleteChange={this.handleFormisDeleteChange}
                    handleFormTenPhongChange={this.handleFormTenPhongChange}
                    handleFormHoTenChange={this.handleFormHoTenChange}
                    componentDidMount={this.componentDidMount}
                    putData={this.putData}
                    iddp={this.state.iddp}
                    ngayBatDau={this.state.ngayBatDau}
                    ngayKetThuc={this.state.ngayKetThuc}
                    giaTien={this.state.giaTien}
                    isDelete={this.state.isDelete}
                    tenPhong={this.state.tenPhong}
                    hoTen={this.state.hoTen}
                    OrderRoomUpdateCloseForm={this.OrderRoomUpdateCloseForm}
                    formatDate={this.formatDate}
                />
            </div>
        );
    }
}
export default OrderRoom;