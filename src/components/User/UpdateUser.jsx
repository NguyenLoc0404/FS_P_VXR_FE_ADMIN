import React, { Component } from "react";
import TextField, { Input } from "@material/react-text-field";
import Button from "@material/react-button";
import { getUsers } from "./../../actions/user";
import { putUser } from "./../../actions/user";
import { connect } from "react-redux";
import _ from "lodash";

import checkTokenValid from "./../../ultils/checkTokenValid";
import setHeader from "./../../ultils/setHeader";

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      email: "",
      fullName: "",
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
     
    } = this.state;
    const user = { _id, email, fullName
   
     };

    
    this.props.putUser(user).then(() => {
      this.props.history.push("/users");
    });
  };
  componentDidMount(props) {
    console.log("componentDidMount");
    this.props.getUsers();
   
  }
  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps");

   
    if (!_.isEmpty(props.auth)) {
      let decode = checkTokenValid();
      const { token } = decode;
      setHeader(token);
    }
    
    if (_.isEmpty(props.selectedUser) && !state.email && !state.fullName) {
      const { userId } = props.match.params;
     
      const index = props.users.findIndex((s) => s._id === userId);
     
      return {
        _id: props.users[index] && props.users[index]._id,
        email: props.users[index] && props.users[index].email,
        fullName: props.users[index] && props.users[index].fullName,
       
      };
    }

    if (!state.email && !state.fullName) {
      return {
        _id: props.selectedUser && props.selectedUser._id,
        email: props.selectedUser && props.selectedUser.email,
        fullName: props.selectedUser && props.selectedUser.fullName,
     
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
