import { useContext, useEffect, useState } from "react";
import Context from "../../context/Context";
import ArticleCards from "./ArticleCards";
import TopBanner from "./TopBanner";

const MainIndex = () => {
  const [bestArticles, setBestArticles] = useState([]);
  const [newArticles, setNewArticles] = useState([]);

  const { articles } = useContext(Context);

  useEffect(() => {
    const best = articles.filter((a) => a.is_best > 0);
    const news = articles.slice(0, 3);
    setBestArticles(best);
    setNewArticles(news);
  }, []);

  return (
    <div className="main container-fluid">
      <TopBanner />
      <ArticleCards articles={bestArticles} title={"مهمترین مقالات"} />
      <ArticleCards articles={newArticles} title={"جدیدترین مقالات"} />
    </div>
  );
};
export default MainIndex;
