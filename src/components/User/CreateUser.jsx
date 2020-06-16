import React, { Component } from "react";
import TextField, { Input } from "@material/react-text-field";
import Button from "@material/react-button";
import { connect } from "react-redux";
import { postUser } from "./../../actions/user";
import swal from 'sweetalert';

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
    const { email, fullName, password, password2 } = this.state;
    const user = { email, fullName, password, password2 };
    //console.log("name =" + name);
    //console.log("address =" + address);
    //console.log("province =" + province);
    this.props.postUser(user).then(() => {
      //di chuyển tới 1 trang
      this.props.history.push("/users");
    }).catch(err => {
      console.log(err)
      if (err.email)
        swal(`${err.email}`)
      else if (err.fullName)
        swal(`${err.fullName}`)
      else if (err.password)
        swal(`${err.password}`)
      else if (err.password2)
        swal(`${err.password2}`)

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

export default connect(null, { postUser })(CreateUser);
