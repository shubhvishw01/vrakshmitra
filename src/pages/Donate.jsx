import { useNavigate } from "react-router-dom";
import { useLang } from "../components/LanguageContext.jsx";

const Donate = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  return (
    <section className="max-w-4xl mx-auto py-20 px-6 mt-24">
      {/* Card */}
      <div className="bg-white rounded-3xl p-10 border border-green-200 shadow-[0px_0px_35px_0px_rgb(47_74_46/90%)]">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-green-800 mb-4">
          {t.donate.heading1} 🤝🌿
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
          {t.donate.paragraph1}
        </p>

        {/* Info Box */}
        <div className="bg-green-50 border border-green-200 shadow-[0px_0px_35px_0px_rgb(47_74_46/90%)] rounded-2xl p-6 mb-8 max-w-xl mx-auto">
          <h3 className="text-xl font-semibold text-green-800 text-center">
            {t.donate.heading2}
          </h3>

          <ul className="text-gray-700 mt-4 space-y-2 text-left">
            <li>{t.donate.option1}</li>
            <li>{t.donate.option2}</li>
            <li>{t.donate.option3}</li>
            <li>{t.donate.option4}</li>
            <li>{t.donate.option5}</li>
            <li>{t.donate.option6}</li>
          </ul>

          <p className="text-green-700 font-bold mt-4 text-center text-lg">
            {t.donate.paragraph2} 🌱
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() =>
            navigate("/volunteer", { state: { openJoinModal: true } })
          }
          className="bg-green-700 text-white px-5 py-3 rounded-full font-semibold hover:bg-green-800 transition"
        >
          {t.donate.button}
        </button>

        <p className="text-gray-600 text-sm mt-5">{t.donate.thankyou}</p>
      </div>
    </section>
  );
};

export default Donate;
