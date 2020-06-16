import React, { Component } from "react";
import {baseURL} from "./../../api";
import Button from "@material/react-button";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DeleteConf from "./DeleteConf";
import { setSelectedUser } from "./../../actions/layout";

class UserItem extends Component {
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
    const { index, user } = this.props;
    console.log(user, 666666666666);
    return (
      <tr className="mdc-data-table__row">
        <td className="textTableCenter mdc-data-table__cell">{index + 1}</td>
        <td className="textTableCenter mdc-data-table__cell mdc-data-table__cell--numeric">
          {user.fullName}
        </td>
        <td className="textTableCenter mdc-data-table__cell mdc-data-table__cell--numeric">
          {user.email}
        </td>
        <td className="textTableCenter mdc-data-table__cell mdc-data-table__cell--numeric">
          {user.userType}
        </td>
        <td className="mdc-data-table__cell mdc-data-table__cell--numeric">
          <img src={`${baseURL}/${user.avatar}`} style={{width: '60px',height:'60px', borderRadius: '50%'}} alt='no avatar'/>
        </td>

        <td className="mdc-data-table__cell">
          <Button
            raised
            onClick={() => {
              this.props.history.push(`/users/update-user/${user._id}`);
              this.props.setSelectedUser(user);
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
            UserId={user._id}
          />
        </td>
      </tr>
    );
  }
}

export default withRouter(connect(null, { setSelectedUser })(UserItem));
