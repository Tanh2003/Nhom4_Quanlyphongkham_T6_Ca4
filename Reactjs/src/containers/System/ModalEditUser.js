import { forEach } from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button,Modal,ModalHeader,ModalBody,ModalFooter } from 'reactstrap';
import {emitter} from '../../utils/emitter';
import _ from 'lodash';
import {toast} from "react-toastify";

class ModalEditUser extends Component {

    constructor(props){
        super(props);
        this.state ={
          id:'',
          email:'',
          password:'',
          firstName:'',
          lastName:'',
          address:'',
          phoneNumber:'',
          gender:'',
          roleId:''



        }
       
    }
    
    componentDidMount() {
      let user=this.props.currentUser;
    // cachs 2 //let {CurrentUser}=this.props;
    if(user&&!_.isEmpty(user)){
      this.setState({
          id:user.id,
          email:user.email,
          firstName:user.firstName,
          lastName:user.lastName,
          address:user.address,
          phoneNumber:user.phoneNumber,
          gender:user.gender,
          roleId:user.roleId

      })
    }
       
    }
   
      toggle=()=>{
       this.props.toggleFromParent();
       

      }

      handleOnChangeInput=(event,id)=>{
       

        //good code
        let copyState={...this.state};
        copyState[id]=event.target.value;
        this.setState({
          ...copyState
        },()=>{
         // console.log('check good state: ',this.state);
        })
        //console.log('copystate: ',copyState);
      
       // console.log(event.target.value,id)
      }
     



      checkValideInputEdit=()=>{
        let isValid=true;
        let arrInput=['email','firstName','lastName','address','phoneNumber'];
       
        for(let i=0;i<arrInput.length;i++){
          console.log('check inside loop',this.state[arrInput[i]],arrInput[i]);
          if(!this.state[arrInput[i]])
          {
            isValid=false;
            alert('Missing parameter: '+arrInput[i]);
            break;
          }
        }
        
        return isValid;
      }



      handleSaveUser=()=>{
        let isValid= this.checkValideInputEdit();

        if(isValid==true){
       
          this.props.editUser(this.state);
          toast.success("Sửa thành công !")
       
       
       
        

        }

     
       

      }


    

    
    render() {
    
     
        return (
           <Modal isOpen={this.props.isOpen} 
           toggle={()=>{this.toggle()}} 
           className={'model-user-container'}
           size='lg'
           centered
           
           
           
           >
        <ModalHeader className='header-user-content'  toggle={()=>{this.toggle()}}>Sửa tài tài khoản khách hàng</ModalHeader>
        <ModalBody>
        <div className="container">
        <div className="row">
             <div className="form-row">
                  <div className="form-group col-md-6 px-3">
                    <label>Email</label>
                    <input type="email"
                    placeholder="Email"
                    className="form-control"
                     onChange={(event)=>{
                      this.handleOnChangeInput(event,'email')
              
                    }}
                    value={this.state.email}
                    disabled
                    />
                  </div>
                </div>

                <div className="form-row">
                  
                    <div className="form-group col-md-6 px-3" >
                      <label>Tên</label>
                      <input  type="text"  className="form-control"  placeholder="Tên" 
                      onChange={(event)=>{
                        this.handleOnChangeInput(event,'firstName')
                      }}
                      value={this.state.firstName}/>
                    </div>
                    <div className="form-group col-md-6 px-3">
                      <label>Họ</label>
                      <input type="text"  className="form-control"  placeholder="Họ"
                      onChange={(event)=>{
                        this.handleOnChangeInput(event,'lastName')
                      }}
                      value={this.state.lastName}/>
                    </div>
               


                
                <div className="form-group col-md-6 px-3">
                  <label for="inputAddress">Địa chỉ</label>
                  <input type="text" className="form-control" placeholder="1234 Main St"
                  onChange={(event)=>{
                    this.handleOnChangeInput(event,'address')
                  }}
                  value={this.state.address}/>
                </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6 px-3">
                    <label for="inputCity">Số điện thoại</label>
                    <input type="text" className="form-control"  placeholder='0123456789'
                    onChange={(event)=>{
                      this.handleOnChangeInput(event,'phoneNumber')
                    }}
                    value={this.state.phoneNumber}/>
                  </div>
                  <div className="form-group col-md-6 px-3">
                    <label>Giới tính</label>
                    <select className="form-control"onChange={(event)=>{
                      this.handleOnChangeInput(event,'gender')
                    }}
                    value={this.state.gender}>
                      <option >Chose...</option>
                      <option value="F">Nam</option>
                      <option value="M">Nữ</option>
                      <option value="O">Khác</option>
                    </select>
                  </div>
                  {/* <div className="form-group col-md-6 px-3">
                    <label>Role</label>
                    <select  className="form-control"onChange={(event)=>{
                      this.handleOnChangeInput(event,'roleId')
                    }}
                    value={this.state.roleId}>
                        <option >Chose...</option>
                        <option value="1">Admin</option>
                        <option value="2">Doctor</option>
                        <option value="3">Paitient</option>
                      </select>
                  </div> */}
                </div>
                
         
        </div>
    </div>
          

        </ModalBody>
        <ModalFooter>
        <Button variant="primary"
         color='primary'
          className='px-3'
           onClick={()=>{this.handleSaveUser()}}>
            Lưu thay đổi
          </Button>
          <Button variant="secondary" color='danger' className='px-3' onClick={()=>{this.toggle()}}>
            Đóng
          </Button>
         
        </ModalFooter>
      </Modal>
     

      
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);








