import Head from "next/head";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import Router from "next/router";
import NProgress from "nprogress";
import { useEffect, useState } from "react";
import { getAllThings } from "../../../services/others";
import config from "../../../services/config.json";

Router.onRouteChangeStart = (url) => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const MainLayout = ({ children }) => {
  const [things, setThings] = useState([]);
  useEffect(() => {
    const get = async () => {
      const res = await getAllThings();
      const data = res.data.data;
      setThings(data);
    };
    get();
  }, []);
  return (
    <div style={{ overflowX: "hidden" }}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:site_name" content="asanDev" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@asandev" />
        <meta
          name="description"
          content="وبسایت ارائه مقالات با موضوع معرفی و ارائه راهنمایی در مسیر یادگیری برنامه نویسی"
        />
        <meta
          name="keywords"
          content="آموزش برنامه نویسی , راهنمای مسیر برنامه نویسی, مقاله برنامه نویسی"
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="راهنمای برنامه نویسی" />
        <meta
          property="og:description"
          content="وبسایت ارائه مقالات با موضوع معرفی و ارائه راهنمایی در مسیر یادگیری برنامه نویسی"
        />
        <meta
          property="og:image"
          content={`${config.asandev}/images/pngLogo.png`}
        />
        <meta name="twitter:title" content="راهنمای برنامه نویسی" />
        <meta
          name="twitter:description"
          content="وبسایت ارائه مقالات با موضوع معرفی و ارائه راهنمایی در مسیر یادگیری برنامه نویسی"
        />
        <meta
          name="twitter:image"
          content={`${config.asandev}/images/pngLogo.png`}
        />
        <link rel="stylesheet" href="/css/bootstrap/bootstrap.min.css" />
        <link rel="stylesheet" href="/fontawesome/css/all.min.css" />
        <link rel="stylesheet" href="/css/animate.min.css" />
        <link rel="stylesheet" href="/css/grid.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <title>راهنمای برنامه نویسی</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="/js/nprogress/nprogress.js"></script>
        <link rel="stylesheet" href="/css/nprogress/nprogress.css" />
      </Head>

      <MainHeader />

      <main id="main_main">{children}</main>

      <MainFooter things={things} />
    </div>
  );
};

export default MainLayout;
