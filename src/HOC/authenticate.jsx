import React from "react";
import { connect } from "react-redux";
import checkTokenValid from "../ultils/checkTokenValid";
import { setCurrentUser } from "../actions/auth"
//Hoc funcition or Hor class
// Hoc class typescipt thử xem

//Hoc functional
//ComposedComponent : Station/Createtion/UpdateStation/Trip/CreateTrip....)
export default function (ComposedComponent) {
  class Authentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        auth: {}, // isAuthenticated, decoded
      };
    }
    static getDerivedStateFromProps(nextProps, Prevstate) {
      const decoded = checkTokenValid();
      if (!decoded){ 
        nextProps.setCurrentUser({});
          nextProps.history.push("/");
        }

      console.log("props" + nextProps);
      console.log("state" + Prevstate);
      if (nextProps.auth.isAuthenticated !== Prevstate) {
        if (!nextProps.auth.isAuthenticated) nextProps.history.push("/");
        return {
          auth: nextProps.auth,
        };
      }
      return {};
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  const mapStateToProps = (state) => {
    return {
      auth: state.auth,
    };
  };
  const mapDispatchToprops = (dispatch) => {
    return {
      setCurrentUser: (decoded) => {
        dispatch(setCurrentUser(decoded))
      }
    }
  }
  return connect(mapStateToProps,mapDispatchToprops)(Authentication);
}
