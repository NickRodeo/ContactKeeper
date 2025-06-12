"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web_1 = require("./application/web");
web_1.app.listen(3000, () => {
    console.log(`running on http://localhost:3000`);
});
