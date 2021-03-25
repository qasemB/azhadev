import Head from "next/head";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";
import ArticleComments from "../../components/SingleArticle/ArticleComments";
import ArticleContent from "../../components/SingleArticle/ArticleContent";
import ArticleSidebar from "../../components/SingleArticle/ArticleSidebar";
import { getAllArticles, getSingleArticle } from "../../services/article";
import config from "../../services/config.json";

const Article = ({ article }) => {
  return (
    <MainLayout>
      <Head>
        <meta name="googlebot" content="index,follow" />
        <title>{article.top_title}</title>
        <link
          rel="canonical"
          href={`${config.asandev}/article/${article.id}`}
        />
        <meta
          property="og:url"
          content={`${config.asandev}/article/${article.id}`}
        />
      </Head>

      <div className="container pt-1">
        <div className="row my-3">
          <ArticleContent article={article} />
          <ArticleSidebar article={article} />
        </div>
        <ArticleComments article={article} />
      </div>
    </MainLayout>
  );
};
export default Article;

export const getStaticPaths = async () => {
  const articleRes = await getAllArticles();
  const articles = articleRes.data;

  const paths = articles.map((a) => ({
    params: { id: `${a.id}` },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const articleRes = await getSingleArticle(params.id);
  const article = articleRes.data.data;

  return {
    props: { article },
  };
};
