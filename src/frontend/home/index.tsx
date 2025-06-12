import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Home() {
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
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-hidden">
        <div className="absolute inset-0 blur-[100px] opacity-30 z-0 bg-gradient-to-tr from-amber-500 via-pink-500 to-indigo-500"></div>

        {/* Hero Section */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-24 text-center">
          <div className="backdrop-blur-xl bg-white/10 p-10 rounded-2xl shadow-2xl max-w-3xl border border-white/20">
            <h1 className="text-5xl md:text-6xl font-extrabold text-amber-300 tracking-widest mb-4 animate-fade-in-up">
              Contact Keeper
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-6">
              A futuristic and minimal place to organize, protect, and access
              your important contacts — anytime, anywhere.
            </p>
            <a
              href="/contacts"
              className="inline-block px-6 py-3 bg-amber-400 text-slate-900 font-bold rounded-xl hover:bg-amber-500 transition-all duration-300 shadow-md hover:scale-105"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Why Section */}
        <section className="relative z-10 px-6 py-16 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-300 mb-4">
            Why Contact Keeper?
          </h2>
          <p className="text-slate-300 text-lg">
            Built for efficiency, designed for elegance. Whether you're managing
            business clients or personal relationships, Contact Keeper helps you
            stay organized, fast.
          </p>
        </section>

        {/* Features Section */}
        <section className="relative z-10 px-6 py-12 max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white/10 rounded-xl border border-white/20 shadow-lg hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-bold text-amber-400 mb-2">
              Fast & Simple
            </h3>
            <p className="text-slate-200">
              Add, edit, and find contacts in seconds. Intuitive UI that just
              makes sense.
            </p>
          </div>
          <div className="p-6 bg-white/10 rounded-xl border border-white/20 shadow-lg hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-bold text-amber-400 mb-2">Secure</h3>
            <p className="text-slate-200">
              We prioritize privacy — your data is encrypted and accessible only
              to you.
            </p>
          </div>
          <div className="p-6 bg-white/10 rounded-xl border border-white/20 shadow-lg hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-bold text-amber-400 mb-2">
              Cloud-Based
            </h3>
            <p className="text-slate-200">
              Access your contact list from anywhere. Your data travels with
              you.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-amber-300 mb-4">
            Ready to take control of your connections?
          </h2>
          <p className="text-slate-300 mb-6">
            Start now and experience how simple managing contacts can be.
          </p>
          <a
            href="/contacts"
            className="inline-block px-8 py-4 bg-amber-400 text-slate-900 font-bold rounded-full hover:bg-amber-500 transition-all duration-300 shadow-xl hover:scale-105"
          >
            Go to Contacts
          </a>
        </section>

        <Footer></Footer>
      </div>
    </>
  );
}
