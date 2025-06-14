"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIController = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const server_1 = __importDefault(require("react-dom/server"));
const index_1 = __importDefault(require("../../frontend/home/index"));
const contacts_1 = __importDefault(require("../../frontend/contacts"));
const add_1 = __importDefault(require("../../frontend/contacts/add"));
const edit_1 = __importDefault(require("../../frontend/contacts/edit"));
const database_1 = require("../application/database");
const detail_1 = __importDefault(require("../../frontend/contacts/detail"));
const add_2 = __importDefault(require("../../frontend/address/add"));
const edit_2 = __importDefault(require("../../frontend/address/edit"));
class UIController {
    static toHTML(html, data, title) {
        return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
      <title>${title}</title>
      <link rel="stylesheet" href="/tailwind/output.css" />
    </head>
    <body>
      <div id="root" data-page="${data}">${html}</div>
      <script src="/bundle.js"></script>
    </body>
  </html>
`;
    }
    static index(req, res, next) {
        const html = server_1.default.renderToString((0, jsx_runtime_1.jsx)(index_1.default, {}));
        res.send(UIController.toHTML(html, "home", "Home"));
    }
    static contacts(req, res, next) {
        const html = server_1.default.renderToString((0, jsx_runtime_1.jsx)(contacts_1.default, {}));
        res.send(UIController.toHTML(html, "contacts", "Contacts"));
    }
    static contactsAdd(req, res, next) {
        const html = server_1.default.renderToString((0, jsx_runtime_1.jsx)(add_1.default, {}));
        res.send(UIController.toHTML(html, "addContact", "Add Contact"));
    }
    static async contactsEdit(req, res, next) {
        const contactIdStr = req.query.contactId;
        if (!contactIdStr || !/^\d+$/.test(contactIdStr)) {
            res.status(404).end();
        }
        const contactId = parseInt(contactIdStr, 10);
        const contact = await database_1.prismaClient.contact.findFirst({
            where: {
                id: contactId,
                username: req.user.username,
            },
        });
        console.log(contact);
        if (!contact) {
            res.status(404).end();
        }
        const html = server_1.default.renderToString((0, jsx_runtime_1.jsx)(edit_1.default, {}));
        res.send(UIController.toHTML(html, "editContact", "Edit Contact"));
    }
    static contactDetail(req, res, next) {
        const html = server_1.default.renderToString((0, jsx_runtime_1.jsx)(detail_1.default, {}));
        res.send(UIController.toHTML(html, "detailContact", "Detail Contact"));
    }
    static addressAdd(req, res, next) {
        const html = server_1.default.renderToString((0, jsx_runtime_1.jsx)(add_2.default, {}));
        res.send(UIController.toHTML(html, "addAddress", "Add Address"));
    }
    static addressEdit(req, res, next) {
        const html = server_1.default.renderToString((0, jsx_runtime_1.jsx)(edit_2.default, {}));
        res.send(UIController.toHTML(html, "editAddress", "Edit Address"));
    }
    static about(req, res, next) {
        const html = server_1.default.renderToString((0, jsx_runtime_1.jsx)(contacts_1.default, {}));
        res.send(UIController.toHTML(html, "about", "About"));
    }
}
exports.UIController = UIController;
