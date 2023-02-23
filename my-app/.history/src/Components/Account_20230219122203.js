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
            TaiKhoans: [],
            showFormAccount: false,
            showListAccount: true,
            // for post
            hoTen: '',
            soDienThoai: '',
            tenDangNhap: '',
            password: '',
            vaiTro: 'Nhân viên',

            // for put
            showEditFormAccount: false,
            TKIDToEdit: '',

            // for delete
            TKIDToDelete: "",
        }
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

    componentDidMount() {
        axios.get("https://localhost:5001/api/v1/TaiKhoans")
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
            vaiTro: "Nhân viên",
        });
    };

    postData = () => {
        axios
            .post("https://localhost:5001/api/v1/TaiKhoans", {
                HoTen: this.state.hoTen,
                SDT: this.state.soDienThoai,
                TenDangNhap: this.state.tenDangNhap,
                MatKhau: this.state.password,
                Role: this.state.vaiTro,
            })
            .then(response => {
                if (response.data) {
                    this.setState({
                        isInsertSuccess: true,
                    })
                }
                else {
                    this.setState({
                        isInsertSuccess: false,
                    })
                }
            })
            .catch(error => {
                this.setState({
                    isInsertSuccess: false,
                })
            });

        this.clearInsertText();
        this.componentDidMount();
        this.renderFormAccount();
        this.showInsertResult();
    };

    showInsertResult = () => {
        if (this.state.isInsertSuccess !== false) {
            Swal.fire(
                'Thêm thành công!',
                'Thay đổi đã xảy ra',
                'success'
            )
        } else {
            Swal.fire(
                'Không thể thực hiện thêm!',
                'Đã xảy ra một vấn đề nào đó',
                'warning'
            )
        }
    }

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
            hoTen: data.hoTen,
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

    putData = (TKID) => {
        var url = "https://localhost:5001/api/v1/TaiKhoans/" + TKID;
        axios
            .put(url, {
                HoTen: this.state.hoTen,
                SDT: this.state.soDienThoai,
                TenDangNhap: this.state.tenDangNhap,
                MatKhau: this.state.password,
                Role: this.state.vaiTro,
            })
            .then(response => {
                if (response.data) {
                    this.setState({
                        isEditSuccess: true,
                    })
                }
                else {
                    this.setState({
                        isEditSuccess: false,
                    })
                    console.log(response)
                }
            })
            .catch(error => {
                this.setState({
                    isEditSuccess: false,
                })
                console.log(error)
            });
        this.showUpdateResultAlert();
        this.componentDidMount();
        this.clearInsertText();
        this.closeEditFormAccount();
    };

    showUpdateResultAlert = () => {
        if (this.state.isEditSuccess !== false) {
            Swal.fire(
                'Sửa thành công!',
                'Thay đổi đã xảy ra',
                'success'
            )
        } else {
            Swal.fire(
                'Không thể thực hiện sửa!',
                'Đã xảy ra một vấn đề nào đó',
                'warning'
            )
        }
    }

    // FOR DELETE

    // HTTP DELETE
    deleteAccount = (TKID) => {
        var url = "https://localhost:5001/api/v1/TaiKhoans/" + TKID;
        console.log(url);
        axios
            .delete(url)
            .then(response => {
                //const tempData = response.data;
                if (response.data) {
                    this.setState({
                        isDeleteSuccess: true,
                    })
                    console.log(response)
                }
                else {
                    this.setState({
                        isDeleteSuccess: false,
                    })
                }
            })
            .catch(error => {
                this.setState({
                    isDeleteSuccess: false,
                })
                console.log(error)
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
            confirmButtonText: 'Đồng ý, xóa nó!',
            cancelButtonText: 'Không, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                this.deleteAccount(data.tkid);
                if (this.state.isDeleteSuccess !== false) {
                    swalWithBootstrapButtons.fire(
                        'Xóa thành công!',
                        'Thay đổi đã xảy ra',
                        'success'
                    )
                } else {
                    swalWithBootstrapButtons.fire(
                        'Không thể thực hiện xóa!',
                        'Đã xảy ra một vấn đề nào đó',
                        'success'
                    )
                }
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
                    <td>{data.hoTen}</td>
                    <td>{data.sdt}</td>
                    <td>{data.tenDangNhap}</td>
                    <td>{data.role}</td>
                    <td class="actions">
                        <button type="button" class="btn btn-info"
                            onClick={() => this.openEditFormAccount(data)}
                        >Chỉnh sửa
                        </button>
                        <button type="button" class="btn btn-danger"
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
            <div className="page_right-content">
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
                    TKIDToEdit={this.state.TKIDToEdit}
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