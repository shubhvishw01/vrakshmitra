import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Left */}
        <div>
          <h3 className="text-xl font-semibold mb-2">
            🌱 Vraksh Mitra Sanstha
          </h3>
          <p className="text-sm text-gray-200">
            Dedicated to making Earth greener and cleaner by planting and
            protecting trees.
          </p>
        </div>

        {/* Middle */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-gray-300">
            <li>
              <Link to="/about" className="hover:text-yellow-400">
                About
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-yellow-400">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/volunteer" className="hover:text-yellow-400">
                Volunteer
              </Link>
            </li>
            <li>
              <Link to="/donate" className="hover:text-yellow-400">
                Donate
              </Link>
            </li>
          </ul>
        </div>

        {/* Right */}
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-gray-300 text-sm">
            📍 Salichouka Road, Madhya Pradesh, India <br />
            📧 vrakshmitra@gmail.com <br />
            📞 +91 81033 84532
          </p>
        </div>
      </div>

      <div className="text-center py-3 bg-green-900 text-gray-300 text-sm">
        <p className="text-sm">
          © {new Date().getFullYear()} Vraksh Mitra Sanstha | All Rights
          Reserved
        </p>
        <p className="text-xs text-green-200 mt-1">Developed by VTI</p>
      </div>
    </footer>
  );
}
