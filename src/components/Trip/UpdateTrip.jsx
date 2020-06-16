import React, { Component } from "react";
import TextField, { Input } from "@material/react-text-field";
import Button from "@material/react-button";
import { putTrip } from "./../../actions/trip";
import { getTrips } from "../../actions/trip";
import { connect } from "react-redux";
import { getStations } from "../../actions/station";
import _ from "lodash";
import checkTokenValid from "./../../ultils/checkTokenValid";
import setHeader from "./../../ultils/setHeader";
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Select, { Option } from '@material/react-select';
import swal from 'sweetalert';
class UpdateTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromStationsIdName: 'pls select',
      fromStationsId: '',
      fromStationProvince: " ",
      toStationsIdName: 'pls select',
      toStationsId: '',
      toStationsProvince: " ",
      startTime: new Date("2019-01-01T00:00"),
      price: ""
    };
  }
  RenderOption = (array) => {
    return array.map((s, index) => {
      return <Option value={`${s.name}`} key={index} data-key={index}>{s.name}</Option>
    })
  }

  OnchageObject = (e, array, LR) => {
    console.log("vao onchageObject");
    console.log(array);
    const stationTemp = array.find(s => s.name === e.target.value);
    if (stationTemp)
      (LR === 1) ? this.setState({
        fromStationsId: stationTemp._id,
        fromStationProvince: stationTemp.province
      })
        : this.setState({
          toStationsId: stationTemp._id,
          toStationsProvince: stationTemp.province
        })

    if (_.isEmpty(stationTemp))
      (LR === 1) ? this.setState({
        fromStationsId: e.target.value
      })
        : this.setState({
          toStationsId: e.target.value
        })
  }


  onSubmit = (e) => {
    e.preventDefault();

    const {
      _id,
      fromStationsId,
      fromStationProvince,
      toStationsId,
      toStationsProvince,
      startTime,
      price
    } = this.state;
    if (fromStationsId === "pls select" || toStationsId === "pls select") {
      swal("vui long chon ben xe");
      return;
    }

    var momentDate = moment(startTime);
    momentDate = momentDate.format("x");
    var CurrentDate = moment().format("x");
    if (momentDate < CurrentDate) {
      swal("vui long chon thời gian chuyến đi lớn hơn hoặc bằng thời gian hiện tại");
      return;
    }
    const trip = {
      _id,
      fromStationsId,
      fromStationProvince,
      toStationsProvince,
      toStationsId,
      startTime,
      price
    };
    console.log("vao submit");
    console.log(trip);

    this.props.putTrip(trip).then(() => {
      //di chuyển tới 1 trang
      this.props.history.push("/trips");
    }).catch(err =>{
      console.log(err)
      swal(err.price)
     });
  };

  componentDidMount(props) {
    this.props.getTrips();
    this.props.getStations();
  }

  static getDerivedStateFromProps(props, state) {

    if (!_.isEmpty(props.auth)) {
      let decode = checkTokenValid();
      const { token } = decode;
      setHeader(token);
    }

    if (_.isEmpty(props.selectedTrip) && !state.fromStationsId) {
      console.log("vo day ne");
      const { tripId } = props.match.params;
      const index = props.trips.findIndex((s) => s._id === tripId);
      return {
        _id: props.trips[index] && props.trips[index]._id,
        fromStationsId: props.trips[index] && props.trips[index].fromStationsId._id,
        fromStationsIdName: props.trips[index] && props.trips[index].fromStationsId.name,
        fromStationProvince: props.trips[index] && props.trips[index].fromStationsId.province,
        toStationsId: props.trips[index] && props.trips[index].toStationsId._id,
        toStationsIdName: props.trips[index] && props.trips[index].toStationsId.name,
        toStationsProvince: props.trips[index] && props.trips[index].toStationsId.province,
        startTime: props.trips[index] && props.trips[index].startTime,
        price: props.trips[index] && props.trips[index].price
      };
    }

    console.log("vo ko empty")
    if (!state.fromStationsId) {
      return {
        _id: props.selectedTrip && props.selectedTrip._id,
        fromStationsId: props.selectedTrip && props.selectedTrip.fromStationsId._id,
        fromStationsIdName: props.selectedTrip && props.selectedTrip.fromStationsId.name,
        fromStationProvince: props.selectedTrip && props.selectedTrip.fromStationsId.province,
        toStationsId: props.selectedTrip && props.selectedTrip.toStationsId._id,
        toStationsIdName: props.selectedTrip && props.selectedTrip.toStationsId.name,
        toStationsProvince: props.selectedTrip && props.selectedTrip.toStationsId.province,
        startTime: props.selectedTrip && props.selectedTrip.startTime,
        price: props.selectedTrip && props.selectedTrip.price,
      };
    }
    return {}
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
            <Select
              label='Vui Lòng Chọn Bến Xe Đi'
              value={this.state.fromStationsIdName}
              onChange={
                (e) => {
                  this.OnchageObject(e, this.props.stations, 1);
                  //SetFromStationsIdName(e.target.value);
                  this.setState({ fromStationsIdName: e.target.value })
                }
              }
              style={{ width: 250 }}
            >
              <Option value='pls select'>pls select</Option>
              {this.RenderOption(this.props.stations)}
            </Select>
          </div>

          <div style={TextFieldStyle}>
            <Select
              label='Vui Lòng Chọn Bến Xe Đến'
              value={this.state.toStationsIdName}
              onChange={
                (e) => {
                  this.OnchageObject(e, this.props.stations);
                  //SetFromStationsIdName(e.target.value);
                  this.setState({ toStationsIdName: e.target.value })
                }
              }
              style={{ width: 250 }}
            >
              <Option value='pls select'>pls select</Option>
              {this.RenderOption(this.props.stations)}
            </Select>
          </div>

          <div style={TextFieldStyle}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                label="Chon Thoi Gian"
                value={this.state.startTime}
                onChange={e => this.setState({ startTime: e })}
                ampm={false}
                disablePast
                format="dd/MM/yyyy HH:mm"
              />
            </MuiPickersUtilsProvider>
          </div>
          <div style={TextFieldStyle}>
            <TextField label="price">
              <Input
                value={this.state.price}
                name="price"
                onChange={e => this.setState({ price: e.target.value })}
                style={{ width: 250 }}
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
    stations: state.stations
  };
};
export default connect(mapStateToProps, {
  putTrip,
  getTrips,
  getStations
})(UpdateTrip);
