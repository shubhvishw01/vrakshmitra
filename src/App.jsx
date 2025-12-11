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

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/upcoming" element={<UpcomingEvents />} />
        <Route path="/admin/previous" element={<PreviousEvents />} />
        <Route path="/episode" element={<Episode />} />
      </Routes>
    </Layout>
  );
}

export default App;
