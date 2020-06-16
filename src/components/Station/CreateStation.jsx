import React, { Component } from "react";
import TextField, { Input } from "@material/react-text-field";
import Button from "@material/react-button";
import { postStation } from "../../actions/station";
import { connect } from "react-redux";
import swal from 'sweetalert';
class CreateStation extends Component {
  // state = {value: 'Woof'};
  //Dưới đặt name trong ô input thì state phải có name
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      province: "",
      description: ""
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
    const { name, address, province, description } = this.state;
    const station = { name, address, province, description };
    console.log("name =" + name);
    console.log("address =" + address);
    console.log("province =" + province);
    this.props.postStation(station).then(() => {
      //di chuyển tới 1 trang
      this.props.history.push("/stations");
    }).catch(err => {
      console.log(err)
      if (err.name)
        swal(`${err.name}`)
      else if (err.address)
        swal(`${err.address}`)
      else if (err.description)
        swal(`${err.description}`)
      else if (err.province)
        swal(`${err.province}`)

    })
  };

  render() {
    const TextFieldStyle = {
      marginTop: "20px",
      marginBottom: "20px",
    };
    return (
      <div>
        <h2> Thêm mới Bến Xe</h2>
        <form onSubmit={this.onSubmit}>
          <div style={TextFieldStyle}>
            <TextField label="Tên Bến Xe">
              <Input
                value={this.state.name}
                name="name"
                onChange={this.onChange}
              />
            </TextField>
          </div>

          <div style={TextFieldStyle}>
            <TextField label="Đia chỉ Bến Xe">
              <Input
                value={this.state.address}
                name="address"
                onChange={this.onChange}
              />
            </TextField>
          </div>

          <div style={TextFieldStyle}>
            <TextField label="Tỉnh/Thành Phố">
              <Input
                value={this.state.province}
                name="province"
                onChange={this.onChange}
              />
            </TextField>
            <div style={TextFieldStyle}>
              <TextField label="Mô Tả">
                <Input
                  value={this.state.description}
                  name="description"
                  onChange={this.onChange}
                />
              </TextField>
            </div>
          </div>
          <Button raised type="submit">
            Thêm
          </Button>
        </form>
      </div>
    );
  }
}

export default connect(null, { postStation })(CreateStation);
