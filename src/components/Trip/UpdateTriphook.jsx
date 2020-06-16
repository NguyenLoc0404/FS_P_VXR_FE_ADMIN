import React , {useRef} from 'react';
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

const RenderOption = (array) => {
  return array.map((s, index) => {
    return <Option value={`${s.name}`} key={index} data-key={index}>{s.name}</Option>
  })
}

const OnchageObject = (value, array, LR) => {
  const stationTemp = array.find(s => s.name === value);
  console.log(stationTemp);
  if (stationTemp)
    LR(stationTemp._id);
  else alert("vui long chon ben xe")
}

const onSubmit = (e, idTrip, fromStationsId, toStationsId, startTime, price, props) => {
  console.log(" vao on submit");
  e.preventDefault();
  //startTime = new Date (startTime);
  const trip = { idTrip, fromStationsId, toStationsId, startTime, price };
  if (fromStationsId === "pls select" || toStationsId === "pls select") {
    alert("vui long chon ben xe");
    return;
  }

  var momentDate = moment(startTime);
  momentDate = momentDate.format("x");
  var CurrentDate = moment().format("x");
  if (momentDate < CurrentDate) {
    alert("vui long chon thời gian chuyến đi lớn hơn hoặc bằng thời gian hiện tại");
    return;
  }

  console.log(trip);
  props.putTrip(trip).then(() => {
    //di chuyển tới 1 trang
    props.history.push("/trips");
  });
};



const UpdateTrip = (props) => {
  const [idTrip, SetIdTrip] = React.useState('');
  const [fromStationsIdName, SetFromStationsIdName] = React.useState('pls select');
  const [fromStationsId, SetFromStationsId] = React.useState('pls select');
  const [toStationsIdName, SetToStationsIdName] = React.useState('pls select')
  const [toStationsId, SetToStationsId] = React.useState('pls select')
  const [startTime, SetStartTime] = React.useState(new Date("2019-01-01T00:00"));
  const [price, SetPrice] = React.useState("");

  const previousFooRef = useRef((!_.isEmpty(props.trips)));
  React.useEffect(() => {
    console.log("React.useEffect Update Trip props.auth");
    if (!_.isEmpty(props.auth)) {
      console.log("vao khac empty");
      let decode = checkTokenValid();
      const { token } = decode;
      setHeader(token);
      props.getTrips();
      props.getStations();
     
      if (!_.isEmpty(props.trips)) {
        console.log("vao khac empty trips")
        const trip = props.trips.find(t => t._id === props.match.params.tripId)
        console.log(trip);
        SetIdTrip(trip._id)
        SetFromStationsIdName(trip.fromStationsId.name)
        SetFromStationsId(trip.fromStationsId._id)
        SetToStationsIdName(trip.toStationsId.name)
        SetToStationsId(trip.toStationsId._id)
        SetStartTime(trip.startTime)
        SetPrice(trip.price)
      }
      console.log(props)
    }
  }, [(!_.isEmpty(props.trips))]);



  const TextFieldStyle = {
    marginTop: "20px",
    marginBottom: "20px",
  };
  return (
    <div>
      <h2>Cập Nhật Chuyến Đi</h2>
      <form >
        <div style={TextFieldStyle}>
          <Select
            label='Vui Lòng Chọn Bến Xe Đi'
            value={fromStationsIdName}
            onChange={
              (evt) => {
                OnchageObject(evt.target.value, props.stations, SetFromStationsId);
                SetFromStationsIdName(evt.target.value);
              }
            }
            style={{width: 250}}
          >
            <Option value='pls select'>pls select</Option>
            {RenderOption(props.stations)}
          </Select>
        </div>

        <div style={TextFieldStyle}>
          <Select
            label='Vui Lòng Chọn Bến Xe Đến'
            value={toStationsIdName}
            onChange={
              (evt) => {
                OnchageObject(evt.target.value, props.stations, SetToStationsId);
                SetToStationsIdName(evt.target.value);
              }
            }
            style={{width: 250}}
          >
            <Option value='pls select'>pls select</Option>
            {RenderOption(props.stations)}
          </Select>
        </div>

        <div style={TextFieldStyle}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              label="Chon Thoi Gian"
              value={startTime}
              onChange={SetStartTime}
              // onError={console.log}
              disablePast
              format="dd/MM/yyyy hh:mm a"
            />
          </MuiPickersUtilsProvider>
        </div>
        <div style={TextFieldStyle}>
          <TextField label="price">
            <Input
              value={price}
              name="price"
              onChange={e => SetPrice(e.target.value)}
              style={{width: 250}}
            />
          </TextField>
        </div>
        <Button raised type="submit"
          onClick={e => onSubmit(e, idTrip, fromStationsId, toStationsId, startTime, price, props)}
        >
          Thêm
              </Button>
      </form>
    </div >
  );
};
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