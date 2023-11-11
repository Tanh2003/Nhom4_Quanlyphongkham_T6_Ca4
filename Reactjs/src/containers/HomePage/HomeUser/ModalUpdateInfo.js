import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { toast } from "react-toastify";
import _ from 'lodash';
import hinhu from "../../../assets/hinhu.jpg";
import { Button,Modal,ModalHeader,ModalBody,ModalFooter } from 'reactstrap';

class ModalUpdateInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id:'',
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      gender: '',
    };
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
   

    handleSaveUser=()=>{

        this.props.editUser(this.state);
        toast.success("Sửa thành công !")   
      }

   
     
    

  render() {
    return (
      
      <div>
          <Modal isOpen={this.props.isOpen} 
           toggle={()=>{this.toggle()}} 
           className={'model-user-container'}
           size='lg'
           centered
           
           
           
           >
             <ModalHeader className='header-user-content'  toggle={()=>{this.toggle()}}> <h2>Cập nhật thông tin Người dùng</h2></ModalHeader>
             <ModalBody>
             <div className="user-info-container">
          <div className="user-info-left">
            <img src={hinhu} alt="User Avatar" />
          </div>
          <div className="user-info-right">
           
            <p>Họ:
              <input
                type="text"
                onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                value={this.state.firstName}
              />
            </p>
            <p>Tên:
              <input
                type="text"
                onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                value={this.state.lastName}
              />
            </p>
            <p>Địa chỉ:
              <input
                type="text"
                onChange={(event) => this.handleOnChangeInput(event, 'address')}
                value={this.state.address}
              />
            </p>
            <p>Số điện thoại:
              <input
                type="text"
                onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                value={this.state.phoneNumber}
              />
            </p>
            <p>Giới Tính:
              <select
                className=""
                onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                value={this.state.gender}
              >
                <option>Chose...</option>
                <option value="F">Nam</option>
                <option value="M">Nữ</option>
                <option value="O">Khác</option>
              </select>
            </p>
           
          </div>
        </div>

             </ModalBody>
 <ModalFooter>
 <button className="btn btn-warning mt-3 mb-3" onClick={() => this.handleSaveUser()}>Lưu</button>
  
 </ModalFooter>




           </Modal>
       
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

export default withRouter(connect(mapStateToProps)(ModalUpdateInfo));
