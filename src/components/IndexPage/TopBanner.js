import Link from "next/link";
import { useContext } from "react";
import Context from "../../context/Context";

const TopBanner = () => {
  const { categories } = useContext(Context);
  return (
    <div className=" row top_header_banner align-items-center justify-content-center">
      <div className="bg_blur_light pt-2 pb-1 px-4 bg_blur_light rounded_5 d-none d-md-block animate__animated animate__fadeInDown ">
        <h3 className="text-center text-dark">
          خیلی زود مسیر برنامه نویسی رو پیدا کن
          <br />
          با AzhaDev
        </h3>
      </div>
      <div className="row col-12 col-md-10 justify-content-center article_goup">
        {categories.map((c) => (
          <div
            key={c.id}
            className="p-4 col-11 col-md-4 animate__animated animate__fadeInDown"
          >
            <Link href={`/search/${c.id}`}>
              <a title={c.description}>
                <div className="p-3 cursor_pointer_shadow rounded bg_blur_light text-center border_2 border_white">
                  <i className={`${c.icon} fa-4x`}></i>
                  <h4 className="text-center ">{c.title}</h4>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TopBanner;
