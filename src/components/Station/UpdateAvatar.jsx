import React, { Component } from 'react'
import Button from "@material/react-button";
import { createAvatar } from "../../actions/station";
// import { putStation } from "../../actions/station";
import { getStations } from "../../actions/station";
import { connect } from "react-redux";
import _ from "lodash";
import { baseURL } from "./../../api";

import checkTokenValid from "./../../ultils/checkTokenValid";
import setHeader from "./../../ultils/setHeader";


class UpdateAvatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            avatar: {},
            file: null
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
        console.log(e.target.files[0], 1111111111111);
        this.setState({
            file: e.target.files[0]
        });
    };
    onSubmit = (e) => {
        e.preventDefault();
        console.log("vao submit");
        console.log(this.state);
        const formData = new FormData();
        formData.append('station', this.state.file);

        console.log(formData.getAll("station"));
        console.log(this.state._id);
        this.props.createAvatar(formData
            ,this.state._id
        ).then(() => {
            this.props.history.push("/stations");
        });
    }

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
        if (_.isEmpty(props.selectedStation) && !state._id) {
            const { stationId } = props.match.params;
            //console.log(stationId);
            const index = props.stations.findIndex((s) => s._id === stationId);
            // console.log(props.stations[index])
            return {
                _id: props.stations[index] && props.stations[index]._id,
                avatar: props.stations[index] && props.stations[index].stationA
            };
        }

        if (!state._id) {
            return {
                _id: props.selectedStation && props.selectedStation._id,
                avatar: props.selectedStation && props.selectedStation.stationA
            };
        }

        return {}
    }
    render() {
        const TextFieldStyle = {
            marginTop: "20px",
            marginBottom: "20px",
        };
        return (
            <div>
                <h2> Cập Nhật Avatar cho  Bến Xe</h2>
                <form onSubmit={this.onSubmit}>
                    <div style={TextFieldStyle}>
                        <img
                            src={`${baseURL}/${this.state.avatar}`}
                            style={{ width: '240px', height: '240px', borderRadius: '50%' }}
                            alt="link img error" className="card-img-top" />
                    </div>
                    <div style={TextFieldStyle}>
                        <label >Upload New Avatar</label>
                        <br/>
                        <input type="file" className="form-control" name="avatar" placeholder="Select file"
                            onChange={this.onChange} style={{paddingLeft:"5%"}} />
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
export default connect(mapStateToProps, {  getStations, createAvatar })(UpdateAvatar);