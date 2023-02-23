import React, { Component } from "react";
import axios from "axios";
import FormAccount from "./FormAccount";
import AccountList from "./AccountList";
import Swal from "sweetalert2";
import AccountEditForm from "./AccountEditForm";


class Account extends Component {
    constructor() {
        super();
        this.state = {
            srcDefault: 'https://localhost:5001/api/v1/Accounts',
            TaiKhoans: [],
            showFormAccount: false,
            showListAccount: true,
            // for post
            hoTen: '',
            soDienThoai: '',
            tenDangNhap: '',
            password: '',
            vaiTro: '',

            // for put
            showEditFormAccount: false,
            TKIDToEdit: '',

            // for delete
            TKIDToDelete: "",
        }
    }
    getConfigToken() {
        let config = {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("Token"),
                "Content-type": "application/json"
            }
        };
        return config;
    }

    componentDidMount() {
        let config = this.getConfigToken();
        axios.get(this.state.srcDefault, config)
            .then((response) => {
                this.setState({
                    TaiKhoans: response.data
                })
            });
    }

    // FOR POST

    clearInsertText = () => {
        this.setState({
            hoTen: "",
            soDienThoai: "",
            tenDangNhap: "",
            password: "",
            vaiTro: "",
        });
    };

    postData = () => {
        let config = this.getConfigToken();
        //let isInsertSuccess
        axios
            .post(this.state.srcDefault, {
                hoten: this.state.hoTen,
                SDT: this.state.soDienThoai,
                TenDangNhap: this.state.tenDangNhap,
                MatKhau: this.state.password,
                Role: this.state.vaiTro,
            }, config)
            .then(response => {
                if (response.data) {
                    Swal.fire(
                        'Thêm thành công!',
                        'Thay đổi đã xảy ra',
                        'success'
                    )
                }
                else {
                    Swal.fire(
                        'Không thể thực hiện thêm!',
                        'Đã xảy ra một vấn đề nào đó',
                        'warning'
                    )
                }
            })
            .catch(error => {
                Swal.fire(
                    'Không thể thực hiện thêm!',
                    'Đã xảy ra một vấn đề nào đó',
                    'warning'
                )
            });
        this.clearInsertText();
        this.componentDidMount();
        this.renderFormAccount();
    };


    handleFormHoTenChange = (value) => {
        this.setState({
            hoTen: value,
        });
    };
    handleFormSoDienThoaiChange = (value) => {
        this.setState({
            soDienThoai: value,
        });
    };
    handleFormTenDangNhapChange = (value) => {
        this.setState({
            tenDangNhap: value,
        });
    };
    handleFormPasswordChange = (value) => {
        this.setState({
            password: value,
        });
    };
    handleFormVaiTroChange = (value) => {
        this.setState({
            vaiTro: value,
        });
    };


    renderFormAccount = () => {
        this.setState({
            showListAccount: !this.state.showListAccount,
            showFormAccount: !this.state.showFormAccount,
        })
        this.clearInsertText();
    }

    // FOR PUT
    openEditFormAccount = (data) => {
        this.setState({
            showListAccount: !this.state.showListAccount,
            showEditFormAccount: !this.state.showEditFormAccount,
            TKIDToEdit: data.tkid,
            hoTen: data.hoten,
            soDienThoai: data.sdt,
            tenDangNhap: data.tenDangNhap,
            password: data.matKhau,
            vaiTro: data.role
        })
    }

    closeEditFormAccount = () => {
        this.setState({
            showListAccount: !this.state.showListAccount,
            showEditFormAccount: !this.state.showEditFormAccount,
        })
        this.clearInsertText();
    }

    putData = () => {
        var url = this.state.srcDefault;
        let config = this.getConfigToken();
        //let isEditSuccess;
        axios
            .put(url, {
                TKID: this.state.TKIDToEdit,
                Hoten: this.state.hoTen,
                SDT: this.state.soDienThoai,
                TenDangNhap: this.state.tenDangNhap,
                MatKhau: this.state.password,
                Role: this.state.vaiTro,
            }, config)
            .then(response => {
                if (response.data) {
                    Swal.fire(
                        'Sửa tài khoản thành công!',
                        'Thay đổi đã xảy ra',
                        'success'
                    )
                }
                else {
                    Swal.fire(
                        'Không thể thực hiện sửa!',
                        'Đã xảy ra một vấn đề nào đó',
                        'warning'
                    )
                }
            })
            .catch(error => {
                Swal.fire(
                    'Không thể thực hiện sửa!!',
                    'Đã xảy ra một vấn đề nào đó',
                    'warning'
                )
                console.log(error)
            });
        //this.showUpdateResultAlert();
        this.componentDidMount();
        this.clearInsertText();
        this.closeEditFormAccount();
    };


    // FOR DELETE

    // HTTP DELETE
    deleteAccount = (TKID) => {
        var url = "https://localhost:5001/api/v1/Accounts/" + TKID;
        let config = this.getConfigToken();
        axios
            .delete(url, config)
            .then(response => {
                if (response.data) {
                    Swal.fire(
                        'Xóa thành công!',
                        'Thay đổi đã xảy ra',
                        'success'
                    )
                }
                else {
                    Swal.fire(
                        'Không thể thực hiện xóa!',
                        'Đã xảy ra một vấn đề nào đó',
                        'success'
                    )
                }
            })
            .catch(error => {
                Swal.fire(
                    'Không thể thực hiện xóa!',
                    'Đã xảy ra một vấn đề nào đó',
                    'success'
                )
            });
        this.componentDidMount();
    };


    showDeleteConfirmAlert = (data) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Bạn có chắc chắn?',
            text: "Thao tác này có thể không hoàn tác được!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xoá!',
            cancelButtonText: 'Không!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                this.deleteAccount(data.tkid);
                // end comfirmed
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Không có gì xảy ra',
                    'success'
                )
            }
        })
    }


    // FOR DISPLAY LIST DATA
    renderAccount = () => {
        return this.state.TaiKhoans.map((data, index) => {
            return (
                <tr key={data.tkid}>
                    <td>{data.hoten}</td>
                    <td>{data.sdt}</td>
                    <td>{data.tenDangNhap}</td>
                    <td>{data.role}</td>
                    <td class="actions">
                        <button type="button" class="btn  btn-success btn-sm"
                            onClick={() => this.openEditFormAccount(data)}
                        >Chỉnh sửa
                        </button>
                        <button type="button" class="btn btn-danger btn-sm"
                            onClick={() => this.showDeleteConfirmAlert(data)}
                        >
                            Xóa
                        </button>
                    </td>
                </tr>
            );
        }
        );
    }
    render() {
        return (
            <div className="container">
                <AccountList
                    renderAccount={this.renderAccount}
                    showListAccount={this.state.showListAccount}
                    renderFormAccount={this.renderFormAccount}
                />
                <FormAccount
                    showFormAccount={this.state.showFormAccount}
                    renderFormAccount={this.renderFormAccount}
                    handleFormHoTenChange={this.handleFormHoTenChange}
                    handleFormSoDienThoaiChange={this.handleFormSoDienThoaiChange}
                    handleFormTenDangNhapChange={this.handleFormTenDangNhapChange}
                    handleFormPasswordChange={this.handleFormPasswordChange}
                    handleFormVaiTroChange={this.handleFormVaiTroChange}
                    hoTen={this.state.hoTen}
                    soDienThoai={this.state.soDienThoai}
                    tenDangNhap={this.state.tenDangNhap}
                    password={this.state.password}
                    vaiTro={this.state.vaiTro}
                    postData={this.postData}
                />
                <AccountEditForm
                    showEditFormAccount={this.state.showEditFormAccount}
                    closeEditFormAccount={this.closeEditFormAccount}
                    //TKIDToEdit={this.state.TKIDToEdit}
                    handleFormHoTenChange={this.handleFormHoTenChange}
                    handleFormSoDienThoaiChange={this.handleFormSoDienThoaiChange}
                    handleFormTenDangNhapChange={this.handleFormTenDangNhapChange}
                    handleFormPasswordChange={this.handleFormPasswordChange}
                    handleFormVaiTroChange={this.handleFormVaiTroChange}
                    hoTen={this.state.hoTen}
                    soDienThoai={this.state.soDienThoai}
                    tenDangNhap={this.state.tenDangNhap}
                    password={this.state.password}
                    vaiTro={this.state.vaiTro}
                    putData={this.putData}
                />
            </div>
        );
    }
}
export default Account;