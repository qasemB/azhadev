import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Notification from "../../../components/elements/Notification";
import AdminLayout from "../../../components/Layouts/AdminLayout/AdminLayout";
import { storeCategoryService } from "../../../services/category";
import { checkAdmin } from "../../../services/user";
import {
  notifyError422,
  notifyError500,
  notifySuccess,
} from "../../../utils/notifErrorMessage";

const AddCategory = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
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

  const handleStore = async (event) => {
    event.preventDefault();
    const category = {
      title,
      description,
      icon,
    };
    const res = await storeCategoryService(category);
    const data = res.data;
    if (data.status == 200) {
      setNotify(notifySuccess("دسته با موفقیت ایجاد شد"));
    } else if (data.status == 422) {
      setNotify(notifyError422(data));
    } else {
      setNotify(notifyError500());
    }
  };

  return (
    <AdminLayout>
      <div className="container-fluid">
        {isAdmin ? (
          <form
            action=""
            className="col-12 col-md-8 text-center justify-content-center py-5 m-auto"
            onSubmit={(e) => handleStore(e)}
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
                افزودن دسته
              </button>
            </div>
          </form>
        ) : null}
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </AdminLayout>
  );
};
export default AddCategory;
