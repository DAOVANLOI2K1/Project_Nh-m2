import React, { Component } from "react";
import axios from "axios"; 
import RoomUpdatetForm from "./RoomUpdatetForm";
import ListRoom from "./ListRoom";
import Swal from "sweetalert2";
class Room extends Component{
    constructor(props){
        super(props);
        this.state={
            data: [],
            urlApiRooms : 'https://localhost:5001/api/v1/Rooms',
            updateResult: "",
            ShowForm: false,
            displayListRoomPage: true,
            //for update
            pid:'',
            tenPhong:'',
            trangThai:'',
            giaPhong:0,
            hoatDong:'',
            isDelete: '',
            moTa:'' ,
            //pageNumber: 1
        }
    }
    //put api
    handleRoomFormpidChange = (value)=>{
        this.setState({
            pid:value
        })
    }
    handleRoomFormtenPhongChange = (value)=>{
        this.setState({
            tenPhong:value
        })
    }
    handleRoomFormtrangThaiChange = (value)=>{
        this.setState({
            trangThai:value
        })
    }
    handleRoomFormgiaPhongChange = (value)=>{
        this.setState({
            giaPhong:value
        })
    }
    handleRoomFormhoatDongChange = (value)=>{
        this.setState({
            hoatDong:value
        })
    }
    handleRoomFormisDeleteChange = (value)=>{
        this.setState({
            isDelete:value
        })
    }
    handleRoomFormmoTaChange = (value)=>{
        this.setState({
            moTa:value
        })
    }
    RoomUpdateShowForm = (Room) => {
        this.setState({
        pid: Room.pid,
        tenPhong: Room.tenPhong,
        trangThai: Room.trangThai,
        giaPhong: Room.giaPhong,
        hoatDong: Room.hoatDong,
        isDelete: Room.isDelete,
        moTa: Room.moTa,
        ShowForm: !this.state.ShowForm,
        displayListRoomPage: !this.state.displayListRoomPage
        });
    };
    RoomUpdateCloseForm = () => {
        this.setState({
            ShowForm: !this.state.ShowForm,
            displayListRoomPage: !this.state.displayListRoomPage
        })
    }
    alertUpdateComfirm = () => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
          title: 'Xác nhận sửa?',
          text: "Bạn có thật sự muốn sửa phòng này?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sửa!',
          cancelButtonText: 'Hủy!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            //console.log(this.state.pid)
            this.putData(this.state.pid);
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
    putData = (pid) => {
        let config = this.getConfigToken();
        var url = this.state.urlApiRooms;
        axios
        .put(url, {
            pid: pid,
            giaPhong: this.state.giaPhong,
            isDelete: this.state.isDelete,
            moTa: this.state.moTa,
        }, config)
        .then(response => {
            if (response.data) {
                Swal.fire(
                    'Đã sửa',
                    'Thay đổi đã xảy ra',
                    'success'
                )
                this.RoomUpdateCloseForm()
                this.componentDidMount();
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Cảnh báo',
                    text: 'Sửa thất bại!',
                })
            }
            //console.log(response);
           //console.log(response.data);
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Cảnh báo',
                text: 'Thông tin không hợp lệ!',
            })
                //console.log(error)
        });
    };
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
    componentDidMount = (url = this.state.urlApiRooms+ "?PageIndex=1&RowPerPage=500") => {
        this.getData(url);
      }
      // Hàm format số tiền
    formatMoney = money => {
    if(money && !isNaN(money)){
        return money.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
    }else{
        return money;
    }
}
    rederData =()=>{
        return this.state.data.map((item) => {
            return(
                <tr key={item.pid}>
                    {/* <td>{item.pid}</td> */}
                    <td>{item.tenPhong}</td>
                    <td>{item.trangThai}</td>
                    <td>{this.formatMoney(item.giaPhong)}</td>
                    <td>{item.hoatDong}</td>
                    <td>{item.isDelete}</td>
                    <td>{item.moTa}</td>
                    <td><button type="button" className="btn btn-success btn-sm" onClick={()=>this.RoomUpdateShowForm(item)}>Chỉnh sửa</button></td>
                </tr>
            );
        });
    }

    handleSearch = (search) =>{
        let url = this.state.urlApiRooms + "?PageIndex=1&RowPerPage=500" + search;
        //console.log(url)
        this.componentDidMount(url);
    }
    render(){
        return(
                <div  className="page_right-content">
                    <RoomUpdatetForm
                        RoomUpdateShowForm={this.RoomUpdateShowForm}
                        RoomUpdateCloseForm={this.RoomUpdateCloseForm}
                        putData={this.putData}
                        ShowForm = {this.state.ShowForm}
                        handleRoomFormpidChange={this.handleRoomFormpidChange}
                        handleRoomFormtenPhongChange={this.handleRoomFormtenPhongChange}
                        handleRoomFormtrangThaiChange={this.handleRoomFormtrangThaiChange}
                        handleRoomFormgiaPhongChange={this.handleRoomFormgiaPhongChange}
                        handleRoomFormhoatDongChange={this.handleRoomFormhoatDongChange}
                        handleRoomFormisDeleteChange={this.handleRoomFormisDeleteChange}
                        handleRoomFormmoTaChange={this.handleRoomFormmoTaChange}
                        alertUpdateComfirm={this.alertUpdateComfirm}
                        pid={this.state.pid}
                        tenPhong={this.state.tenPhong}
                        trangThai={this.state.trangThai}
                        giaPhong={this.state.giaPhong}
                        hoatDong={this.state.hoatDong}
                        isDelete={this.state.isDelete}
                        moTa={this.state.moTa}
                        />
                    <ListRoom
                        getData={this.getData}
                        updateData={this.updateData}
                        componentDidMount={this.componentDidMount}
                        rederData={this.rederData}
                        handleSearch={this.handleSearch}
                        handleUpdate={this.handleUpdate}
                        displayListRoomPage={this.state.displayListRoomPage}
                        RoomUpdateShowForm={this.RoomUpdateShowForm}
                    />
                </div>
        );
    }
}
export default Room;