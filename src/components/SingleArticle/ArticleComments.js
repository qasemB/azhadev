import Link from "next/link";
import { useEffect, useState } from "react";
import moment from "moment-jalaali";
import nl2br from "react-nl2br";
import { chechExpireDate, getUser } from "../../services/user";
import {
  notifyError422,
  notifyError500,
  notifySuccess,
} from "../../utils/notifErrorMessage";
import { addCommentService } from "../../services/comment";
import Notification from "../../components/elements/Notification";

const ArticleComments = ({ article }) => {
  const [comments, setComments] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [comment, setComment] = useState("");
  const [hasLogin, setHasLogin] = useState(false);
  const [commentObj, setCommentObj] = useState({});
  // const [user, setUser] = useState({});
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    const com = [...article.comments].filter((c) => c.parent_id == 0);
    setComments(com);
    const ans = [...article.comments].filter((c) => c.parent_id > 0);
    setAnswers(ans);
    const res = chechExpireDate();
    setHasLogin(res);
    // const check = async () => {
    //   const response = await getUser();
    //   setUser(response);
    // };
    // check();
  }, []);

  const handleAddComment = async () => {
    let parent_id = 0;
    if (commentObj.id) {
      parent_id = commentObj.id;
    }
    const com = {
      text: comment,
      article_id: article.id,
      parent_id,
    };
    const res = await addCommentService(com);
    const data = res.data;

    if (data.status == 200) {
      setNotify(
        notifySuccess("متشکرم ، نظر شما پس از تایید نمایش داده می شود")
      );
      setCommentObj({});
      setComment("");
    } else if (data.status == 422) {
      setNotify(notifyError422(data));
    } else {
      setNotify(notifyError500);
    }
  };

  const goToAnswer = (comId) => {
    const comment = comments.filter((c) => c.id == comId)[0];
    setCommentObj(comment);
  };

  return (
    <div className="row justify-content-center align-items-center alert-success p-3 rounded mb-5">
      <div className="row p-3 justify-content-center text-right alert-light d-block mb-4 col-12">
        {article.keywords.split(",").map((k) => (
          <span key={k.id}>
            <Link href={`/search/0/${k}`}>
              <span className="cursor_pointer_text_shadow text-secondary">{`(${k})`}</span>
            </Link>
          </span>
        ))}
      </div>

      {hasLogin ? (
        <div
          id="comment_box"
          className={`col-12 row justify-content-center form-group ${
            commentObj.id ? "alert-warning" : null
          }`}
        >
          <h5 className="col-12 text-center">
            {commentObj.id
              ? `متن پاسخ به نظر: ${commentObj.user.firstname}`
              : "متن نظر"}
          </h5>
          <textarea
            rows="10"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="form-control rounded shadow col-12 col-md-8 "
          ></textarea>
          <div className="w-100 col-12 justify-content-center text-center my-4">
            <button
              className="btn btn-success mx-2 px-3 py-1 rounded_5 "
              type="button"
              onClick={() => handleAddComment()}
            >
              {commentObj.id ? "ارسال پاسخ" : "ارسال نظر"}
            </button>
            {commentObj.id && (
              <button
                className="btn btn-secondary mx-2 px-3 py-1 rounded_5 "
                type="button"
                onClick={() => setCommentObj({})}
              >
                انصراف
              </button>
            )}
          </div>
        </div>
      ) : (
        <Link href="/login">
          <h5 className="col-12 text-center cursor_pointer_text_shadow">
            برای ثبت نظر لطفا وارد شوید
          </h5>
        </Link>
      )}

      <div className="col-12 col-md-11 bg-white p-3 rounded">
        {comments.length > 0 ? (
          comments.map((c) => (
            <div
              key={c.id}
              className="row my-4 d-block p-2 rounded shadow-sm border_1 col-11 mx-auto shadow"
            >
              <div className="row justify-content-lg-between w-100 m-auto">
                <h6 className="text-right text-success">
                  {c.user.firstname}
                  <span className="text-secondary">{` در تاریخ `}</span>
                  {moment(`${c.created_at}`).format("jYYYY/jM/jD")}
                </h6>
                {/* <span>
                  {user.id == c.user.id && (
                    <i className="fas fa-trash text-danger cursor_pointer_text_shadow mx-2"></i>
                  )}
                </span> */}
              </div>
              <div className=" w-100 pb-3">
                <p className="text-justify">{nl2br(c.text)}</p>
                <a
                  href="#comment_box"
                  className="btn btn-primary rounded_5 px-3 text-white"
                  onClick={() => goToAnswer(c.id)}
                >
                  پاسخ
                </a>
              </div>
              {answers.map((a) =>
                a.parent_id == c.id ? (
                  <div
                    key={a.id}
                    className="answer shadow-sm alert-success p-2 my-2"
                  >
                    <div className="row justify-content-lg-between w-100 m-auto">
                      <h6 className="text-right text-info">
                        {a.user.firstname}
                        <span className="text-secondary">{` در تاریخ `}</span>
                        {moment(`${a.created_at}`).format("jYYYY/jM/jD")}
                      </h6>
                      {/* <span>
                        {user.id == c.user.id && (
                          <i className="fas fa-trash text-danger cursor_pointer_text_shadow mx-2"></i>
                        )}
                      </span> */}
                    </div>
                    <p>{nl2br(a.text)}</p>
                  </div>
                ) : null
              )}
            </div>
          ))
        ) : (
          <h6 className="text-center text-danger">در حال حاضر نظری ثبت نشده</h6>
        )}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};
export default ArticleComments;
