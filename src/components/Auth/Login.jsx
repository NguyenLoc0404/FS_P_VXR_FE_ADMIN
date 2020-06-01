import React, { Component } from "react";
import TextField, { Input } from "@material/react-text-field";
import Button from "@material/react-button";
import { login } from "./../../actions/auth";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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
    const { email, password } = this.state;
    const credentials = { email, password };
    this.props
      .login(credentials)
      .then(() => {
        this.props.history.push("/manager");
      })
      .catch((err) =>  alert("Đăng nhập thất bại"));
  };
  render() {
    const TextFieldStyle = {
      marginTop: "20px",
      marginBottom: "20px",
    };
    return (
      <div>
        <h2>Đăng Nhập</h2>
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
            <TextField label="Password">
              <Input
                value={this.state.password}
                name="password"
                onChange={this.onChange}
                type="password"
              />
            </TextField>
          </div>

          <Button raised type="submit">
            Login
          </Button>
        </form>
      </div>
    );
  }
}

export default connect(null, { login })(Login);
