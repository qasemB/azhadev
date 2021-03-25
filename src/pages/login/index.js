import Router from "next/router";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import Notification from "../../components/elements/Notification";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";
import { forgetPassword, loginUser } from "../../services/user";
import { validatorSettings } from "../../utils/validatorSetting";
import {
  notifyError,
  notifyError401,
  notifyError422,
  notifyError500,
  notifySuccess,
} from "../../utils/notifErrorMessage";
import { saveToken, chechExpireDate } from "../../services/user";
import config from "../../services/config.json";
import Head from "next/head";
import Recaptcha from "react-recaptcha";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [remember, setRemeber] = useState(false);
  const [okRecaptcha, setOkRecaptcha] = useState(false);
  const [sending, setSending] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [, forceUpdate] = useState();
  const validator = useRef(new SimpleReactValidator(validatorSettings()));

  useEffect(() => {
    const check = async () => {
      if (await chechExpireDate()) {
        return Router.push("/");
      }
    };
    check();
  }, []);

  const loginFunc = async (event) => {
    event.preventDefault();
    if (validator.current.allValid()) {
      if (okRecaptcha) {
        const user = {
          email,
          password,
          remember,
        };
        const res = await loginUser(user);
        const data = res.data;
        if (data.status == 200) {
          setNotify(notifySuccess("ورود با موفقیت انجام شد"));
          saveToken(data.token, data.user, remember);
          setTimeout(() => {
            window.location.replace("/");
            // Router.push("/");
          }, 1000);
        } else if (data.status == 401) {
          setNotify(notifyError401());
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
      forceUpdate(2);
    }
  };

  const handleSendPassword = async () => {
    if (okRecaptcha) {
      setSending(true);
      const user = {
        email,
      };
      const res = await forgetPassword(user);
      const data = res.data;
      if (data.status == 200) {
        setNotify(notifySuccess(data.message));
        setSending(false);
      } else if (data.status == 404) {
        setNotify(notifyError(data.message));
        setSending(false);
      } else if (data.status == 422) {
        setNotify(notifyError422(data));
        setSending(false);
      } else {
        setNotify(notifyError500());
        setSending(false);
      }
    } else {
      setNotify(notifyError("لطفا گزینه من ربات نیستم را فعال کنید"));
    }
  };

  return (
    <MainLayout>
      <Head>
        <meta name="googlebot" content="index,follow" />
        <title>ورود</title>
        <link rel="canonical" href={`${config.asandev}/login`} />
        <meta property="og:url" content={`${config.asandev}/login`} />
      </Head>

      <div className="container">
        <div className="row w-100 m-auto justify-content-center align-items-center">
          <form
            onSubmit={(e) => loginFunc(e)}
            className="bg_blur_light p-4 col-11 col-md-6 my-5 shadow "
          >
            <i className="fas fa-user-check fa-3x d-block text-center my-3"></i>
            <h5 className="text-center">فرم ورود</h5>
            <div className="form-group row justify-content-center">
              <input
                type="email"
                name="email"
                className="form-control rounded_5 col-10 col-md-8 shadow"
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
                type="password"
                name="password"
                className="form-control rounded_5 col-10 col-md-8 shadow"
                placeholder="کلمه عبور"
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
                type="checkbox"
                name="remember"
                className="form-control outline_0 box_shadow_0 h-auto"
                value={remember}
                onChange={(e) => {
                  setRemeber(e.currentTarget.checked);
                }}
              />
              مرا بخاطر بسپار
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
              <button className="btn btn-success rounded_5 px-5 shadow-sm">
                ورود
              </button>
            </div>

            <div className="row justify-content-center">
              <Link href="/register">
                <span className="text-center text-info cursor_pointer_text_shadow col-12 w-100 my-2">
                  هنوز ثبت نام نکرده ام
                </span>
              </Link>
              {sending ? (
                <span className="text-center text-success col-12 w-100 my-2 animate__animated animate__shakeX">
                  کمی صبر کنید...
                </span>
              ) : (
                <span
                  className="text-center text-info cursor_pointer_text_shadow col-12 w-100 my-2"
                  onClick={() => handleSendPassword()}
                >
                  رمز عبور را فراموش کرده ام
                </span>
              )}
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
export default Login;
