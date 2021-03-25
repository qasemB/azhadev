import Link from "next/link";

const MainArticles = ({ title, articles }) => {
  return (
    <div
      id="bestArticles"
      className="row justify-content-center col-12 col-lg-10 m-auto"
    >
      <div className="col-12 text-right">
        <h4 className="pt-4 pb-1 text-info">{title}</h4>
        <hr className="bg-light w-25 h_0_5 m-0 rounded_5" />
      </div>

      <div className="row w-100 justify-content-center align-items-center">
        {articles.map((a) => (
          <div
            className="col-11 col-md-3 px-3 py-4 article_card_box"
            key={a.id}
          >
            <div className="card hover_shadow hover_up">
              <Link href={`/article/${a.id}`}>
                <div className="cursor_pointer">
                  <div className="card-header h_10 d-flex align-items-center justify-content-center">
                    <img
                      src={a.image}
                      alt={a.alt_image}
                      className="max_w_100 max_h_100"
                    />
                  </div>
                  <div className="card-body px-1 py-2">
                    <h6 className="text-center text-primary">{a.h_title}</h6>
                    <p className="text-justify text-right font_0_9 text-secondary">
                      {a.top_text}
                    </p>
                    <span className="btn btn-primary cursor_pointer_shadow rounded_5 cursor_pointer_shadow px-3">
                      ادامه مقاله
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MainArticles;
