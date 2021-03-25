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
  closeNotify,
  notifyError422,
  notifyError500,
  notifySuccess,
} from "../../utils/notifErrorMessage";
import { replaceOldRecord_Front } from "../../utils/utils";
import { editArticleSevice } from "../../services/article";

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

export default function EditArticleDialog({
  editDialog,
  setEditDialog,
  notify,
  setNotify,
  articles,
  setArticles,
  categories,
}) {
  const classes = useStyles();
  const [category_id, setcategory_id] = useState("");
  const [h_title, seth_title] = useState("");
  const [top_title, settop_title] = useState("");
  const [top_text, settop_text] = useState("");
  const [text, settext] = useState("");
  const [image, setimage] = useState("");
  const [alt_image, setalt_image] = useState("");
  const [keywords, setkeywords] = useState("");

  useEffect(() => {
    setcategory_id(editDialog.data.category_id);
    seth_title(editDialog.data.h_title);
    settop_title(editDialog.data.top_title);
    settop_text(editDialog.data.top_text);
    settext(editDialog.data.text);
    setimage(editDialog.data.image);
    setalt_image(editDialog.data.alt_image);
    setkeywords(editDialog.data.keywords);
  }, [editDialog]);

  const handleEditArticle = async (event) => {
    event.preventDefault();
    const article = {
      category_id,
      h_title,
      top_title,
      top_text,
      text,
      image,
      alt_image,
      keywords,
      id: editDialog.data.id,
    };
    const res = await editArticleSevice(article);
    const data = res.data;
    if (data.status == 200) {
      setArticles(
        replaceOldRecord_Front(articles, data.data, editDialog.data.id)
      );
      setNotify(notifySuccess("مقاله با موفقیت ویرایش شد"));
      handleClose();
      closeNotify(2000, notify, setNotify);
    } else if (data.status == 422) {
      setNotify(notifyError422(data));
    } else {
      setNotify(notifyError500());
    }
  };
  const handleClose = () => {
    setEditDialog({ ...editDialog, isOpen: false });
  };

  const handleImg = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    if (files[0].type.match("image.*") && files[0].size <= 1024000) {
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setimage(reader.result);
        setNotify(notifySuccess("فرمت و حجم تصویر تایید شد"));
        closeNotify(3000, notify, setNotify);
      };
    } else {
      setNotify(notifyError("فرمت تصویر و حجم 1 مگابایت را رعایت کنید"));
    }
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
              <span>{h_title}</span>
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              انصراف
            </Button>
          </Toolbar>
        </AppBar>
        <form
          onSubmit={(e) => handleEditArticle(e)}
          className="col-12 col-md-8 text-center justify-content-center py-5 m-auto"
          encType="multipart/form-data"
        >
          <div className="form-group col-11 m-auto py-2">
            <select
              name="category_id"
              value={category_id}
              onChange={(e) => setcategory_id(e.target.value)}
              className="col-11 form-control rounded_5 h_2_5 m-auto shadow-sm"
            >
              <option value="">انتخاب دسته</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-11 m-auto py-2">
            <input
              type="text"
              name="h_title"
              value={h_title}
              onChange={(e) => seth_title(e.target.value)}
              className="form-control col-11 m-auto rounded_5 shadow-sm"
              placeholder="عنوان مقاله"
            />
          </div>
          <div className="form-group col-11 m-auto py-2">
            <input
              type="text"
              name="top_title"
              value={top_title}
              onChange={(e) => settop_title(e.target.value)}
              className="form-control col-11 m-auto rounded_5 shadow-sm"
              placeholder="عنوان تایتل"
            />
          </div>
          <div className="form-group col-11 m-auto py-2 text-center">
            توضیحات کوتاه:
            <textarea
              name="top_text"
              value={top_text}
              onChange={(e) => settop_text(e.target.value)}
              rows="3"
              className="form-control col-11 m-auto rounded shadow-sm"
            ></textarea>
          </div>
          <div className="form-group col-11 m-auto py-2 text-center">
            متن کامل:
            <textarea
              name="text"
              value={text}
              onChange={(e) => settext(e.target.value)}
              rows="7"
              className="form-control col-11 m-auto rounded shadow-sm"
            ></textarea>
          </div>
          <div className="form-group col-11 m-auto py-2 text-center">
            تصویر:
            <input
              type="file"
              name="image"
              onChange={(e) => handleImg(e)}
              className="form-control col-11 m-auto rounded_5 box_shadow_0 border-0"
            />
            <img width="200" src={image} />
          </div>
          <div className="form-group col-11 m-auto py-2">
            <input
              type="text"
              name="alt_image"
              value={alt_image}
              onChange={(e) => setalt_image(e.target.value)}
              className="form-control col-11 m-auto rounded_5 shadow-sm"
              placeholder="توضیح تصویر"
            />
          </div>
          <div className="form-group col-11 m-auto py-2">
            <input
              type="text"
              name="keywords"
              value={keywords}
              onChange={(e) => setkeywords(e.target.value)}
              className="form-control col-11 m-auto rounded_5 shadow-sm"
              placeholder="کلمات کلیدی"
            />
          </div>
          <div className="form-group col-11 m-auto py-2 row justify-content-center">
            <button
              type="submit"
              className="btn btn-success rounded_5 mx-3 m-auto"
            >
              ویرایش مقاله
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
