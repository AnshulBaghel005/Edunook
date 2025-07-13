import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import Logo from "../../assets/Logo/Logo-Full-Light.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Logo & Social */}
        <div className="flex flex-col gap-4 md:w-1/3">
          <img src={Logo} alt="Logo" className="w-40" />
          <div className="flex gap-4 text-xl text-gray-400">
            <FaFacebook className="hover:text-white cursor-pointer" />
            <FaGoogle className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaYoutube className="hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3 md:w-1/3">
          <h3 className="text-white font-semibold">Quick Links</h3>
          <Link to="/about" className="hover:text-white text-sm">About</Link>
          <Link to="/careers" className="hover:text-white text-sm">Careers</Link>
          <Link to="/contact" className="hover:text-white text-sm">Contact</Link>
        </div>

        {/* Legal & Support */}
        <div className="flex flex-col gap-3 md:w-1/3">
          <h3 className="text-white font-semibold">Legal</h3>
          <Link to="/privacy-policy" className="hover:text-white text-sm">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white text-sm">Terms & Conditions</Link>
          <Link to="/help-center" className="hover:text-white text-sm">Help Center</Link>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-500">
        Made with ❤️ by Coder Team © 2025 Edunook
      </div>
    </footer>
  );
};

export default Footer;
