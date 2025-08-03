import { FaFacebookMessenger } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-pearl text-graphite p-6 text-sm">
      <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center space-y-2 text-center">
        <div className="flex items-center gap-4 text-xl">
          <a className="hover:text-blue-500" href="https://www.facebook.com/ficelco" target="_blank">
            <FaFacebook />
          </a>
          <a className="hover:text-blue-500" href="https://m.me/ficelco" target="_blank">
            <FaFacebookMessenger />
          </a>
        </div>
        <div className="font-semibold text-primary flex flex-col gap-2">
          <span>FICELCO AGMA 2025</span>
          <p className="font-semibold text-xs text-graphite">&copy; {new Date().getFullYear()} FICELCO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
