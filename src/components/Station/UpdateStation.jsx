import React, { Component } from "react";
import TextField, { Input } from "@material/react-text-field";
import Button from "@material/react-button";
import { putStation } from "../../actions/station";
import { getStations } from "../../actions/station";
import { connect } from "react-redux";
import _ from "lodash";
import swal from 'sweetalert';
import checkTokenValid from "./../../ultils/checkTokenValid";
import setHeader from "./../../ultils/setHeader";

class UpdateStation extends Component {
  //Dưới đặt name trong ô input thì state phải có name
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      name: "",
      address: "",
      province: "",
      description: ""
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { _id, name, address, province ,description } = this.state;
    const station = { _id, name, address, province ,description };

    // console.log("UpdateStation -> onSubmit -> station", station);

    this.props.putStation(station).then(() => {
      this.props.history.push("/stations");
    }).catch(err => {
      console.log(err)
      if (err.name)
        swal(`${err.name}`)
      else if (err.address)
        swal(`${err.address}`)
      else if (err.description)
        swal(`${err.description}`)
      else if (err.province)
        swal(`${err.province}`)

    });
  };
  componentDidMount(props) {
    console.log("componentDidMount");
    this.props.getStations();
    // console.log("Props: ", props);
  }
  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps");
    // console.log("Props: ", props.selectedStation && props.selectedStation.name);
    // console.log("Props: ", props);

    //check đã đăng  nhập => sau đó set header cho component Update
    if (!_.isEmpty(props.auth)) {
      let decode = checkTokenValid();
      const { token } = decode;
      setHeader(token);
    }
    //console.log("Props: ", props);
    //  console.log("State: ", state);
    //Check khi F5
    if (_.isEmpty(props.selectedStation) && !state.name && !state.province && !state.address) {
      const { stationId } = props.match.params;
      //console.log(stationId);
      const index = props.stations.findIndex((s) => s._id === stationId);
      // console.log(props.stations[index])
      return {
        _id: props.stations[index] && props.stations[index]._id,
        name: props.stations[index] && props.stations[index].name,
        address: props.stations[index] && props.stations[index].address,
        province: props.stations[index] && props.stations[index].province,
        description: props.stations[index] && props.stations[index].description
      };
    }


    if (!state.name && !state.address && !state.province) {
      return {
        _id: props.selectedStation && props.selectedStation._id,
        name: props.selectedStation && props.selectedStation.name,
        address: props.selectedStation && props.selectedStation.address,
        province: props.selectedStation && props.selectedStation.province,
        description: props.selectedStation && props.selectedStation.description
      };
    }

    return {}
  }

  render() {
    const TextFieldStyle = {
      marginTop: "20px",
      marginBottom: "20px",
    };
    //console.log(this.props);
    return (
      <div>
        <h2> Cập Nhật Bến Xe</h2>
        <form onSubmit={this.onSubmit}>
          <div style={TextFieldStyle}>
            <TextField label="Tên Bến Xe">
              <Input
                value={this.state.name}
                name="name"
                onChange={this.onChange}
              />
            </TextField>
          </div>

          <div style={TextFieldStyle}>
            <TextField label="Đia chỉ Bến Xe">
              <Input
                value={this.state.address}
                name="address"
                onChange={this.onChange}
              />
            </TextField>
          </div>

          <div style={TextFieldStyle}>
            <TextField label="Tỉnh/Thành Phố">
              <Input
                value={this.state.province}
                name="province"
                onChange={this.onChange}
              />
            </TextField>
          </div>
          <div style={TextFieldStyle}>
            <TextField label="Mô Tả">
              <Input
                value={this.state.description}
                name="description"
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
  console.log("mapStateToProps")
  return {
    selectedStation: state.layout.selectedStation,
    stations: state.stations,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  putStation,
  getStations,
})(UpdateStation);
