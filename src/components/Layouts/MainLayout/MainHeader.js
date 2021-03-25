import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  logoutUser,
  authCheck,
  getUser,
  chechExpireDate,
  getStorageUser,
} from "../../../services/user";
const MainHeader = () => {
  const [char, setChar] = useState("");
  const [hasLogin, setHasLogin] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({ firstname: "", is_admin: 0 });
  const [showMenu, setShowMenu] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const logOutHere = async () => {
    if (await logoutUser()) {
      setHasLogin(false);
    }
  };

  // useEffect(() => {
  //   const check = async () => {
  //     const res = await authCheck();
  //     setHasLogin(res);
  //     if (res) {
  //       const response = await getUser();
  //       setUser(response);
  //     }
  //   };
  //   check();
  // }, []);

  useEffect(() => {
    const check = async () => {
      const res = await chechExpireDate();
      setHasLogin(res);
      if (res == true) {
        const response = await getStorageUser();
        setUser(response);
        const resp = await getUser();
        if (resp.is_admin == 1) {
          setIsAdmin(true);
        }
      }
    };
    check();
  }, []);

  return (
    <header className="container-fluid bg-light shadow fixed-top py-1 w_100vw">
      <div className="row m-0 justify-content-between w-100 align-items-center">
        <ul className="d-flex menu_top align-items-center mb-0 px-0">
          <li className="logo_top animate__animated animate__flip">
            <Link href="/">
              <img className="cursor_pointer" src="/images/logo/pngLogo.png" />
            </Link>
          </li>

          <li className="mx-2 cursor_pointer_text_shadow">
            <Link href="/search/0">مقالات</Link>
            <span></span>
          </li>

          <li className="mx-2 cursor_pointer_text_shadow">
            <Link href="/about">
              <a>معرفی </a>
            </Link>
            <span></span>
          </li>

          <li className="mx-2 ">
            {hasLogin == true ? (
              <div
                className="user_header_menu cursor_pointer_text_shadow"
                onClick={() => handleShowMenu()}
              >
                <div>{user ? `| ${user.firstname}` : ""}</div>
                {showMenu ? (
                  <ul className="user_header_menu_ul">
                    <li
                      className="cursor_pointer_text_shadow"
                      onClick={() => logOutHere()}
                    >
                      خروج
                    </li>
                    {isAdmin ? (
                      <li className="cursor_pointer_text_shadow">
                        <Link href="/admin">
                          <div>داشبورد</div>
                        </Link>
                      </li>
                    ) : null}
                  </ul>
                ) : null}
              </div>
            ) : (
              <Link href="/login">ورود</Link>
            )}
            <span></span>
          </li>

          <li id="search_icon_mobile" className="d-block d-md-none mx-4">
            <Link href="/search/0">
              <i className="fas fa-search fa-2x cursor_pointer_text_shadow "></i>
            </Link>
          </li>
        </ul>
        {router.pathname == "/search/[...char]" ? null : (
          <div className="col-12 col-md-4 form-group search_box  d-none d-md-block">
            <input
              type="text"
              className="form-control rounded_5 placeholder_gray shadow-sm"
              placeholder="دنبال چی می گردی؟"
              value={char}
              onChange={(e) => setChar(e.target.value)}
            />
            <Link href={`/search/0/${char}`}>
              <a className="fas fa-search search_btn"></a>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
