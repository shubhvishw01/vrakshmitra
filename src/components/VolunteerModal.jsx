import { useState, useEffect, useRef } from "react";
import { X, CheckCircle } from "lucide-react";
import axios from "axios";

const VolunteerModal = ({ onClose }) => {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const cityRef = useRef(null);
  const todayKey = "volunteer_submitted_date";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    reason: "",
    profileImage: null,
  });
  const [preview, setPreview] = useState(null);
  const [step, setStep] = useState(1);
  const [checks, setChecks] = useState({
    c1: false,
    c2: false,
    c3: false,
    c4: false,
  });
  const [agree, setAgree] = useState(false);
  const [progress, setProgress] = useState(100);

  const sendWhatsAppConfirmation = () => {
    const phone = formData.mobile; // 10 digit Indian number

    const message = `
🌱 *Vr̥aksh Mitra Sanstha*

Hello *${formData.name}* 🙏  
Your volunteer application has been *successfully submitted* ✅

📍 City: ${formData.city}

We will contact you soon for upcoming plantation drives 🌳

Thank you for joining the green movement 💚
`;

    const url = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  useEffect(() => {
    if (errors.name && nameRef.current) {
      nameRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else if (errors.email && emailRef.current) {
      emailRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [errors]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    setFormData({ ...formData, profileImage: file });
    setPreview(URL.createObjectURL(file));
  };

  // 🔒 One request per day check
  useEffect(() => {
    const lastDate = localStorage.getItem(todayKey);
    const today = new Date().toDateString();
    if (lastDate === today) {
      setErrors({
        general: "You can submit only one request per day",
      });
    }
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";

    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    else if (!/^[6-9]\d{9}$/.test(formData.mobile))
      newErrors.mobile = "Invalid mobile number";

    if (!formData.city.trim()) newErrors.city = "City is required";

    if (!formData.profileImage)
      newErrors.profileImage = "Profile image required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const lastDate = localStorage.getItem(todayKey);
    const today = new Date().toDateString();

    if (lastDate === today) {
      setErrors({
        general: "You have already submitted today ❌",
      });
      return;
    }

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      setLoading(true);
      await axios.post(
        "https://vrakshmitrabackend.onrender.com/api/volunteers",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // ✅ Save submit date
      localStorage.setItem(todayKey, today);

      // 🎉 Success animation
      setSuccess(true);

      setTimeout(() => {
        onClose();
      }, 5000);
    } catch (err) {
      setErrors({
        general: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }

    setSuccess(true);
    setProgress(100);

    let value = 100;

    const interval = setInterval(() => {
      value -= 2.5; // speed control (2.5 × 40 = ~4 sec)
      setProgress(value);

      if (value <= 0) {
        clearInterval(interval);
        onClose(); // ✅ line completely empty hone ke baad close
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl 
    w-full max-w-lg md:max-w-3xl lg:max-w-4xl
    p-4 sm:p-6 md:p-8 z-10
    max-h-[90vh] overflow-y-auto"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 
    p-2 rounded-full
    text-gray-500 hover:text-red-500
    active:bg-red-50"
        >
          <X />
        </button>

        {/* SUCCESS */}
        {success ? (
          <div className="flex flex-col items-center text-center py-12 w-full">
            <CheckCircle size={70} className="text-green-600 mb-4" />

            <h2 className="text-2xl font-bold text-green-800">
              Application Submitted!
            </h2>

            <p className="text-gray-600 mt-2 mb-6">
              Thank you for joining the green movement 🌿
            </p>

            {/* ⏳ AUTO EMPTY LINE */}
            <div className="w-full h-1 bg-green-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <h2 className="text-2xl font-bold text-green-800 mb-1">
              Join as Volunteer 🌱
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Fill the form and be part of the green movement.
            </p>

            {/* STEP PROGRESS BAR */}
            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex-1 flex items-center">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full 
        text-sm font-semibold
        ${step >= s ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"}`}
                  >
                    {s}
                  </div>

                  {s !== 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded
          ${step > s ? "bg-green-600" : "bg-gray-200"}`}
                    />
                  )}
                </div>
              ))}
            </div>

            {errors.general && (
              <p className="text-red-500 text-sm mb-4">{errors.general}</p>
            )}

            {step === 1 && (
              <>
                {/* FORM */}
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {/* LEFT – PHOTO */}
                  <div className="md:col-span-1 flex flex-col items-center gap-4">
                    <div
                      className="w-32 h-32 rounded-full border-2 border-dashed 
                            border-green-500 flex items-center justify-center overflow-hidden"
                    >
                      {preview ? (
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-gray-400 text-center px-2">
                          Upload Photo
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="cursor-pointer bg-green-600 text-white 
                              px-4 py-2 rounded-lg text-sm hover:bg-green-700"
                      >
                        Upload Photo
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoChange}
                        />
                      </label>

                      {errors.profileImage && (
                        <p className="text-red-500 text-xs text-center">
                          *{errors.profileImage}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* RIGHT – INPUTS */}
                  <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* FULL NAME */}
                    <div ref={nameRef} className="flex flex-col leading-tight">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={`
        px-4 py-3 rounded-xl w-full border
        ${errors.name ? "border-red-500 animate-shake" : "border-green-600"}
        focus:outline-none focus:ring-2
        ${errors.name ? "focus:ring-red-500" : "focus:ring-green-500"}
      `}
                      />

                      {errors.name && (
                        <p className="text-red-500 text-xs">{errors.name}</p>
                      )}
                    </div>

                    {/* EMAIL */}
                    <div ref={emailRef} className="flex flex-col leading-tight">
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={`
        px-4 py-3 rounded-xl w-full border
        ${errors.email ? "border-red-500 animate-shake" : "border-green-600"}
        focus:outline-none focus:ring-2
        ${errors.email ? "focus:ring-red-500" : "focus:ring-green-500"}
      `}
                      />

                      {errors.email && (
                        <p className="text-red-500 text-xs">{errors.email}</p>
                      )}
                    </div>

                    <div
                      ref={mobileRef}
                      className="flex flex-col leading-tight"
                    >
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="Mobile Number"
                        value={formData.mobile}
                        onChange={(e) =>
                          setFormData({ ...formData, mobile: e.target.value })
                        }
                        className={`
        px-4 py-3 rounded-xl w-full border
        ${errors.mobile ? "border-red-500 animate-shake" : "border-green-600"}
        focus:outline-none focus:ring-2
        ${errors.mobile ? "focus:ring-red-500" : "focus:ring-green-500"}
      `}
                      />
                      {errors.mobile && (
                        <p className="text-red-500 text-xs">*{errors.mobile}</p>
                      )}
                    </div>

                    <div ref={cityRef} className="flex flex-col leading-tight">
                      <input
                        type="text"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className={`
        px-4 py-3 rounded-xl w-full border
        ${errors.city ? "border-red-500 animate-shake" : "border-green-600"}
        focus:outline-none focus:ring-2
        ${errors.city ? "focus:ring-red-500" : "focus:ring-green-500"}
      `}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs">*{errors.city}</p>
                      )}
                    </div>

                    <textarea
                      placeholder="Why do you want to join?"
                      value={formData.reason}
                      onChange={(e) =>
                        setFormData({ ...formData, reason: e.target.value })
                      }
                      className={`
        sm:col-span-2 resize-none px-4 py-3 rounded-xl w-full border
        ${errors.reason ? "border-red-500 animate-shake" : "border-green-600"}
        focus:outline-none focus:ring-2
        ${errors.reason ? "focus:ring-red-500" : "focus:ring-green-500"}
      `}
                    />

                    {/* <button
                      disabled={loading}
                      type="submit"
                      className="sm:col-span-2 w-full py-3 rounded-xl 
                         bg-green-700 text-white font-semibold 
                         disabled:opacity-60"
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button> */}
                    <button
                      type="button"
                      onClick={() => {
                        const errs = validate();
                        setErrors(errs);
                        if (Object.keys(errs).length === 0) setStep(2);
                      }}
                      className="sm:col-span-2 w-full py-3 rounded-xl 
                         bg-green-700 text-white font-semibold 
                         disabled:opacity-60"
                    >
                      Next →
                    </button>
                  </div>
                </form>
              </>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-800">
                  Please confirm the following
                </h3>

                {[
                  "I will actively participate in plantation drives",
                  "I will respect nature and environment",
                  "I agree to work honestly as a volunteer",
                  "I will follow organization rules",
                ].map((text, i) => {
                  const key = `c${i + 1}`;
                  return (
                    <label key={key} className="flex gap-3 items-start">
                      <input
                        type="checkbox"
                        checked={checks[key]}
                        onChange={(e) =>
                          setChecks({ ...checks, [key]: e.target.checked })
                        }
                      />
                      <span className="text-sm">{text}</span>
                    </label>
                  );
                })}

                <button
                  disabled={!Object.values(checks).every(Boolean)}
                  onClick={() => setStep(3)}
                  className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold disabled:opacity-50"
                >
                  Next →
                </button>

                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-gray-500 underline"
                >
                  ← Back
                </button>
              </div>
            )}
          </>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-green-800">
              Confirm & Submit
            </h3>

            <p className="text-sm text-gray-600">
              Please confirm that all information provided by you is correct.
            </p>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <span className="text-sm">
                I agree to the <b>Terms & Conditions</b>
              </span>
            </label>

            <button
              disabled={!agree || loading}
              onClick={handleSubmit}
              className="w-full py-3 rounded-xl bg-green-700 text-white font-semibold disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

            <button
              onClick={() => setStep(2)}
              className="text-sm text-gray-500 underline"
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerModal;
