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
exports.default = Home;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const navbar_1 = __importDefault(require("../components/navbar"));
const footer_1 = __importDefault(require("../components/footer"));
function Home() {
    (0, react_1.useEffect)(() => {
        const message = sessionStorage.getItem("auth_message");
        if (message) {
            sessionStorage.removeItem("auth_message");
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
    }, []);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(navbar_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: "relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 blur-[100px] opacity-30 z-0 bg-gradient-to-tr from-amber-500 via-pink-500 to-indigo-500" }), (0, jsx_runtime_1.jsx)("div", { className: "relative z-10 flex flex-col items-center justify-center px-6 py-24 text-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "backdrop-blur-xl bg-white/10 p-10 rounded-2xl shadow-2xl max-w-3xl border border-white/20", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-5xl md:text-6xl font-extrabold text-amber-300 tracking-widest mb-4 animate-fade-in-up", children: "Contact Keeper" }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg md:text-xl text-slate-200 mb-6", children: "A futuristic and minimal place to organize, protect, and access your important contacts \u2014 anytime, anywhere." }), (0, jsx_runtime_1.jsx)("a", { href: "/contacts", className: "inline-block px-6 py-3 bg-amber-400 text-slate-900 font-bold rounded-xl hover:bg-amber-500 transition-all duration-300 shadow-md hover:scale-105", children: "Get Started" })] }) }), (0, jsx_runtime_1.jsxs)("section", { className: "relative z-10 px-6 py-16 max-w-5xl mx-auto text-center", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-3xl font-bold text-amber-300 mb-4", children: "Why Contact Keeper?" }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-300 text-lg", children: "Built for efficiency, designed for elegance. Whether you're managing business clients or personal relationships, Contact Keeper helps you stay organized, fast." })] }), (0, jsx_runtime_1.jsxs)("section", { className: "relative z-10 px-6 py-12 max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "p-6 bg-white/10 rounded-xl border border-white/20 shadow-lg hover:scale-105 transition-all duration-300", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-bold text-amber-400 mb-2", children: "Fast & Simple" }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-200", children: "Add, edit, and find contacts in seconds. Intuitive UI that just makes sense." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "p-6 bg-white/10 rounded-xl border border-white/20 shadow-lg hover:scale-105 transition-all duration-300", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-bold text-amber-400 mb-2", children: "Secure" }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-200", children: "We prioritize privacy \u2014 your data is encrypted and accessible only to you." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "p-6 bg-white/10 rounded-xl border border-white/20 shadow-lg hover:scale-105 transition-all duration-300", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-bold text-amber-400 mb-2", children: "Cloud-Based" }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-200", children: "Access your contact list from anywhere. Your data travels with you." })] })] }), (0, jsx_runtime_1.jsxs)("section", { className: "relative z-10 px-6 py-16 text-center", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-3xl font-bold text-amber-300 mb-4", children: "Ready to take control of your connections?" }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-300 mb-6", children: "Start now and experience how simple managing contacts can be." }), (0, jsx_runtime_1.jsx)("a", { href: "/contacts", className: "inline-block px-8 py-4 bg-amber-400 text-slate-900 font-bold rounded-full hover:bg-amber-500 transition-all duration-300 shadow-xl hover:scale-105", children: "Go to Contacts" })] }), (0, jsx_runtime_1.jsx)(footer_1.default, {})] })] }));
}
