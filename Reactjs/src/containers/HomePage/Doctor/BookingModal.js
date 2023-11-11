import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import "./BookingModal.scss";
import ProfileDoctor from "./ProfileDoctor";
import _ from 'lodash';
import DatePicker from "../../../components/Input/DatePicker";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/constant";
import Select from "react-select";
import { postPatientBookAppointment} from "../../../services/userService";
import {toast} from "react-toastify";
import moment from "moment/moment";



const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
class BookingModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
        fullName: "",
        phoneNumber:"",
        email:"",
        address:"",
        reason: "",
        birthday:"",
        selectedGender:"",
        doctorId: "",
        genders:"",
        timeType:"",
     
    };
  }
  async componentDidMount() {
   this.props.getGenders();
  }

 buildDataGender=(data)=>{
  let result =[];
  let language=this.props.language;
  if(data&&data.length>0){
    data.map(item =>{
      let object={};
      object.label=language===LANGUAGES.VI?item.valueVi:item.valueEn;
      object.value=item.keyMap;
      result.push(object)
    })
  }
  return result;
 }


 // Hàm kiểm tra định dạng email
 isValidEmail = (email) => {
  return emailRegex.test(email);
};

// Hàm kiểm tra số điện thoại
isValidPhoneNumber = (phoneNumber) => {
  // Xóa mọi ký tự không phải là số
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
  // Kiểm tra xem số điện thoại có đúng 10 chữ số hay không
  return cleanedPhoneNumber.length === 10;
};





  componentDidUpdate(prevProps, prevState, snapshot) {

   
    if (this.props.language !== prevProps.language) {
       this.setState({ 

        genders: this.buildDataGender(this.props.genders)
       })
    }
   
   
    if (this.props.genders !== prevProps.genders) {
       this.setState({
        genders: this.buildDataGender(this.props.genders) 
       })
    }

    if(this.props.dataTime!==prevProps.dataTime){
      if(this.props.dataTime&&!_.isEmpty(this.props.dataTime)){
        let doctorId=this.props.dataTime.doctorId;
        let timeType=this.props.dataTime.timeType;
        this.setState({
          doctorId:doctorId,
          timeType:timeType
        })
      }
    }
  }
  handleOnChangeInput=(event,id)=>{
    let valueInput=event.target.value;
    let copyState={...this.state};
    copyState[id]=valueInput;
    this.setState({
      ...copyState
    })
  }

  handleOnChangeDatePicker=(date)=>{
    this.setState({
  birthday:date[0]
    })
  }

  handleOnChangeSelect=(selectedOption)=>{
    this.setState({selectedGender:selectedOption});
  }

  handleConfirmBooking=async()=>{
    let date= new Date(this.state.birthday).getTime();

    let timeString =this.buildTimeBooking(this.props.dataTime);
    let doctorName=this.buildDoctorName(this.props.dataTime);

    if (!this.isValidEmail(this.state.email)) {
      toast.error("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }

    if (!this.isValidPhoneNumber(this.state.phoneNumber)) {
      toast.error("Vui lòng nhập số điện thoại hợp lệ (10 chữ số).");
      return;
    }

      let res = await postPatientBookAppointment
      ({ 
        fullName: this.state.fullName, 
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
        address: this.state.address,
        reason: this.state.reason,
        date: this.props.dataTime.date,
        birthday:date,
        selectedGender: this.state.selectedGender.value,
        doctorId: this.state.doctorId,
        timeType: this.state.timeType,
        language:this.props.language,
        timeString:timeString,
        doctorName:doctorName,
      });

      if(res&&res.errCode===0){
        toast.success("Đặt lịch khám thành công");
        this.props.closeBookingClose();
      }else{
        toast.error("Đặt lịch khám thất bại");
      }
  }


  

  buildTimeBooking=(dataTime) => {
    let {language}=this.props;
    if(dataTime&&!_.isEmpty(dataTime)){
      let time=language===LANGUAGES.VI?
      dataTime.timeTypeData.valueVi:dataTime.timeTypeData.En;
  
      let date =language===LANGUAGES.VI?
      moment.unix(+dataTime.date/1000).format('dddd - DD/MM/YYYY')
      :
      moment.unix(+dataTime.date/1000).locale('en').format('ddd-MM/DD/YYYY')
  return `${time} - ${date}`

    }
    return ""
  }
 



  

  buildDoctorName =(dataTime) => {
  let { language } = this.props;
  if (dataTime && !_.isEmpty(dataTime)) 
  { 
    let name=language === LANGUAGES.VI ?
  
    `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
    :
    `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
    return name;
  }
  return ""
}
  render() {
   let {isOpenModal,closeBookingClose,dataTime}=this.props;
   let doctorId='';
   if(dataTime&&!_.isEmpty(dataTime)){
    doctorId=dataTime.doctorId
   }

    return (
      <>
      <Modal
      isOpen={isOpenModal}
      className={"booking-modal-container"}
      size="lg"
      centered
      >

      <div className="booking-modal-content">
        <div className="booking-modal-header">
            <span className="left">
Thông tin đặt lịch khám bệnh
            </span>
            <span
            className="right"
            onClick={closeBookingClose}
            >
                <i className="fas fa-times"></i>

            </span>
        </div>
        <div className="booking-modal-body">
<div className="doctor-infor">
<ProfileDoctor
doctorId={doctorId}
ishowDescriptionDoctor={false}
dataTime={dataTime}
/>
</div>

<div className="row">
<div className="col-6 from-group">
<label>Họ tên: </label>
<input className="form-control"
value={this.state.fullName}
onChange={(event)=>this.handleOnChangeInput(event,"fullName")}

/>
</div>
<div className="col-6 from-group">
<label>Số điện thoại: </label>
<input className="form-control"
value={this.state.phoneNumber}
onChange={(event)=>this.handleOnChangeInput(event,"phoneNumber")}
/>
</div>
<div className="col-6 from-group">
<label>Địa chỉ Email:</label>
<input className="form-control"
value={this.state.email}
onChange={(event)=>this.handleOnChangeInput(event,"email")}
/>
</div>
<div className="col-6 from-group">
<label>Địa chỉ liên hệ:</label>
<input className="form-control"
value={this.state.address}
onChange={(event)=>this.handleOnChangeInput(event,"address")}
/>
</div>
<div className="col-6 from-group">
<label>lý do khám:</label>
<input className="form-control"
value={this.state.reason}
onChange={(event)=>this.handleOnChangeInput(event,"reason")}
/>
</div>
<div className="col-6 from-group">
<label>Ngày sinh:</label>
<DatePicker
onChange={this.handleOnChangeDatePicker}
className="form-control"
value={this.state.birthday}
/>
</div>
<div className="col-6 from-group">
<label>Giới tính:</label>
<Select
value={this.state.selectedGender}
onChange={this.handleOnChangeSelect}
options={this.state.genders}

/>
</div>

</div>
        </div>

        <div className="booking-modal-footer">
            <button className="btn-booking-confirm"
            onClick={()=>this.handleConfirmBooking()}
            >Xác nhận</button>
             <button className="btn-booking-cancel"
            onClick={closeBookingClose}
            >Cancel</button>


        </div>
      </div>
      </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders:state.admin.genders
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    getGenders:()=>dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
