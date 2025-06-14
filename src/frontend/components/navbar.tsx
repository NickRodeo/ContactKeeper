import React, { useEffect, useState } from "react";
import { UserRes } from "../../backend/model/User";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState<UserRes>({
    name: "",
    username: "",
    token: "",
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/current", {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        window.location.href = "/login";
      } else {
        console.log("logout gagal");
      }
    } catch (err) {
      console.error("Error saat logout:", err);
    }
  };

  useEffect(() => {
    fetch("/api/users/current", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
      });
  }, []);

  return (
    <nav className="bg-amber-500 text-white px-4 py-3 shadow-md relative z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-700 to-white text-transparent bg-clip-text tracking-wide">
          ContactKeeper
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white transition-all duration-300"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-sm sm:text-base font-medium items-center">
          <li>
            <a href="/" className="hover:text-gray-300 transition">
              Home
            </a>
          </li>
          <li>
            <a href="/contacts" className="hover:text-gray-300 transition">
              Contacts
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-gray-300 transition">
              About
            </a>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-amber-700 hover:bg-amber-800 px-4 py-2 rounded-lg font-semibold shadow transition"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Menu: Smooth Animated Accordion Style */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 mt-3" : "max-h-0"
        }`}
      >
        <div className="bg-amber-400 text-white rounded-lg shadow-lg p-4 space-y-3">
          <a href="/" className="block hover:text-gray-200 transition">
            Home
          </a>
          <a href="/contacts" className="block hover:text-gray-200 transition">
            Contacts
          </a>
          <a href="/about" className="block hover:text-gray-200 transition">
            About
          </a>
          <button
            onClick={handleLogout}
            className="w-full bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg font-semibold shadow transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Welcome Message */}
      <h1 className="fixed right-4 bottom-4 font-bold text-xl sm:text-2xl text-amber-400 animate-bounce z-50">
        Welcome,{" "}
        <span className="bg-gradient-to-r from-pink-500 via-amber-500 to-red-500 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient font-extrabold">
          {user.name}
        </span>
      </h1>
    </nav>
  );
}
