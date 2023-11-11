import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailDr.scss";
import { LANGUAGES } from "../../../utils/constant";
import { getDetailInforDoctor } from "../../../services/userService";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Footer from "../../System/Admin/Footer";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailDoctor: {},
      currentDoctorId:-1,
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId:id
      })
      let res = await getDetailInforDoctor(id);
      if (res && res.errcode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { detailDoctor } = this.state;
    let { language } = this.props;
    let nameVi = "",
      nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi},${detailDoctor.lastName} ${detailDoctor.firstName} `;
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.lastName} ${detailDoctor.firstName} `;
    }

    return (
      <>
        <div className="detail-header-container">
          <div className="detail-header-content">
            <div className="detail-left-content">
              <Link className="custom-link" to="/listdoctor">
                <i className="fas fa-arrow-left"></i>

                <span className="text-detail-doctor">
                  {" "}
                  {language === LANGUAGES.VI ? nameVi : nameEn}
                </span>
              </Link>
            </div>
            <div className="detail-center-content"></div>
            <div className="detail-right-content"></div>
          </div>
        </div>

        <div className="doctor-detail-container ">
          <div className="infor-doctor mb-5">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailDoctor && detailDoctor.image ? detailDoctor.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {detailDoctor.Markdown && detailDoctor.Markdown.description && (
                  <span>{detailDoctor.Markdown.description}</span>
                )}
              </div>
            </div>
          </div>

          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule
                doctorIdFromParent={
                 this.state.currentDoctorId
                }
              />
            </div>
            <div className="content-right">
              <DoctorExtraInfor
              doctorIdFromParent={
                this.state.currentDoctorId
               }
              />
            </div>
          </div>
          <div className="detail-info-doctor mb-5">
            {detailDoctor.Markdown && detailDoctor.Markdown.contentHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: detailDoctor.Markdown.contentHTML,
                }}
              ></div>
            )}
          </div>
          <div className="comment-doctor"></div>
          <Footer />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
