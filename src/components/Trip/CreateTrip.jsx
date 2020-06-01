import React, { Component } from "react";
import TextField, { Input } from "@material/react-text-field";
import Button from "@material/react-button";
import { postTrip } from "../../actions/trip";
import { connect } from "react-redux";
class CreateTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromStationsId: "",
      toStationsId: "",
      startTime: "",
      price: "",
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

    const { fromStationsId, toStationsId, startTime, price } = this.state;
    const trip = { fromStationsId, toStationsId, startTime, price };

    //console.log(trip);

    this.props.postTrip(trip).then(() => {
      //di chuyển tới 1 trang
      this.props.history.push("/trips");
    });
  };
  render() {
    const TextFieldStyle = {
      marginTop: "20px",
      marginBottom: "20px",
    };
    return (
      <div>
        <h2>Thêm Mới Chuyến Đi</h2>
        <form onSubmit={this.onSubmit}>
          <div style={TextFieldStyle}>
            <TextField label="fromStationsId">
              <Input
                value={this.state.fromStationsId}
                name="fromStationsId"
                onChange={this.onChange}
              />
            </TextField>
          </div>

          <div style={TextFieldStyle}>
            <TextField label="toStationsId">
              <Input
                value={this.state.toStationsId}
                name="toStationsId"
                onChange={this.onChange}
              />
            </TextField>
          </div>

          <div style={TextFieldStyle}>
            <TextField label="startTime">
              <Input
                value={this.state.startTime}
                name="startTime"
                onChange={this.onChange}
              />
            </TextField>
          </div>
          <div style={TextFieldStyle}>
            <TextField label="price">
              <Input
                value={this.state.price}
                name="price"
                onChange={this.onChange}
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

export default connect(null, { postTrip })(CreateTrip);
