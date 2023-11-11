import React, { Component } from "react";
import { connect } from "react-redux";
import './DRHeader.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";





class DoctorHeader extends Component {
  constructor(props){
    super(props);
    
}
componentDidMount() {
       
}

 
  render() {
    return (
      <React.Fragment>
        <div className="doctor-header-container">
          
          <div className="doctor-header-content">
            
            <div className="doctor-left-content">
            <Link className="custom-link" to='/home'>
            <i className="fas fa-arrow-left"></i>
            
            <span className="text-doctor">Bác sĩ</span> 
            </Link>
           
            
              
            </div>
            <div className="doctor-center-content">
             
            </div>
            <div className="doctor-right-content">
              
              
            </div>
          </div>
        </div>
       
          <div className="search-container">
          <input type="text" placeholder="Tìm kiếm bác sĩ "/>
          
          </div>
        
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorHeader);
