import React, { Component } from 'react';
import { connect } from "react-redux";
import {CommonUtils} from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import {toast} from "react-toastify";
// import style manually
import {CreateNewSpecialty} from '../../../services/userService';

import Select from 'react-select';
import './ManageSpecialty.scss';
import Footer from'../Admin/Footer';
const mdParser = new MarkdownIt(/* Markdown-it options */);




class ManageSpecialty extends Component {
    constructor(props){
        super(props);
        this.state={

            name:'',
            imageBase64:'',
            descriptionHTML: '',
            descriptionMarkdown:'',
        }
    }
    handleOnchangeInput=(event,id)=>{
        let stateCopy={...this.state}
        stateCopy[id]=event.target.value;
        this.setState({
            ...stateCopy
        })

    }

    handleEditorChange=({ html, text })=> {
       
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown:text,
        })
    }

    handleOnChangeImage= async(event)=>{
        let data =event.target.files;
        let file=data[0];
        if(file){
            let base64= await CommonUtils.getBase64(file);
           
           
            this.setState({
                imageBase64:base64
               

            })
            
        }
       
    }
    handleSaveSpeciatly=async()=>{
        let res= await CreateNewSpecialty(this.state)
        if(res&& res.errcode===0){
            toast.success("Thêm chuyên khoa thành công")

        }else{
            toast.error("Thêm chuyên khoa thất bại")
            console.log("loi cua res:",res)
            

        }
        console.log("dulieune:",this.state)
    }


    render() {
       
       
        return (
            
               <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý chuyên khoa</div>
                
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên chuyên khoa :</label>
                        <input className='form-control' type='text' value={this.state.name}
                        onChange={(event)=>this.handleOnchangeInput(event,'name')}
                        />

                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh chuyên khoa :</label>
                        <input className='form-control-file' type='file'
                        onChange={(event)=>this.handleOnChangeImage(event)}
                        />

                    </div>
                    <div className='col-12'>
                    <MdEditor style={{ height: '300px' }} 
                renderHTML={text => mdParser.render(text)} 
                onChange={this.handleEditorChange}
                value={this.state.descriptionMarkdown}
                />


                    </div>
                    <div className='col-12'>
                      <button className='btn-save-specialty btn btn-primary mt-3 px-3 mb-5'
                      onClick={()=>this.handleSaveSpeciatly()}
                      >
                        Lưu 
                      </button>

                    </div>
                

                </div>
                <Footer/>
                
              
               </div>
           
        );
    }
}

const mapStateToProps = state => {
    return {
      
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
