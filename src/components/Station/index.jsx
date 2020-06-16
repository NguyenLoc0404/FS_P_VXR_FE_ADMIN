import React, { Component } from "react";
import Authentication from "../../HOC/authenticate";
// import callApi from "./../../api";
import StationItem from "./StationItem";
import { MDCDataTable } from "@material/data-table";

import { getStations } from "../../actions/station";
//connect của redux là hoc
import { connect } from "react-redux";

import Button from "@material/react-button";

class Station extends Component {
  constructor(props) {
    super(props);
    // console.log("constructor");
    this.state = {
      stations: [],
    };
  }

  //stateless
  //React.useEffect  để call api và lấy data của thằng backend
  //React.useState  để set state cho component

  // componentWillMount(){
  //     console.log("componentWillMount")
  // }

  
  //React.useEffect  tương tự bên stateless  componentDidMount và  componentDidUpdate
  componentDidMount() {
    // console.log("componentDidMount");

    // callApi("/stations")
    //   .getItems()
    //   .then((stations) => this.setState({ stations }))
    //   .catch((err) => console.log(err));

    this.props.getStations();
    new MDCDataTable(document.querySelector(".mdc-data-table"));
  }

  renderStations = () => {
    return this.props.stations.map((station, index) => {
      return <StationItem station={station} key={index} index={index} />;
    });
  };

  //render cũng là 1 life cycle
  render() {
    // console.log("render");
    console.log(this.state);
    return (
      <div>
        <h2 style={{margin:"6px"}} >Quản lý Bến Xe</h2>
        {/* Khi  làm router truyền component station 
          station sẽ có 3 props: history , match , location
        */}
       
        <Button
          raised
          onClick={() => this.props.history.push("/stations/create-station")}
        >
          Thêm mới Bến Xe
        </Button>
        <br /> <br />
        <div className="mdc-data-table">
          <table
            className="mdc-data-table__table"
            aria-label="Dessert calories"
          >
            <thead>
              <tr className=" textTableCenter mdc-data-table__header-row">
                <th
                  className=" textTableCenter mdc-data-table__header-cell"
                  role="columnheader"
                  scope="col"
                >
                  STT
                </th>
                <th
                  className=" textTableCenter mdc-data-table__header-cell mdc-data-table__header-cell--numeric"
                  role="columnheader"
                  scope="col"
                >
                  Tên Bến Xe
                </th>
                <th
                  className=" textTableCenter mdc-data-table__header-cell mdc-data-table__header-cell--numeric"
                  role="columnheader"
                  scope="col"
                >
                  Mô Tả
                </th>
                <th
                  className="textTableCenter mdc-data-table__header-cell mdc-data-table__header-cell--numeric"
                  role="columnheader"
                  scope="col"
                >
                  Đia chỉ
                </th>
                <th
                  className="textTableCenter mdc-data-table__header-cell"
                  role="columnheader"
                  scope="col"
                >
                  Tỉnh/TP
                </th>
                <th
                  className=" textTableCenter mdc-data-table__header-cell mdc-data-table__header-cell--numeric"
                  role="columnheader"
                  scope="col"
                >
                  Avatar
                </th>
                <th
                  className=" textTableCenter mdc-data-table__header-cell"
                  role="columnheader"
                  scope="col"
                >
                  Thao Tác
                </th>
              </tr>
            </thead>
            <tbody className="mdc-data-table__content">
              {this.renderStations()}
            </tbody>
          </table>
        </div>
       
      </div>
    );
  }
}

//lay du lieu tu tren redux store
// Lấy state trong redux => thành props của componet
const mapStateToProps = (state) => {
  return {
    stations: state.stations
  };
};
//Map dispatchtoProps
export default connect(mapStateToProps, { getStations })(Authentication(Station));
