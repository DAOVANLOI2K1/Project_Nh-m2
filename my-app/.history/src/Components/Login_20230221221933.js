import React, {Component} from "react";
import $ from "jquery";
import axios from "axios";
import Index from ".";
import Admin from "./Admin";
import Swal from "sweetalert2";

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            "isLogin": false,
            "userName": "H2Cl2"
        }
    }
    validateLogin(username, password){
        let isValid = true;
        if(username === ""){
            $("#yourUsername").addClass("active");
            isValid = false;
        }
        if(password === ""){
            $("#yourPassword").addClass("active");
            isValid = false;
        }
        return isValid;
    }
    handleLogin(username, password){
        if(this.validateLogin(username, password)){
            var acc = {UserName: username, PassWord: password}
            axios.post("https://localhost:5001/api/v1/Accounts/login", acc, { "Content-Type": "json" })
            .then((response) => {
                localStorage.setItem("Token", response.data.token);
                localStorage.setItem("Role", response.data.role);
                localStorage.setItem("UserName", response.data.user_name);
                Swal.fire('Đăng nhập thành công!')  
                this.setState({
                    isLogin: true,
                    userName: response.data.user_name
                })
            })
            .catch((err) => {
                Swal.fire("Sai tên đăng nhập hoặc Mật khẩu!")
            });
        }
        else{
            Swal.fire("Tên đăng nhập hoặc mật khẩu không được để trống!")
        }
    }
    
    render(){
        if(this.state.isLogin){
            if(localStorage.getItem("Role") === "Nhân Viên"){
                return(
                    <Index
                    HandleSelectOptions = {this.props.selectOptionsEvent}
                    userName = {this.state.userName}/>
                );
            }
            else{
                return(
                    <Admin
                    HandleSelectOptions = {this.props.selectOptionsEvent}/>
                );
            }
        }
        else{
            return(
                <div className="container">
                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                            <div className="d-flex justify-content-center py-4">
                            <a href="index.html" className="logo d-flex align-items-center w-auto">
                                <img src="assets/img/logo.png" alt="" />
                                <span className="d-none d-lg-block">H2Cl2 Hotel</span>
                            </a>
                            </div>{/* End Logo */}
                            <div className="card mb-3">
                            <div className="card-body">
                                <div className="pt-4 pb-2">
                                <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                <p className="text-center small">Enter your username &amp; password to login</p>
                                </div>
                                {/* form */}
                                <form className="row g-3 needs-validation" noValidate>
                                <div className="col-12">
                                    <label htmlFor="yourUsername" className="form-label">Username</label>
                                    <div className="input-group has-validation">
                                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                                    <input type="text" name="username" className="form-control" id="yourUsername" 
                                    onChange={(e) => $(e.target).removeClass("active")}/>
                                    {/* Thêm validate MaDV */}
                                    <label style={errorLabel} id="errorOfMaDV"></label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="yourPassword" className="form-label">Password</label>
                                    <input type="password" name="password" className="form-control" id="yourPassword" 
                                    onChange={(e) => $(e.target).removeClass("active")} />
                                    <div className="invalid-feedback" id="validPassword">Please enter your password!</div>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary w-100" type="button" onClick={() => this.handleLogin($("#yourUsername").val(), $("#yourPassword").val())}>Login</button>
                                </div>
                                </form>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </section>
                </div>
            );
        }
    }
}
export default Login;