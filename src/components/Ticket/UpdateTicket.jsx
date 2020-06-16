import React, { Component } from "react";
import TextField, { Input } from "@material/react-text-field";
import Button from "@material/react-button";
import { putTicket } from "./../../actions/ticket";
import { getTickets } from "../../actions/ticket";
import { getTrips } from "../../actions/trip";
import { connect } from "react-redux";
import _ from "lodash";
import checkTokenValid from "./../../ultils/checkTokenValid";
import setHeader from "./../../ultils/setHeader";
import Select, { Option } from '@material/react-select';

class UpdateTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      tripId: "",
      tripName: "pls select",
      seatCodes: [],
      // totalPrice: "",
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    let { _id, tripId,seatCodes} = this.state;
    seatCodes = seatCodes.split(" ");
    console.log(seatCodes);
    seatCodes = seatCodes.filter((s) => s !== "");
    // price = seatCodes.length * price;
    let ticket = { _id, tripId,seatCodes};
    console.log("vao submit");
    console.log(ticket, 1234);
    this.props.putTicket(ticket).then(() => {
      //di chuyển tới 1 trang
      this.props.history.push("/tickets");
    });
  };

  OnchageObject = (e, array, LR) => {
    console.log("vao onchageObject");
    const ticketTemp = array.find(s => s.tripName === e.target.value);
    if (ticketTemp)
      this.setState({ tripId: ticketTemp._id })

    if (_.isEmpty(ticketTemp))
      this.setState({ tripId: e.target.value })
  }

  RenderOption = (array) => {
    console.log(array);
    return array.map((s, index) => {
      return <Option
      value={s.tripName}
        key={index} >
        {s.tripName}
      </Option>
    })
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.props.getTrips();
    this.props.getTickets();
  }

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps");
    console.log("Props: ", props, 51);
    console.log("state: ", state, 52);
    console.log(props.selectedTicket, 58);
    if (!_.isEmpty(props.auth)) {
      let decode = checkTokenValid();
      const { token } = decode;
      setHeader(token);
    }

    // // console.log("State: ", state);

    if (
      _.isEmpty(props.selectedTicket) &&
      !state.tripId
    ) {
      console.log("vo rong");
      const { ticketId } = props.match.params;
      console.log(ticketId);

      const index = props.tickets.findIndex((t) => t._id === ticketId);
      console.log("index = " + index);
      console.log(props.tickets[index], 1993);

      let seatCodes = "";

      if (index !== -1) {
        // Lần đầu nó render luôn rỗng 
        props.tickets[index].seats.forEach((seat) => {
          seatCodes += seat.code + " ";
        });
      }
      // console.log("trip tim kiem",props.tickets[index].tripId);
      return {
        _id: props.tickets[index] && props.tickets[index]._id,
        tripId: props.tickets[index] && props.tickets[index].tripId,
        tripName: props.tickets[index] && props.tickets[index].tripId.tripName,
        seatCodes: seatCodes
      };
    }

    if (
      !state.tripId &&
      !state._id
    ) {
      console.log(props.selectedTicket, 33333);
      let seatCodes = "";
      props.selectedTicket.seats.forEach((seat) => {
        seatCodes += seat.code + " ";
      });
      console.log(seatCodes);
      //console.log(price);
      return {
        _id: props.selectedTicket && props.selectedTicket._id,
        tripId: props.selectedTicket && props.selectedTicket.tripId,
        tripName: props.selectedTicket && props.selectedTicket.tripId.tripName,
        seatCodes: seatCodes,
      };
    }
    return {};
  }

  render() {
    const TextFieldStyle = {
      marginTop: "20px",
      marginBottom: "20px",
    };
    console.log("render");
    console.log(this.state);
    return (
     
      <div>
        <h2>Cập Nhật Vé Xe</h2>
        <form onSubmit={this.onSubmit}>
          <div style={TextFieldStyle}>
            <Select
              label='Vui Lòng Chọn Chuyến Đi'
              value={this.state.tripName}
              onChange={
                (evt) => {
                  // console.log(inputRef.current);
                  this.OnchageObject(evt, this.props.trips);
                  this.setState({ tripName: evt.target.value });
                }
              }
            >
              <Option value='pls select'>pls select</Option>
              {this.RenderOption(this.props.trips)}
            </Select>
          </div>

          <div style={TextFieldStyle}>
            <TextField label="Mã Ghế">
              <Input
                value={this.state.seatCodes}
                name="seatCodes"
                onChange={e => this.setState({ seatCodes: e.target.value })}
                style={{ width: 320 }}
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
    selectedTicket: state.layout.selectedTicket,
    tickets: state.tickets,
    auth: state.auth,
    trips: state.trips
  };
};

export default connect(mapStateToProps, { getTrips, putTicket, getTickets })(
  UpdateTicket
);
