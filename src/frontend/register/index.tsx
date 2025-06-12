import React, { useState } from "react";
import Swal from "sweetalert2";
import Loading from "../components/loading";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log(res);
      if (!res.ok) throw new Error("Data tidak valid");
      sessionStorage.setItem("auth_message", "Register Berhasil!");
      window.location.href = `/login`;
    } catch (err) {
      Swal.fire({
        title: "Gagal!",
        text: "Username mungkin sudah terdaftar atau password terlalu sedikit (minimal 4)",
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

      <h1 className="text-4xl text-amber-300 font-bold text-center ">
        Register
      </h1>
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
              htmlFor="name"
              className="block text-sm font-medium text-gray-500"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
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
            Register
          </button>
        </form>
      </div>
      <p className="text-right text-sm font-normal text-gray-700 ">
        Already Registered?{" "}
        <a
          href="/login"
          className="text-amber-500 hover:text-amber-700 cursor-pointer"
        >
          Login
        </a>
      </p>
    </div>
  );
}
