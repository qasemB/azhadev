import { useEffect, useState } from "react";
import { getKeywordsService } from "../../../services/others";

const MainFooter = ({ things }) => {
  const [keywords, setKeywords] = useState([]);
  useEffect(() => {
    const get = async () => {
      const res = await getKeywordsService();
      const allKeywords = res.data;
      const keywords = [];
      for (let i = 0; i < 4; i++) {
        const num = Math.floor(Math.random() * (allKeywords.length - 1));
        keywords.push(allKeywords[num]);
      }
      let uniqueArray = Array.from(new Set(keywords));
      setKeywords(uniqueArray);
    };
    get();
  }, []);
  return (
    <footer className="container-fluid bg-dark text-light p-3 p-md-4 w-100vw m-0">
      {things.length > 0 ? (
        <div className="row justify-content-center">
          <div className="col-11 col-md-4 m-auto">
            <h5 className="text-center">درباره ما</h5>
            <p className="text-justify font_0_9">{things[4].val}</p>
          </div>

          <div className="col-11 col-md-4 m-auto">
            <h5 className="text-center">لینک ها</h5>
            <ul className="px-0">
              <li className="text-center">
                <a rel="nofollow" target="_blank" href={things[5].val}>
                  {things[6].val}
                </a>
              </li>
              <li className="text-center">
                <a rel="nofollow" target="_blank" href={things[7].val}>
                  {things[8].val}
                </a>
              </li>
              <li className="text-center">
                <a rel="nofollow" target="_blank" href={things[9].val}>
                  {things[10].val}
                </a>
              </li>
              <li className="text-center">
                <a rel="nofollow" target="_blank" href={things[11].val}>
                  {things[12].val}
                </a>
              </li>
            </ul>
          </div>

          <div className="col-11 col-md-4 m-auto">
            <h5 className="text-center">همچنین</h5>
            <ul className="px-0">
              {keywords.map((k) => (
                <li className="text-center" key={k.id}>
                  <a target="_blank" href={`/article/${k.for}`}>
                    {k.keyword}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}

      <hr className="bg-light col-11" />

      {things.length > 0 ? (
        <div className="d-flex justify-content-center align-items-center">
          <a target="_blank" href={things[1].val}>
            <i className="fab fa-2x cursor_pointer fa-instagram px-2 mx-2"></i>
          </a>
          <a target="_blank" href="/">
            <i className="fab fa-2x cursor_pointer fa-telegram px-2 mx-2"></i>
          </a>
          <a target="_blank" href="/">
            <i className="fab fa-2x cursor_pointer fa-facebook px-2 mx-2"></i>
          </a>
        </div>
      ) : (
        ""
      )}
    </footer>
  );
};

export default MainFooter;
