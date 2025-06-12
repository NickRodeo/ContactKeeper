"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Card;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const loading_1 = __importDefault(require("../components/loading"));
function Card({ id, firstName, lastName, email, phone, }) {
    const [loadingDelete, setLoadingDelete] = (0, react_1.useState)(false);
    async function handleDelete(id) {
        setLoadingDelete(true);
        try {
            const res = await fetch(`/api/contacts/${id}`, {
                method: "DELETE",
            });
            if (!res.ok)
                throw new Error("Gagal Menghapus");
            sessionStorage.setItem("contact_message", "Kontak Berhasil Dihapus!");
            window.location.href = "/contacts";
        }
        catch (err) {
            sweetalert2_1.default.fire({
                title: "Error!",
                text: "Terjadi kesalahan saat menghapus",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
        finally {
            setLoadingDelete(false);
        }
    }
    async function handleEdit(id) {
        window.location.href = `/contacts/edit?contactId=${id}`;
    }
    async function detailPage(id) {
        window.location.href = `/contacts/${id}`;
    }
    return ((0, jsx_runtime_1.jsxs)("div", { onClick: () => detailPage(id), className: "bg-white shadow-md rounded-xl p-4 w-64 relative hover:scale-110 transition duration-300 cursor-pointer transform origin-center mb-6", children: [loadingDelete && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute inset-0 flex items-center justify-center rounded-2xl z-10", children: [" ", (0, jsx_runtime_1.jsx)(loading_1.default, {}), " "] })), (0, jsx_runtime_1.jsx)("button", { onClick: async (e) => {
                    e.stopPropagation();
                    await handleEdit(id);
                }, className: "absolute top-2 right-10 text-blue-500 hover:text-blue-700 hover:opacity-70 cursor-pointer text-xl", children: "\u270F\uFE0F" }), (0, jsx_runtime_1.jsx)("button", { onClick: async (e) => {
                    e.stopPropagation();
                    const confirm = await sweetalert2_1.default.fire({
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
                }, className: "absolute top-2 right-2 text-red-500 hover:text-red-700 hover:opacity-70 cursor-pointer text-xl", children: "\uD83D\uDDD1\uFE0F" }), (0, jsx_runtime_1.jsxs)("h2", { className: "text-xl font-bold text-gray-800", children: [firstName.length <= 12
                        ? firstName
                        : firstName.split("").slice(0, 12).join(""), " ", lastName == null
                        ? ""
                        : lastName.length <= 12
                            ? lastName
                            : lastName.split("").slice(0, 16).join("") + "..."] }), email && (0, jsx_runtime_1.jsxs)("p", { className: "text-gray-600", children: ["\uD83D\uDCE7 ", email] }), phone && (0, jsx_runtime_1.jsxs)("p", { className: "text-gray-600", children: ["\uD83D\uDCF1 ", phone] })] }));
}
