import React from "react";
import TextField, { Input } from "@material/react-text-field";
import Button from "@material/react-button";
import { connect } from "react-redux";
import { postTicket } from "../../actions/ticket";
import _ from "lodash";
import checkTokenValid from "./../../ultils/checkTokenValid";
import setHeader from "./../../ultils/setHeader";
import Select, { Option } from '@material/react-select';
import { getTrips } from "../../actions/trip";
import moment from 'moment';


const formatTime = (trip) => {
  var momentDate = moment(trip);
  return momentDate.format("YYYY-MM-DD hh:mm:ss A ");
}

const RenderOption = (array) => {
  return array.map((s, index) => {
    return <Option
      value={`${formatTime(s.startTime)}`}
      key={index} data-key={index}>
      {`${s.fromStationsId.province}- ${s.toStationsId.province}- ${formatTime(s.startTime)}`}
    </Option>
  })
}

const formatTimeStamp = (time) => {
  var momentDate = moment(new Date(time));
  momentDate = momentDate.format("x");
  return momentDate;
}

const OnchageObject = (value, array, LR) => {
  console.log(value);
  console.log(array);

  const ticketTemp = array.find(s => formatTimeStamp(s.startTime) == formatTimeStamp(value));
  console.log(ticketTemp);
  if (ticketTemp)
    LR(ticketTemp._id);
  if (_.isEmpty(ticketTemp))
    LR(value);
}

const onSubmit = (e, tripId, seatCodes, props) => {
  console.log(" vao on submit");
  e.preventDefault();
  //startTime = new Date (startTime);
  if(_.isEmpty(seatCodes))
  {
    alert("vui long nhập vào mã ghế");
    return;
  }
  seatCodes = seatCodes.split(" ");
  const ticket = { tripId, seatCodes };
  if (tripId === "pls select") {
    alert("vui long chon chuyen di");
    return;
  }

  console.log(ticket);
  props.postTicket(ticket).then(() => {
    props.history.push("/tickets");
  })
    .catch(err => console.log("error in ticket", err));
};


const CreateTicket = (props) => {
  const [tripName, SetTripName] = React.useState('pls select');
  const [tripId, SetTripId] = React.useState('pls select');
  const [seatCodes, SetseatCodes] = React.useState([]);

  React.useEffect(() => {
    if (!_.isEmpty(props.auth)) {
      let decode = checkTokenValid();
      const { token } = decode;
      setHeader(token);
      props.getTrips();
    }
  }, []);

  //const inputRef = useRef();
  const TextFieldStyle = {
    marginTop: "20px",
    marginBottom: "20px",
  };
  return (
    <div>
      <h2> Thêm mới Ticket</h2>
      <form>
        <div style={TextFieldStyle}>
          <Select
            label='Vui Lòng Chọn Chuyến Đi'
            value={tripName}
            onChange={
              (evt) => {
                // console.log(inputRef.current);
                OnchageObject(evt.target.value, props.trips, SetTripId);
                SetTripName(evt.target.value);
              }
            }
          >
            <Option value='pls select'>pls select</Option>
            {RenderOption(props.trips)}
          </Select>
        </div>

        <div style={TextFieldStyle}>
          <TextField label="Mã Ghế">
            <Input
              value={seatCodes}
              name="seatCodes"
              onChange={e => SetseatCodes(e.target.value)}
              style={{width: 384}}
            />
          </TextField>
        </div>

        <Button raised type="submit"
          onClick={e => onSubmit(e, tripId, seatCodes, props)}
        >
          Thêm
              </Button>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    trips: state.trips,
    auth: state.auth
  };
};
export default connect(mapStateToProps, { postTicket, getTrips })(CreateTicket);