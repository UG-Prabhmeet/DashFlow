import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white text-black px-4 py-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
        
        {/* Left: Email */}
        <div>
          <p className="text-2xl font-bold">contact@dashflow.dev</p>
        </div>

        {/* Right: Icons */}
        <div className="flex flex-col md:items-end gap-2">
          <p className="text-sm text-gray-600">Let’s connect</p>
          <div className="flex gap-4 text-2xl">
            <a href="https://github.com/ug-prabhmeet" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="mailto:yourmail@gmail.com" aria-label="Gmail">
              <SiGmail />
            </a>
            <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-8 max-w-5xl mx-auto text-s text-gray-500 text-center border-t pt-4">
        © 2025 DashFlow • Designed by Prabhmeet Singh
      </div>
    </footer>
  );
}
