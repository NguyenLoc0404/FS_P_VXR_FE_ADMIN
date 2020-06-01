import React, { Component } from "react";
import Button from "@material/react-button";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DeleteConf from "./DeleteConf";
import { setSelectedTicket } from "./../../actions/layout";

class TicketItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDelete: false,
    };
  }

  cancelDelete = () => {
    this.setState({
      isDelete: false,
    });
  };

  renderSeat = (seatArray) => {
    console.log(seatArray,4444)
    return seatArray.map((seat, index) => {
      return (
        <button className="mdc-button--outlined" key={index}>
          <div className="mdc-button__ripple"></div>
          <span className="mdc-button__label">{seat.code}</span>
        </button>
      );
    });
  };

  render() {
    const { index, ticket } = this.props;
    console.log(ticket, 11111);
    return (
      <tr className="mdc-data-table__row">
        <td className="mdc-data-table__cell">{index + 1}</td>
        <td className="mdc-data-table__cell mdc-data-table__cell--numeric">
          {ticket.tripId}
        </td>
        <td className="mdc-data-table__cell mdc-data-table__cell--numeric">
          {ticket.userId}
        </td>
        <td className="mdc-data-table__cell mdc-data-table__cell--numeric">
          {/* check xem nó có rỗng ko ,
          Lần đầu nó render luôn rỗng  */}
          { ticket.seats && this.renderSeat(ticket.seats)}
        </td>
        <td className="mdc-data-table__cell mdc-data-table__cell--numeric">
          {ticket.totalPrice}
        </td>
        <td className="mdc-data-table__cell">
          <Button
            raised
            onClick={() => {
              this.props.history.push(`/tickets/update-ticket/${ticket._id}`);
              this.props.setSelectedTicket(ticket);
            }}
          >
            Update
          </Button>
          <Button
            outlined
            style={{ marginLeft: "10px" }}
            onClick={() => this.setState({ isDelete: true })}
          >
            Delete
          </Button>
        </td>
        <td>
          <DeleteConf
            isDelete={this.state.isDelete}
            cancelDelete={this.cancelDelete}
            TicketId={ticket._id}
          />
        </td>
      </tr>
    );
  }
}

export default withRouter(connect(null, { setSelectedTicket })(TicketItem));
