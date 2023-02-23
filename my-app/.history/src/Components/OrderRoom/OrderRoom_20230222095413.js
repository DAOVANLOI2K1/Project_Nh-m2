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

        return `${year}-${month}-${day}`;
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
    alertComfirm = () => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
          title: 'Xác nhận sửa?',
          text: "Bạn có thật sự muốn sửa thông tin này?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sửa!',
          cancelButtonText: 'Hủy!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            //console.log(this.state.pid)
            this.putData(this.state.iddp);
            // end comfirmed
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Đã hủy',
              'success'
            )
          }
        })
    }
    putData = (iddp) => {
        var url = "https://localhost:5001/api/v1/OrderRooms";
        let config = this.getConfigToken();
        console.log({
            iddp: iddp,
            giaTien: this.state.giaTien,
            ngayBatDau: this.state.ngayBatDau,
            ngayKetThuc: this.state.ngayKetThuc,
            isDelete: this.state.isDelete,
        })
        axios.put(url, {
            iddp: iddp,
            giaTien: this.state.giaTien,
            ngayBatDau: this.state.ngayBatDau,
            ngayKetThuc: this.state.ngayKetThuc,
            isDelete: this.state.isDelete,
        }, config)
        .then(response => {
            if (response.data) {
                Swal.fire(
                    'Đã sửa',
                    'Thay đổi đã xảy ra',
                    'success'
                )
                this.OrderRoomUpdateCloseForm()
                this.componentDidMount();
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Cảnh báo',
                    text: 'Sửa thất bại!',
                })
            }
        })
        .catch(error => {
            if (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Cảnh báo',
                    text: 'Thông tin không hợp lệ!',
                })
                console.log(error)
            }
        });
    };
    rederData =()=>{
        return this.state.data.map((item) => {
            return(
                <tr key={item.iddp}>
                    {/* <td>{item.iddp}</td> */}
                    <td idp = {item.pid}>{item.tenPhong}</td>
                    <td khid = {item.khid}>{item.hoTen}</td>
                    <td>{this.formatDate(item.ngayBatDau)}</td>
                    <td>{this.formatDate(item.ngayKetThuc)}</td>
                    <td>{item.giaTien}</td>
                    <td>{item.isDelete}</td>
                    <td><button type="button" className="btn btn-success btn-sm" onClick={() =>this.OrderRoomUpdateShowForm(item)}>Chỉnh sửa</button></td>
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
                    alertComfirm={this.alertComfirmCreate}
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
                    alertComfirm={this.alertComfirm}
                    iddp={this.state.iddp}
                    ngayBatDau={this.formatDate(this.state.ngayBatDau)}
                    ngayKetThuc={this.formatDate(this.state.ngayKetThuc)}
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