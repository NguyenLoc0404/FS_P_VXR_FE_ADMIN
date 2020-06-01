import React, { Component } from "react";
import List, { ListItem } from "@material/react-list";
 import Authentication from "../../HOC/authenticate";
import { Link } from "react-router-dom";
class index extends Component {
  render() {
    return (
      <div>
        <h2>Quản Lý Chung</h2>
        <List>
          <ListItem>
            <Link to="/stations">Quản Lý Bến Xe</Link>
          </ListItem>
          <ListItem>
            <Link to="/trips">Quản Lý Chuyến Đi</Link>
          </ListItem>
          <ListItem>
            <Link to="/tickets">Quản Lý Vé</Link>
          </ListItem>
          <ListItem>
            <Link to="/users">Quản Lý Người Dùng</Link>
          </ListItem>
        </List>
      </div>
    );
  }
}
export default Authentication(index);
// export default index;
