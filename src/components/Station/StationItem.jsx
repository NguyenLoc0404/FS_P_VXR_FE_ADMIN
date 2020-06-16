import React, { Component } from "react";
import Button from "@material/react-button";
import { baseURL } from "./../../api";
import { connect } from "react-redux";
import { setSelectedStation } from "../../actions/layout";
// import {Snackbar} from '@material/react-snackbar';

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

  renderDescription = (string,charac) => {
    console.log(string);
    var display = string.substring(0,charac);
    if (string.length > charac) {
      return (<details>
        <summary >{display}....<span className="details">click to show details</span></summary>
        <p>{string}</p>
      </details>)

    }
    return string;
    // (station.description.length>51)?( <details>
    //   <summary>Click to show details</summary>
    //   <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
    // </details>) :(station.description)
  }
  render() {
    const { index, station } = this.props;
    return (
      <tr className="mdc-data-table__row">
        <td className=" textTableCenter mdc-data-table__cell">{index + 1}</td>
        <td className=" textTableCenter mdc-data-table__cell mdc-data-table__cell--numeric">
          {station.name}
        </td>
        <td className=" textTableCenter mdc-data-table__cell mdc-data-table__cell--numeric">
          {this.renderDescription(station.description,30)}
        </td>
        <td className=" textTableCenter mdc-data-table__cell mdc-data-table__cell--numeric">
          {station.address}
        </td>
        <td className=" textTableCenter mdc-data-table__cell mdc-data-table__cell--numeric">
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
          {/* <Snackbar message="Click Me!" actionText="dismiss" /> */}
        </td>
      </tr>
    );
  }
}

export default withRouter(connect(null, { setSelectedStation })(StationItem));
