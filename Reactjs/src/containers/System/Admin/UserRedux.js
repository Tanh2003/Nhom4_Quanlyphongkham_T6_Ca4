import React, { Component } from 'react';
import "../Admin/UserRedux.scss"
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {getAllCodeService} from "../../../services/userService";
import { LANGUAGES,CRUD_ACTIONS} from '../../../utils/constant';
import {CommonUtils} from '../../../utils';
import * as actions from '../../../store/actions';

import { flatMap } from 'lodash';
import TableManageUser from './TableManageUser';
 import Footer from './Footer';
class UserRedux extends Component {

    constructor(props){
        super(props);
        this.state={
            genderArr:[],
            positionArr:[],
            roleArr:[],
            previewImgURL:" ",
           // isOpen:false,
           

          



            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',
            phoneNumber:'',
            gender:'',
            position:'',
            role:'',
            avatar:'',

            action:'',
            userEditId:'',

        }
    }

   async componentDidMount() {
    this.props.fetchGenderStart();
    this.props.fetchPositionStart();
    this.props.fetchRoleStart();

    

        // try {
        //     let res=await getAllCodeService('gender');
        //     if(res&&res.errcode===0){
        //         this.setState({
        //             genderArr:res.data
        //         })
        //     }

            
        
        // } catch (e) {
        //     console.log(e);
            
        // }
    }


    componentDidUpdate(prevProps,prevState,snapshot){
        if(prevProps.genderRedux!== this.props.genderRedux){
            let arrGenders=this.props.genderRedux;
            this.setState({
                genderArr:arrGenders,
                gender:arrGenders &&arrGenders.length>0?arrGenders[0].keyMap:""

            })
        }
        if(prevProps.roleRedux!== this.props.roleRedux){
            let arrRoles=this.props.roleRedux;
            
            this.setState({
                roleArr:arrRoles,
                role:arrRoles&&arrRoles.length>0?arrRoles[0].keyMap:""
            })
        }
        if(prevProps.positionRedux!== this.props.positionRedux){
            let arrPositions=this.props.positionRedux;
            this.setState({
                positionArr:arrPositions,
                position:arrPositions&&arrPositions.length>0?arrPositions[0].keyMap:""
            })
        }

        if(prevProps.listUsers!==this.props.listUsers){
            let arrRoles=this.props.roleRedux;
            let arrGenders=this.props.genderRedux;
            let arrPositions=this.props.positionRedux;
          
           
            this.setState({
                
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',
            phoneNumber:'',
            gender:arrGenders &&arrGenders.length>0?arrGenders[0].keyMap:"",
            role:arrRoles&&arrRoles.length>0?arrRoles[0].keyMap:"",
            position:arrPositions&&arrPositions.length>0?arrPositions[0].keyMap:"",
            avatar:'',
            action:CRUD_ACTIONS.CREATE,
            previewImgURL:''//  bị bug khi sửa  trường khác thì mất hình luôn  còn ko sét null thì chạy bth

            

            })
        }

    }
    handleOnChangeImage= async(event)=>{
        let data =event.target.files;
        let file=data[0];
        if(file){
            let base64= await CommonUtils.getBase64(file);
           
            let objectUrl=URL.createObjectURL(file);
            this.setState({
                previewImgURL:objectUrl,
                avatar:base64

            })
            
        }
       
    }
    handleSaveUser=()=>{
      let isValid=  this.checkValidateInput();
      if(isValid==false)return;


      let{action}=this.state;



      if(action===CRUD_ACTIONS.CREATE){

      //fire redux create user
        this.props.createNewUser({
            email:this.state.email,
            password:this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address:this.state.address,
            phoneNumber:this.state.phoneNumber,
            gender: this.state.gender, 
            roleId: this.state.role,
            positionId:this.state.position,
            avatar:this.state.avatar,
            
    
          })
    
          // this.props.fetchUserRedux();

      }
      if(action===CRUD_ACTIONS.EDIT){
        this.props.editAUserRedux({
            id:this.state.userEditId,
            email:this.state.email,
            password:this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address:this.state.address,
            phoneNumber:this.state.phoneNumber,
            gender: this.state.gender, 
            roleId: this.state.role,
            positionId:this.state.position,

            avatar:this.state.avatar

        })



      }




   
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber'];
      
        for (let i = 0; i < arrCheck.length; i++) {
          const fieldName = arrCheck[i];
          const fieldValue = this.state[fieldName];
      
          if (!fieldValue) {
            isValid = false;
            alert("Missing input is required: " + fieldName);
            break;
          }
      
          // Điều kiện kiểm tra cụ thể cho từng trường
          if (fieldName === 'email') {
            // Kiểm tra định dạng email
            const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!emailPattern.test(fieldValue)) {
              isValid = false;
              alert("Email không đúng định dạng");
              break;
            }
          }
      
         else if (fieldName === 'password') {
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (!passwordPattern.test(fieldValue)) {
              isValid = false;
              alert("Mật khẩu yêu cầu ít nhất một chữ cái viết thường, ít nhất một chữ cái viết hoa,ít nhất một số,mật khẩu phải có ít nhất 8 ký tự");
              break;
            }
          }
          
         else if (fieldName === 'phoneNumber') {
            // Kiểm tra xem giá trị nhập vào có phải là một chuỗi chứa chính xác 10 chữ số không
            const phoneNumberPattern = /^\d{10}$/;
            if (!phoneNumberPattern.test(fieldValue)) {
              isValid = false;
              alert("Số điện thoại phải là số  và phải có 10 số");
              break;
            }
          }
      
          // Các điều kiện kiểm tra khác cho các trường khác có thể được thêm vào ở đây
      
        }
      
