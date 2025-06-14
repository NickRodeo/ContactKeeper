"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const server_1 = __importDefault(require("react-dom/server"));
const index_1 = __importDefault(require("../../frontend/register/index"));
const login_1 = __importDefault(require("../../frontend/login/login"));
class AuthController {
    static register(req, res, next) {
        if (req.cookies["X-API-TOKEN"] !== undefined) {
            res.redirect("/");
            return;
        }
        const html = server_1.default.renderToString((0, jsx_runtime_1.jsx)(index_1.default, {}));
        res.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
      <title>React SSR</title>
      <link rel="stylesheet" href="/tailwind/output.css" />
    </head>
    <body>
      <div id="root" data-page="register">${html}</div>
      <script src="/bundle.js"></script>
    </body>
  </html>
`);
    }
    static login(req, res, next) {
        if (req.cookies["X-API-TOKEN"] !== undefined) {
            res.redirect("/");
            return;
        }
        const html = server_1.default.renderToString((0, jsx_runtime_1.jsx)(login_1.default, {}));
        res.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
      <title>React SSR</title>
      <link rel="stylesheet" href="/tailwind/output.css" />
    </head>
    <body>
      <div id="root" data-page="login">${html}</div>
      <script src="/bundle.js"></script>
    </body>
  </html>
`);
    }
}
exports.AuthController = AuthController;
