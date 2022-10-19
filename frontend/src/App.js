import React from 'react'
import "./App.css";
import Login from "./Component/Login";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Register from './Component/Register';
import Dashboard from './Component/Dashboard';
import PageNotFound from './Component/PageNotFound';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      user:false
    }
  }

  render(){
    const {isAuth} = this.props.auth
    if(isAuth){
      <Navigate to="/" replace={true} />
    }
    return (
      <div className="App">
        <Router>
          <Routes>
            {isAuth ? (
              <>
                <Route path="/" element={<Dashboard />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </>
            )}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </div>
    );
  }
  
}
const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(App);
