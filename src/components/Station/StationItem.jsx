import React, { Component } from "react";
import Button from "@material/react-button";
import { baseURL } from "./../../api";
import { connect } from "react-redux";
import { setSelectedStation } from "../../actions/layout";


//dùng withrouter khi nào ko có history
//nó là 1 HOC
import { withRouter } from "react-router-dom";

import DeleteConf from "./DeleteConf";
class StationItem extends Component {
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
    const { index, station } = this.props;
    return (
      <tr className="mdc-data-table__row">
        <td className="mdc-data-table__cell">{index + 1}</td>
        <td className="mdc-data-table__cell mdc-data-table__cell--numeric">
          {station.name}
        </td>
        <td className="mdc-data-table__cell mdc-data-table__cell--numeric">
          {station.description}
        </td>
        <td className="mdc-data-table__cell mdc-data-table__cell--numeric">
          {station._id}
        </td>
        <td className="mdc-data-table__cell mdc-data-table__cell--numeric">
          {station.address}
        </td>
        <td className="mdc-data-table__cell mdc-data-table__cell--numeric">
          {station.province}
        </td>
        <td className="mdc-data-table__cell mdc-data-table__cell--numeric">
          <img src={`${baseURL}/${station.stationA}`} style={{ width: '60px', height: '60px', borderRadius: '50%' }} alt='no avatar' />
        </td>
        <td className="mdc-data-table__cell">
          <Button
            raised
            onClick={() => {
              this.props.history.push(
                `/stations/update-station/${station._id}`
              );
              this.props.setSelectedStation(station);
            }}
          >
            Update
          </Button>
          <Button
            outlined
            style={{ marginLeft: "10px" }}
            onClick={() => {
              this.props.history.push(
                `/stations/update-avatar/${station._id}`
              );
              this.props.setSelectedStation(station);
            }}
          >
             Avatar
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
            StationId={station._id}
          />
    
        </td>
      </tr>
    );
  }
}

export default withRouter(connect(null, { setSelectedStation })(StationItem));
