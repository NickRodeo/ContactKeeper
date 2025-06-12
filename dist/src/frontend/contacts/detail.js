"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DetailContact;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const navbar_1 = __importDefault(require("../components/navbar"));
const footer_1 = __importDefault(require("../components/footer"));
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const loading_1 = __importDefault(require("../components/loading"));
function DetailContact() {
    const [loadingDelete, setLoadingDelete] = (0, react_1.useState)(null);
    const [loadingDetail, setLoadingDetail] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [id, setId] = (0, react_1.useState)(null);
    const [contact, setContact] = (0, react_1.useState)(null);
    const [addresses, setAddresses] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const message = sessionStorage.getItem("address_message");
        if (message) {
            sessionStorage.removeItem("address_message");
            Promise.resolve().then(() => __importStar(require("sweetalert2"))).then((Swal) => {
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
    async function handleDeleteAddress(addressId) {
        console.log(addressId);
        setLoadingDelete(addressId);
        try {
            const res = await fetch(`/api/contacts/${id}/addresses/${addressId}`, {
                method: "DELETE",
            });
            if (!res.ok)
                throw new Error("Gagal Menghapus");
            sessionStorage.setItem("address_message", "Alamat Berhasil Dihapus!");
            window.location.href = `/contacts/${id}`;
        }
        catch (err) {
            sweetalert2_1.default.fire({
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
        }
        finally {
            setLoadingDelete(null);
        }
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(navbar_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto mt-8 px-4", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-4xl font-bold text-center text-amber-500 mb-6", children: "Detail Kontak" }), loadingDetail ? ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 flex items-center justify-center rounded-2xl z-10", children: (0, jsx_runtime_1.jsx)(loading_1.default, {}) })) : (contact && ((0, jsx_runtime_1.jsxs)("div", { className: "max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 mb-10", children: [(0, jsx_runtime_1.jsxs)("h2", { className: "text-2xl font-semibold text-gray-800 mb-4", children: [contact.first_name, " ", contact.last_name ?? ""] }), contact.email && ((0, jsx_runtime_1.jsxs)("p", { className: "text-gray-600 mb-2", children: ["\uD83D\uDCE7 ", contact.email] })), contact.phone && ((0, jsx_runtime_1.jsxs)("p", { className: "text-gray-600 mb-2", children: ["\uD83D\uDCF1 ", contact.phone] }))] }))), (0, jsx_runtime_1.jsxs)("div", { className: "max-w-xl mx-auto", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mb-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-semibold text-gray-700", children: "Alamat" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleAddAddress, className: "text-white font-bold cursor-pointer bg-amber-400 px-3 py-2 rounded-lg shadow-2xl hover:bg-amber-700 transition duration-300 hover:text-slate-300", children: "+ Add Address" })] }), loading ? ((0, jsx_runtime_1.jsx)(loading_1.default, {})) : addresses.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "grid gap-4", children: addresses.map((address) => ((0, jsx_runtime_1.jsxs)("div", { className: "relative bg-white border rounded-xl p-5 shadow hover:shadow-lg transition", children: [loadingDelete === address.id && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute inset-0 flex items-center justify-center rounded-2xl z-10", children: [" ", (0, jsx_runtime_1.jsx)(loading_1.default, {}), " "] })), (0, jsx_runtime_1.jsxs)("div", { className: " flex justify-end gap-2 absolute top-3 right-3", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => {
                                                        window.location.href = `/contacts/${id}/addresses/${address.id}`;
                                                    }, className: "cursor-pointer text-xl hover:scale-110 transition-transform text-blue-500 hover:text-blue-700", title: "Edit Alamat", children: "\u270F\uFE0F" }), (0, jsx_runtime_1.jsx)("button", { onClick: async () => {
                                                        const confirm = await sweetalert2_1.default.fire({
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
                                                    }, className: "cursor-pointer text-xl hover:scale-110 transition-transform text-red-500 hover:text-red-700", title: "Hapus Alamat", children: "\uD83D\uDDD1\uFE0F" })] }), (0, jsx_runtime_1.jsxs)("h4", { className: "text-lg font-semibold text-amber-600 mb-2", children: ["Alamat #", address.id] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-gray-700 space-y-1 mb-4", children: [address.street && (0, jsx_runtime_1.jsxs)("p", { children: ["\uD83C\uDFE0 ", address.street] }), address.city && (0, jsx_runtime_1.jsxs)("p", { children: ["\uD83C\uDFD9\uFE0F ", address.city] }), address.province && (0, jsx_runtime_1.jsxs)("p", { children: ["\uD83C\uDF04 ", address.province] }), (0, jsx_runtime_1.jsxs)("p", { children: ["\uD83C\uDF0D ", address.country] }), (0, jsx_runtime_1.jsxs)("p", { children: ["\uD83D\uDCEE ", address.postal_code] })] })] }, address.id))) })) : ((0, jsx_runtime_1.jsx)("p", { className: "text-gray-500 mb-40", children: "Belum ada alamat ditambahkan." }))] })] }), (0, jsx_runtime_1.jsx)(footer_1.default, {})] }));
}
