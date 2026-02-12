import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  History,
  Users,
  LogOut,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/dashboard/adminlogin");
  };

  return (
    <div className="flex">
      {/* ✅ MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 🔹 SIDEBAR */}
      <div
        className={`
          fixed top-24 right-0 z-50
          w-64
          h-[calc(90vh-4rem)]
          bg-white shadow-lg p-6
          flex flex-col justify-between
          border-r
          transition-transform duration-300
          
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          md:translate-x-0 md:left-0 md:right-auto
        `}
      >
        {/* Close button mobile */}
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={() => setIsOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-8">
            Admin Panel
          </h2>

          <nav className="flex flex-col gap-4">
            <SidebarLink
              to="upcoming"
              icon={<CalendarDays size={18} />}
              text="Upcoming Events"
              closeSidebar={() => setIsOpen(false)}
            />
            <SidebarLink
              to="previous"
              icon={<History size={18} />}
              text="Previous Events"
              closeSidebar={() => setIsOpen(false)}
            />
            <SidebarLink
              to="volunteer"
              icon={<Users size={18} />}
              text="Volunteers"
              closeSidebar={() => setIsOpen(false)}
            />
            <SidebarLink
              to="contactus"
              icon={<Mail size={18} />}
              text="Contact Us"
              closeSidebar={() => setIsOpen(false)}
            />
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* 🔹 RIGHT CONTENT */}
      <div
        className="
          flex-1
          md:ml-64
          mt-20
          p-6 md:p-8
          w-full
          h-[calc(100vh-4rem)]
          overflow-y-auto
          bg-gray-50
        "
      >
        {/* Hamburger Button (Mobile Only) */}
        <div className="fixed top-25 right-4 md:hidden z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-lg bg-white shadow"
          >
            <Menu size={28} />
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

function SidebarLink({ to, icon, text, closeSidebar }) {
  return (
    <NavLink
      to={to}
      onClick={closeSidebar}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
          isActive
            ? "bg-green-200 text-green-900 font-semibold"
            : "text-gray-700 hover:bg-green-100"
        }`
      }
    >
      {icon}
      {text}
    </NavLink>
  );
}
