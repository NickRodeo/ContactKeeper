import React, { useEffect, useState } from "react";
import { UserRes } from "../../backend/model/User";

export default function Navbar() {
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/current", {
        method: "DELETE",
        credentials: "include", // kalau pakai cookie
        headers: {
          "Content-Type": "application/json",
        },
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
  const [user, setUser] = useState<UserRes>({
    name: "",
    username: "",
    token: "",
  });
  useEffect(() => {
    fetch("/api/users/current", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
      });
  }, []);

  return (
    <nav className="bg-amber-500 text-white flex justify-between items-center px-6 py-4 shadow-md">
      {/* Logo ContactKeeper */}
      <div className="flex items-center space-x-4">
        <div className="text-xl sm:text-2xl md:mr-10 font-extrabold bg-gradient-to-r from-purple-600 via-pink-700 to-white text-transparent bg-clip-text tracking-wide drop-shadow-sm">
          ContactKeeper
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-lg font-medium">
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
        </ul>
      </div>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="bg-amber-700 hover:bg-amber-800 px-4 py-2 rounded-lg font-semibold shadow transition"
      >
        Logout
      </button>

      {/* Welcome message */}
      <h1 className="fixed right-4 bottom-4 font-bold text-2xl text-amber-400 sm:text-3xl animate-bounce z-50">
        Welcome,{" "}
        <span className="bg-gradient-to-r from-pink-500 via-amber-500 to-red-500 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient font-extrabold transition-all duration-500 hover:scale-105 hover:drop-shadow-xl">
          {user.name}
        </span>
      </h1>
    </nav>
  );
}
