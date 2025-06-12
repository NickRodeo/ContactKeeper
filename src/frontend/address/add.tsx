import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Swal from "sweetalert2";
import Loading from "../components/loading";

export default function AddAddress() {
  const [loading, setLoading] = useState(false);
  const [contactId, setContactId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    contact_id: 0,
    street: "",
    city: "",
    province: "",
    country: "",
    postal_code: "",
  });

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const id = pathParts[pathParts.length - 3]; // /contacts/:id/addresses/add
    setContactId(id);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactId) return alert("Contact ID tidak ditemukan di URL");

    const payload = {
      contact_id: Number(contactId),
      street: formData.street || undefined,
      city: formData.city || undefined,
      province: formData.province || undefined,
      country: formData.country,
      postal_code: formData.postal_code,
    };
    console.log(payload);
    setLoading(true);
    try {
      const res = await fetch(`/api/contacts/${contactId}/addresses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log(res);
      if (!res.ok) throw new Error("Gagal menambahkan alamat");
      sessionStorage.setItem("address_message", "Alamat Berhasil Ditambahkan!");
      window.location.href = `/contacts/${contactId}`;
    } catch (err) {
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat menambahkan alamat.",
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
    <>
      <Navbar />
      <div className="container mx-auto px-4 mt-10">
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl z-10">
              <Loading />
            </div>
          )}
          <h1 className="text-3xl font-bold text-center text-amber-500 mb-6">
            Add Address
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="street"
              placeholder="Jalan / Street (opsional)"
              value={formData.street}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              name="city"
              placeholder="Kota (opsional)"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              name="province"
              placeholder="Provinsi (opsional)"
              value={formData.province}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              name="country"
              placeholder="Negara (wajib)"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              name="postal_code"
              placeholder="Kode Pos (wajib)"
              value={formData.postal_code}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button
              type="submit"
              className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition"
            >
              Save Address
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
