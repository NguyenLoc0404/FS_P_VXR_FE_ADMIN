import React, { Component } from "react";
import TextField, { Input } from "@material/react-text-field";
import Button from "@material/react-button";
import { getUsers } from "./../../actions/user";
import { putUser } from "./../../actions/user";
import { connect } from "react-redux";
import _ from "lodash";
import swal from 'sweetalert';

import checkTokenValid from "./../../ultils/checkTokenValid";
import setHeader from "./../../ultils/setHeader";

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      email: "",
      fullName: "",
      // password: "",
      // password2: "",
      // avatar: [],
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { _id, email, fullName
      //, password, password2, avatar 
    } = this.state;
    const user = { _id, email, fullName
      //, password, password2, avatar
     };

    // console.log("UpdateStation -> onSubmit -> station", station);

    this.props.putUser(user).then(() => {
      this.props.history.push("/users");
    }).catch(err => {
      console.log(err)
      if (err.email)
        swal(`${err.email}`)
      else if (err.password)
        swal(`${err.password}`)
      else if (err.password2)
        swal(`${err.password2}`)
      else if (err.fullName)
        swal(`${err.fullName}`)
    });
  };
  componentDidMount(props) {
    console.log("componentDidMount");
    this.props.getUsers();
    // console.log("Props: ", props);
  }
  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps");

    //check đã đăng  nhập => sau đó set header cho component Update
    if (!_.isEmpty(props.auth)) {
      let decode = checkTokenValid();
      const { token } = decode;
      setHeader(token);
    }
    //console.log("Props: ", props);
    //  console.log("State: ", state);
    //Check khi F5
    if (_.isEmpty(props.selectedUser) && !state.email && !state.fullName) {
      const { userId } = props.match.params;
      //console.log(stationId);
      const index = props.users.findIndex((s) => s._id === userId);
      // console.log(props.stations[index])
      return {
        _id: props.users[index] && props.users[index]._id,
        email: props.users[index] && props.users[index].email,
        fullName: props.users[index] && props.users[index].fullName,
        // password: props.users[index] && props.users[index].password,
        // password2: props.users[index] && props.users[index].password2,
        // avatar: props.users[index] && props.users[index].avatar,
      };
    }

    if (!state.email && !state.fullName) {
      return {
        _id: props.selectedUser && props.selectedUser._id,
        email: props.selectedUser && props.selectedUser.email,
        fullName: props.selectedUser && props.selectedUser.fullName,
        // password: props.selectedUser && props.selectedUser.password,
        // password2: props.selectedUser && props.selectedUser.password2,
        // avatar: props.selectedUser && props.selectedUser.avatar,
      };
    }

    return {};
  }
  render() {
    const TextFieldStyle = {
      marginTop: "20px",
      marginBottom: "20px",
    };
    return (
      <div>
        <h2> Cập Nhật Thông Tin User</h2>
        <form onSubmit={this.onSubmit}>
        <div style={TextFieldStyle}>
            <TextField label="Email">
              <Input
                value={this.state.email}
                name="email"
                onChange={this.onChange}
              />
            </TextField>
          </div>

          <div style={TextFieldStyle}>
            <TextField label="Full Name">
              <Input
                value={this.state.fullName}
                name="fullName"
                onChange={this.onChange}
              />
            </TextField>
          </div>

          <Button raised type="submit">
            Cập Nhật
          </Button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("mapStateToProps");
  return {
    selectedUser: state.layout.selectedUser,
    users: state.users,
    auth: state.auth,
  };
};
export default connect(mapStateToProps, { getUsers, putUser })(UpdateUser);
