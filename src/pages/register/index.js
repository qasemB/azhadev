import Router from "next/router";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import Notification from "../../components/elements/Notification";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";
import { chechExpireDate, registerUser } from "../../services/user";
import { validatorSettings } from "../../utils/validatorSetting";
import {
  notifyError,
  notifyError422,
  notifyError500,
  notifySuccess,
} from "../../utils/notifErrorMessage";
import config from "../../services/config.json";
import Head from "next/head";
import Recaptcha from "react-recaptcha";

const Register = () => {
  const [firstname, setFirstname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [conPassWord, setConPassword] = useState();
  const [okRecaptcha, setOkRecaptcha] = useState(false);
  const [, forceUpdate] = useState();
  const validator = useRef(new SimpleReactValidator(validatorSettings()));
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    const check = async () => {
      if (await chechExpireDate()) {
        return Router.push("/");
      }
    };
    check();
  }, []);

  const registerFunc = async (event) => {
    event.preventDefault();
    if (validator.current.allValid()) {
      if (okRecaptcha) {
        const user = {
          firstname,
          email,
          password,
          password_confirmation: conPassWord,
        };
        const res = await registerUser(user);
        const data = res.data;
        if (data.status == 200) {
          setNotify(notifySuccess("خوش آمدید - وارد شوید"));
          setTimeout(function () {
            Router.push("/login");
          }, 2000);
        } else if (data.status == 422) {
          setNotify(notifyError422(data));
        } else {
          setNotify(notifyError500());
        }
      } else {
        setNotify(notifyError("لطفا گزینه من ربات نیستم را فعال کنید"));
      }
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  return (
    <MainLayout>
      <Head>
        <meta name="googlebot" content="index,follow" />
        <title>ثبت نام</title>
        <link rel="canonical" href={`${config.asandev}/register`} />
        <meta property="og:url" content={`${config.asandev}/register`} />
      </Head>

      <div className="container">
        <div className="row w-100 m-auto justify-content-center align-items-center">
          <form
            action=""
            className="bg_blur_light p-4 col-12 col-md-6 my-5 shadow "
            onSubmit={(event) => registerFunc(event)}
          >
            <i className="fas fa-user-lock fa-3x d-block text-center my-3"></i>
            <h5 className="text-center">فرم ثبت نام</h5>
            <div className="form-group row justify-content-center">
              <input
                type="text"
                name="firstname"
                className="form-control rounded_5 col-10 col-md-8  shadow"
                placeholder="نام (فقط حروف و اعداد فارسی و انگلیسی)"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                  validator.current.showMessageFor("firstname");
                }}
              />
              {validator.current.message("firstname", firstname, "required")}
            </div>
            <div className="form-group row justify-content-center">
              <input
                type="email"
                name="email"
                className="form-control rounded_5 col-10 col-md-8  shadow"
                placeholder="ایمیل"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validator.current.showMessageFor("email");
                }}
              />
              {validator.current.message("email", email, "required|email")}
            </div>
            <div className="form-group row justify-content-center">
              <input
                type="text"
                name="password"
                className="form-control rounded_5 col-10 col-md-8  shadow"
                placeholder="کلمه عبور(فقط عدد و حروف انگلیسی)"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validator.current.showMessageFor("password");
                }}
              />
              {validator.current.message(
                "password",
                password,
                "required|min:8"
              )}
            </div>
            <div className="form-group row justify-content-center">
              <input
                type="text"
                name="conPassWord"
                className="form-control rounded_5 col-10 col-md-8  shadow"
                placeholder="تکرار کلمه عبور"
                value={conPassWord}
                onChange={(e) => {
                  setConPassword(e.target.value);
                  validator.current.showMessageFor("conPassWord");
                }}
              />
              {validator.current.message(
                "conPassWord",
                conPassWord,
                "required"
              )}
            </div>
            <div className="col-12 row justify-content-center mb-3 mx-0 px-0">
              <Recaptcha
                sitekey="6LcaJ44aAAAAAJOb6QaEP01mUUE_w9NMLbRPUTYY"
                render="explicit"
                onloadCallback={() => {}}
                verifyCallback={() => setOkRecaptcha(true)}
              />
            </div>

            <div className="form-group row justify-content-center">
              <button
                type="submit"
                className="btn btn-success rounded_5 px-5 shadow-sm"
              >
                ثبت نام
              </button>
            </div>
            <div className="row justify-content-center">
              <Link href="/login">
                <span className="text-center text-info cursor_pointer_text_shadow col-12 w-100 my-2">
                  قبلا ثبت نام کرده ام
                </span>
              </Link>
            </div>
          </form>
        </div>
        <Notification notify={notify} setNotify={setNotify} />
        <script
          src="https://www.google.com/recaptcha/api.js?render=explicit"
          async
          defer
        ></script>
      </div>
    </MainLayout>
  );
};
export default Register;
