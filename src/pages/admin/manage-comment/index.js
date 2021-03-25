import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ConfirmDialog from "../../../components/elements/ConfirmDialog";
import Notification from "../../../components/elements/Notification";
import AdminLayout from "../../../components/Layouts/AdminLayout/AdminLayout";
import { checkAdmin } from "../../../services/user";
import {
  activeCommentService,
  deleteCommentService,
  getAllCommentsService,
} from "../../../services/comment";
import {
  closeNotify,
  notifyError500,
  notifySuccess,
} from "../../../utils/notifErrorMessage";

const ManageComment = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const [comments, setComments] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    confirm: () => {},
  });

  useEffect(() => {
    const check = async () => {
      const res = await checkAdmin();
      if (res) {
        setIsAdmin(res);
      } else {
        router.push("/");
      }
      const comments = await getAllCommentsService();
      setComments(comments.data);
    };
    check();
  }, []);

  const handleDelete = async (commentId) => {
    const comment = {
      id: commentId,
    };
    const res = await deleteCommentService(comment);
    const data = res.data;
    if (data.status == 200) {
      const newComments = [...comments].filter((c) => c.id != commentId);
      setComments(newComments);
      setNotify(notifySuccess("نظر با موفقیت حذف شد"));
      setConfirmDialog({
        isOpen: false,
        title: "",
        subTitle: "",
        confirm: () => {},
      });
      closeNotify(2000, notify, setNotify);
    } else {
      setNotify(notifyError500());
    }
  };

  const showAlertModal = (comId) => {
    setConfirmDialog({
      isOpen: true,
      title: `حذف نظر شماره  ${comId}`,
      subTitle: "آیا از حذف این نظر مطمئن هستید ؟",
      confirm: () => handleDelete(comId),
    });
  };

  const handleActiveComment = async (comId) => {
    const article = {
      id: comId,
    };
    frontativeComment(comId);
    const res = await activeCommentService(article);
    const data = res.data;
    if (data.status == 200) {
      setNotify(notifySuccess("عملیات با موفقیت انجام شد"));
      closeNotify(2000, notify, setNotify);
    } else {
      frontativeComment(comId);
      setNotify(notifyError500());
    }
  };

  const frontativeComment = (comId) => {
    const newComments = [...comments];
    const index = newComments.findIndex((c) => c.id == comId);
    newComments[index].is_active = (newComments[index].is_active - 1) * -1;
    setComments(newComments);
  };

  return (
    <AdminLayout>
      <div className="container-fluid">
        {isAdmin ? (
          <table className="table table-primary table-striped table-bordered col-11 m-auto ">
            <thead className="thead-dark">
              <tr>
                <th className="text-center">ردیف</th>
                <th className="text-center">کاربر</th>
                <th className="text-center">برای</th>
                <th className="text-center">متن</th>
                <th className="text-center">وضعیت</th>
                <th className="text-center">اکشن</th>
              </tr>
            </thead>
            <tbody>
              {comments.length > 0 ? (
                comments.map((c) => (
                  <tr key={c.id}>
                    <td className="text-center">{c.id}</td>
                    <td className="text-center">
                      {`${c.user.firstname}   ${
                        c.user.lastname != null ? c.user.lastname : ""
                      }`}
                    </td>
                    <td className="text-center">
                      {c.parent_id > 0 ? "پاسخ در :" : ""}
                      <a target="_blank" href={`/article/${c.article_id}`}>
                        {c.article.h_title}
                      </a>
                    </td>
                    <td className="text-center">{c.text}</td>
                    <td
                      onClick={() => handleActiveComment(c.id)}
                      className={`text-center cursor_pointer_text_shadow ${
                        c.is_active == 1 ? "text-success" : "text-danger"
                      }`}
                    >
                      {c.is_active == 1 ? "فعال" : "غیرفعال"}
                    </td>
                    <td className="text-center">
                      <i
                        className="fas fa-times text-danger cursor_pointer_text_shadow fa-2x mx-2"
                        onClick={() => showAlertModal(c.id)}
                      ></i>
                    </td>
                  </tr>
                ))
              ) : (
                <h5 className=" text-center text-secondary">موردی نیست</h5>
              )}
            </tbody>
          </table>
        ) : null}
        <Notification notify={notify} setNotify={setNotify} />
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </div>
    </AdminLayout>
  );
};
export default ManageComment;
