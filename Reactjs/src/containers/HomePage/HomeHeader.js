import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import { Dropdown, NavDropdown } from 'react-bootstrap';
import * as actions from "../../store/actions";






        class HomeHeader extends Component {
          constructor(props){
            super(props);
            
        }
        componentDidMount() {
              
        }
        handleSpecilty=()=>{
          this.props.history.push('/listspecialty');
        }
        handleClinic=()=>{
          this.props.history.push('/listclinic');
        }
        handleDoctor=()=>{
          this.props.history.push('/listdoctor');
        }
        handleIntroduction=()=>{
          this.props.history.push('/introduction');
          
        }

        handlehome=()=>{
          this.props.history.push('/home');
        }
        handledangxuat=()=>{
          const {processLogout} = this.props;
          processLogout();
          this.props.history.push('/home');
        }

 
  render() {
    const {processLogout, userInfo} = this.props;
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <div className="header-logo" onClick={()=>this.handlehome()}></div>
            
            </div>
            <div className="center-content">
              <div className="child-content">
                <div className="chuyenkhoa" onClick={()=>this.handleSpecilty()}>
                  <b>Chuyên Khoa</b>
                </div>
                <div className="subs-title">Tìm Bác Sĩ Theo Chuyên Khoa</div>
              </div>
              <div className="child-content" onClick={()=>this.handleClinic()}>
                <div>
                  <b>Cơ Sở Y Tế</b>
                </div>
                <div className="subs-title" >Chọn bệnh viện phòng khám</div>
              </div>
              <div className="child-content">
                <div className="bacsi" onClick={()=>this.handleDoctor()}>
                 <b>Bác sĩ</b>              
               
                <div className="subs-title">Chọn Bác Sĩ Giỏi</div>
                </div>
              </div>
              <div className="child-content">
                <div className="gioithieu" onClick={()=>this.handleIntroduction()}>
                  <b>Giới Thiệu</b>
                </div>
                <div className="subs-title">Tổng quan HealthyCare</div>
              </div>
            </div>
            <div className="right-content">
              <div className="support" >
              <i className="fas fa-question-circle"></i>
               Hỗ Trợ
              </div>
              <div className="login-homepage">
              <NavDropdown id="dropdown-item-button" title={userInfo ? `Hello, ${userInfo.firstName}` : "Bạn chưa đăng nhập"}>
          {userInfo ? (
               <>
               <NavDropdown.Item onClick={this.handleProfile}>
                 <i className="fas fa-user-check mr-3" style={{ color: '#1660df' }}></i>
                 <Link to='/information'>Xem thông tin cá nhân</Link>
               </NavDropdown.Item>
               <NavDropdown.Item onClick={ ()=>this.handledangxuat()} ><i className="fas fa-sign-out-alt mr-3" style={{color: '#e6360a'}}></i>Đăng xuất</NavDropdown.Item>
             </>
          ) : (
            <Dropdown.Item><Link to='/login'>Đăng nhập</Link></Dropdown.Item>
          )}
        </NavDropdown>
                
              </div>
            </div>
          </div>
        </div>
      
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),

  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
