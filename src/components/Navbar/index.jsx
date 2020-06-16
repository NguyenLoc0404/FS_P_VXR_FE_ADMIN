import React, { Component } from "react";
import {connect} from "react-redux";
import {logout} from "./../../actions/auth";
import TopAppBar, {
  TopAppBarFixedAdjust,
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from "@material/react-top-app-bar";
import MaterialIcon from "@material/react-material-icon";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    const linkstyle = { color: "white", textDecoration: "none" };
    const linkstyle2 = { ...linkstyle, marginRight: "15px" };
    return (
      <div>
        <TopAppBar>
          <TopAppBarRow>
            <TopAppBarSection align="start">
              <TopAppBarIcon navIcon tabIndex={0}>
                <MaterialIcon
                  hasRipple
                  icon="menu"
                  onClick={() => console.log("click")}
                />
              </TopAppBarIcon>
              <TopAppBarTitle>
                <Link to="/" style={linkstyle}>
                  Vexere
                </Link>
              </TopAppBarTitle>
            </TopAppBarSection>
            <TopAppBarSection align="end" role="toolbar">
              <Link to="/stations" style={linkstyle2}>
                Bến Xe
              </Link>
              <Link to="/trips" style={linkstyle2}>
                Chuyến Đi
              </Link>
              <Link to="/tickets" style={linkstyle2}>
                Vé{" "}
              </Link>
              <Link to="/users" style={linkstyle2}>
                Khách Hàng{" "}
              </Link>
              <Link to="/" style={linkstyle2} onClick={()=>this.props.logout()}>
               Đăng Xuất
              </Link>
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust></TopAppBarFixedAdjust>
      </div>
    );
  }
}


export default  connect(null,{logout}) (Navbar);
