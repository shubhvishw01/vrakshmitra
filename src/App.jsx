import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Volunteer from "./pages/Volunteer";
import Donate from "./pages/Donate";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Episode from "./pages/Episode";
import Dashboard from "./pages/admin/Dashboard";
import UpcomingEvents from "./pages/admin/UpcomingEvents";
import PreviousEvents from "./pages/admin/PreviousEvents";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import ProtectedRoute from "./components/ProtectedRoute";
import { LanguageProvider } from "./components/LanguageContext";
import LaunchScreen from "./LaunchScreen"; // 🔥 NEW

function App() {
  return (
    <LanguageProvider>
      <Layout>
        <Routes>
          {/* 🚀 Launch + Home */}
          <Route path="/" element={<LaunchScreen />} />

          {/* 🌿 Public Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/episode" element={<Episode />} />

          {/* 🔐 Admin */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/upcoming"
            element={
              <ProtectedRoute>
                <UpcomingEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/previous"
            element={
              <ProtectedRoute>
                <PreviousEvents />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/adminlogin" element={<AdminLogin />} />
          <Route path="/admin/adminregister" element={<AdminRegister />} />
        </Routes>
      </Layout>
    </LanguageProvider>
  );
}

export default App;
