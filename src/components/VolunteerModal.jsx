import { useState, useEffect } from "react";
import { X, CheckCircle } from "lucide-react";
import axios from "axios";

const VolunteerModal = ({ onClose }) => {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const todayKey = "volunteer_submitted_date";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    reason: "",
    profileImage: null,
  });

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
      await axios.post("http://localhost:5000/api/volunteers", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ Save submit date
      localStorage.setItem(todayKey, today);

      // 🎉 Success animation
      setSuccess(true);

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setErrors({
        general: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <X />
        </button>

        {/* 🎉 SUCCESS STATE */}
        {success ? (
          <div className="flex flex-col items-center text-center py-10 animate-pulse">
            <CheckCircle size={70} className="text-green-600 mb-4" />
            <h2 className="text-2xl font-bold text-green-800">
              Application Submitted!
            </h2>
            <p className="text-gray-600 mt-2">
              Thank you for joining the green movement 🌿
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Join as Volunteer 🌱
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Fill the form and be part of the green movement.
            </p>

            {errors.general && (
              <p className="text-red-500 text-sm mb-3">{errors.general}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-xl"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}

              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-xl"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}

              <input
                type="tel"
                maxLength={10}
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-xl"
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs">{errors.mobile}</p>
              )}

              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-xl"
              />
              {errors.city && (
                <p className="text-red-500 text-xs">{errors.city}</p>
              )}

              <textarea
                placeholder="Why do you want to join?"
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-xl resize-none"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    profileImage: e.target.files[0],
                  })
                }
                className=" px- py-2 border border-gray-500 text-gray-400 rounded-md cursor-pointer text-gray-700 hover:border-green-500 transition"
              />
              {errors.profileImage && (
                <p className="text-red-500 text-xs">{errors.profileImage}</p>
              )}

              <button
                disabled={loading}
                type="submit"
                className="w-full py-3 rounded-xl bg-green-700 text-white font-semibold disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default VolunteerModal;
