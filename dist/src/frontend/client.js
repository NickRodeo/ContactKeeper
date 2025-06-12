"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("react-dom/client");
const home_1 = __importDefault(require("./home"));
const login_1 = __importDefault(require("./login/login"));
const register_1 = __importDefault(require("./register"));
const contacts_1 = __importDefault(require("./contacts"));
const about_1 = __importDefault(require("./about"));
const add_1 = __importDefault(require("./contacts/add"));
const edit_1 = __importDefault(require("./contacts/edit"));
const detail_1 = __importDefault(require("./contacts/detail"));
const add_2 = __importDefault(require("./address/add"));
const edit_2 = __importDefault(require("./address/edit"));
const pages = {
    home: home_1.default,
    login: login_1.default,
    register: register_1.default,
    contacts: contacts_1.default,
    about: about_1.default,
    addContact: add_1.default,
    editContact: edit_1.default,
    detailContact: detail_1.default,
    addAddress: add_2.default,
    editAddress: edit_2.default,
};
const root = document.getElementById("root");
if (root) {
    const pageName = root.getAttribute("data-page") || "home";
    const PageComponent = pages[pageName] || (() => (0, jsx_runtime_1.jsx)("div", { children: "Page Not Found" }));
    (0, client_1.hydrateRoot)(root, (0, jsx_runtime_1.jsx)(PageComponent, {}));
}
