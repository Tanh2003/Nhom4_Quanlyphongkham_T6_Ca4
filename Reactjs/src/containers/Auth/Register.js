import { forEach } from 'lodash';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Button,Modal,ModalHeader,ModalBody,ModalFooter } from 'reactstrap';
import {emitter} from '../../utils/emitter';
import './Registter.scss';
import {createNewUseService} from '../../services/userService';
import {toast} from "react-toastify";
import { withRouter } from 'react-router';
import Footer from '../System/Admin/Footer';





class Register extends Component {

    constructor(props){
        super(props);
        this.state ={
          
     
          email:'',
          password:'',
          rePassword:'',
          firstName:'',
          lastName:'',
          
          phoneNumber:'',
          address:'',
          gender:'M',
          roleId: 'R1'
         



        }
      
    }
    
    componentDidMount() {
     
       
    }
   

   
  handleOnChangeInput=(event,id)=>{
    let copyState={...this.state};
    copyState[id]=event.target.value;
    this.setState({
      ...copyState
    })

  }
  checkValideInput=()=>{
    let isValid=true;
    let checkPass=this.state.rePassword;
    const password = this.state.password;
    const phoneNumber = this.state.phoneNumber;
    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    let arrInput=['email','password','firstName','lastName','phoneNumber','address'];
   
    for(let i=0;i<arrInput.length;i++){
      console.log('check inside loop',this.state[arrInput[i]],arrInput[i]);
      if(!this.state[arrInput[i]])
      {
        isValid=false;
        alert('Vui lòng điền vào : '+arrInput[i]);
       
        
      }

      else if(checkPass!==this.state.password){
        isValid=false;
        alert("Mật khẩu nhập lại không giống vui lòng kiểm tra lại");
        break;
  
      }
     
  
      else if (!emailRegex.test(this.state.email)) {
        isValid = false;
        alert('Email không đúng định dạng');
        break;
      
      }
     
  
      else if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
        isValid = false;
        alert("Mật khẩu yêu cầu ít nhất một chữ cái viết thường, ít nhất một chữ cái viết hoa,ít nhất một số,mật khẩu phải có ít nhất 8 ký tự");
        break;
  
        
      }
      if (!/^\d{10}$/.test(phoneNumber)) {
        isValid = false;
        alert("Số điện thoại phải là số  và phải có 10 số");
        break;
        
      }
      break;
     
  
    
    }

    
    return isValid;
  }

  handleAddNewUser=()=>{
    let isValid= this.checkValideInput();
    if(isValid==true){
      this.taomoinguoidung({
        email:this.state.email,
          password:this.state.password,
          firstName:this.state.firstName,
          lastName:this.state.lastName,
          
          phoneNumber:this.state.phoneNumber,
          address:this.state.address,
          gender: this.state.gender,
          roleId: 'R1'


      });
    }
  }
  taomoinguoidung= async(data)=>{
       
    try {
       let response=await createNewUseService(data); 
       if(response&&response.errcode !==0){
        toast.error("Tạo Tài khoản thất bại !")
        alert(response.errMessage)
       }else{
        toast.success("Tạo Tài khoản thành công !")
        
               
       }
    } catch (e) {
        console.log(e);
    }

}

  handleShowHidePassword=()=>{
    this.setState({
     isShowPassword: !this.state.isShowPassword //  lenh nay dung de  gan gia tri true false
    })
 }

 handleDangNhapTuDK=()=>{
  this.props.history.push('/login');

 }
   

    render() {
     
      
     
        return (
          <div className='register-background'> 
          <div className='register-container'>
           <div className='register-content row'>
               <div className='col-12  text-register'>Đăng kí</div>
               <div className='col-12 form-group register-input'>
                   <label>Email: </label>
                   <input type='email' className='form-control ' placeholder='aa@gmail.com'
                    //value={this.state.username}
                    onChange={(event)=>{
                      this.handleOnChangeInput(event,'email')
              
                    }}
                    value={this.state.email}
                    >

                    </input>

               </div>
               <div className='col-12 form-group register-input'>
                   <label>Mật khẩu: </label>
                   <div className='custom-input-password'>
                   <input type={this.state.isShowPassword ? 'text':"password"} className='form-control' placeholder='********
                   ' //value={this.state.password}
                   onChange={(event)=>{
                    this.handleOnChangeInput(event,'password')
            
                  }}
                  value={this.state.password}>

                   </input>
                   <span
                   onClick={()=>this.handleShowHidePassword()}
                   > 
                   <i class={this.state.isShowPassword?"fas fa-eye":"fas fa-eye-slash"}></i>
                   </span>
              
                   
                   </div>
                  

               </div>
               <div className='col-12 form-group register-input'>
                   <label>Nhập lại mật khẩu: </label>
                   <div className='custom-input-password'>
                   <input type={this.state.isShowPassword ? 'text':"password"} className='form-control' placeholder='********
                   ' //value={this.state.password}
                   onChange={(event)=>{
                    this.handleOnChangeInput(event,'rePassword')
            
                  }}
                  value={this.state.rePassword}>

                   </input>
                   <span
                   onClick={()=>this.handleShowHidePassword()}
                   > 
                   <i class={this.state.isShowPassword?"fas fa-eye":"fas fa-eye-slash"}></i>
                   </span>
              
                   
                   </div>
                  

               </div>
               <div className='col-12 form-group register-input'>
                   <label>Tên: </label>
                   <input type='text' className='form-control ' placeholder='Anh'
                    //value={this.state.username}
                    onChange={(event)=>{
                      this.handleOnChangeInput(event,'firstName')
              
                    }}
                    value={this.state.firstName}
                    
                    >

                    </input>

               </div>
               <div className='col-12 form-group register-input'>
                   <label>Họ: </label>
                   <input type='text' className='form-control ' placeholder='Tuan Anh'
                    //value={this.state.username}
                    onChange={(event)=>{
                      this.handleOnChangeInput(event,'lastName')
              
                    }}
                    value={this.state.lastName}
                    
                    >

                    </input>

               </div>
             
               <div className='col-12 form-group register-input'>
                   <label>Số điện thoại: </label>
                   <input type='text' className='form-control ' placeholder='0123456789'
                    //value={this.state.username}
                    onChange={(event)=>{
                      this.handleOnChangeInput(event,'phoneNumber')
              
                    }}
                    value={this.state.phoneNumber}
                    
                    >

                    </input>

               </div>
               <div className='col-12 form-group register-input'>
                   <label>Địa chỉ: </label>
                   <input type='text' className='form-control ' placeholder='123456.....'
                    //value={this.state.username}
                    onChange={(event)=>{
                      this.handleOnChangeInput(event,'address')
              
                    }}
                    value={this.state.address}
                    
                    >

                    </input>

               </div>
               <div className='col-12 form-group register-input'>
                   <label>Giới tính: </label>
                   <select  type='text' className='form-control ' placeholder='123456.....'
                    //value={this.state.username}
                    onChange={(event)=>{
                      this.handleOnChangeInput(event,'gender')
              
                    }}
                    value={this.state.gender}
                   
                    
                    >
                      <option value="M">Nam</option>
                      <option value="F">Nữ</option>
                      <option value="0">Khác</option>


                    </select>

               

               </div>
               <div className='col-12' style={{color:'red'}}>
                   {this.state.errMessage}

               </div>
               <div className='col-12'>
               <button className='btn-register' onClick={()=>{this.handleAddNewUser()}}>Đăng kí</button>
               </div>
              
              
              
               <div className='col-12  mb-5'>
               <a className='forgot-password' onClick={()=>this.handleDangNhapTuDK()}>Đăng Nhập</a>
               </div>
              
               

              
           </div>
           {/* <Footer/> */}
          </div>
         

          </div>

         




          




          
      
     

      
        );
    }

}

const mapStateToProps = state => {
    return {
    
    };
};

const mapDispatchToProps = dispatch => {
    return {
     
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));








