import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminLayout from "../../../components/Layouts/AdminLayout/AdminLayout";
import { checkAdmin } from "../../../services/user";
import moment from "moment-jalaali";
import {
  activeArticleService,
  getAdminAllArticles,
  deleteArticleService,
} from "../../../services/article";
import Notification from "../../../components/elements/Notification";
import {
  closeNotify,
  notifyError500,
  notifySuccess,
} from "../../../utils/notifErrorMessage";
import ConfirmDialog from "../../../components/elements/ConfirmDialog";
import EditArticleDialog from "../../../components/admin/EditArticleDialog";
import { getAllCategories } from "../../../services/category";

const ManageArticle = ({ categories }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [articles, setArticles] = useState([]);
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
  const [editDialog, setEditDialog] = useState({
    isOpen: false,
    data: {},
  });

  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const res = await checkAdmin();
      if (res) {
        setIsAdmin(res);
      } else {
        router.push("/");
      }
      const articleRes = await getAdminAllArticles();
      const articles = articleRes.data;
      setArticles(articles);
    };
    check();
  }, []);

  const handleActiveArticle = async (articleId) => {
    const article = {
      id: articleId,
    };
    frontCativeArticle(articleId);
    const res = await activeArticleService(article);
    const data = res.data;
    if (data.status == 200) {
      setNotify(notifySuccess("عملیات با موفقیت انجام شد"));
      closeNotify(2000, notify, setNotify);
    } else {
      frontCativeArticle(articleId);
      setNotify(notifyError500());
    }
  };

  const frontCativeArticle = (articleId) => {
    const newArticles = [...articles];
    const index = newArticles.findIndex((a) => a.id == articleId);
    newArticles[index].is_active = (newArticles[index].is_active - 1) * -1;
    setArticles(newArticles);
  };

  const handleDeleteArticle = async (articleId) => {
    const article = {
      id: articleId,
    };
    const res = await deleteArticleService(article);
    const data = res.data;
    if (data.status == 200) {
      const newArticles = [...articles].filter((a) => a.id != articleId);
      setArticles(newArticles);
      setNotify(notifySuccess("حذف مقاله با موفقیت انجام شد"));
      setConfirmDialog({ ...confirmDialog, isOpen: false });
      closeNotify(2000, notify, setNotify);
    } else {
      setNotify(notifyError500());
    }
  };

  const showAlertModal = (articleId) => {
    setConfirmDialog({
      isOpen: true,
      title: `حذف مقاله شماره  ${articleId}`,
      subTitle:
        "پس از حذف این مقاله ، همه متعلقات مربوطه نیز حذف می شوند. آیا مطمئنید؟",
      confirm: () => handleDeleteArticle(articleId),
    });
  };

  const showEditDialog = (articleId) => {
    const article = [...articles].filter((a) => a.id == articleId)[0];
    setEditDialog({
      isOpen: true,
      data: article,
    });
  };

  return (
    <AdminLayout>
      <div className="container-fluid">
        {isAdmin ? (
          <table className="table table-primary table-striped table-bordered col-11 m-auto ">
            <thead className="thead-dark">
              <tr>
                <th className="text-center">#</th>
                <th className="text-center">دسته</th>
                <th className="text-center">عنوان</th>
                <th className="text-center">نویسنده</th>
                <th className="text-center">تعداد بازدید</th>
                <th className="text-center">تاریخ</th>
                <th className="text-center">وضعیت</th>
                <th className="text-center">اکشن</th>
              </tr>
            </thead>
            <tbody>
              {articles.length > 0 ? (
                articles.map((a) => (
                  <tr key={a.id}>
                    <td className="text-center">{a.id}</td>
                    <th className="text-center">{a.category.title}</th>
                    {a.is_active == 1 ? (
                      <th className="text-center">
                        <a target="_blank" href={`/article/${a.id}`}>
                          {a.h_title}
                        </a>
                      </th>
                    ) : (
                      <th className="text-center">{a.h_title}</th>
                    )}
                    <th className="text-center">
                      {`${a.writer.firstname}  ${a.writer.lastname}`}
                    </th>
                    <th className="text-center">{a.view_count}</th>
                    <th className="text-center">
                      {moment(`${a.created_at}`).format("jYYYY/jM/jD")}
                    </th>
                    <td
                      onClick={() => handleActiveArticle(a.id)}
                      className={`text-center cursor_pointer_text_shadow ${
                        a.is_active == 1 ? "text-success" : "text-danger"
                      }`}
                    >
                      {a.is_active == 1 ? "فعال" : "غیرفعال"}
                    </td>
                    <td className="text-center">
                      <i
                        className="fas fa-times text-danger cursor_pointer_text_shadow fa-2x mx-2"
                        onClick={() => showAlertModal(a.id)}
                      ></i>
                      <i
                        className="fas fa-pencil-alt text-success cursor_pointer_text_shadow fa-2x mx-2"
                        onClick={() => showEditDialog(a.id)}
                      ></i>
                    </td>
                  </tr>
                ))
              ) : (
                <h5 className="text-secondary text-center"></h5>
              )}
            </tbody>
          </table>
        ) : null}
        <Notification notify={notify} setNotify={setNotify} />
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
        <EditArticleDialog
          editDialog={editDialog}
          setEditDialog={setEditDialog}
          notify={notify}
          setNotify={setNotify}
          articles={articles}
          setArticles={setArticles}
          categories={categories}
        />
      </div>
    </AdminLayout>
  );
};
export default ManageArticle;

export const getStaticProps = async () => {
  const categoryRes = await getAllCategories();
  const categories = categoryRes.data;

  return {
    props: {
      categories,
    },
  };
};
