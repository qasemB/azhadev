import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import {
  notifyError422,
  notifyError500,
  notifySuccess,
} from "../../utils/notifErrorMessage";
import { editCategorySevice } from "../../services/category";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditCategoryDialog({
  editDialog,
  setEditDialog,
  setNotify,
  categories,
  setCategories,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const classes = useStyles();

  useEffect(() => {
    setTitle(editDialog.data.title);
    setDescription(editDialog.data.description);
    setIcon(editDialog.data.icon);
  }, [editDialog]);

  const handleEditCategory = async (event) => {
    event.preventDefault();
    const category = {
      title,
      description,
      icon,
      id: editDialog.data.id,
    };
    const res = await editCategorySevice(category);
    const data = res.data;
    if (data.status == 200) {
      const newCategories = [...categories];
      const indexCategory = newCategories.findIndex(
        (c) => c.id == editDialog.data.id
      );
      newCategories[indexCategory] = data.data;
      setCategories(newCategories);
      setNotify(notifySuccess("دسته با موفقیت ویرایش شد"));
      setTimeout(() => {
        setEditDialog({
          ...editDialog,
          isOpen: false,
        });
      }, 2000);
    } else if (data.status == 422) {
      setNotify(notifyError422(data));
    } else {
      setNotify(notifyError500());
    }
  };
  const handleClose = () => {
    setEditDialog({ ...editDialog, isOpen: false });
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={editDialog.isOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <span>{title}</span>
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              انصراف
            </Button>
          </Toolbar>
        </AppBar>
        <form
          action=""
          className="col-12 col-md-8 text-center justify-content-center py-5 m-auto"
          onSubmit={(e) => handleEditCategory(e)}
        >
          <div className="form-group col-11 m-auto py-2">
            <input
              type="text"
              name="title"
              className="form-control col-11 m-auto rounded_5 shadow-sm"
              placeholder="عنوان دسته"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group col-11 m-auto py-2">
            <input
              type="text"
              name="description"
              className="form-control col-11 m-auto rounded_5 shadow-sm"
              placeholder="توضیخات دسته"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group col-11 m-auto py-2">
            <input
              type="text"
              name="icon"
              className="form-control col-11 m-auto rounded_5 shadow-sm"
              placeholder="فوت آسم دسته"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            />
          </div>
          <div className="form-group col-11 m-auto py-2 row justify-content-center">
            <button
              type="submit"
              className="btn btn-success rounded_5 mx-3 m-auto"
            >
              ویرایش دسته
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
