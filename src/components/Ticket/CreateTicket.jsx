import React, { Component } from "react";
import TextField, { Input } from "@material/react-text-field";
import Button from "@material/react-button";
import { connect } from "react-redux";
import { postTicket } from "./../../actions/ticket";

class CreateTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripId: "",
      seatCodes: [],
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
    let { tripId, seatCodes} = this.state;
    seatCodes = seatCodes.split(" ");
    const ticket = {tripId, seatCodes };
    console.log(ticket,123456);

    this.props.postTicket(ticket).then(() => {
      this.props.history.push("/tickets");
    });
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
            Thêm
          </Button>
        </form>
      </div>
    );
  }
}

export default connect(null, { postTicket })(CreateTicket);
