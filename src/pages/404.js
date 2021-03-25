import Head from "next/head";
import Link from "next/link";
export default function Custom404() {
  return (
    <div>
      <Head>
        <title>صفحه یافت نشد</title>
        <link rel="stylesheet" href="/css/style.css" />
      </Head>
      <div>
        <div style={{ textAlign: "center" }} className="error_svg ">
          <Link href="/">
            <a style={{ width: "100%" }}>
              متاسفانه این صفحه وجود ندارد ... برگرد
            </a>
          </Link>
          <hr />
          <img
            style={{ width: "50vw" }}
            src="/images/Error_svg/404_Error.svg"
            alt="404"
          />
        </div>
      </div>
    </div>
  );
}
