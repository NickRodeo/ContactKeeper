"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Navbar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
function Navbar() {
    const [user, setUser] = (0, react_1.useState)({
        name: "",
        username: "",
        token: "",
    });
    const [menuOpen, setMenuOpen] = (0, react_1.useState)(false);
    const handleLogout = async () => {
        try {
            const res = await fetch("/api/users/current", {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            if (res.ok) {
                window.location.href = "/login";
            }
            else {
                console.log("logout gagal");
            }
        }
        catch (err) {
            console.error("Error saat logout:", err);
        }
    };
    (0, react_1.useEffect)(() => {
        fetch("/api/users/current", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((data) => {
            setUser(data.data);
        });
    }, []);
    return ((0, jsx_runtime_1.jsxs)("nav", { className: "bg-amber-500 text-white px-4 py-3 shadow-md relative z-50", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-700 to-white text-transparent bg-clip-text tracking-wide", children: "ContactKeeper" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setMenuOpen(!menuOpen), className: "md:hidden text-white transition-all duration-300", children: menuOpen ? (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 28 }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Menu, { size: 28 }) }), (0, jsx_runtime_1.jsxs)("ul", { className: "hidden md:flex space-x-6 text-sm sm:text-base font-medium items-center", children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: "/", className: "hover:text-gray-300 transition", children: "Home" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: "/contacts", className: "hover:text-gray-300 transition", children: "Contacts" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: "/about", className: "hover:text-gray-300 transition", children: "About" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("button", { onClick: handleLogout, className: "bg-amber-700 hover:bg-amber-800 px-4 py-2 rounded-lg font-semibold shadow transition", children: "Logout" }) })] })] }), (0, jsx_runtime_1.jsx)("div", { className: `md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-96 mt-3" : "max-h-0"}`, children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-amber-400 text-white rounded-lg shadow-lg p-4 space-y-3", children: [(0, jsx_runtime_1.jsx)("a", { href: "/", className: "block hover:text-gray-200 transition", children: "Home" }), (0, jsx_runtime_1.jsx)("a", { href: "/contacts", className: "block hover:text-gray-200 transition", children: "Contacts" }), (0, jsx_runtime_1.jsx)("a", { href: "/about", className: "block hover:text-gray-200 transition", children: "About" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleLogout, className: "w-full bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg font-semibold shadow transition", children: "Logout" })] }) }), (0, jsx_runtime_1.jsxs)("h1", { className: "fixed right-4 bottom-4 font-bold text-xl sm:text-2xl text-amber-400 animate-bounce z-50", children: ["Welcome,", " ", (0, jsx_runtime_1.jsx)("span", { className: "bg-gradient-to-r from-pink-500 via-amber-500 to-red-500 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient font-extrabold", children: user.name })] })] }));
}
