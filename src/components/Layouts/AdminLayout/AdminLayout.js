import Link from "next/link";
import MainLayout from "../MainLayout/MainLayout";
const AdminLayout = ({ children }) => {
  return (
    <MainLayout>
      <div>
        <div className="mx-0 w-100 row justify-content-center align-items-center alert-secondary my-2 py-4">
          <Link href="/admin/add-category">
            <span className="btn btn-success rounded_5 mx-3 my-1">
              افزودن دسته
            </span>
          </Link>
          <Link href="/admin/manage-category">
            <span className="btn btn-warning rounded_5 mx-3 my-1">
              مدیریت دسته
            </span>
          </Link>
          <Link href="/admin/add-article">
            <span className="btn btn-success rounded_5 mx-3 my-1">
              افزودن مقاله
            </span>
          </Link>
          <Link href="/admin/manage-article">
            <span className="btn btn-warning rounded_5 mx-3 my-1">
              مدیریت مقاله
            </span>
          </Link>
          <Link href="/admin/manage-comment">
            <span className="btn btn-warning rounded_5 mx-3 my-1">
              مدیریت نظرات
            </span>
          </Link>
          <Link href="/admin/manage-users">
            <span className="btn btn-warning rounded_5 mx-3 my-1">
              مدیریت کاربران
            </span>
          </Link>
        </div>
        <div className="mx-0 w-100 content row justify-content-center alert-secondary py-3">
          {children}
        </div>
      </div>
    </MainLayout>
  );
};
export default AdminLayout;
