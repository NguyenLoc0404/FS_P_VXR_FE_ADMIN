import React, { Component } from "react";

import Authentication from "../../HOC/authenticate";
import { connect } from "react-redux";
import { MDCDataTable } from "@material/data-table";
import Button from "@material/react-button";


import UserItem from "./UserItem";

import {getUsers} from "./../../actions/user";

class User extends Component {
  constructor(props) {
    super(props);
    // console.log("constructor");
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
   
    this.props.getUsers();
    new MDCDataTable(document.querySelector(".mdc-data-table"));
  }

  renderUsers = () => {
    return this.props.users.map((user, index) => {
      return <UserItem user={user} key={index} index={index} />;
    });
  };


  render() {
    return (
      <div>
        <h2 style={{margin:"6px"}} >Quản lý User</h2>
       
        <Button
          raised
          onClick={() => this.props.history.push("/users/create-user")}
        >
          Thêm mới User
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
                  Full Name
                </th>
                <th
                  className="textTableCenter mdc-data-table__header-cell mdc-data-table__header-cell--numeric"
                  role="columnheader"
                  scope="col"
                >
                 Email
                </th>
                <th
                  className="textTableCenter mdc-data-table__header-cell"
                  role="columnheader"
                  scope="col"
                >
                  userType
                </th>
                <th
                  className="textTableCenter mdc-data-table__header-cell"
                  role="columnheader"
                  scope="col"
                >
                  Avatar
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
              {this.renderUsers()}
            </tbody>
          </table>
        </div>
        </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};
export default connect(mapStateToProps,{getUsers})(Authentication(User));
