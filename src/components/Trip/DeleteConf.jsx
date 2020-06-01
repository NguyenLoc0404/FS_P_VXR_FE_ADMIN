import React, { Component } from "react";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from "@material/react-dialog";


import { deleteTrip } from "../../actions/trip";
import { connect } from "react-redux";

class DeleteConf extends Component {
  render() {
    console.log(this.props);
    return (
      <Dialog open={this.props.isDelete} onClose={this.props.cancelDelete}>
        <DialogTitle>Xóa Trip</DialogTitle>
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
            onClick={() => this.props.deleteTrip(this.props.TripId)}
          >
            Có
          </DialogButton>
        </DialogFooter>
      </Dialog>
      
    );
  }
}
export default connect(null, { deleteTrip })(DeleteConf);
