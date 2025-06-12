import React from "react";

export default function Footer() {
  return (
    <footer className="bg-amber-500 text-white pt-10 pb-6 px-6 mt-16 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-amber-400 pb-6">
        {/* Tentang */}
        <div>
          <h2 className="text-xl font-bold mb-4">Tentang ContactKeeper</h2>
          <p className="text-sm leading-relaxed">
            ContactKeeper adalah aplikasi manajemen kontak pribadi yang membantu
            Anda menyimpan, mengelola, dan mengakses informasi kontak dengan
            mudah dan aman.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h2 className="text-xl font-bold mb-4">Navigasi</h2>
          <ul className="text-sm space-y-2">
            <li>
              <a href="/" className="hover:underline hover:text-gray-200">
                Home
              </a>
            </li>
            <li>
              <a
                href="/contacts"
                className="hover:underline hover:text-gray-200"
              >
                Contacts
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline hover:text-gray-200">
                About
              </a>
            </li>
          </ul>
        </div>

        {/* Kontak & Sosial */}
        <div>
          <h2 className="text-xl font-bold mb-4">Hubungi Kami</h2>
          <ul className="text-sm space-y-2">
            <li>
              Email:{" "}
              <a href="mailto:support@contactkeeper.com" className="underline">
                support@contactkeeper.com
              </a>
            </li>
            <li>
              WhatsApp:{" "}
              <a href="https://wa.me/6281234567890" className="underline">
                +62 812-3456-7890
              </a>
            </li>
            <li>
              GitHub:{" "}
              <a
                href="https://github.com/username/contactkeeper"
                className="underline"
              >
                contactkeeper repo
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-amber-100">
        © {new Date().getFullYear()} ContactKeeper. All rights reserved.
      </div>
    </footer>
  );
}
