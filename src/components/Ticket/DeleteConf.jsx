import React, { Component } from "react";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from "@material/react-dialog";


import { deleteTicket } from "../../actions/ticket";
import { connect } from "react-redux";

class DeleteConf extends Component {
  render() {
    //console.log(this.props);
    return (
      <Dialog open={this.props.isDelete} onClose={this.props.cancelDelete}>
        <DialogTitle>Xóa Ticket</DialogTitle>
        <DialogContent>Bán có chắc chắn muỗn xóa</DialogContent>
        <DialogFooter>
          <DialogButton
            action="dismiss"
            onClick={() => this.props.cancelDelete}
          >
            Không
          </DialogButton>
          <DialogButton
            action="accept"
            isDefault
            onClick={() => this.props.deleteTicket(this.props.TicketId)}
          >
            Có
          </DialogButton>
        </DialogFooter>
      </Dialog>
      
    );
  }
}
export default connect(null, { deleteTicket })(DeleteConf);
