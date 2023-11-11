import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import Footer from "../System/Admin/Footer";
import HomeHeader from "./HomeHeader";





class Introduction extends Component {
  constructor(props){
    super(props);
    
}
componentDidMount() {
       
}
handleSpecilty=()=>{
  this.props.history.push('/listspecialty');
}
handleDoctor=()=>{
  this.props.history.push('/listdoctor');
}
handleIntroduction=()=>{
  
}

 
  render() {
    return (
      <React.Fragment>
        <HomeHeader/>
        <div className='Intro'>
            <div className='Intro-section'>
                <h2>GIỚI THIỆU</h2>
                <p>
                Chúng tôi, Công ty CP Công nghệ HealthCare, đơn vị sở hữu và vận hành “Nền tảng Y tế Chăm sóc sức khỏe toàn diện HealthCare” 
                bao gồm hệ thống website và các ứng dụng di động. 
                BookingCare cung cấp nền tảng công nghệ để bệnh nhân thuận tiện trong việc đặt lịch dịch vụ y tế với bác sĩ và cơ sở y tế. 
                Bằng việc truy cập hoặc sử dụng dịch vụ của BookingCare, bạn hoàn toàn đồng ý theo các điều khoản, điều kiện dưới đây.
                </p>
                <br></br>
                <p>Chúng tôi duy trì quyền thay đổi hoặc điều chỉnh bất kỳ điều khoản và điều kiện nào dưới đây. 
                    Mọi sửa đổi nếu có sẽ có hiệu lực ngay lập tức sau khi đăng tải trên hệ thống trang này.
                </p>
                <br></br>
            </div>
            <div className='Intro-section'>
                <h2>SỬ DỤNG HEALTHCARE</h2>
                <h3>Thông tin người cung cấp dịch vụ “Khám chữa bệnh”</h3>
                <p>
                Hệ thống HealthCare đăng tải thông tin và lịch khám của bác sỹ, 
                dịch vụ y tế và cơ sở y tế. Các thông tin về bác sĩ, dịch vụ y tế,
                 cơ sở y tế (gọi chung là “Người cung cấp dịch vụ Khám chữa bệnh”) 
                 được cung cấp bởi chính “Người cung cấp dịch vụ Khám chữa bệnh” và
                 các nguồn thông tin tin cậy khác do chúng tôi lựa chọn biên tập.
                </p>
                <br></br>
                <p>
                Chúng tôi cố gắng tìm hiểu và lựa chọn thông tin chính xác để đăng tải trên hệ thống.
                 Tuy nhiên, chúng tôi không đủ điều kiện xác minh sự chính xác tuyệt đối của thông tin đã đăng tải.
                </p>
                <br></br>
            </div>
            <div className='Intro-section'>
                <h2>Dịch vụ đặt lịch khám trực tuyến</h2>
                <p>
                    HealthCare cung cấp nền tảng công nghệ, phương tiện để kết nối bệnh nhân và bác sĩ, cơ sở y tế. 
                    Qua đó cung cấp dịch vụ đặt lịch khám trực tuyến.
                </p>
                <br></br>
                <p>
                    Nhằm hỗ trợ việc đặt lịch khám hiệu quả cao, chúng tôi có thể kết nối thêm với người có nhu cầu đặt lịch 
                thông qua ứng dụng (Apps),tin nhắn SMS, email, dịch vụ OTT và cuộc gọi thoại.
                </p>
                <br></br>
            </div>
        </div>

        <Footer/>












      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Introduction));
