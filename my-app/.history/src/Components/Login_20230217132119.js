import React, {Component} from "react";

class Login extends Component{
    render(){
        return(
            <div className="wrapper">
                <div className="text-center text-success fs-1 brand d-flex flex-column">
                <i className="fa-solid fa-shield-cat me-2" />AIPage
                </div>
                <div className="p-3 mt-3">
                <div className="form-field d-flex align-items-center">
                    <i className="ms-2 fa-solid fa-user" />
                    <input type="text" name="username" id="username" placeholder="Tài khoản" />
                </div>
                <div className="form-field d-flex align-items-center">
                    <i className="ms-2 fa-solid fa-lock" />
                    <input type="password" name="password" id="password" placeholder="Mật khẩu" />
                </div>
                <div className="form-check" hidden>
                    <input className="form-check-input" type="checkbox" id="remember-me" />
                    <label className="form-check-label" htmlFor="remember-me">
                    Ghi nhớ
                    </label>
                </div>
                <button id="btn-login" type="button" className="btn text-light mt-4">Đăng nhập</button>
                </div>
                <div className="text-center fs-6 mt-5">
                <a className="fs-6" href="/page/authentication/password/reset.html">Quên mật khẩu?</a> or <a className="fs-6" href="/common/register/register.html">Đăng ký</a>
                </div>
            </div>
        );
    }
}
export default Login;