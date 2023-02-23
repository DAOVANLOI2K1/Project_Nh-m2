import React, { Component } from "react";
import axios from "axios"; 
import RoomUpdatetForm from "./RoomUpdatetForm";
import ListRoom from "./ListRoom";
import Pagination from "react-js-pagination";
import Swal from "sweetalert2";
class Room extends Component{
    constructor(props){
        super(props);
        this.state={
            data: [],
            updateResult: "",
            ShowForm: false,
            display: true,
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
        display: !this.state.display
        });
    };
    RoomUpdateCloseForm = () => {
        this.setState({
            ShowForm: !this.state.ShowForm,
            display: !this.state.display
        })
    }
    putData = (pid) => {
        let config = this.getConfigToken();
        var url = "https://localhost:5001/api/v1/Rooms";
        axios
        .put(url, {
            pid: pid,
            giaPhong: this.state.giaPhong,
            isDelete: this.state.isDelete,
            moTa: this.state.moTa,
        }, config)
        .then(response => {
            if(this.state.giaPhong<=0 || !this.state.giaPhong){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Giá phòng không hợp lệ!',
                })
            }
            else {
                if (response.data) {
                    Swal.fire('Sửa thành công')
                    this.RoomUpdateCloseForm()
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
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Sửa thất bại!',
            })
                console.log(error)
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
            console.log(response)
        });
    }
    componentDidMount = (url = "https://localhost:5001/api/v1/Rooms?PageIndex=1&RowPerPage=500") => {
        this.getData(url);
      }
    rederData =()=>{
        return this.state.data.map((item) => {
            return(
                <tr key={item.pid}>
                    <td>{item.pid}</td>
                    <td>{item.tenPhong}</td>
                    <td>{item.trangThai}</td>
                    <td>{item.giaPhong}</td>
                    <td>{item.hoatDong}</td>
                    <td>{item.isDelete}</td>
                    <td>{item.moTa}</td>
                    
                </tr>
            );
        });
   } 
    handleSearch(search){
        let url = "https://localhost:5001/api/v1/Rooms?PageIndex=1&RowPerPage=500" + search;
        console.log(url)
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
                        display={this.state.display}
                        RoomUpdateShowForm={this.RoomUpdateShowForm}
                    />
                    {/* <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={10}
                        totalItemsCount={450}
                        pageRangeDisplayed={5}
                        onChange={this.handleSearch.bind(this)}
                    /> */}
                </div>
        );
    }
}
export default Room;