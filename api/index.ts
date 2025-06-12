import { createServer } from "http";
import { app } from "../dist/src/backend/application/web"; // pastikan path sesuai hasil tsc

const server = createServer(app);
export default server;
