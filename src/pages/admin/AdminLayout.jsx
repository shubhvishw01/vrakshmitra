import { useState } from "react";
import {
  Home,
  Calendar,
  Users,
  Phone,
  Image,
  LogOut,
  Menu,
} from "lucide-react";

const menu = [
  { path: "/admin", label: "Home", icon: <Home size={18} /> },
  {
    path: "/admin/upcoming",
    label: "Upcoming Events",
    icon: <Calendar size={18} />,
  },
  {
    path: "/admin/previous",
    label: "Previous Events",
    icon: <Calendar size={18} />,
  },
  { path: "/admin/volunteers", label: "Volunteers", icon: <Users size={18} /> },
  { path: "/admin/contact", label: "Contact", icon: <Phone size={18} /> },
  { path: "/admin/media", label: "Media Coverage", icon: <Image size={18} /> },
];

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg
        transform ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300`}
      >
        <div className="p-5 font-bold text-xl border-b">Admin Panel</div>

        <nav className="p-3 space-y-2">
          {menu.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-100"
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </nav>

        <button className="flex items-center gap-3 px-4 py-2 m-3 rounded-lg text-red-600 hover:bg-red-100 w-[90%]">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Topbar */}
        <header className="md:hidden bg-white shadow p-4 flex items-center justify-between">
          <button onClick={() => setOpen(!open)}>
            <Menu />
          </button>
          <h1 className="font-semibold">Admin Dashboard</h1>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
