import React, { Component } from "react";
import { connect } from "react-redux";
import DoctorHeader from "./DoctorHeader";
import './DRHeader.scss';
import hinh from'../../../assets/bacsi1.jpg';
import * as actions  from'../../../store/actions';
import { LANGUAGES} from '../../../utils/constant';
import { withRouter } from 'react-router';



class ListDoctor extends Component {
  

  constructor(props){
    super(props);
   
    this.state={
      arrDoctors:[]
    
       
    }
}

componentDidMount() {
this.props.loadTopDoctors();
}
componentDidUpdate(prevProps,prevState,snapshot){
  if(prevProps.topDoctorsRedux!==this.props.topDoctorsRedux){
    this.setState({
      arrDoctors:this.props.topDoctorsRedux
    })
  }

}
handleViewDetailDoctor=(doctor)=>{
  console.log("click vaof ra view infor",doctor);
  this.props.history.push(`/detail-doctor/${doctor.id}`);
  

}

  render() {
    let arrDoctors=this.state.arrDoctors;
    let {language}=this.props.language;
    console.log("danh sachs bac si",arrDoctors)
    

    return (
      <div>
        
      <DoctorHeader/>
        <div className="mb-2 mt-3 px-3"><b>Bác sĩ nổi bật</b></div>

      
       {arrDoctors&&arrDoctors.length>0
       &&arrDoctors.map((item,index)=>{
        let imageBase64='';
        if(item.image){

         
           imageBase64=Buffer.from(item.image,'base64').toString('binary');
        

      }
        
        let nameVi=`${item.positionData.valueVi},${item.lastName} ${item.firstName} `;
        let nameEn=`${item.positionData.valueEn}, ${item.lastName} ${item.firstName} `;
        return(
          <div class="doctor-container mb-2" key={index} onClick={()=>this.handleViewDetailDoctor(item)}>
          <div class=" doctor-image"style={{backgroundImage:`url(${imageBase64})`}} >
             


           
                
          </div>
          <div class="doctor-info">
              <div class="doctor-name">{language===LANGUAGES.VI?nameEn:nameVi}</div>
              <div class="doctor-specialty">Chuyên khoa: Nội tiết học</div>
          </div>
         </div>

        )
       })}

       
      
      
      
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language:state.app.language,
    topDoctorsRedux:state.admin.topDoctors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors:()=>dispatch(actions.fetchTopDoctor())


  };
};

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(ListDoctor));
