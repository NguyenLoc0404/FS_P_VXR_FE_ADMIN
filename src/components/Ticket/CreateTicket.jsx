import React, { Component } from "react";
import TextField, { Input } from "@material/react-text-field";
import Button from "@material/react-button";
import { connect } from "react-redux";
import { postTicket } from "../../actions/ticket";
import _ from "lodash";
import checkTokenValid from "./../../ultils/checkTokenValid";
import setHeader from "./../../ultils/setHeader";
import Select, { Option } from '@material/react-select';
import { getTrips  } from "../../actions/trip";
import SeatDetail from "./SeatDetail";


class CreateTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripId: "",
      tripName: "pls select",
      tripSelect: [],
      seatCodes: [],
      choose : false
    };
  }

  componentDidMount() {
    //console.log("componentDidMount")
    this.props.getTrips();
  }

  static getDerivedStateFromProps(props, state) {
    // console.log("getDerivedStateFromProps");
    // console.log(props);
    // console.log(state);
    if (!_.isEmpty(props.auth)) {
      let decode = checkTokenValid();
      const { token } = decode;
      setHeader(token);
    }
    return {};
  }
  setSeatCodesfun = () => {
    
    this.setState({ choose: false })
  }
  OnchageObject = (e, array, LR) => {
    const ticketTemp = array.find(s => s.tripName === e.target.value);
    if (ticketTemp) {
      //console.log(ticketTemp);
      this.setState({ tripId: ticketTemp._id })
      this.setState({ tripSelect: ticketTemp.seats })
    }

    if (_.isEmpty(ticketTemp))
      this.setState({ tripId: "" })
  }

  RenderOption = (array) => {
    //console.log(array);
    return array.map((s, index) => {
      return <Option value={s.tripName} key={index} > {s.tripName}
      </Option>
    })
  }


  renderSeat = (arr) => {
    //console.log(arr);
    return arr.map((s, index) => {
      return (
        <SeatDetail seat={s} key={index} seatCodes={this.state.seatCodes}
         setSeatCodesfun={this.setSeatCodesfun}
        choose={this.state.choose}
        >{s.code}</SeatDetail>
      )
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    let { tripId, seatCodes, tripName } = this.state;

    if (tripName === "pls select") {
      alert("vui long chon chuyen di");
      return;
    }
    if (_.isEmpty(seatCodes)) {
      alert("vui long nhập vào mã ghế");
      return;
    }

    console.log(seatCodes);
    //seatCodes = seatCodes.split(" ");
    const ticket = { tripId, seatCodes };
    console.log(ticket, 123456);

    this.props.postTicket(ticket).then(() => {
      this.props.history.push("/tickets");
    }).catch(err => console.log("error in ticket", err));;
  };

  render() {
    const TextFieldStyle = {
      marginTop: "20px",
      marginBottom: "20px",
    };

    return (
      <div>
        <h2> Thêm mới Ticket</h2>
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
                  this.setState({seatCodes:[]});
                  this.setState({choose:true});
                }
              }
            >
              <Option value='pls select'>pls select</Option>
              {this.RenderOption(this.props.trips)}
            </Select>
          </div>

          <div style={TextFieldStyle}>
            {
              (!_.isEmpty(this.state.tripId)) ? this.renderSeat(this.state.tripSelect) : ""
            }
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
    trips: state.trips,
    auth: state.auth
  };
};
export default connect(mapStateToProps, { postTicket, getTrips })(CreateTicket);
