import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Swal from "sweetalert2";
import Loading from "../components/loading";
import { add } from "winston";

interface Contact {
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
}

interface Address {
  id: number;
  street: string;
  city: string;
  province: string;
  country: string;
  postal_code: string;
}

export default function DetailContact() {
  const [loadingDelete, setLoadingDelete] = useState<number | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [contact, setContact] = useState<Contact | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    const message = sessionStorage.getItem("address_message");
    if (message) {
      sessionStorage.removeItem("address_message");
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

    const pathParts = window.location.pathname.split("/");
    const contactId = pathParts[pathParts.length - 1];
    setId(contactId);

    setLoadingDetail(true);
    fetch(`/api/contacts/${contactId}`)
      .then((res) => res.json())
      .then((data) => setContact(data.data))
      .finally(() => {
        setLoadingDetail(false);
      });
    setLoading(true);
    fetch(`/api/contacts/${contactId}/addresses`)
      .then((res) => res.json())
      .then((data) => setAddresses(data.data))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAddAddress = () => {
    window.location.href = `/contacts/${id}/addresses/add`;
  };

  async function handleDeleteAddress(addressId: number) {
    console.log(addressId);
    setLoadingDelete(addressId);
    try {
      const res = await fetch(`/api/contacts/${id}/addresses/${addressId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal Menghapus");
      sessionStorage.setItem("address_message", "Alamat Berhasil Dihapus!");
      window.location.href = `/contacts/${id}`;
    } catch (err) {
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat menghapus alamat.",
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
      setLoadingDelete(null);
    }
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-4xl font-bold text-center text-amber-500 mb-6">
          Detail Kontak
        </h1>

        {loadingDetail ? (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl z-10">
            <Loading />
          </div>
        ) : (
          contact && (
            <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {contact.first_name} {contact.last_name ?? ""}
              </h2>
              {contact.email && (
                <p className="text-gray-600 mb-2">📧 {contact.email}</p>
              )}
              {contact.phone && (
                <p className="text-gray-600 mb-2">📱 {contact.phone}</p>
              )}
            </div>
          )
        )}

        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-700">Alamat</h3>
            <button
              onClick={handleAddAddress}
              className="text-white font-bold cursor-pointer bg-amber-400 px-3 py-2 rounded-lg shadow-2xl hover:bg-amber-700 transition duration-300 hover:text-slate-300"
            >
              + Add Address
            </button>
          </div>

          {loading ? (
            <Loading />
          ) : addresses.length > 0 ? (
            <div className="grid gap-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="relative bg-white border rounded-xl p-5 shadow hover:shadow-lg transition"
                >
                  {loadingDelete === address.id && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-2xl z-10">
                      {" "}
                      <Loading />{" "}
                    </div>
                  )}
                  <div className=" flex justify-end gap-2 absolute top-3 right-3">
                    <button
                      onClick={() => {
                        window.location.href = `/contacts/${id}/addresses/${address.id}`;
                      }}
                      className="cursor-pointer text-xl hover:scale-110 transition-transform text-blue-500 hover:text-blue-700"
                      title="Edit Alamat"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={async () => {
                        const confirm = await Swal.fire({
                          title: "Yakin hapus alamat ini?",
                          text: "Data tidak bisa dikembalikan setelah dihapus!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#d33",
                          cancelButtonColor: "#3085d6",
                          confirmButtonText: "Ya, hapus!",
                          cancelButtonText: "Batal",
                        });

                        if (confirm.isConfirmed) {
                          await handleDeleteAddress(address.id);
                        }
                      }}
                      className="cursor-pointer text-xl hover:scale-110 transition-transform text-red-500 hover:text-red-700"
                      title="Hapus Alamat"
                    >
                      🗑️
                    </button>
                  </div>
                  <h4 className="text-lg font-semibold text-amber-600 mb-2">
                    Alamat #{address.id}
                  </h4>
                  <div className="text-gray-700 space-y-1 mb-4">
                    {address.street && <p>🏠 {address.street}</p>}
                    {address.city && <p>🏙️ {address.city}</p>}
                    {address.province && <p>🌄 {address.province}</p>}
                    <p>🌍 {address.country}</p>
                    <p>📮 {address.postal_code}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mb-40">Belum ada alamat ditambahkan.</p>
          )}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
