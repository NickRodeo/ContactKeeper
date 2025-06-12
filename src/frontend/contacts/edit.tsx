import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { Contact } from "@prisma/client";
import { ContactRes } from "../../backend/model/Contact";
import Swal from "sweetalert2";
import Loading from "../components/loading";

function getQueryParam(param: string) {
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams);
  return urlParams.get(param);
}

export default function EditContact() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const contactId = getQueryParam("contactId");
    fetch(`/api/contacts/${contactId}`)
      .then((res) => res.json())
      .then((data) => data.data)
      .then((data) => {
        setForm({
          first_name: data.first_name ?? "",
          last_name: data.last_name ?? "",
          email: data.email ?? "",
          phone: data.phone ?? "",
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const updatedContact: ContactRes = {
      id: 0,
      first_name: form.first_name,
      phone: form.phone,
    };

    if (form.email !== "") updatedContact.email = form.email;
    if (form.last_name !== "") updatedContact.last_name = form.last_name;

    fetch(`/api/contacts/${getQueryParam("contactId")}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedContact),
    })
      .then((res) => {
        if (!res.ok) {
          console.log(res);
          throw new Error("Gagal mengubah kontak");
        }
        return res.json();
      })
      .then((data) => {
        sessionStorage.setItem("contact_message", "Kontak Berhasil Diubah!");
        window.location.href = "/contacts";
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Gagal!",
          text: "Terjadi kesalahan saat mengubah kontak.",
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
      });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl z-10">
            <Loading />
          </div>
        )}
        <h1 className="text-3xl font-bold text-center text-amber-400 mb-6">
          Edit Contact
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white p-6 rounded shadow"
        >
          <div className="mb-4">
            <label className="block mb-1 font-semibold">First Name</label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-400 text-white py-2 rounded hover:bg-amber-500 transition"
          >
            Edit Contact
          </button>
        </form>
      </div>
    </>
  );
}
