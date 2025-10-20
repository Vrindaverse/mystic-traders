import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaEnvelope, FaSnapchatGhost, FaYoutube, FaInstagram } from "react-icons/fa";

const socialLinks = [
  { href: "https://discord.com", icon: <FaSnapchatGhost /> },
  { href: "https://twitter.com", icon: <FaEnvelope /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://instagram.com", icon: <FaInstagram /> },
];

const Footer = () => {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Detect when user reaches bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.body.scrollHeight;
      const innerHeight = window.innerHeight;

      // Only visible near bottom
      if (scrollY + innerHeight >= scrollHeight - 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate footer visibility with gsap
  useEffect(() => {
    if (!footerRef.current) return;
    gsap.to(footerRef.current, {
      y: isVisible ? 0 : 100,
      opacity: isVisible ? 1 : 0,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [isVisible]);

  return (
    <div
      ref={footerRef}
      className="fixed inset-x-0 bottom-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <footer className="absolute top-1/2 w-full -translate-y-1/2">
        <div
          className="flex size-full items-center justify-between p-4 rounded-2xl
          border border-white/10 bg-gradient-to-t from-black via-[#0a0a0a] to-[#1a1a1a]
          backdrop-blur-xl shadow-[0_0_20px_rgba(212,175,55,0.25)] text-gray-300"
        >
          {/* Left side */}
          <p className="text-sm tracking-wide text-gray-400 hover:text-white transition-colors duration-300">
            © <span className="text-white font-semibold">Mystic Traders</span> — All Rights Reserved
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110"
              >
                <span className="text-lg">{link.icon}</span>
              </a>
            ))}
          </div>

          {/* Right side */}
          <a
            href="#privacy-policy"
            className="text-sm text-gray-400 hover:text-white hover:underline transition duration-300"
          >
            Privacy Policy
          </a>
        </div>

        {/* Gold accent line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
      </footer>
    </div>
  );
};

export default Footer;
