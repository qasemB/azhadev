import MainIndex from "../components/IndexPage/MainIndex";
import MainLayout from "../components/Layouts/MainLayout/MainLayout";
import Context from "../context/Context";
import { getAllArticles } from "../services/article";
import { getAllCategories } from "../services/category";
import { getAllThings } from "../services/others";
import config from "../services/config.json";
import Head from "next/head";

export default function Home({ articles, categories, things }) {
  if (!articles[0].id) {
    return null;
  }

  return (
    <Context.Provider
      value={{
        articles: articles,
        categories: categories,
      }}
    >
      <MainLayout things={things}>
        <Head>
          <meta name="googlebot" content="index,follow" />
          <link rel="canonical" href={`${config.asandev}`} />
          <meta property="og:url" content={`${config.asandev}`} />
        </Head>

        <MainIndex />
      </MainLayout>
    </Context.Provider>
  );
}

export const getStaticProps = async () => {
  const articleRes = await getAllArticles();
  const categoryRes = await getAllCategories();
  const thingsRes = await getAllThings();

  const articles = articleRes.data;
  const categories = categoryRes.data;
  const things = thingsRes.data.data;
  return {
    props: {
      articles,
      categories,
      things,
    },
  };
};
