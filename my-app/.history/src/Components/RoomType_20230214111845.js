import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

class LoaiPhong extends Component{
    constructor(){
        super();
        this.state={
            LoaiPhong: []
        }
    }
    
    componentDidMount(){
        axios.get("https://localhost:5001/api/v1/LoaiPhong")
        .then((response) => {
            this.setState({
                LoaiPhong: response.data
            })
        });
    }
    
       rederLoaiPhong =()=>{
            console.log(this.state.LoaiPhong)
            return this.state.LoaiPhong.map((data,index) =>{
                return(
                    <tr key={data.lid}>
                    <td>{data.maLoai}</td>
                    <td>{data.tenLoai}</td>
                    <td>{data.ghiChu}</td>
                </tr>
                );
            }
            ); 
       }  
       
       render(){
            return(
                <div className="App">
                    <div className="container">
                        <h1 className="text-center">Danh sách loại phòng</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Mã loại</th>
                                    <th>Tên loại</th>
                                    <th>Ghi chú</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.rederLoaiPhong()}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
            
       }
              
    }

export default LoaiPhong;