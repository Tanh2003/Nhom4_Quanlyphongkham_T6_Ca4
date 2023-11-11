import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _, { times } from "lodash";
import { saveBulkScheduleDoctor } from "../../../services/userService";

class DoctorSchedule extends Component {
    
  constructor(props) {
    
    super(props);
    this.state = {
        
      listDoctors: [],
      selectedDoctor: "",
      currentDate: "",
      rangeTime: [],
    
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllScheduleTime();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDateInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map(item => ({ ...item, isSelected: false }));
      }
      this.setState({
        rangeTime: data,
      });
    }
  }
  buildDateInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} $${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  handleOnchangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };
  handleSaveSchedule = async () => {
    const { userInfo} = this.props;
    let { rangeTime, currentDate } = this.state;
    let result = [];
    if (!currentDate) {
      toast.error("Invalid date!");
      return;
    }
   
    let formatedDate = new Date(currentDate).getTime();
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule, index) => {
          let object = {};
          object.doctorId = userInfo.id;
          object.date = formatedDate;
          object.timeType = schedule.keyMap;
          result.push(object);
        });
      } else {
        toast.error("Invalid selected time! ");
        return;
      }
    }
    console.log("xem thong tin 1",result);
    console.log("xem bac si co gi ", userInfo.id);
    console.log("xem thong tin 3",formatedDate);
    let res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: userInfo.id,
      formatedDate: formatedDate,
    });
    if(res&&res.errCode===0){
      toast.success("lưu thành công")
    }else{
      toast.error("lưu thất bại")
    }

  
  };

  
  render() {
  
    let { rangeTime } = this.state;
    let { language } = this.props;
    let yesterday=new Date(new Date().setDate(new Date().getDate()-1));
   
    return (
      <div className="manage-schedule-container">
        <div className="m-s-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
           
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
              <DatePicker
                onChange={this.handleOnchangeDatePicker}
                className="form-control"
                value={this.state.currentDate}
                minDate={yesterday}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      className={
                        item.isSelected === true
                          ? "btn btn-schedule active"
                          : "btn btn-schedule"
                      }
                      key={index}
                      onClick={() => this.handleClickBtnTime(item)}
                    >
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <div className="col-12">
            <button
  className="btn btn-primary btn-save-schedule"
  onClick={() => this.handleSaveSchedule()} // Add parentheses here
>
  <FormattedMessage id="manage-schedule.save" />
</button>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allScheduleTime: state.admin.allScheduleTime,
    userInfo: state.user.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    fetchAllDoctors:()=> dispatch(actions.fetchAllDoctor()),
    fetchAllScheduleTime:()=> dispatch(actions.fetchAllScheduleTime()),
   

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
