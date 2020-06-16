import React, { Component } from 'react'
import Button from "@material/react-button";
class SeatDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toogleSeat: false,
        };
    }
    // componentDidMount() {
    //     console.log("componentDidMount");
    //     if(this.props.choose ==true)
    //     {
    //         this.setState({toogleSeat:false})
    //     }
    //   }
    static getDerivedStateFromProps(props, state) {
        console.log("getDerivedStateFromProps");
        console.log("props", props);
        console.log("state", state);
        if (props.choose === true) {
            console.log("choose =true")
            state.toogleSeat = false;
            props.setSeatCodesfun();
        }
        // if (!_.isEmpty(props.auth)) {
        //   let decode = checkTokenValid();
        //   const { token } = decode;
        //   setHeader(token);
        // }
        return {};
    }

    toogleSeat = (e, seatSelected
        // ,renderSeat
    ) => {
        e.preventDefault();

        if (!this.state.toogleSeat) {
            //console.log("vao false")
            this.props.seatCodes.push(seatSelected);
            // this.props.setSeatCodesfun(this.props.seatCodes);
        }
        else {
            // console.log("vao true")
            const index = this.props.seatCodes.findIndex(s => s == seatSelected);
            this.props.seatCodes.splice(index, 1);
            // this.props.setSeatCodesfun(this.props.seatCodes);
        }
        this.setState({ toogleSeat: !this.state.toogleSeat });
        //console.log(this.props.seatCodes);

    }

    render() {
        // const { seatCodes } = this.props;
        return (
            <button
                disabled={this.props.seat.isBooked}
                style={{
                    borderRadius: 10,
                    width: 40, height: 30,
                    fontWeight: 'bold',
                    backgroundColor: `${this.state.toogleSeat ? 'greenyellow' : ""}`,
                    borderColor: 'white',
                    margin: 6
                }}
                onClick={e => {
                    this.toogleSeat(e, this.props.seat.code, this.props.renderSeat)
                }}
            >{this.props.seat.code}</button>

        )
    }
}
export default SeatDetail;


