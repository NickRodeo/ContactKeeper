"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const server_1 = __importDefault(require("react-dom/server"));
const index_1 = __importDefault(require("../../frontend/home/index"));
class HomeController {
    static index(req, res, next) {
        const html = server_1.default.renderToString((0, jsx_runtime_1.jsx)(index_1.default, {}));
        res.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <title>React SSR</title>
      <link rel="stylesheet" href="/tailwind/output.css" />
    </head>
    <body>
      <div id="root" data-page="home">${html}</div>
      <script src="/bundle.js"></script>
    </body>
  </html>
`);
    }
}
exports.HomeController = HomeController;
