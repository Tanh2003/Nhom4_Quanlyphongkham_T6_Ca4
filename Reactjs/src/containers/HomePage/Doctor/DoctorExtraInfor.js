import React, { Component } from "react";
import "./DoctorExtraInfor.scss";
import { connect } from "react-redux";

import { LANGUAGES } from "../../../utils";
import { getExtraInforDoctorById } from "../../../services/userService";
import { NumericFormat } from 'react-number-format';
class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
isShowDetailInfor:false,
extraInfor:{}
    };
  }

  async componentDidMount() {
    // Các thao tác bạn muốn thực hiện khi component được tạo
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      // Xử lý khi ngôn ngữ thay đổi
    }
    if(this.props.doctorIdFromParent!==prevProps.doctorIdFromParent){
      let res =await getExtraInforDoctorById(this.props.doctorIdFromParent);
      if(res&&res.errcode===0){
        this.setState({
          extraInfor:res.data
        })
      }
    }
  }

  showHideDetailInfor=(status)=>{
    this.setState({
        isShowDetailInfor:status
    })
  }

  render() {
    let {isShowDetailInfor,extraInfor}=this.state;

    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
            <div className="text-address"> ĐỊA CHỈ KHÁM</div>
            <div className="name-clinic">{extraInfor&&extraInfor.nameClinic}</div>
            <div className="detail-address">{extraInfor&&extraInfor.addressClinic}</div>


        </div>
        <hr/>
        <div className="content-down">
            {isShowDetailInfor===false&&
            <div className="short-infor">
            GIÁ KHÁM: {extraInfor&&extraInfor.priceTypeData&&<NumericFormat className="currency"
            value={extraInfor.priceTypeData.valueVi}
            displayType={'text'}
            thousandSeparator={true}
            suffix={'VND'} />}
            <span onClick={()=>this.showHideDetailInfor(true)}>Xem chi tiết</span>
            </div>
            
            }

{isShowDetailInfor===true&&
<>
<div className="title-price">GIA KHAM: .</div>
<dic className="detail-infor">
    <dic className='price'>
        <span className="left"> Giá khám: </span>
        <span className="right"> {extraInfor&&extraInfor.priceTypeData&&<NumericFormat className="currency"
            value={extraInfor.priceTypeData.valueVi}
            displayType={'text'}
            thousandSeparator={true}
            suffix={'VND'} />}</span>
    </dic>
    <div className="note">{extraInfor&&extraInfor.note?extraInfor.note:""}</div>

    
</dic>
<div className="payment">Phương thức thanh toán:{extraInfor&&extraInfor.paymentTypeData?extraInfor.paymentTypeData.valueVi:""}</div>
<div className="hide-price">
<span onClick={()=>this.showHideDetailInfor(false)}>ẩn bảng giá</span>

</div>
</>
}
                </div>
            
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
