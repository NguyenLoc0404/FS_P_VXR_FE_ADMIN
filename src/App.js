import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import _ from "lodash";
//material css
import '@material/react-top-app-bar/dist/top-app-bar.css';
import '@material/react-material-icon/dist/material-icon.css';
import '@material/data-table/dist/mdc.data-table.css';
import '@material/react-button/dist/button.css';
import '@material/react-text-field/dist/text-field.css';
import "@material/react-dialog/dist/dialog.css";
import '@material/react-snackbar/dist/snackbar.css';
import '@material/react-list/dist/list.css';



//component 
import Navbar from "./components/Navbar"
import Station from "./components/Station"
import Trip from "./components/Trip"
import User from "./components/User"
import Ticket from "./components/Ticket"
import NotFound from "./components/Notfound";

import CreateStation from "./components/Station/CreateStation";
import CreateTrip from "./components/Trip/CreateTrip";
import CreateUser from "./components/User/CreateUser";
import CreateTicket from "./components/Ticket/CreateTicket";

import UpdateStation from "./components/Station/UpdateStation";
import UpdateTrip from "./components/Trip/UpdateTrip";
import UpdateUser from "./components/User/UpdateUser";
import UpdateTicket from "./components/Ticket/UpdateTicket";
import UpdateAvatar from "./components/Station/UpdateAvatar";

import Login from './components/Auth/Login';
import Manager from "./components/Manager";
import checkTokenValid from "./ultils/checkTokenValid";
import { connect } from "react-redux";
import { setCurrentUser } from "./actions/auth"
import setHeader from "./ultils/setHeader";
class App extends React.Component {
  componentDidMount() {

    // const token = localStorage.getItem("token");
    // if (!token) return;

    // const decoded = jwtDecode(token);
    // //decode la mili second , date.now tinsh bang second
    // if (decoded.exp > Date.now() / 1000) {
    //   this.props.setCurrentUser(decoded);

    let decode = checkTokenValid();
    console.log(decode);
    if (!_.isEmpty(decode)) {
      const { decoded, token } = decode;
      if (decoded) this.props.setCurrentUser(decoded);
      setHeader(token);
    }
  }
  render() {
    const { auth } = this.props;
    const { isAuthenticated } = auth;
    //console.log(auth);
    return (
      <div className="App">
        <BrowserRouter>
          {isAuthenticated && <Navbar />}
          <Switch>
            <Route path='/' exact
              // component={Login}

              render={(props) => {
                if (isAuthenticated) return <Redirect to="/manager" />
                //props chứa đầy đủ history , map , location
                return <Login {...props} />
              }}
            />
            <Route path='/manager' exact component={Manager} />

            <Route path="/stations" exact component={Station} />
            <Route path="/stations/create-station" exact component={CreateStation} />
            <Route path="/stations/update-station/:stationId" exact component={UpdateStation} />
            <Route path="/stations/update-avatar/:stationId" exact component={UpdateAvatar} />

            <Route path="/trips" exact component={Trip} />
            <Route path="/trips/create-trip" exact component={CreateTrip} />
            <Route path="/trips/update-trip/:tripId" exact component={UpdateTrip} />


            <Route path="/users" exact component={User} />
            <Route path="/users/create-user" exact component={CreateUser} />
            <Route path="/users/update-user/:userId" exact component={UpdateUser} />

            <Route path="/tickets" exact component={Ticket} />
            <Route path="/tickets/create-ticket" exact component={CreateTicket} />
            <Route path="/tickets/update-ticket/:ticketId" exact component={UpdateTicket} />

            <Route path='/' component={NotFound} />
          </Switch>
        </BrowserRouter>

      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToprops = (dispatch) => {
  return {
    setCurrentUser: (decoded) => {
      dispatch(setCurrentUser(decoded))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToprops)(App);
