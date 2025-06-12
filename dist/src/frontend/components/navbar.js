"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Navbar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function Navbar() {
    const handleLogout = async () => {
        try {
            const res = await fetch("/api/users/current", {
                method: "DELETE",
                credentials: "include", // kalau pakai cookie
                headers: {
                    "Content-Type": "application/json",
                },
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
    const [user, setUser] = (0, react_1.useState)({
        name: "",
        username: "",
        token: "",
    });
    (0, react_1.useEffect)(() => {
        fetch("/api/users/current", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
            setUser(data.data);
        });
    }, []);
    return ((0, jsx_runtime_1.jsxs)("nav", { className: "bg-amber-500 text-white flex justify-between items-center px-6 py-4 shadow-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-xl sm:text-2xl md:mr-10 font-extrabold bg-gradient-to-r from-purple-600 via-pink-700 to-white text-transparent bg-clip-text tracking-wide drop-shadow-sm", children: "ContactKeeper" }), (0, jsx_runtime_1.jsxs)("ul", { className: "flex space-x-6 text-lg font-medium", children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: "/", className: "hover:text-gray-300 transition", children: "Home" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: "/contacts", className: "hover:text-gray-300 transition", children: "Contacts" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: "/about", className: "hover:text-gray-300 transition", children: "About" }) })] })] }), (0, jsx_runtime_1.jsx)("button", { onClick: handleLogout, className: "bg-amber-700 hover:bg-amber-800 px-4 py-2 rounded-lg font-semibold shadow transition", children: "Logout" }), (0, jsx_runtime_1.jsxs)("h1", { className: "fixed right-4 bottom-4 font-bold text-2xl text-amber-400 sm:text-3xl animate-bounce z-50", children: ["Welcome,", " ", (0, jsx_runtime_1.jsx)("span", { className: "bg-gradient-to-r from-pink-500 via-amber-500 to-red-500 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient font-extrabold transition-all duration-500 hover:scale-105 hover:drop-shadow-xl", children: user.name })] })] }));
}
