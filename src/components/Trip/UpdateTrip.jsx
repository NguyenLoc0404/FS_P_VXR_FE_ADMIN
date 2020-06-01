import React, { Component } from "react";
import TextField, { Input } from "@material/react-text-field";
import Button from "@material/react-button";
import { putTrip } from "./../../actions/trip";
import { getTrips } from "../../actions/trip";
import { connect } from "react-redux";
import _ from "lodash";
import checkTokenValid from "./../../ultils/checkTokenValid";
import setHeader from "./../../ultils/setHeader";

class UpdateTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      fromStationsId: "",
      toStationsId: "",
      startTime: "",
      price: ""
    };
  }
  onChange = (e) => {
    console.log("e.target.name: " + e.target.name);
    console.log("e.target.value: " + e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      _id,
      fromStationsId,
      toStationsId,
      startTime,
      price
    } = this.state;

    const trip = {
      _id,
      fromStationsId,
      toStationsId,
      startTime,
      price
    };
    console.log("vao submit");
    console.log(trip);

    this.props.putTrip(trip).then(() => {
      //di chuyển tới 1 trang
      this.props.history.push("/trips");
    });
  };

  componentDidMount(props) {
    this.props.getTrips();
  }

  static getDerivedStateFromProps(props, state) {
    // console.log("Props: ", props, 51);
    // console.log("state: ", state, 52);
    // console.log(props.selectedTrip, 58);
    if (!_.isEmpty(props.auth)) {
      let decode = checkTokenValid();
      const { token } = decode;
      setHeader(token);
    }

    // // console.log("State: ", state);

    if (
      _.isEmpty(props.selectedTrip) &&
      !state.fromStationsId &&
      !state.toStationsId &&
      !state._id &&
      !state.price
    ) {
      console.log("vo day ne");
      const { tripId } = props.match.params;
      const index = props.trips.findIndex((s) => s._id === tripId);

      return {
        _id: props.trips[index] && props.trips[index]._id,
        fromStationsId:
          props.trips[index] && props.trips[index].fromStationsId._id,
        toStationsId: props.trips[index] && props.trips[index].toStationsId._id,
        startTime:
          props.trips[index] &&
          props.trips[index].startTime.replace(/T/, " ").replace(/\..+/, ""),
        price: props.trips[index] && props.trips[index].price,
        seats: props.trips[index] && props.trips[index].seats,
      };
    }

    if (
      !state.fromStationsId &&
      !state.fromStationsId &&
      !state.toStationsId &&
      !state._id &&
      !state.price
    ) {
      console.log("vao data")
      let test = props.selectedTrip.startTime;
      console.log(test);
      return {
        _id: props.selectedTrip && props.selectedTrip._id,
        fromStationsId:
          props.selectedTrip && props.selectedTrip.fromStationsId._id,
        toStationsId: props.selectedTrip && props.selectedTrip.toStationsId._id,
        startTime:
          props.selectedTrip &&
          props.selectedTrip.startTime.replace(/T/, " ").replace(/\..+/, ""),
        price: props.selectedTrip && props.selectedTrip.price,
        seats: props.selectedTrip.seats,
      };
    }
  }
  render() {
    const TextFieldStyle = {
      marginTop: "20px",
      marginBottom: "20px",
    };
    return (
      <div>
        <h2>Cập Nhật Chuyến Đi</h2>
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
            Cập Nhật
          </Button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    selectedTrip: state.layout.selectedTrip,
    trips: state.trips,
    auth: state.auth,
  };
};
export default connect(mapStateToProps, {
  putTrip,
  getTrips,
})(UpdateTrip);
