import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ConfirmDialog from "../../../components/elements/ConfirmDialog";
import Notification from "../../../components/elements/Notification";
import AdminLayout from "../../../components/Layouts/AdminLayout/AdminLayout";
import { getAllCategories } from "../../../services/category";
import { checkAdmin } from "../../../services/user";
import { deleteCategoyyService } from "../../../services/category";
import {
  notifyError500,
  notifySuccess,
} from "../../../utils/notifErrorMessage";
import EditCategoryDialog from "../../../components/admin/EditCategoryDialog";

const ManageCategory = ({ allcategories }) => {
  const [categories, setCategories] = useState([...allcategories]);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
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

  useEffect(() => {
    const check = async () => {
      const res = await checkAdmin();
      if (res) {
        setIsAdmin(res);
      } else {
        router.push("/");
      }
    };
    check();
  }, []);

  const handleDelete = async (categoryId) => {
    const category = {
      id: categoryId,
    };
    const res = await deleteCategoyyService(category);
    const data = res.data;
    if (data.status == 200) {
      const newCategories = [...categories].filter((c) => c.id != categoryId);
      setCategories(newCategories);
      setNotify(notifySuccess("دسته با موفقیت حذف شد"));
      setConfirmDialog({
        isOpen: false,
        title: "",
        subTitle: "",
        confirm: () => {},
      });
    } else {
      setNotify(notifyError500());
    }
  };

  const showAlertModal = (catId) => {
    setConfirmDialog({
      isOpen: true,
      title: `حذف دسته شماره  ${catId}`,
      subTitle:
        "پس از حذف این دسته ، همه مقالات مربوطه نیز حذف می شوند. آیا مطمئنید؟",
      confirm: () => handleDelete(catId),
    });
  };

  const showEditDialog = (catId) => {
    const category = [...categories].filter((c) => c.id == catId)[0];
    setEditDialog({
      isOpen: true,
      data: category,
    });
  };

  return (
    <AdminLayout>
      <div className="container-fluid">
        {isAdmin ? (
          <table className="table table-primary table-striped table-bordered col-11 m-auto ">
            <thead className="thead-dark">
              <tr>
                <th className="text-center">ردیف</th>
                <th className="text-center">آیکون</th>
                <th className="text-center">عنوان</th>
                <th className="text-center">توضیحات</th>
                <th className="text-center">اکشن</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((c) => (
                  <tr key={c.id}>
                    <td className="text-center">{c.id}</td>
                    <td className="text-center">
                      <i className={`fa-2x ${c.icon}`}></i>
                    </td>
                    <td className="text-center">{c.title}</td>
                    <td className="text-center">{c.description}</td>
                    <td className="text-center">
                      <i
                        className="fas fa-times text-danger cursor_pointer_text_shadow fa-2x mx-2"
                        onClick={() => showAlertModal(c.id)}
                      ></i>
                      <i
                        className="fas fa-pencil-alt text-success cursor_pointer_text_shadow fa-2x mx-2"
                        onClick={() => showEditDialog(c.id)}
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
        <EditCategoryDialog
          editDialog={editDialog}
          setEditDialog={setEditDialog}
          setNotify={setNotify}
          categories={categories}
          setCategories={setCategories}
        />
      </div>
    </AdminLayout>
  );
};
export default ManageCategory;

export const getStaticProps = async () => {
  const categoryRes = await getAllCategories();
  const allcategories = categoryRes.data;

  return {
    props: {
      allcategories,
    },
  };
};
