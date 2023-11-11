import { forEach } from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button,Modal,ModalHeader,ModalBody,ModalFooter } from 'reactstrap';
import {emitter} from '../../utils/emitter';
import {toast} from "react-toastify";

class ModalUser extends Component {

    constructor(props){
        super(props);
        this.state ={
          email:'',
          password:'',
          firstName:'',
          lastName:'',
          address:'',
          phoneNumber:'',
          gender:'',
          roleId:'R1'



        }
        this.listenToEmitter();
    }
    listenToEmitter=()=>{
      emitter.on('EVENT_CLEAR_MODAL_DATA',()=>{
        //reset state
        this.setState({
          email:'',
          password:'',
          firstName:'',
          lastName:'',
          address:'',
          phoneNumber:'',
          gender:'',
          roleId:'R1'
        })
      });

    }
    componentDidMount() {
       
    }
   
      toggle=()=>{
       this.props.toggleFromParent();

      }

      handleOnChangeInput=(event,id)=>{
        //bad code.
        /**
         * this.state={
         * email:'',
         * password:''
         * }
         * this.state.email==this.state['emal']
         * 
         * 
         * 
         */
        // this.state[id]=event.target.value;
        // this.setState({
        //   ...this.state
        // },()=>{
        //   console.log('check bad state : ',this.state)
        // })



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
      checkValideInput=()=>{
        let isValid=true;
        let arrInput=['email','password','firstName','lastName','address','phoneNumber','gender','roleId'];
       
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



      handleAddNewUser=()=>{
        let isValid= this.checkValideInput();

        if(isValid==true){
          //call api create modal
        //  console.log('check props child:',this.props);
          this.props.createNewUser(this.state);
        // console.log('data modal:',this.state)
        toast.success("Tạo Thành công")
        

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
        <ModalHeader className='header-user-content'  toggle={()=>{this.toggle()}}>Thêm mới tài khoản khách hàng</ModalHeader>
        <ModalBody>
        <div className="container">
        <div className="row">
             <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Email</label>
                    <input type="email"
                    placeholder="Email"
                    className="form-control"
                     onChange={(event)=>{
                      this.handleOnChangeInput(event,'email')
              
                    }}
                    value={this.state.email}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label for="inputPassword4">Mật khẩu</label>
                    <input type="password" className="form-control"  placeholder="********"
                    onChange={(event)=>{
                      this.handleOnChangeInput(event,'password')
                    }}
                    value={this.state.password}/>
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
                    <div className="form-group col-md-6">
                      <label>Họ</label>
                      <input type="text"  className="form-control"  placeholder="Họ"
                      onChange={(event)=>{
                        this.handleOnChangeInput(event,'lastName')
                      }}
                      value={this.state.lastName}/>
                    </div>
                  </div>


                
                <div className="form-group">
                  <label for="inputAddress">Địa chỉ</label>
                  <input type="text" className="form-control" placeholder="1234 Main St"
                  onChange={(event)=>{
                    this.handleOnChangeInput(event,'address')
                  }}
                  value={this.state.address}/>
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
                  <div className="form-group col-md-6">
                    <label>Giới Tính</label>
                    <select className="form-control"onChange={(event)=>{
                      this.handleOnChangeInput(event,'gender')
                    }}
                    value={this.state.gender}>
                      <option >Chose...</option>
                      <option value="M">Nam</option>
                      <option value="F">Nữ</option>
                      <option value="0">Khác</option>
                    </select>
                  </div>
                  {/* <div className="form-group col-md-6">
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
           onClick={()=>{this.handleAddNewUser()}}>
            Thêm
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);








