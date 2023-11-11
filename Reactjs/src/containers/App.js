import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'
import Home from '../routes/Home';
// import Login from '../routes/Login';
import Login from './Auth/Login';

import System from '../routes/System';

import { CustomToastCloseButton } from '../components/CustomToast';
import HomePage from './HomePage/HomePage.js';
import Register from './Auth/Register';
import ListDoctor from './HomePage/Doctor/ListDoctor';
import DetailDoctor from './HomePage/Doctor/DetailDoctor';
import Doctor from '../routes/Doctor';
import ListSpecialty from './HomePage/Specialty/ListSpecialty';
import Introduction from './HomePage/Introduction';

import InfoUser from "./HomePage/HomeUser/InfoUser";
import ListClinic from './HomePage/Clinic/ListClinic';
import VerifyEmail from './System/Doctor/VerifyEmail.js';



class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                      
                       

                        <span className="content-container">
                            <Switch>
                                <Route path={path.HOME} exact component={(Home)} />
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={path.REGISTER} component={Register} />
                                <Route path={path.LISTDOCTOR} component={ListDoctor} />
                                <Route path={path.LISTSPECIALTY} component={ListSpecialty} />
                                <Route path={path.INTRODUCTION} component={Introduction} />
                                
                                <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                <Route path={'/doctor/'} component={userIsAuthenticated(Doctor)} />
                                <Route path={path.HOMEPAGE} component={HomePage} />
                                <Route path={path.DETAIL_DOCTOR} component={DetailDoctor}/> 
                                <Route path={path.INFORUSER} component={InfoUser}/> 
                                <Route path={path.LiSTCLINIC} component={ListClinic}/> 
                                <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyEmail}/> 
                                
                            </Switch>
                        </span>

                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}
                       <ToastContainer
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                        />

                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);