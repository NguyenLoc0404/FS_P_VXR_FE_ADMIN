import React, { Component } from "react";
import Authentication from "../../HOC/authenticate";
import { MDCDataTable } from "@material/data-table";
import { getTickets } from "../../actions/ticket";
import { connect } from "react-redux";
import TicketItem from "./TicketItem";
import Button from "@material/react-button";

class Ticket extends Component {
  constructor(props) {
    super(props);
    // console.log("constructor");
    this.state = {
      tickets: [],
    };
  }

  componentDidMount() {
    this.props.getTickets()
    .catch(err => console.log(err));
    ;
    new MDCDataTable(document.querySelector(".mdc-data-table"));
  }

  

  renderTickets = () => {
    console.log(this.props.tickets);

    return this.props.tickets.map((ticket, index) => {
      return <TicketItem ticket={ticket} key={index} index={index} />;
    });
  };

  render() {
    return (
      <div>
        <h2>Quản lý Ticket</h2>
        <Button
          raised
          onClick={() => this.props.history.push("/tickets/create-ticket")}
        >
          Đặt Vé Mới
        </Button>
        <br /> <br />
        <div className="mdc-data-table " >
          <table
            className="mdc-data-table__table"
            aria-label="Dessert calories"
          >
            <thead>
              <tr className="mdc-data-table__header-row">
                <th
                  className="textTableCenter mdc-data-table__header-cell"
                  role="columnheader"
                  scope="col"
                >
                  STT
                </th>
                <th
                  className="textTableCenter mdc-data-table__header-cell mdc-data-table__header-cell--numeric"
                  role="columnheader"
                  scope="col"
                >
                 Tên Chuyến Đi
                </th>
                <th
                  className="textTableCenter mdc-data-table__header-cell mdc-data-table__header-cell--numeric"
                  role="columnheader"
                  scope="col"
                >
                  Tên Người Đặt
                </th>
                <th
                  className="textTableCenter mdc-data-table__header-cell"
                  role="columnheader"
                  scope="col"
                >
                  Ghế Đã Đặt
                </th>
                <th
                  className="textTableCenter mdc-data-table__header-cell"
                  role="columnheader"
                  scope="col"
                >
                  Tổng Tiền
                </th>
                <th
                  className="textTableCenter mdc-data-table__header-cell"
                  role="columnheader"
                  scope="col"
                >
                  Thao Tác
                </th>
              </tr>
            </thead>
            <tbody className="mdc-data-table__content">
              {this.renderTickets()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tickets: state.tickets,
  };
};

export default connect(mapStateToProps, { getTickets })(Authentication(Ticket));

