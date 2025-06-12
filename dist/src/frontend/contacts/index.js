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
exports.default = Contacts;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const navbar_1 = __importDefault(require("../components/navbar"));
const footer_1 = __importDefault(require("../components/footer"));
const card_1 = __importDefault(require("./card"));
const loading_1 = __importDefault(require("../components/loading"));
function Contacts() {
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [contacts, setContacts] = (0, react_1.useState)([]);
    const [searchQuery, setSearchQuery] = (0, react_1.useState)("");
    const [currentPage, setCurrentPage] = (0, react_1.useState)(1);
    const [totalPage, setTotalPage] = (0, react_1.useState)(0);
    const [searchBy, setSearchBy] = (0, react_1.useState)("name");
    (0, react_1.useEffect)(() => {
        setCurrentPage(1);
    }, [searchQuery, searchBy]);
    (0, react_1.useEffect)(() => {
        //SweetAlert
        const message = sessionStorage.getItem("contact_message");
        if (message) {
            sessionStorage.removeItem("contact_message");
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
        setLoading(true);
        fetch(`/api/contacts?size=12&page=${currentPage}${searchQuery ? `&${searchBy}=${searchQuery}` : ""}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
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
    function goToPage(page) {
        if (page >= 1 && page <= totalPage) {
            setCurrentPage(page);
        }
    }
    console.log(totalPage);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(navbar_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto mt-8", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-4xl text-amber-300 font-bold text-center ", children: "Contacts" }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-6 md:max-w-5xl w-[90%] mx-auto mb-6 flex gap-1", children: [(0, jsx_runtime_1.jsxs)("select", { "aria-label": "Select search criteria", className: "px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition", value: searchBy, onChange: (e) => setSearchBy(e.target.value), children: [(0, jsx_runtime_1.jsx)("option", { value: "name", children: "Name" }), (0, jsx_runtime_1.jsx)("option", { value: "email", children: "Email" }), (0, jsx_runtime_1.jsx)("option", { value: "phone", children: "Phone" })] }), (0, jsx_runtime_1.jsx)("input", { type: "text", "aria-label": "Search contacts", placeholder: "Search contacts...", className: "w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition", value: searchQuery, onChange: (e) => {
                                    setSearchQuery(e.target.value);
                                } })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-end mx-auto w-[95%]", children: (0, jsx_runtime_1.jsx)("a", { href: "/contacts/add", className: "text-white font-bold bg-amber-400 px-3 py-2 rounded-lg shadow-2xl hover:bg-amber-700 transition duration-300 hover:text-slate-300", children: "Add Contacts" }) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-10 min-h-[200px]", children: loading ? ((0, jsx_runtime_1.jsx)(loading_1.default, {})) : contacts.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "text-center text-gray-500 text-lg", children: "No contacts yet. Add your first contact!" })) : ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center", children: contacts.map((contact) => ((0, jsx_runtime_1.jsx)(card_1.default, { id: contact.id, firstName: contact.first_name, lastName: contact.last_name, email: contact.email, phone: contact.phone }, contact.id))) })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center gap-3 my-10", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => goToPage(currentPage - 1), disabled: currentPage === 1, className: "px-3 py-1 rounded bg-amber-400 text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer", children: "Prev" }), Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => ((0, jsx_runtime_1.jsx)("button", { onClick: () => goToPage(page), className: `px-3 py-1 rounded ${page === currentPage
                                    ? "bg-amber-600 text-white font-bold"
                                    : "bg-amber-300 hover:bg-amber-500 text-gray-800"}`, children: page }, page))), (0, jsx_runtime_1.jsx)("button", { onClick: () => goToPage(currentPage + 1), disabled: currentPage === totalPage, className: "px-3 py-1 rounded bg-amber-400 text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer", children: "Next" })] })] }), (0, jsx_runtime_1.jsx)(footer_1.default, {})] }));
}
