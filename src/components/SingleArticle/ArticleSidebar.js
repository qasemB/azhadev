import moment from "moment-jalaali";
import Link from "next/link";

const ArticleSidebar = ({ article }) => {
  return (
    <div
      id="articleLeft"
      className="col-12 col-md-4 col-xl-3 mt-3 mt-md-0 order-1 order-md-2"
    >
      <div className="row bg-light px1 py-5 text-center justify-content-center d-flex rounded w-100 m-auto">
        <div className="image rounded-circle overflow-hidden h_10 w_10 text-center justify-content-center">
          <img
            className="max_w_100 m-auto"
            src="/images/articles/article1.png"
            alt="توضیح تصویر"
          />
        </div>

        <div className="col-12 mt-3 justify-content-center">
          <small className="text-center d-block">نویسنده:</small>
          <h6 className="text-center">
            {article.writer.firstname + " " + article.writer.lastname}
          </h6>

          <small className="text-center d-block mt-3">تاریخ:</small>
          <h6 className="text-center">
            {moment(`${article.created_at}`).format("jYYYY/jM/jD")}
          </h6>

          <div className="col-12 justify-content-center text-center mt-3">
            <span className="text-center">بازدید : {article.view_count} </span>
          </div>

          <div className="col-12 justify-content-center text-center mt-3">
            <Link href={`/search/${article.category_id}`}>
              <span className="btn rounded_5 btn-outline-dark">
                دیگر مقالات
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ArticleSidebar;
