import Head from "next/head";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";
import { getAbilitiesService } from "../../services/others";
import config from "../../services/config.json";

const About = ({ abilities }) => {
  return (
    <MainLayout>
      <Head>
        <meta name="googlebot" content="index,follow" />
        <title>معرفی راهنمای برنامه نویسی</title>
        <link rel="canonical" href={`${config.asandev}/about`} />
        <meta property="og:url" content={`${config.asandev}/about`} />
      </Head>
      <div className="container">
        <div className="row justify-content-center align-items-center py-4">
          <div className="col-12 px-0 row d-flex justify-content-center">
            <div className="col-6 px-2" style={{ direction: "ltr" }}>
              <div className="avatar_image ">
                <img src="/images/avatar/qasem.jpg" />
              </div>
            </div>
            <div className=" col-6 avatar_title d-flex align-items-center px-2">
              <h4 className="px-2">
                Qasem
                <br />
                Full Stack Developer
              </h4>
            </div>
          </div>
          <div className="col-12 px-0">
            <ul className="px-0 row">
              {abilities.length > 0
                ? abilities.map((a) => (
                    <li key={a.id} className="my-2 col-6 col-md-2 text-center">
                      <img
                        className="mx-2"
                        width="40"
                        src={`/images/logos/${a.image_name}.png`}
                      />
                      <span>{a.name}</span>
                    </li>
                  ))
                : ""}
            </ul>
          </div>
          <div className="about_paragraph col-11 col-md-12 py-4 mb-5 m-auto">
            <p className="text-justify">سلام خدمت اساتید گرامی</p>
            <p className="text-justify">
              اینهایی که در بالا می بینید ادعایی در توانایی شون ندارم و افتخار
              می کنم که دارم توی این زمینه ها فعالیت می کنم و در حال یادگیری
              هستم .
            </p>
            <p className="text-justify">
              قصد این رو هم ندارم که تعدادشون رو زیاد کنم یا درصد توانایی رو
              بالا ببرم. فقط میخوام ازشون به عنوان ابزار استفاده کنم و البته
              باید بگم که عاشقشونم و باهاشون حال می کنم
            </p>
            <p className="text-justify">
              ممکنه فردا تکنولوژی جدید تری بیاد و بخوام اون رو هم یاد بگیرم .
              البته نباید فراموش کنیم که اینها فقط ابزار هستند و این ما هستیم که
              قراره تصمیم بگیریم چه کاری انجام بدیم و نسبت به اون ، کدومشون رو
              انتخاب کنیم
            </p>
            <p className="text-justify">خوب دیگه ... </p>
            <p className="text-justify">
              چندسالی هست در زمینه برنامه نویسی دارم فعالیت می کنم و اکثر
              چیزهایی که بلدم به صورت خود آموز یاد گرفتم و بیشتر با سرچ و مطالعه
              مستندات این تکنولوژی ها بود و البته تشکر فراوان از همه اساتیدی می
              کنم که این مطالب رو دراختیار همنوعاشون قرار میدن.
            </p>
            <p className="text-justify">
              توی این مسیر ، راه های زیادی رو امتحان کردم و توی بعضی هاشون به بن
              بست خوردم ، چون راهنمای جامع و کاملی در کنارم نبوده و مجبور بودم
              تا یک مورد رو انتخاب کنم و خودم تجربه کنم تا به نتیجه برسم و ...
            </p>
            <p className="text-justify">
              تجربیاتی که در این وبسایت به صورت مقاله قرار میدم ، راهکارها و
              مسائلی هست که خودم توی این مدت فرا گرفتم . مسائلی که در ابتدای راه
              ، حاضر بودم چند میلیون پرداخت کنم و فقط در طی این مسیر دچار اشتباه
              نشم ، ولی کسی رو پیدا نکردم که دلسوزانه بتونه سوالام رو پاسخ
              بده(نمیگم نبود، من پیدا نکردم)
            </p>
            <p className="text-justify">
              دوستان عزیزی هم بودن که ازشون سوالاتم رو بپرسم ولی خیلی از سوال
              های من بی پاسخ بودند و نیازمند تلاش بسیار
            </p>
            <p className="text-justify">
              الان تصمیم گرفتم تا تجربیاتی رو که توی این زمینه کسب کردم رو با
              دوستان علاقه مند که در ابتدای این راه هستند ، به اشتراک بگذارم تا
              شاید بدردشون بخوره . پاسخ همون سوالاتی که نتونسم هیچوقت از کسی
              بپرسم .
            </p>
            <p className="text-justify">
              اگر هم سوالی هست ، اگر در توانم باشه ، خوشحال میشم توی قسمت نظرات
              مقالات به دوستان پاسخ بدم
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default About;

export const getStaticProps = async () => {
  const res = await getAbilitiesService();
  const abilities = res.data;
  return {
    props: { abilities },
  };
};
