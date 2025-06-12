import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "../components/loading";

export default function Login() {
  useEffect(() => {
    const message = sessionStorage.getItem("auth_message");
    if (message) {
      sessionStorage.removeItem("auth_message");
      import("sweetalert2").then((Swal) => {
        Swal.default.fire({
          title: "Berhasil!",
          text: message,
          icon: "success",
          confirmButtonText: "OK",
          background: "#fff8e1", // warna background terang amber
          color: "#92400e", // warna teks amber gelap
          confirmButtonColor: "#f59e0b", // warna tombol amber
          customClass: {
            popup: "rounded-lg shadow-md",
            title: "text-xl font-bold",
            confirmButton: "px-4 py-2",
          },
        });
      });
    }
  }, []);

  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log(res);
      if (!res.ok) throw new Error("Username atau Password Salah");
      sessionStorage.setItem("auth_message", "Login Berhasil!");
      window.location.href = `/`;
    } catch (err) {
      Swal.fire({
        title: "Gagal!",
        text: "Username atau Password Salah",
        icon: "error",
        confirmButtonText: "Coba Lagi",
        background: "#fff1f2", // warna background soft untuk error
        color: "#991b1b", // warna teks merah tua
        confirmButtonColor: "#ef4444", // warna tombol merah
        customClass: {
          popup: "rounded-lg shadow-md",
          title: "text-xl font-bold",
          confirmButton: "px-4 py-2",
        },
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative border-amber-400 mt-[200px] border-2 shadow-amber-200 shadow-2xl rounded-2xl py-4 px-3 bg-amber-100 w-1/2 mx-auto">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl z-10">
          <Loading />
        </div>
      )}
      <h1 className="text-4xl text-amber-300 font-bold text-center ">Login</h1>
      <div className="mx-auto w-1/2">
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-500"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 mb-3 w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-500"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 mb-3 w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
          </div>

          <button
            type="submit"
            className="my-4 w-full py-2 px-4 bg-amber-400 text-gray-900 font-semibold rounded-xl hover:bg-amber-500 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
      <p className="text-right text-sm font-normal text-gray-700 ">
        Not Registered?{" "}
        <a
          href="/register"
          className="text-amber-500 hover:text-amber-700 cursor-pointer"
        >
          Register
        </a>
      </p>
    </div>
  );
}
