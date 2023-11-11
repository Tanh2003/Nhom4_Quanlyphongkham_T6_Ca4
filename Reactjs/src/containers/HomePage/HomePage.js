import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Footer from "../System/Admin/Footer";
import "./HomeHeader.scss";

class HomePage extends Component {
  render() {
    return (
      <div>
        <HomeHeader />
        <div className="home-header-banner">
          <div className="content-up">
            <div className="title1">Hệ thống y tế </div>
            <div className="title2">HealthyCare chăm sóc sức khỏe Toàn diện</div>
            <div className="search">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Tìm Chuyên Khoa Khám Bệnh" />
            </div>
          </div>
        </div>
        <Footer/>

        

       
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
