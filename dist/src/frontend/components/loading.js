"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Loading;
const jsx_runtime_1 = require("react/jsx-runtime");
function Loading() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center h-40", children: (0, jsx_runtime_1.jsx)("div", { className: "animate-spin rounded-full h-12 w-12 border-t-4 border-amber-400 border-solid" }) }));
}
