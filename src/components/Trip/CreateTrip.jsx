import React, { Component } from "react";
import TextField, { Input } from "@material/react-text-field";
import Button from "@material/react-button";
import { postTrip } from "../../actions/trip";
import { connect } from "react-redux";
import { getStations } from "../../actions/station";
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Select, { Option } from '@material/react-select';
import moment from 'moment';
import _ from "lodash";
import checkTokenValid from "../../ultils/checkTokenValid";
import setHeader from "../../ultils/setHeader";
import swal from 'sweetalert';
class CreateTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromStationsIdName: 'pls select',
      fromStationsId: 'pls select',
      fromStationProvince: " ",
      toStationsIdName: 'pls select',
      toStationsId: 'pls select',
      toStationsProvince: " ",
      startTime: new Date("2019-01-01T00:00"),
      price: ""
    };
  }

  componentDidMount() {
    this.props.getStations();
  }

  RenderOption = (array) => {
    return array.map((s, index) => {
      return <Option value={`${s.name}`} key={index} data-key={index}>{s.name}</Option>
    })
  }

  OnchageObject = (e, array, LR) => {
    console.log("vao onchageObject");
    const stationTemp = array.find(s => s.name === e.target.value);
    console.log(stationTemp);
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

  static getDerivedStateFromProps(props, state) {
    if (!_.isEmpty(props.auth)) {
      let decode = checkTokenValid();
      const { token } = decode;
      setHeader(token);
    }
    return {};
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { fromStationProvince, fromStationsId, toStationsProvince, toStationsId, startTime, price } = this.state;

    if (fromStationsId === "pls select" || toStationsId === "pls select") {
      //alert("vui long chon ben xe");
      swal("vui long chon ben xe");
      return;
    }

    var momentDate = moment(startTime);
    momentDate = momentDate.format("x");
    var CurrentDate = moment().format("x");
    if (momentDate < CurrentDate) {
      swal("vui long chon thời gian chuyến đi lớn hơn hoặc bằng thời gian hiện tại");
      //alert("vui long chon thời gian chuyến đi lớn hơn hoặc bằng thời gian hiện tại");
      return;
    }
    const trip = { fromStationProvince, fromStationsId, toStationsProvince, toStationsId, startTime, price };
    //console.log(trip);

    this.props.postTrip(trip).then(() => {
      //di chuyển tới 1 trang
      this.props.history.push("/trips");
    })
      .catch(err => {
        console.log(err)
        swal(err.price)
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
                ampm={false}
                onChange={e => this.setState({ startTime: e })}
                // onError={console.log}
                disablePast
                format="dd/MM/yyyy HH:mm "
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
            Thêm
          </Button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    stations: state.stations,
    auth: state.auth
  };
};
export default connect(mapStateToProps, {
  postTrip,
  getStations
})(CreateTrip);