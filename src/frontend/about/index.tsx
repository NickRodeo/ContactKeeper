import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-amber-100 via-white to-amber-50 py-12 px-6 -mb-16">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-amber-600 mb-4 animate-pulse">
            Tentang ContactKeeper
          </h1>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
            Di dunia digital yang terus bergerak cepat, ContactKeeper hadir
            sebagai solusi sederhana namun kuat untuk mengelola kontak Anda
            secara efisien dan aman. Dibangun dengan cinta oleh developer yang
            peduli pada pengalaman pengguna, aplikasi ini bukan sekadar buku
            alamat digital, melainkan pusat hubungan personal dan profesional
            Anda.
          </p>

          {/* Section: Filosofi */}
          <section className="bg-white shadow-lg rounded-2xl p-6 my-10 border-l-4 border-amber-400">
            <h2 className="text-2xl font-bold text-amber-600 mb-3">
              ✨ Filosofi Kami
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Kami percaya bahwa setiap nama, setiap nomor, dan setiap email
              memiliki cerita. ContactKeeper dibangun bukan hanya untuk
              menyimpan data, tetapi untuk menjaga koneksi dan membangun
              jaringan yang bermakna. Aplikasi ini mencerminkan nilai
              kesederhanaan, keindahan antarmuka, dan kekuatan fungsionalitas.
            </p>
          </section>

          {/* Section: Fitur */}
          <section className="grid md:grid-cols-2 gap-6 text-left mt-10">
            <div className="bg-amber-100 p-6 rounded-xl border border-amber-300 shadow-md">
              <h3 className="text-xl font-semibold text-amber-700 mb-2">
                🔐 Aman dan Pribadi
              </h3>
              <p className="text-gray-700">
                Dengan sistem autentikasi dan penyimpanan terenkripsi, informasi
                kontak Anda terlindungi dari akses tidak sah.
              </p>
            </div>
            <div className="bg-amber-100 p-6 rounded-xl border border-amber-300 shadow-md">
              <h3 className="text-xl font-semibold text-amber-700 mb-2">
                ⚡ Super Cepat
              </h3>
              <p className="text-gray-700">
                Didukung teknologi modern, setiap interaksi terasa instan, dari
                pencarian hingga penyimpanan kontak.
              </p>
            </div>
            <div className="bg-amber-100 p-6 rounded-xl border border-amber-300 shadow-md">
              <h3 className="text-xl font-semibold text-amber-700 mb-2">
                🎯 Fokus pada Pengguna
              </h3>
              <p className="text-gray-700">
                Kami mendesain antarmuka yang bersih dan intuitif agar Anda
                tidak perlu berpikir dua kali untuk menggunakannya.
              </p>
            </div>
            <div className="bg-amber-100 p-6 rounded-xl border border-amber-300 shadow-md">
              <h3 className="text-xl font-semibold text-amber-700 mb-2">
                🌍 Siap Go Global
              </h3>
              <p className="text-gray-700">
                Mendukung banyak bahasa, timezone, dan fleksibel untuk bisnis
                maupun penggunaan pribadi.
              </p>
            </div>
          </section>

          {/* Section: Developer Note */}
          <div className="mt-14 bg-gradient-to-r from-amber-200 to-amber-100 p-6 rounded-xl shadow-inner border border-amber-300">
            <h2 className="text-2xl font-bold text-amber-700 mb-2">
              👨‍💻 Catatan dari Pengembang
            </h2>
            <p className="text-gray-800">
              Project ini dibangun menggunakan stack modern seperti React,
              Tailwind CSS, dan RESTful API. Ini bukan sekadar latihan teknikal,
              tetapi representasi semangat saya dalam menciptakan tools yang
              berguna dan memiliki nilai nyata untuk orang lain.
            </p>
          </div>

          {/* Section: Quote */}
          <blockquote className="mt-10 italic text-gray-600 text-lg border-l-4 border-amber-400 pl-4">
            “Kontak bukan sekadar data — ia adalah jembatan hubungan manusia
            yang seharusnya dijaga, dirawat, dan dimudahkan.”
          </blockquote>
        </div>
      </div>
      <Footer />
    </>
  );
}
