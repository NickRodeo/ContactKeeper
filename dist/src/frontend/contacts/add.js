"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AddContact;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const navbar_1 = __importDefault(require("../components/navbar"));
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const loading_1 = __importDefault(require("../components/loading"));
function AddContact() {
    const [form, setForm] = (0, react_1.useState)({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
    });
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newContact = {
            id: 0,
            first_name: form.first_name,
            phone: form.phone,
        };
        if (form.email !== "")
            newContact.email = form.email;
        if (form.last_name !== "")
            newContact.last_name = form.last_name;
        setLoading(true);
        fetch("/api/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newContact),
        })
            .then((res) => {
            console.log(res);
            if (!res.ok) {
                throw new Error("Gagal menambahkan kontak");
            }
            return res.json();
        })
            .then((data) => {
            sessionStorage.setItem("contact_message", "Kontak Berhasil Ditambahkan!");
            window.location.href = "/contacts";
        })
            .finally(() => {
            setLoading(false);
        })
            .catch((err) => {
            console.error(err);
            sweetalert2_1.default.fire({
                title: "Gagal!",
                text: "Terjadi kesalahan saat menambahkan kontak.",
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
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(navbar_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto mt-8", children: [loading && ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 flex items-center justify-center rounded-2xl z-10", children: (0, jsx_runtime_1.jsx)(loading_1.default, {}) })), (0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold text-center text-amber-400 mb-6", children: "Add Contact" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "max-w-md mx-auto bg-white p-6 rounded shadow", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-4", children: [(0, jsx_runtime_1.jsx)("label", { className: "block mb-1 font-semibold", children: "First Name" }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "first_name", value: form.first_name, onChange: handleChange, required: true, className: "w-full px-3 py-2 border border-gray-300 rounded" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-4", children: [(0, jsx_runtime_1.jsx)("label", { className: "block mb-1 font-semibold", children: "Last Name" }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "last_name", value: form.last_name, onChange: handleChange, className: "w-full px-3 py-2 border border-gray-300 rounded" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-4", children: [(0, jsx_runtime_1.jsx)("label", { className: "block mb-1 font-semibold", children: "Email" }), (0, jsx_runtime_1.jsx)("input", { type: "email", name: "email", value: form.email, onChange: handleChange, className: "w-full px-3 py-2 border border-gray-300 rounded" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-4", children: [(0, jsx_runtime_1.jsx)("label", { className: "block mb-1 font-semibold", children: "Phone" }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "phone", value: form.phone, onChange: handleChange, className: "w-full px-3 py-2 border border-gray-300 rounded" })] }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "w-full bg-amber-400 text-white py-2 rounded hover:bg-amber-500 transition", children: "Save Contact" })] })] })] }));
}
