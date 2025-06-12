import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Card from "./card";
import { ContactRes } from "../../backend/model/Contact";
import Loading from "../components/loading";

export default function Contacts() {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<ContactRes[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [searchBy, setSearchBy] = useState<"name" | "email" | "phone">("name");
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, searchBy]);

  useEffect(() => {
    //SweetAlert
    const message = sessionStorage.getItem("contact_message");
    if (message) {
      sessionStorage.removeItem("contact_message");
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
    setLoading(true);
    fetch(
      `/api/contacts?size=12&page=${currentPage}${
        searchQuery ? `&${searchBy}=${searchQuery}` : ""
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setContacts(data.data);
        setTotalPage(data.paging.total_page);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchQuery, searchBy, currentPage]);

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPage) {
      setCurrentPage(page);
    }
  }
  console.log(totalPage);
  return (
    <>
      <Navbar></Navbar>
      <div className="container mx-auto mt-8">
        <h1 className="text-4xl text-amber-300 font-bold text-center ">
          Contacts
        </h1>
        {/* Input search dengan styling dan controlled */}
        <div className="mt-6 md:max-w-5xl w-[90%] mx-auto mb-6 flex gap-1">
          <select
            aria-label="Select search criteria"
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
            value={searchBy}
            onChange={(e) =>
              setSearchBy(e.target.value as "name" | "email" | "phone")
            }
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
          <input
            type="text"
            aria-label="Search contacts"
            placeholder="Search contacts..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-end mx-auto w-[95%]">
          <a
            href="/contacts/add"
            className="text-white font-bold bg-amber-400 px-3 py-2 rounded-lg shadow-2xl hover:bg-amber-700 transition duration-300 hover:text-slate-300"
          >
            Add Contacts
          </a>
        </div>
        <div className="mt-10 min-h-[200px]">
          {loading ? (
            <Loading />
          ) : contacts.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">
              No contacts yet. Add your first contact!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
              {contacts.map((contact) => (
                <Card
                  key={contact.id}
                  id={contact.id}
                  firstName={contact.first_name}
                  lastName={contact.last_name}
                  email={contact.email}
                  phone={contact.phone}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center gap-3 my-10">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-amber-400 text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Prev
          </button>

          {/* Tampilkan halaman dengan kondisi jumlah halaman tidak terlalu besar */}
          {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? "bg-amber-600 text-white font-bold"
                  : "bg-amber-300 hover:bg-amber-500 text-gray-800"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPage}
            className="px-3 py-1 rounded bg-amber-400 text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
