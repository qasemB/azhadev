import nl2br from "react-nl2br";

const ArticleContent = ({ article }) => {
  return (
    <div
      id="articleRight"
      className="col-12 col-md-8 col-xl-9 order-2 order-md-1"
    >
      <div className="p-2 bg-light rounded article_content">
        <h1 className="text-center font_2 py-2">{article.h_title}</h1>
        <div className="image text-center w_30_vw m-auto">
          <img
            className="max_w_100 "
            src={article.image}
            alt={article.alt_image}
          />
        </div>
        <div className="p-2 text_container">{nl2br(article.text)}</div>
      </div>
    </div>
  );
};
export default ArticleContent;
