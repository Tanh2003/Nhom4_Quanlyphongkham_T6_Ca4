import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagerPatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getAllPatientForDoctor,
  postSendRemedy,
} from "../../../services/userService";
import moment from "moment/moment";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
import LoadingOverLay from "react-loading-overlay";

class ManagerPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }
  async componentDidMount() {
    this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formatedDate,
    });

    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };

  handleBtnComfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
  };
  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };
  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });

    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
    });
    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success("Gui Thanh Cong");
      this.closeRemedyModal();
      await this.getDataPatient();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Loi khong gui duoc");
    }
  };

  handleBtnRemedy = () => {};

  render() {
    let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
    let { language } = this.props;

    return (
      <>
        <LoadingOverLay
          active={this.state.isShowLoading}
          spinner
          text="Đang Gửi ..."
        >
          <div className="title text-center">Danh sách tài khoản</div>
          <div>
            <label>Chọn ngày khám</label>
            <DatePicker
              onChange={this.handleOnChangeDatePicker}
              className="form-control"
              value={this.state.currentDate}
            />
          </div>
          <div className="users-table mt-4 mx-3">
            <table id="customers">
              <tbody>
                <tr>
                  <th>STT</th>
                  <th>Thời gian</th>
                  <th>Họ và tên </th>
                  <th>Địa chỉ</th>
                  <th>Giới tính</th>
                  <th>Hành động</th>
                </tr>

                {dataPatient && dataPatient.length > 0 ? (
                  dataPatient &&
                  dataPatient.map((item, index) => {
                    let time =
                      language === LANGUAGES.VI
                        ? item.timeTypeDataPatient.valueVi
                        : item.timeTypeDataPatient.valueEn;
                    let gender =
                      language === LANGUAGES.VI
                        ? item.patientData.genderData.valueVi
                        : item.patientData.genderData.valueEn;
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{time}</td>
                        <td>{item.patientData.firstName}</td>

                        <td>{item.patientData.address}</td>
                        <td>{gender}</td>

                        <td>
                          <button
                            className="btn-edit"
                            onClick={() => {
                              this.handleBtnComfirm(item);
                            }}
                          >
                            Xác nhận
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => {
                              this.handleBtnRemedy(item);
                            }}
                          >
                            Gửi hóa đơn
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>Không có dữ liệu</tr>
                )}
              </tbody>
            </table>
          </div>
          <RemedyModal
            isOpenModal={isOpenRemedyModal}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverLay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerPatient);
