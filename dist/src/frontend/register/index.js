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
exports.default = Register;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const loading_1 = __importDefault(require("../components/loading"));
function Register() {
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [formData, setFormData] = react_1.default.useState({
        username: "",
        password: "",
        name: "",
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`/api/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            console.log(res);
            if (!res.ok)
                throw new Error("Data tidak valid");
            sessionStorage.setItem("auth_message", "Register Berhasil!");
            window.location.href = `/login`;
        }
        catch (err) {
            sweetalert2_1.default.fire({
                title: "Gagal!",
                text: "Username mungkin sudah terdaftar atau password terlalu sedikit (minimal 4)",
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
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative border-amber-400 mt-[200px] border-2 shadow-amber-200 shadow-2xl rounded-2xl py-4 px-3 bg-amber-100 w-1/2 mx-auto", children: [loading && ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 flex items-center justify-center rounded-2xl z-10", children: (0, jsx_runtime_1.jsx)(loading_1.default, {}) })), (0, jsx_runtime_1.jsx)("h1", { className: "text-4xl text-amber-300 font-bold text-center ", children: "Register" }), (0, jsx_runtime_1.jsx)("div", { className: "mx-auto w-1/2", children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "username", className: "block text-sm font-medium text-gray-500", children: "Username" }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "username", id: "username", value: formData.username, onChange: handleChange, required: true, className: "mt-1 mb-3 w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-500", children: "Name" }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "name", id: "name", value: formData.name, onChange: handleChange, required: true, className: "mt-1 mb-3 w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-500", children: "Password" }), (0, jsx_runtime_1.jsx)("input", { type: "password", name: "password", id: "password", value: formData.password, onChange: handleChange, required: true, className: "mt-1 mb-3 w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300" })] }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "my-4 w-full py-2 px-4 bg-amber-400 text-gray-900 font-semibold rounded-xl hover:bg-amber-500 transition duration-200", children: "Register" })] }) }), (0, jsx_runtime_1.jsxs)("p", { className: "text-right text-sm font-normal text-gray-700 ", children: ["Already Registered?", " ", (0, jsx_runtime_1.jsx)("a", { href: "/login", className: "text-amber-500 hover:text-amber-700 cursor-pointer", children: "Login" })] })] }));
}
