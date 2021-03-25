import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ConfirmDialog from "../../../components/elements/ConfirmDialog";
import Notification from "../../../components/elements/Notification";
import AdminLayout from "../../../components/Layouts/AdminLayout/AdminLayout";
import {
  checkAdmin,
  deleteUserService,
  getAllUserService,
} from "../../../services/user";
import {
  notifyError500,
  notifySuccess,
} from "../../../utils/notifErrorMessage";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
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

  useEffect(() => {
    const check = async () => {
      const res = await checkAdmin();
      if (res) {
        setIsAdmin(res);
      } else {
        router.push("/");
      }
      const allUsers = await getAllUserService();
      setUsers(allUsers.data);
    };
    check();
  }, []);

  const handleDelete = async (userId) => {
    const user = {
      id: userId,
    };
    const res = await deleteUserService(user);
    const data = res.data;
    if (data.status == 200) {
      const newUsers = [...users].filter((u) => u.id != userId);
      setUsers(newUsers);
      setNotify(notifySuccess("کاربر با موفقیت حذف شد"));
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

  const showAlertModal = (userId) => {
    setConfirmDialog({
      isOpen: true,
      title: `حذف کاربر شماره  ${userId}`,
      subTitle: "آیا از حذف این کاربر مطمئن هستید ؟",
      confirm: () => handleDelete(userId),
    });
  };

  return (
    <AdminLayout>
      <div className="container-fluid">
        <h5 className="text-center"> تعداد : {users.length}</h5>
        {isAdmin ? (
          <table className="table table-primary table-striped table-bordered col-11 m-auto ">
            <thead className="thead-dark">
              <tr>
                <th className="text-center">ردیف</th>
                <th className="text-center">سمت</th>
                <th className="text-center">نام و نام خانوادگی</th>
                <th className="text-center">ایمیل</th>
                <th className="text-center">جنسیت</th>
                <th className="text-center">اکشن</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u.id}>
                    <td className="text-center">{u.id}</td>
                    <td
                      className={`text-center ${
                        u.role != "user" ? "text-info" : "text-secondary"
                      }`}
                    >
                      {u.is_admin == 1 ? "مدیر" : u.role}
                    </td>
                    <td className="text-center">{`${u.firstname}  ${u.lastname}`}</td>
                    <td className="text-center">{u.email}</td>
                    <td className="text-center">
                      {u.gender == 1 ? "مرد" : "زن"}
                    </td>
                    <td className="text-center">
                      <i
                        className="fas fa-times text-danger cursor_pointer_text_shadow fa-2x mx-2"
                        onClick={() => showAlertModal(u.id)}
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
export default ManageUser;
