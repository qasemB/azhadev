import { makeStyles, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

export default function Notification(props) {
  const { notify, setNotify } = props;

  const handleClose = (event, reason) => {
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={5000}
      onClick={handleClose}
      className="cursor_pointer"
    >
      <Alert severity={notify.type}>
        <span dangerouslySetInnerHTML={{ __html: `${notify.message}` }}></span>
      </Alert>
    </Snackbar>
  );
}
