import React, { Component } from "react";
import TextField, { Input } from "@material/react-text-field";
import Button from "@material/react-button";
import { putTicket } from "./../../actions/ticket";
import { getTickets } from "../../actions/ticket";
import { connect } from "react-redux";
import _ from "lodash";
import checkTokenValid from "./../../ultils/checkTokenValid";
import setHeader from "./../../ultils/setHeader";

let price;

class UpdateTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      tripId: "",
      seatCodes: [],
      // totalPrice: "",
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

    let {
      _id,
      tripId,
      //userId,
      seatCodes,
      //totalPrice
    } = this.state;

    seatCodes = seatCodes.split(" ");
    console.log(seatCodes);
    seatCodes = seatCodes.filter((s) => s !== "");
    // price = seatCodes.length * price;
    let ticket = {
      _id,
      tripId,
      //userId,
      seatCodes,
      //totalPrice,
    };
    console.log("vao submit");
    console.log(ticket, 1234);

    this.props.putTicket(ticket).then(() => {
      //di chuyển tới 1 trang
      console.log(1);
      this.props.history.push("/tickets");
    });
  };

  componentDidMount() {
    console.log("componentDidMount");
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
      !state.tripId &&
      //!state.userId &&
      !state._id
      //&& !state.totalPrice
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
      return {
        _id: props.tickets[index] && props.tickets[index]._id,
        tripId: props.tickets[index] && props.tickets[index].tripId,
        seatCodes: seatCodes,
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
     
      return {
        _id: props.selectedTicket && props.selectedTicket._id,
        tripId: props.selectedTicket && props.selectedTicket.tripId,
     
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
    return (
      <div>
        <h2>Cập Nhật Vé Xe</h2>
        <form onSubmit={this.onSubmit}>
          <div style={TextFieldStyle}>
            <TextField label="Mã Chuyến Đi">
              <Input
                value={this.state.tripId}
                name="tripId"
                onChange={this.onChange}
              />
            </TextField>
          </div>

          <div style={TextFieldStyle}>
            <TextField label="Mã Ghế">
              <Input
                value={this.state.seatCodes}
                name="seatCodes"
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
    selectedTicket: state.layout.selectedTicket,
    tickets: state.tickets,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { putTicket, getTickets })(
  UpdateTicket
);
