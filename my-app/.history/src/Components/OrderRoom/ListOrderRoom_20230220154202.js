import React, {Component} from "react";
class ListOrderRoom extends Component{
    constructor(props){
        super(props);
        this.state = {
            showFormCreate: false,
            CMT: "",
            PID: "",
            NgayBatDau: "",
            NgayKetThuc: ""
        }
    }
    render(){
        if(this.props.display === false) return null;
        if()
    }
}
export default ListOrderRoom