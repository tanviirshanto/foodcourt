import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaTiktok } from "react-icons/fa";

const FooterSocials = () => {
  return (
    <div className="lg:w-[20%] text-white">
      <div className="lg:text-xl text-md font-bold px-4 py-2 text-white">Follow Us</div>
      <div className="flex gap-4 text-3xl px-4 py-2">
        <a href="https://instagram.com" target="_blank" className="hover:text-[#ff3f72] transition-all">
          <FaInstagram />
        </a>
        <a href="https://facebook.com" target="_blank" className="hover:text-[#ff3f72] transition-all">
          <FaFacebook />
        </a>
        <a href="https://twitter.com" target="_blank" className="hover:text-[#ff3f72] transition-all">
          <FaTwitter />
        </a>
        <a href="https://linkedin.com" target="_blank" className="hover:text-[#ff3f72] transition-all">
          <FaLinkedin />
        </a>
        <a href="https://tiktok.com" target="_blank" className="hover:text-[#ff3f72] transition-all">
          <FaTiktok />
        </a>
      </div>
    </div>
  );
};

export default FooterSocials;
