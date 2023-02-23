import React, { Component } from "react";
import axios from "axios";
import ServiceForm from "./ServiceForm";
import Swal from 'sweetalert2'
import ServiceEditForm from "./ServiceEditForm";
import ServiceList from "./ServiceList";

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // for get list
      showListService: true,
      services: [],
      search: "",
      pageNumber: 1,
      url:"",
      // for delete
      DvidToDelete: "",
      isDeleteSuccess: true,
      // for insert
      showServiceForm: false,
      tenDV: "",
      maDV: "",
      giaTien: 0,
      hoatDong: "",
      donVi: "",
      isDelete: "",
      ghiChu: "",
      moTa: "",
      isInsertSuccess: true,
      newcode: "",
      // for update
      showUpdateForm: false,
      DvidToEditForm: "",
      isEditSuccess: true,
    };
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

  // GET API
  getData(url) {
    let config = this.getConfigToken();
    axios.get(url, config).then((response) => {
      this.setState({
        services: response.data,
      });
    });
  }

  componentDidMount = (
    url = "https://localhost:5001/api/v1/Services"
  ) => {
    console.log(url);
    this.getData(url);
  };

  handleSearch = (search) => {
    let url = "https://localhost:5001/api/v1/Services" + search
    this.componentDidMount(url);

  }

  // POST API

  // hàm thực hiện on off form nhập mới dịch vụ
  turnOnServiceForm = () => {
    this.getNewCode();
    this.setState({
      showServiceForm: !this.state.showServiceForm,
      showListService: !this.state.showListService,
    });

  };

  turnOffServiceForm = () => {
    this.setState({
      showServiceForm: !this.state.showServiceForm,
      showListService: !this.state.showListService,
    });
  };



  // chưa sử lý đượcccccccccccccccccccccccccccccccc số
  clearInsertForm = () => {
    this.setState({
      tenDV: "",
      giaTien: 0,
      hoatDong: "",
      donVi: "",
      isDelete: "",
      ghiChu: "",
      moTa: "",
    });
  };

  handleFormTenDVChange = (value) => {
    this.setState({
      tenDV: value,
    });
  };
  handleFormmaDVChange = (value) => {
    this.setState({
      maDV: value,
    });
  };
  handleFormgiaTienChange = (value) => {
    this.setState({
      giaTien: value,
    });
  };
  handleFormhoatDongChange = (value) => {
    if( value === 'on') {
      this.setState({
        hoatDong: 'Rảnh',
      });
    }
    else {
      this.setState({
        hoatDong: 'Bận',
      });
    }
    
  };
  handleFormdonViChange = (value) => {
    this.setState({
      donVi: value,
    });
  };
  handleFormghiChuChange = (value) => {
    this.setState({
      ghiChu: value,
    });
  };
  handleFormmoTaChange = (value) => {
    this.setState({
      moTa: value,
    });
  };

  getNewCode = () => {
    let config = this.getConfigToken();
    axios
      .get("https://localhost:5001/api/v1/Services/new-code", config)
      .then((response) => {
        this.setState({
          newcode: response.data,
        });
      });
  }

  postData = () => {
    let config = this.getConfigToken();
    axios
      .post("https://localhost:5001/api/v1/Services", {
        tenDV: this.state.tenDV,
        maDV: this.state.newcode,
        giaTien: this.state.giaTien,
        hoatDong: this.state.hoatDong,
        donVi: this.state.donVi,
        isDelete: "false",
        ghiChu: this.state.ghiChu,
        moTa: this.state.moTa,
      }, config)
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
    this.clearInsertForm();
    this.showInsertResult();
    this.componentDidMount();
    this.turnOffServiceForm();
  };

  showInsertResult = () => {
    if (this.state.isInsertSuccess === true) {
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

  // HTTP DELETE
  deleteService = (dvid) => {
    var url = "https://localhost:5001/api/v1/Services/" + dvid;
    let config = this.getConfigToken();
    axios
      .delete(url, config)
      .then(response => {
        const tempData = response.data;
        if (tempData) {
          this.setState({
            isDeleteSuccess: true,
          })
        }
        else {
          this.setState({
            isDeleteSuccess: false,
          })
        }
      })
      .catch(error => {
        if (error) {
          this.setState({
            isDeleteSuccess: false,
          })
        }
      });
    this.componentDidMount();
    this.setState({
      showAlertDelete: false,
    });
  };




  showDeleteConfirmAlert = (service) => {
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
        this.deleteService(service.DVID);
        if (this.state.isDeleteSuccess === true) {
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
          'error'
        )
      }
    })
  }


  // HTTP PUT - for update service
  // hàm thực hiện on off form sửa dịch vụ
  onServiceEditForm = (service) => {
    this.setState({
      DvidToEditForm: service.DVID,
      tenDV: service.TenDV,
      maDV: service.MaDV,
      giaTien: service.GiaTien,
      hoatDong: service.HoatDong,
      donVi: service.DonVi,
      ghiChu: service.GhiChu,
      moTa: service.MoTa,
      showUpdateForm: !this.state.showUpdateForm,
      showUpdateAlert: false,
      showListService: !this.state.showListService,
    });
  };

  offServiceEditForm = () => {
    this.setState({
      showUpdateForm: !this.state.showUpdateForm,
      showUpdateAlert: false,
      showListService: !this.state.showListService,
    })
    this.clearInsertForm();
  }

  putData = (dvid) => {
    var url = "https://localhost:5001/api/v1/Services/" + dvid;
    let config = this.getConfigToken();
    axios
      .put(url, {
        tenDV: this.state.tenDV,
        giaTien: this.state.giaTien,
        hoatDong: this.state.hoatDong,
        donVi: this.state.donVi,
        ghiChu: this.state.ghiChu,
        moTa: this.state.moTa,
      }, config)
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
        }
      })
      .catch(error => {
        if (error) {
          this.setState({
            isEditSuccess: false,
          })
        }
      });
    this.showUpdateResultAlert();
    this.componentDidMount();
    this.clearInsertForm();
    this.offServiceEditForm();
  };

  showUpdateResultAlert = () => {
    if (this.state.isEditSuccess === true) {
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


  // Ham thuc hien hien thi danh sach
  renderService = () => {
    return this.state.services.map((service, index) => {
      return (
        <tr>
          <td>
            <button type="button" className="btn btn-warning btn-sm"
              onClick={() => this.onServiceEditForm(service)}
            >
              Chỉnh sửa
            </button>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => this.showDeleteConfirmAlert(service)}
            >
              Xóa
            </button>
          </td>
          <td style={{ width: "10%" }} className="text-center">
            {index + 1}
          </td>
          <td>{service.tenDV}</td>
          <td>{service.giaTien}</td>
          <td>{service.HoatDong}</td>
          <td>{service.DonVi}</td>
          <td>{service.MoTa}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="container">
        {/* Form Insert */}
        <ServiceForm
          showServiceForm={this.state.showServiceForm}
          turnOffServiceForm={this.turnOffServiceForm}
          postData={this.postData}
          clearInsertForm={this.clearInsertForm}
          tenDV={this.state.tenDV}
          maDV={this.state.newcode}
          giaTien={this.state.GiaTien}
          hoatDong={this.state.hoatDong}
          donVi={this.state.donVi}
          ghiChu={this.state.ghiChu}
          moTa={this.state.moTa}
          handleFormmoTaChange={this.handleFormmoTaChange}
          handleFormgiaTienChange={this.handleFormgiaTienChange}
          handleFormhoatDongChange={this.handleFormhoatDongChange}
          handleFormdonViChange={this.handleFormdonViChange}
          handleFormghiChuChange={this.handleFormghiChuChange}
          handleFormmaDVChange={this.handleFormmaDVChange}
          handleFormTenDVChange={this.handleFormTenDVChange}
        />


        {/* Form update */}
        <ServiceEditForm
          showUpdateForm={this.state.showUpdateForm}
          offServiceEditForm={this.offServiceEditForm}
          DvidToEditForm={this.state.DvidToEditForm}
          tenDV={this.state.tenDV}
          maDV={this.state.maDV}
          giaTien={this.state.giaTien}
          hoatDong={this.state.hoatDong}
          donVi={this.state.donVi}
          ghiChu={this.state.ghiChu}
          moTa={this.state.moTa}
          handleFormmoTaChange={this.handleFormmoTaChange}
          handleFormgiaTienChange={this.handleFormgiaTienChange}
          handleFormhoatDongChange={this.handleFormhoatDongChange}
          handleFormdonViChange={this.handleFormdonViChange}
          handleFormghiChuChange={this.handleFormghiChuChange}
          handleFormTenDVChange={this.handleFormTenDVChange}
          putData={this.putData}
          resultUpdate={this.state.resultUpdate}
          showUpdateAlert={this.state.showUpdateAlert}
        />
        {/* Display list of service */}
        <ServiceList
          showListService={this.state.showListService}
          services={this.state.services}
          search={this.state.search}
          renderService={this.renderService}
          turnOnServiceForm={this.turnOnServiceForm}
          handleSearch  = {this.handleSearch}
        />
      </div>
    );
  }
}

export default Service;
