import React, {useState} from "react";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("username");
    router.push("/");
  };
  const [menuOpen, setMenuOpen] = useState(false);


  return (
<header className="fixed z-20 w-full bg-transparent text-ori-gray p-4">
  <div className="flex justify-between items-center w-full sm:px-8 px-2">
    <div className="flex gap-2 items-center">
      <img src="/favicon.ico" className="w-8 text-ori-eme opacity-80" />
      <h2 className="text-ori-gray sm:block hidden">Sample Company Universe .Ink</h2>
    </div>
    <nav className="hidden sm:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-x-4 text-ori-gray text-sm">
        <a href="/" className="hover:text-ori-eme">
            Home
          </a>
          
          <a href="/Compo/dashboard" className="hover:text-ori-eme">
            Dashboard
          </a>
          <a href="/profile" className="hover:text-ori-eme">
            About
          </a>
          <a href="/profile" className="hover:text-ori-eme">
            Profile
          </a>
        </nav>
    

    <div className="hidden sm:flex items-center space-x-4">
      <button
        onClick={handleLogout}
        className="bg-ori-eme px-8 py-2 rounded-md text-sm hover:bg-gray-700 transition duration-200"
      >
        Sign In
      </button>
    </div>
    <nav className="hidden lg:hidden space-x-4 text-sm">
          <a href="/" className="hover:text-ori-eme">Home</a>
          <a href="/Compo/dashboard" className="hover:text-ori-eme">Dashboard</a>
          <a href="/profile" className="hover:text-ori-eme">About</a>
          <a href="/profile" className="hover:text-ori-eme">Profile</a>
        </nav>

        {/* 🟢 ハンバーガーメニュー (sm以下) */}
        <button 
          className="lg:hidden text-ori-eme focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        {menuOpen && (
        <nav className="lg:hidden absolute top-16 left-0 w-full bg-gray-400 text-white flex flex-col items-center py-4 space-y-4 text-sm">
          <a href="/" className="hover:text-ori-eme" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="/Compo/dashboard" className="hover:text-ori-eme" onClick={() => setMenuOpen(false)}>Dashboard</a>
          <a href="/profile" className="hover:text-ori-eme" onClick={() => setMenuOpen(false)}>About</a>
          <a href="/profile" className="hover:text-ori-eme" onClick={() => setMenuOpen(false)}>Profile</a>
        </nav>
      )}
  </div>

</header>

  );
};

export default Header;


        {/* ナビゲーション */}
        