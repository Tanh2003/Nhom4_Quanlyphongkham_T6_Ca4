import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import "./Login.scss";

import { handleLoginApi } from "../../services/userService";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import HomeHeader from "../HomePage/HomeHeader";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }
  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = async () => {
    // in ra conssole
    this.setState({
      errMessage: "",
    });

    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errcode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errcode == 0) {
        //todo

        console.log("login succeeds");
        if (data.user.roleId == "R3") {
          this.props.history.push("/");
          this.props.userLoginSuccess(data.user);
        } else {
          this.props.userLoginSuccess(data.user);
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
      console.log("Ntanh", error.response);
    }
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword, //  lenh nay dung de  gan gia tri true false
    });
  };

  handleRegister = () => {
    this.props.history.push("/register");
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keycode === 13) {
      this.handleLogin();
    }
  };
  render() {
    //JSX

    return (
      // chỉ render ra 1 khối div thôi

      <div className="login-background">
        <HomeHeader />
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12  text-login">Đăng nhập</div>
            <div className="col-12 form-group login-input">
              <label>Email: </label>
              <input
                type="text"
                className="form-control "
                placeholder="aa@gmail.com"
                //value={this.state.username}
                onChange={(event) => this.handleOnChangeUsername(event)}
              ></input>
            </div>
            <div className="col-12 form-group login-input">
              <label>Mật khẩu: </label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your Password
                    " //value={this.state.password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                  onKeyDown={(event) => {
                    this.handleKeyDown(event);
                  }}
                ></input>
                <span onClick={() => this.handleShowHidePassword()}>
                  <i
                    class={
                      this.state.isShowPassword
                        ? "fas fa-eye"
                        : "fas fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button className="btn-login " onClick={() => this.handleLogin()}>
                Đăng nhập
              </button>
            </div>

            <div className="col-12">
              <a
                className="forgot-password"
                onClick={() => this.handleRegister()}
              >
                {" "}
                Đăng kí
              </a>
            </div>
            {/* <div className='col-12 text-center mt-3'>
                    <span className='text-orther-login'>Đăng nhập với:</span>

                </div>
                <div className='col-12 social-login'> 
               
                
                <i className="fab fa-google-plus-g google"></i>
                <i className="fab fa-facebook facebook"></i>
                </div>
                 */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),

    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
