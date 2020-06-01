import React, { Component } from "react";
import TextField, { Input } from "@material/react-text-field";
import Button from "@material/react-button";
import { connect } from "react-redux";
import { postUser } from "./../../actions/user";

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fullName: "",
      password: "",
      password2: "",
    };
  }
  onChange = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, fullName, password , password2 } = this.state;
    const user = { email, fullName, password , password2 };
  
    this.props.postUser(user).then(() => {
    
      this.props.history.push("/users");
    });
  };
  render() {
    const TextFieldStyle = {
      marginTop: "20px",
      marginBottom: "20px",
    };
    return (
      <div>
        <h2> Thêm mới User</h2>
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

          <div style={TextFieldStyle}>
            <TextField label="Password">
              <Input
                value={this.state.password}
                name="password"
                onChange={this.onChange}
                type="password"
              />
            </TextField>
          </div>
          <div style={TextFieldStyle}>
            <TextField label="Password Confirm">
              <Input
                value={this.state.password2}
                name="password2"
                onChange={this.onChange}
                type="password"
              />
            </TextField>
          </div>
          <Button raised type="submit">
            Thêm
          </Button>
        </form>
      </div>
    );
  }
}

export default connect(null, {postUser})(CreateUser);
