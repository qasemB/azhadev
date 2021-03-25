import ArticleCards from "../../components/IndexPage/ArticleCards";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";
import { getAllArticles } from "../../services/article";
import { getAllCategories } from "../../services/category";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { articleSearch } from "../../utils/search";
import config from "../../services/config.json";
import Head from "next/head";

const Search = ({ articles, categories }) => {
  const [catId, setCatId] = useState(0);
  const [char, setChar] = useState("");
  const [thisArticles, setThisArticles] = useState([]);
  const router = useRouter();

  const searchWithChar = (c) => {
    setChar(c);
    setThisArticles(articleSearch([...articles], catId, c));
  };

  const changedCategory = (id) => {
    setCatId(id);
    setThisArticles(articleSearch([...articles], id, char));
  };

  useEffect(() => {
    if (router.query.char[0] > 0) {
      setCatId(router.query.char[0]);
    }

    if (router.query.char[1]) {
      setChar(router.query.char[1]);
    }

    if (router.query.char[0] > 0) {
      setThisArticles(articleSearch([...articles], router.query.char[0], char));
    } else {
      if (router.query.char[1]) {
        setThisArticles(articleSearch([...articles], 0, router.query.char[1]));
      } else {
        setThisArticles(articleSearch([...articles], 0, char));
      }
    }
  }, []);

  return (
    <MainLayout>
      <Head>
        <meta name="googlebot" content="index,follow" />
        <title>جست و جو</title>
        <link rel="canonical" href={`${config.asandev}/search/0`} />
        <meta property="og:url" content={`${config.asandev}/search/0`} />
      </Head>

      <div
        id="searchedArticles"
        className="row justify-content-center col-12 m-auto px-0"
      >
        <div className="col-12 row justify-content-center align-items-center mt-3 py-2">
          <div className="col-12 col-md-6 form-group search_box">
            <input
              type="text"
              className="form-control rounded_5 placeholder_gray shadow-sm h_2_5"
              placeholder="عنوان رو وارد کن"
              value={char}
              onChange={(e) => {
                searchWithChar(e.target.value);
              }}
            />
            <i
              className="fas fa-search search_btn cursor_pointer_text_shadow"
              onClick={searchWithChar}
            ></i>
          </div>
          {router.query.char[0] == 0 ? (
            <div className="col-12 col-md-6 form-group search_box">
              <select
                className="rounded_5 outline_0 h_2_5 border-0 form-control"
                value={catId}
                onChange={(e) => changedCategory(e.target.value)}
              >
                <option value="0">انتخاب بر اساس گروه</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
        </div>

        <ArticleCards articles={thisArticles} title={"مقالات یافت شده"} />
      </div>
    </MainLayout>
  );
};
export default Search;

// export const getStaticPaths = async () => {
//   const categoryRes = await getAllCategories();
//   const categories = categoryRes.data;

//   let firstPath = `/search/0`;
//   const newPaths = categories.map((c) => `/search/${c.id}`);
//   const paths = [firstPath, ...newPaths];

//   return {
//     paths,
//     fallback: true,
//   };
// };

// export const getStaticProps = async () => {
//   const articleRes = await getAllArticles();
//   const categoryRes = await getAllCategories();

//   const articles = articleRes.data;
//   const categories = categoryRes.data;

//   return {
//     props: {
//       articles,
//       categories,
//     },
//   };
// };

export const getServerSideProps = async () => {
  const articleRes = await getAllArticles();
  const categoryRes = await getAllCategories();

  const articles = articleRes.data;
  const categories = categoryRes.data;

  return {
    props: {
      articles,
      categories,
    },
  };
};
