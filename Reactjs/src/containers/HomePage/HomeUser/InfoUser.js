import React, { Component } from "react";
import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import "./InfoUser.scss";
import hinhu from "../../../assets/hinhu.jpg";
import HomeHeader from "../HomeHeader";
import Footer from "../../System/Admin/Footer";

import ModalUpdateInfo from "./ModalUpdateInfo";
import { toast } from "react-toastify";
import { editUserService,getAllUser } from '../../../services/userService';







class InfoUser extends Component {
  constructor(props){
    super(props);
    
    this.state={
      isOpenModalEditUser:false,
      userEdit:{},
      nguoidung:{},
    
  
    
  
     
  }
    
}
async componentDidMount() {
  await this.getAllUserFromReact();
}
getAllUserFromReact=async()=>{
  const { userInfo} = this.props;
  let id=userInfo&&userInfo.id;
  
  let response =await getAllUser(id);
  if(response && response.errcode==0){
   this.setState({
       nguoidung:response.users

       });
  
  }
}
toggleUserEditModal=()=>{
  this.setState({
      isOpenModalEditUser:!this.state.isOpenModalEditUser,
  })
}
handleEditUser=(user)=>{

  this.setState({
      isOpenModalEditUser:true,
      userEdit:user
  })

      }

      doEditUser=async(user)=>{
        try {
            let res= await editUserService(user);
            if(res && res.errcode==0){
                this.setState({
                    isOpenModalEditUser:false
                })
                await this.getAllUserFromReact();
               
            }
            else{
                toast.error("Sửa Thất bại")
            }
            
        } catch (e) {
            console.log(e);
        }

    }




 
  render() {
    const { userInfo} = this.props;
    let nguoidung=this.state.nguoidung;
    console.log('xem item',userInfo)
    return (
       <div>

  <HomeHeader/>
<hr/>
        <div className="user-info-container">
        {
          this.state.isOpenModalEditUser&&
          <ModalUpdateInfo
          isOpen={this.state.isOpenModalEditUser}
                toggleFromParent={this.toggleUserEditModal}
                currentUser={this.state.userEdit}
                editUser={this.doEditUser}
          />
        }
        <div className="user-info-left">
          <img src={hinhu} alt="User Avatar" />
        </div>
        <div className="user-info-right">
          <h2>Thông tin Người dùng</h2>
          <p>Họ: {
            nguoidung!==null?
          nguoidung&&this.state.nguoidung.lastName:
          userInfo&&userInfo.lastName
          }</p>
          
          <p>Tên: {
          nguoidung!==null?
          nguoidung&&this.state.nguoidung.firstName:
          userInfo&&userInfo.firstName
          
          }</p>
          <p>Địa chỉ: {
            nguoidung!==null?
          nguoidung&&this.state.nguoidung.address:
          userInfo&&userInfo.address
          
          } </p>
          <p>Số điện thoại:{
            nguoidung!==null?
          nguoidung&&this.state.nguoidung.phoneNumber:
          userInfo&&userInfo.phoneNumber
          } </p>
          <p>Giới Tính: {
            nguoidung!==null?
            nguoidung && this.state.nguoidung.gender === 'F' ? 'Nam' : nguoidung && this.state.nguoidung.gender === 'M' ? 'Nữ' : 'Khác'
          :
          userInfo && userInfo.gender === 'F' ? 'Nam' : userInfo && userInfo.gender === 'M' ? 'Nữ' : 'Khác'
          }</p>


          <button className="btn btn-warning mt-3 mb-3 " onClick={()=>this.handleEditUser(userInfo)}>Cập nhật thông tin cá nhân</button>

        </div>
      </div>
      <div className="otrong">

      </div>
      <hr/>
      <Footer/>
      </div>
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
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InfoUser));
