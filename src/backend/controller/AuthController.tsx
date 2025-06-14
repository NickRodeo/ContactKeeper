import { NextFunction, Request, Response } from "express";
import ReactDOMServer from "react-dom/server";
import Register from "../../frontend/register/index";
import Login from "../../frontend/login/login";

export class AuthController {
  static register(req: Request, res: Response, next: NextFunction): void {
    if (req.cookies["X-API-TOKEN"] !== undefined) {
      res.redirect("/");
      return;
    }
    const html = ReactDOMServer.renderToString(<Register />);
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

  static login(req: Request, res: Response, next: NextFunction): void {
    if (req.cookies["X-API-TOKEN"] !== undefined) {
      res.redirect("/");
      return;
    }
    const html = ReactDOMServer.renderToString(<Login />);
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
