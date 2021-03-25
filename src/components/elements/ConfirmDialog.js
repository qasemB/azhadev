import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { NotListedLocation } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(1),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogTitle: {
    textAlign: "center",
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogActions: {
    justifyContent: "center",
  },
  titleIcon: {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.secondary.dark,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      cursor: "default",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "3rem",
    },
  },
}));

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();
  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon}>
          <NotListedLocation />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <h5 className="text-center">{confirmDialog.title}</h5>
        <h6 className="text-center">{confirmDialog.subTitle}</h6>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <button
          className="btn btn-secondary shadow-sm px-3 py-2 mx-1"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        >
          نه
        </button>
        <button
          className="btn btn-danger shadow-sm px-3 py-2 mx-1"
          onClick={() => confirmDialog.confirm()}
        >
          بله
        </button>
      </DialogActions>
    </Dialog>
  );
}
