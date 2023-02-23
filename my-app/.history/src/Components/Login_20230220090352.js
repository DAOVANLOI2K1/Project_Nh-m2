import React, {Component} from "react";
import $ from "jquery";
import axios from "axios";
import Index from ".";
import Admin from "./Admin";

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            "isLogin": false,
            "userName": "H2Cl2"
        }
    }
    validateLogin(username, password){
        if(username === ""){
            $("#yourUsername").
        }
    }
    handleLogin(username, password){
        var acc = {UserName: username, PassWord: password}
        axios.post("https://localhost:5001/api/v1/Accounts/login", acc, { "Content-Type": "json" })
        .then((response) => {
            localStorage.setItem("Token", response.data.token);
            localStorage.setItem("Role", response.data.role);
            localStorage.setItem("UserName", response.data.user_name);
            this.setState({
                isLogin: true,
                userName: response.data.user_name
            })
            alert("Đăng nhập thành công!")
        })
        .catch((err) => {
            alert("Đăng nhập thất bại! Mật khẩu hoặc tài khoản không đúng")
        });
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
                                    <input type="text" name="username" className="form-control" id="yourUsername" required />
                                    <div className="invalid-feedback">Please enter your username.</div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="yourPassword" className="form-label">Password</label>
                                    <input type="password" name="password" className="form-control" id="yourPassword" required />
                                    <div className="invalid-feedback">Please enter your password!</div>
                                </div>
                                <div className="col-12">
                                    <div className="form-check">
                                    <input className="form-check-input" type="checkbox" name="remember" defaultValue="true" id="rememberMe" checked/>
                                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary w-100" type="button" onClick={() => this.handleLogin($("#yourUsername").val(), $("#yourPassword").val())}>Login</button>
                                </div>
                                <div className="col-12">
                                    <p className="small mb-0">Don't have account? <a href="pages-register.html">Create an account</a></p>
                                </div>
                                </form>
                            </div>
                            </div>
                            <div className="credits">
                            {/* All the links in the footer should remain intact. */}
                            {/* You can delete the links only if you purchased the pro version. */}
                            {/* Licensing information: https://bootstrapmade.com/license/ */}
                            {/* Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/ */}
                            Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
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