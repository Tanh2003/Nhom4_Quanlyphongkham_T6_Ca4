import React, { Component } from 'react';

import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}


class TableManageUser extends Component {
    constructor(props){
        super(props);
        this.state={
            userRedux:[]
             
           }
    }
    componentDidMount(){
        this.props.fetchUserRedux();

    }
    componentDidUpdate(prevProps,preState,snapshot){
        if(prevProps.listUsers!==this.props.listUsers){
            this.setState({
                userRedux:this.props.listUsers

            })
        }

    }

    handleDeleteUser=(user)=>{
        this.props.deleteAUserRedux(user.id);
    }

    handleEditUser=(user)=>{
        console.log("toi la thang con",user)


        this.props. handleEditUserFromParentKey(user)

    }

    

    render() {
        console.log('listUsers:',this.props.listUsers);
        console.log('check state:',this.state.userRedux);
        let arrUsers=this.state.userRedux
      
        return (
           <React.Fragment>
                <table id='TableManageUser' className='mb-5'>
                <tbody>
                      <tr>
                        <th>Email</th>
                        <th>Họ</th>
                        <th>Tên</th>
                        <th>Địa chỉ</th>
                        <th>Hành động</th>
                      </tr>
                      {
                            arrUsers&&arrUsers.map((item,index)=>{
                                console.log('tanh check map',item,index)
                                return(
                                    <tr> 
                                        <td>{item.email}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.firstName}</td>
                                        
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'
                                            onClick={()=>{
                                                this.handleEditUser(item)
                                            }}
                                            ><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete'
                                            onClick={()=>{
                                               this.handleDeleteUser(item)

                                            }}><i className="fas fa-trash"></i></button>
                                        </td>
                                      

                                    </tr>
                                )

                            })
                               
                           

                        }
                
                        
                            
                                    

                          
                               
                           

                       
                   </tbody>    
                      

                </table>
               


            </React.Fragment>  
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers:state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux:()=>dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux:(id)=>dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
