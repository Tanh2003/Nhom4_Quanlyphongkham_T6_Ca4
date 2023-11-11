import React from "react";
import { Component } from "react";
import "./DoctorSchedule.scss";
import { connect } from "react-redux";
import moment from "moment/moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorByDate } from "../../../services/userService";
import BookingModal from "./BookingModal";

import { FormattedMessage } from "react-intl";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvalableTime: [],
      isOpenModalBooking:false,
      dataScheuleTimeModal:{}
    };
  }
  async componentDidMount() {
    let { language } = this.props;
    let allDays=this.getArrDays(language);
    this.setState({
      allDays:allDays,
    })
    // this.setArrDays(language);
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {

if(i===0){
  let ddMM=moment(new Date()).format("DD/MM");
  let today=`Hôm nay - ${ddMM}`;
   object.label =today;
}else{
   // object.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
   let labelVi = moment(new Date()).add(i, "days").format("dddd - DD/MM");
   object.label = this.capitalizeFirstLetter(labelVi);
}

} else {
  if(i===0){
    let ddMM=moment(new Date()).format("DD/MM");
    let today=`Today - ${ddMM}`;
     object.label =today;
  }else{
    object.label = moment(new Date())
    .add(i, "days")
    .locale("en")
    .format("ddd - DD/MM");
  }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    this.setState({
      allDays: allDays,
    });
    return allDays;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let allDays =this.getArrDays(this.props.language);
      
      this.setState({
        allDays:allDays,
      })
    }
    if(this.props.doctorIdFromParent!==prevProps.doctorIdFromParent){
      let allDays =this.getArrDays(this.props.language);
      let res= await getScheduleDoctorByDate(this.props.doctorIdFromParent,allDays[0].value);
this.setState({
  allAvalableTime:res.data?res.data:[]
})
    }
  }
  handleOnChangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);
      if (res && res.errCode === 0) {
        this.setState({
          allAvalableTime: res.data ? res.data : [],
        });
      }
    }
  };


handleClickScheduleTime=(time)=>{
  this.setState({
    isOpenModalBooking:true,
    dataScheuleTimeModal:time
  })
}

closeBookingClose=()=>{
  this.setState({
    isOpenModalBooking:false
  })
}

















  render() {
    let { allDays, allAvalableTime,isOpenModalBooking,dataScheuleTimeModal } = this.state;
    let { language } = this.props;

    console.log("sgsggdhaasdsadasd", allAvalableTime);
    return (
      <>
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          <select onChange={(event) => this.handleOnChangeSelect(event)}>
            {allDays &&
              allDays.length > 0 &&
              allDays.map((item, index) => {
                return (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="all-available-time">
          <div className="text-calendar">
            <i className="fas fa-calendar-alt">
              <span>Lịch Khám</span>
            </i>
          </div>
          <div className="time-content">
            {allAvalableTime && allAvalableTime.length > 0 ?

            
            <>
            
            <div className="time-content-btns">
            {allAvalableTime.map((item, index) => {
                let timeDisplay =
                  language === LANGUAGES.VI
                    ? item.timeTypeData.valueVi
                    : item.timeTypeData.valueEn;
                return (<button key={index}
                onClick={()=>this.handleClickScheduleTime(item)}
                >{timeDisplay}</button>)
              })
            }




            </div>
         <div className="book-free">
          <span>
            chọn
            <i className="fas fa-hand-point-up mr-2 ml-2"></i>
             và đặt (miễn phí)

          </span>
         </div>
              
            </>
            :
              <div className="no-schedule">
                không có lịch hẹn trong thời gian này, Vui lòng chọn thời gian
                khác
              </div>
            }
          </div>
        </div>
      </div>
      <BookingModal
      isOpenModal={isOpenModalBooking}
      closeBookingClose={this.closeBookingClose}
      dataTime={dataScheuleTimeModal}
      
      />

      
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
