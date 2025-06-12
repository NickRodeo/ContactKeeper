"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AddAddress;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const navbar_1 = __importDefault(require("../components/navbar"));
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const loading_1 = __importDefault(require("../components/loading"));
function AddAddress() {
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [contactId, setContactId] = (0, react_1.useState)(null);
    const [formData, setFormData] = (0, react_1.useState)({
        contact_id: 0,
        street: "",
        city: "",
        province: "",
        country: "",
        postal_code: "",
    });
    (0, react_1.useEffect)(() => {
        const pathParts = window.location.pathname.split("/");
        const id = pathParts[pathParts.length - 3]; // /contacts/:id/addresses/add
        setContactId(id);
    }, []);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!contactId)
            return alert("Contact ID tidak ditemukan di URL");
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
            if (!res.ok)
                throw new Error("Gagal menambahkan alamat");
            sessionStorage.setItem("address_message", "Alamat Berhasil Ditambahkan!");
            window.location.href = `/contacts/${contactId}`;
        }
        catch (err) {
            sweetalert2_1.default.fire({
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
        }
        finally {
            setLoading(false);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(navbar_1.default, {}), (0, jsx_runtime_1.jsx)("div", { className: "container mx-auto px-4 mt-10", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8", children: [loading && ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 flex items-center justify-center rounded-2xl z-10", children: (0, jsx_runtime_1.jsx)(loading_1.default, {}) })), (0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold text-center text-amber-500 mb-6", children: "Add Address" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", name: "street", placeholder: "Jalan / Street (opsional)", value: formData.street, onChange: handleChange, className: "w-full px-4 py-2 border rounded-lg" }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "city", placeholder: "Kota (opsional)", value: formData.city, onChange: handleChange, className: "w-full px-4 py-2 border rounded-lg" }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "province", placeholder: "Provinsi (opsional)", value: formData.province, onChange: handleChange, className: "w-full px-4 py-2 border rounded-lg" }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "country", placeholder: "Negara (wajib)", value: formData.country, onChange: handleChange, required: true, className: "w-full px-4 py-2 border rounded-lg" }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "postal_code", placeholder: "Kode Pos (wajib)", value: formData.postal_code, onChange: handleChange, required: true, className: "w-full px-4 py-2 border rounded-lg" }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition", children: "Save Address" })] })] }) })] }));
}
