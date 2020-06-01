import React, { Component } from "react";
import Button from "@material/react-button";
import { connect } from "react-redux";
import { setSelectedTrip } from "./../../actions/layout";
import { withRouter } from "react-router-dom";
import DeleteConf from "./DeleteConf";
class TripItem extends Component {
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
  render() {
    const { index, trip } = this.props;
   
  
    return (
      <tr className="mdc-data-table__row">
        <td className="mdc-data-table__cell">{index + 1}</td>
        <td className="mdc-data-table__cell mdc-data-table__cell--numeric">
          {trip._id}
        </td>
        <td className="mdc-data-table__cell mdc-data-table__cell--numeric">
          {trip.fromStationsId.name}
        </td>
        <td className="mdc-data-table__cell mdc-data-table__cell--numeric">
          {trip.toStationsId.name}
        </td>
        <td className="mdc-data-table__cell mdc-data-table__cell--numeric">
          {trip.price}
        </td>
        <td className="mdc-data-table__cell mdc-data-table__cell--numeric">
          {trip.startTime.replace(/T/, " ").replace(/\..+/,'')}
        </td>

        <td className="mdc-data-table__cell">

          <Button
            raised
            onClick={() => {
              this.props.history.push(`/trips/update-trip/${trip._id}`);
              this.props.setSelectedTrip(trip);
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
                TripId={trip._id}
              />
        </td>
      </tr>
    );
  }
}

export default withRouter(connect(null, { setSelectedTrip })(TripItem));
