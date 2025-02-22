import logo from "../images/logos/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => (  
  <div className="z-10">
    <div className="h-20 mt-5 mb-5 rounded-xl flex items-center justify-between bg-[#1d1d2d] backdrop-blur-xl m-2">
      <Link to="/" className="flex items-center gap-3 group relative">
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
        <div className="ml-5 relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
          <img src={logo} className="w-30 h-9" alt="Logo" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
            CodeBase
          </span>
          <span className="text-xs text-blue-400/60 font-medium">
            Interactive Code Editor
          </span>
        </div>
      </Link>

      <div className="font-bold flex items-center gap-6">
        {["Home", "About", "Services", "Contact"].map((item) => (
          <Link key={item} to="/" className="hover:text-blue-500 text-white text-sm transition-all">
            {item}
          </Link>
        ))}
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="bg-[#3f3f96] text-white px-4 py-2 rounded-lg hover:bg-[#1d1d2d] text-sm transition-all mr-3"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
);

export default Navbar;