        return isValid;
      }
      
    openPreviewImage =()=>{
        this.setState({
            isOpen:true
        })
    }

    onChangeInput=(event,id)=>
    {
         let copyState={...this.state}
    copyState[id]=event.target.value;
    this.setState({
        ...copyState
    },()=>{

    })
       

       
    }
    handleEditUserFromParent = (user)=>{
        let imageBase64='';
        if(user.image){

            // const imageBuffer = Buffer.from(JSON.stringify(user.image));
             imageBase64=new Buffer.from(user.image,'base64').toString('binary');
          

        }



      

        
        this.setState({
                
            email:user.email,
            password:"NT@asdd01222",
            firstName:user.firstName,
            lastName:user.lastName,
            address:user.address,
            phoneNumber:user.phoneNumber,
            gender:user.gender,
            role:user.roleId,
            position:user.positionId,
            avatar:"",
            previewImgURL:imageBase64,
            action:CRUD_ACTIONS.EDIT, // đổi màu nút lưu của sửa
            userEditId:user.id

            })

    }


    render() {
      
        let genders=this.state.genderArr;
        let roles=this.state.roleArr;
        let positions=this.state.positionArr;
        let language =this.props.language;
       
        //let isGetGenders=this.props.isLoadingGender;
        let{ email,
            password,
            firstName,
            lastName,
            address,
            phoneNumber,
            gender,
            position,
            role,
            avatar}=this.state;








        return (
            <div className='user-redux-container'>
                <div className='title'>
                Quản lý Tài khoản


            </div >
         
            <div className="user-redux-body" >

               <div className='container center'>
                <div className='row-12'>
              
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                <label ><FormattedMessage id={'manage-user.email'}/></label>
                                <input  className="form-control" placeholder="nhoxtuananh@gmail.com"
                                value={email}
                                onChange={(event)=>{this.onChangeInput(event,'email')}}
                                disabled={this.state.action===CRUD_ACTIONS.EDIT?true:false}
                                
                                />
                                </div>
                                <div className="form-group col-md-6">
                                <label ><FormattedMessage id={'manage-user.password'}/></label>
                                <input type="password" className="form-control" placeholder="********"
                                 value={password}
                                 onChange={(event)=>{this.onChangeInput(event,'password')}}
                                 disabled={this.state.action===CRUD_ACTIONS.EDIT?true:false}
                                />
                                </div>
                            </div>
                         <div className="form-row">

                            <div className="form-group col-md-6">
                                <label><FormattedMessage id={'manage-user.first-name'}/></label>
                                <input type="text" className="form-control"  placeholder="Anh"
                                 value={firstName}
                                 onChange={(event)=>{this.onChangeInput(event,'firstName')}}
                                />

                            </div>


                            
                            <div className="form-group col-md-6">
                                <label ><FormattedMessage id={'manage-user.last-name'}/></label>
                                <input type="text" className="form-control"  placeholder="Tuấn"
                                 value={lastName}
                                 onChange={(event)=>{this.onChangeInput(event,'lastName')}}/>
                            </div>

                            </div>
                            <div className="form-row">
                            <div className="form-group col-md-6">
                                <label ><FormattedMessage id={'manage-user.address'}/></label>
                                <input type="text" className="form-control"  placeholder="1234 Main St"
                                 value={address}
                                 onChange={(event)=>{this.onChangeInput(event,'address')}}/>
                            </div>
                            <div className="form-group col-md-6">
                                <label ><FormattedMessage id={'manage-user.phone-number'}/></label>
                                <input type="text" className="form-control"  placeholder="0123456789"
                                 value={phoneNumber}
                                 onChange={(event)=>{this.onChangeInput(event,'phoneNumber')}}/>
                            </div>

                        </div>
                            <div className="form-row">
                            <div className="form-group col-md-3">
                                <label ><FormattedMessage id={'manage-user.gender'}/></label>
                                <select  className="form-control"
                                 onChange={(event)=>{this.onChangeInput(event,'gender')}}
                                 value={gender}
                                >
                                    {genders&&genders.length>0
                                    && genders.map((item,index)=>{
                                        return(
                                            <option keyMap={index} value={item.keyMap}>{language===LANGUAGES.VI? item.valueVi:item.valueEn}</option>
                                        )
                                    })
                                    
                                    }
                                    
                                </select>
                                <div className='row-12'>
                            <button  className={this.state.action===CRUD_ACTIONS.EDIT?"btn btn-warning mt-3 px-3":"btn btn-primary mt-3 px-3"} onClick={()=>this.handleSaveUser()}>
                                
                                {this.state.action===CRUD_ACTIONS.EDIT?
                                <FormattedMessage id={'manage-user.edit'}/>
                                :
                                <FormattedMessage id={'manage-user.save'}/>
                                
                                
                                }
                                
                                
                                </button>

                            </div>
                                </div>
                                <div className="form-group col-md-3">
                                <label ><FormattedMessage id={'manage-user.position'}/></label>
                                <select  className="form-control"
                                 onChange={(event)=>{this.onChangeInput(event,'position')}}
                                 value={position}
                                >
                                {positions&&positions.length>0
                                    && positions.map((item,index)=>{
                                        return(
                                            <option keyMap={index} value={item.keyMap}>{language===LANGUAGES.VI? item.valueVi:item.valueEn}</option>
                                        )
                                    })
                                    
                                    }

                                </select>
                                </div>
                                
                               
                                <div className="form-group col-md-3">
                                <label ><FormattedMessage id={'manage-user.role'}/></label>
                                <select  className="form-control"
                                 onChange={(event)=>{this.onChangeInput(event,'role')}}
                                 value={role}
                                >
                                


                                    {roles&&roles.length>0
                                    && roles.map((item,index)=>{
                                        return(
                                            <option keyMap={index} value={item.keyMap}>{language===LANGUAGES.VI? item.valueVi:item.valueEn}</option>
                                        )
                                    })
                                    
                                    }

                                </select>
                                </div>
                                
                                
                                <div className="form-group col-md-3">
                                    
                                <label ><FormattedMessage id={'manage-user.image'}/></label>
                                <div className='lamdep'>
                                <input type='file' id='previewImg' hidden
                                onChange={(event)=>this.handleOnChangeImage(event)}
                                
                                ></input>
                                <label className='label-upload' htmlFor='previewImg'>tải ảnh <i className="fas fa-upload"></i></label>
                                <div className='preview-image'
                                style={{backgroundImage:`url(${this.state.previewImgURL})`}}
                               onClick={()=>this.openPreviewImage()}
                               >
                                
                              
                                </div>
                                
                                </div>
                                
                                </div>
                               
                            </div>
                            <div className='from-row'>
                                <div className='from-group  mb-5'>
                                <TableManageUser
                                 handleEditUserFromParentKey={this.handleEditUserFromParent}
                                 action={this.state.action}
                                 
                                 />
                                
                                </div>
                           

                            </div>
                            <div className='from-row col-12'>
                                <div className='from-group  mb-5'>
                                <Footer/>
                                </div>
                           

                            </div>

        
                           
                

                </div>
            </div>
           
            

          
           
           
            
            </div>
            
            </div>
            
            
        )
    }

}

const mapStateToProps = state => {
    return {
        language:state.app.language,
        genderRedux:state.admin.genders,
        roleRedux:state.admin.roles,
        positionRedux:state.admin.positions,
       //isLoadingGender:state.admin.isLoadingGender,
        listUsers:state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart:()=> dispatch(actions.fetchGenderStart()),
        fetchPositionStart:()=> dispatch(actions.fetchPositionStart()),
        fetchRoleStart:()=> dispatch(actions.fetchRoleStart()),
        createNewUser:(data)=> dispatch(actions.createNewUser(data)),
        fetchUserRedux:()=>dispatch(actions.fetchAllUsersStart()),
        editAUserRedux:(data)=>dispatch(actions.editAUser(data))
        // processLogout: () => dispatch(actions.processLogout()),
        // ChangeLanguageAppRedux:(language)=>dispatch(actions.ChangeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
