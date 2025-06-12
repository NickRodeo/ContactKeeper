import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "../components/loading";

interface CardProps {
  id: number;
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export default function Card({
  id,
  firstName,
  lastName,
  email,
  phone,
}: CardProps) {
  const [loadingDelete, setLoadingDelete] = useState(false);
  async function handleDelete(id: number) {
    setLoadingDelete(true);
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal Menghapus");

      sessionStorage.setItem("contact_message", "Kontak Berhasil Dihapus!");
      window.location.href = "/contacts";
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Terjadi kesalahan saat menghapus",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoadingDelete(false);
    }
  }

  async function handleEdit(id: number) {
    window.location.href = `/contacts/edit?contactId=${id}`;
  }

  async function detailPage(id: number) {
    window.location.href = `/contacts/${id}`;
  }

  return (
    <div
      onClick={() => detailPage(id)}
      className="bg-white shadow-md rounded-xl p-4 w-64 relative hover:scale-110 transition duration-300 cursor-pointer transform origin-center mb-6"
    >
      {loadingDelete && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl z-10">
          {" "}
          <Loading />{" "}
        </div>
      )}
      <button
        onClick={async (e) => {
          e.stopPropagation();
          await handleEdit(id);
        }}
        className="absolute top-2 right-10 text-blue-500 hover:text-blue-700 hover:opacity-70 cursor-pointer text-xl"
      >
        ✏️
      </button>
      <button
        onClick={async (e) => {
          e.stopPropagation();
          const confirm = await Swal.fire({
            title: "Yakin hapus kontak ini?",
            text: "Data tidak bisa dikembalikan setelah dihapus!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
          });

          if (confirm.isConfirmed) {
            await handleDelete(id);
          }
        }}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:opacity-70 cursor-pointer text-xl"
      >
        🗑️
      </button>
      <h2 className="text-xl font-bold text-gray-800">
        {firstName.length <= 12
          ? firstName
          : firstName.split("").slice(0, 12).join("")}{" "}
        {lastName == null
          ? ""
          : lastName!.length <= 12
          ? lastName
          : lastName!.split("").slice(0, 16).join("") + "..."}
      </h2>
      {email && <p className="text-gray-600">📧 {email}</p>}
      {phone && <p className="text-gray-600">📱 {phone}</p>}
    </div>
  );
}
