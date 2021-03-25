import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Notification from "../../../components/elements/Notification";
import AdminLayout from "../../../components/Layouts/AdminLayout/AdminLayout";
import { storeArticleService } from "../../../services/article";
import { getAllCategories } from "../../../services/category";
import { checkAdmin } from "../../../services/user";
import {
  notifyError,
  notifyError422,
  notifyError500,
  notifySuccess,
} from "../../../utils/notifErrorMessage";

const AddArticle = ({ categories }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [category_id, setcategory_id] = useState("");
  const [h_title, seth_title] = useState("");
  const [top_title, settop_title] = useState("");
  const [top_text, settop_text] = useState("");
  const [text, settext] = useState("");
  const [image, setimage] = useState("");
  const [alt_image, setalt_image] = useState("");
  const [keywords, setkeywords] = useState("");
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

  const handleImg = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    if (files[0].type.match("image.*") && files[0].size <= 1024000) {
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setimage(reader.result);
        setNotify(notifySuccess("فرمت و حجم تصویر تایید شد"));
        setTimeout(() => {
          setNotify({ ...notify, isOpen: false });
        }, 3000);
      };
    } else {
      setNotify(notifyError("فرمت تصویر و حجم 1 مگابایت را رعایت کنید"));
    }
  };

  const handleStoreArticle = async (event) => {
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
    };
    const res = await storeArticleService(article);
    const data = res.data;
    if (data.status == 200) {
      setNotify(notifySuccess("مقاله با موفقیت ایجاد شد"));
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
            onSubmit={(e) => handleStoreArticle(e)}
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
                افزودن مقاله
              </button>
            </div>
          </form>
        ) : null}
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </AdminLayout>
  );
};
export default AddArticle;

export const getStaticProps = async () => {
  const categoryRes = await getAllCategories();
  const categories = categoryRes.data;
  return {
    props: {
      categories,
    },
  };
};
