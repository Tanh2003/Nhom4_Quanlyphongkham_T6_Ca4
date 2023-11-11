import React, { Component } from "react";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils/constant";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";

import { getDetailInforDoctor } from "../../../services/userService";
import Footer from "./Footer";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctor: [],
      hanOldData: false,

      // luu thong tin bac si
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctorRedux();

    this.props.getAllRequiredDoctorInfor();
  }
  buildDataInputSelect = (inputdata, type) => {
    console.log("xemmmm cai nayfzczczx :", inputdata);
    let result = [];
    let { language } = this.props;
    if (inputdata && inputdata.length > 0) {
      if (type === "USERS") {
        inputdata.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language == LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }

      if (type === "PRICE") {
        inputdata.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi} VND`;
          let labelEn = `${item.valueEn} USD`;
          object.label = language == LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;

          result.push(object);
        });
      }

      if (type === "PAYMENT" || type === "PROVINCE") {
        inputdata.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi} `;
          let labelEn = `${item.valueEn} `;
          object.label = language == LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
        //   inputdata.map((item, index) => {
        //     let object = {};
        //     let labelVi = type ==='USERS'? `${item.lastName} ${item.firstName}`:item.valueVi;
        //     let labelEn = type ==='USERS'?`${item.firstName} ${item.lastName}`:item.valueEn;
        //     object.label = language == LANGUAGES.VI ? labelVi : labelEn;
        //     object.value = item.id;
        //     result.push(object);
        //   });
      }
    }

    return result;
  };
  componentDidUpdate(prevProps, preState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      this.setState({
        listDoctor: dataSelect,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctor: dataSelect,
      });
    }
    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfor;

      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listDoctor: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContenMarkDown = () => {
    let { hanOldData } = this.state;
    console.log("selectedPrice: ", this.state.selectedPrice);
    console.log("selectedPayment: ", this.state.selectedPayment);
    console.log("selectedProvince: ", this.state.selectedProvince);
    
    console.log("xemmmm value",this.state.selectedPrice.value)

    this.props.saveDetaiDatalDoctorRedux({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,

      action: hanOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    });
  };
  handleChangeSelect = async (selectedOption) => {
    console.log("xem options", selectedOption.value);
    this.setState({ selectedOption });
    let { listPayment, listPrice, listProvince } = this.state;

    let res = await getDetailInforDoctor(selectedOption.value);

    if (res && res.errcode === 0 && res.data.Markdown) {
      let markdown = res.data.Markdown;
      let addressClinic = "",
        nameClinic = "",
        note = "",
        paymentId = "",
        priceId = "",
        provinceId = "",
        selectedPayment = "",
        selectedPrice = "",
        selectedProvince = "";
console.log("xem neeeeeeee",res.data.Doctor_Infor);
      if (res.data.Doctor_Infor) {
        addressClinic = res.data.Doctor_Infor.addressClinic;
        nameClinic = res.data.Doctor_Infor.nameClinic;
        note = res.data.Doctor_Infor.note;
        paymentId = res.data.Doctor_Infor.paymentId;
        provinceId = res.data.Doctor_Infor.provinceId;
        priceId = res.data.Doctor_Infor.priceId;

        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
      }
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hanOldData: true,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPayment: selectedPayment,
        selectedPrice: selectedPrice,
        selectedProvince: selectedProvince,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hanOldData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",
      });
    }
    console.log("xem selectoption", selectedOption);
  };

  handleOnChangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;

    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption; // Cập nhật giá trị value từ selectedOption
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState(
      {
        ...stateCopy,
      },
      () => {}
    );
  };

  render() {
    let { hanOldData } = this.state;
    console.log("xem state", this.state.listPrice);
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title mb-5 mt-3 px-3">
          <b>Tạo thêm Thông tin bác sĩ</b>
        </div>
        <div className="more-infor">
          <div className="content-left form-group">
            <label>Chọn bác sĩ</label>

            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctor}
              placeholder={"Chọn bác sĩ"}
              className="mb-5"
            />
          </div>
          <div className="content-right">
            <label>Thông tin giới thiệu</label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(event) =>
                this.handleOnChangeText(event, "description")
              }
              value={this.state.description}
            ></textarea>
          </div>
        </div>

        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label>Chọn giá </label>
            <Select
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPrice}
              value={this.state.selectedPrice}
              placeholder={"Chọn giá"}
              name="selectedPrice"
              className="mb-5"
            />
          </div>
          <div className="col-4 form-group">
            <label>Chọn phương thức thanh toán </label>
            <Select
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPayment}
              value={this.state.selectedPayment}
              placeholder={"Chọn phương thức thanh toán"}
              name="selectedPayment"
              className="mb-5"
            />
          </div>
          <div className="col-4 form-group">
            <label>Chọn tỉnh thành</label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listProvince}
              placeholder={"Chọn tỉnh thành"}
              name="selectedProvince"
              className="mb-5"
            />
          </div>

          <div className="col-4 form-group">
            <label>Tên phòng khám </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "nameClinic")}
              value={this.state.nameClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label>Địa chỉ phòng khám </label>
            <input
              className="form-control"
              onChange={(event) =>
                this.handleOnChangeText(event, "addressClinic")
              }
              value={this.state.addressClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label>Note</label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "note")}
              value={this.state.note}
            />
          </div>
        </div>

        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          className={
            hanOldData === true
              ? "save-content-doctor btn btn-warning  mt-3 mb-5 px-3"
              : "create-content-doctor  btn btn-primary mt-3 mb-5 px-3"
          }
          onClick={() => this.handleSaveContenMarkDown()}
        >
          {hanOldData === true ? (
            <span>Lưu thông tin</span>
          ) : (
            <span>Tạo thông tin</span>
          )}
        </button>

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
    saveDetaiDatalDoctorRedux: (data) =>
      dispatch(actions.saveDetaiDatalDoctor(data)),
    getAllRequiredDoctorInfor: () =>
      dispatch(actions.getAllRequiredDoctorInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
