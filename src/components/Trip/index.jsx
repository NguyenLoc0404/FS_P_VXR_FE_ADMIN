import React, { Component } from "react";
import Authentication from "../../HOC/authenticate";
import { MDCDataTable } from "@material/data-table";
import {getTrips} from "../../actions/trip";
import { connect } from "react-redux";
import TripItem from "./TripItem";
import Button from "@material/react-button";
class Trip extends Component {
  constructor(props) {
    super(props);
    // console.log("constructor");
    this.state = {
      trips: [],
    };
  }

  componentDidMount(){
   this.props.getTrips();
    new MDCDataTable(document.querySelector(".mdc-data-table"));
  }
  renderTrips = () => {
    return this.props.trips.map((trip, index) => {
      return <TripItem trip={trip} key={index} index={index} />;
    });
  };
  render() {
    console.log(this.props.trips);
    return (
      <div>
        <h2>Quản lý Chuyến Đi</h2>
        <Button
          raised
          onClick={() => this.props.history.push("/trips/create-trip")}
        >
          Thêm mới Chuyến Đi
        </Button>
        <br /> <br />
        <div className="mdc-data-table">
          <table
            className="mdc-data-table__table"
            aria-label="Dessert calories"
          >
            <thead>
              <tr className="mdc-data-table__header-row">
                <th
                  className="mdc-data-table__header-cell"
                  role="columnheader"
                  scope="col"
                >
                  STT
                </th>
                <th
                  className="mdc-data-table__header-cell mdc-data-table__header-cell--numeric"
                  role="columnheader"
                  scope="col"
                >
                  Mã Chuyến Đi
                </th>
                <th
                  className="mdc-data-table__header-cell mdc-data-table__header-cell--numeric"
                  role="columnheader"
                  scope="col"
                >
                  Bến Xe Đi
                </th>
                <th
                  className="mdc-data-table__header-cell"
                  role="columnheader"
                  scope="col"
                >
                  Bến Xe Đến
                </th>
                <th
                  className="mdc-data-table__header-cell"
                  role="columnheader"
                  scope="col"
                >
                  Giá Tiền
                </th>
                <th
                  className="mdc-data-table__header-cell"
                  role="columnheader"
                  scope="col"
                >
                  Giờ khởi hành
                </th>
                <th
                  className="mdc-data-table__header-cell"
                  role="columnheader"
                  scope="col"
                >
                  Thao Tác
                </th>
              </tr>
            </thead>
            <tbody className="mdc-data-table__content">
              {this.renderTrips()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
      trips: state.trips
    };
  };
export default connect(mapStateToProps,{getTrips}) (Authentication(Trip));
