import { createServer } from "./server";
import { userRouter } from "./routes";
import { log } from "logger";

const port = process.env.NEXT_PUBLIC_USER_SERVICE_URL?.split(":")[2] || 3002;
const server = createServer();

server.listen(port, () => {
  log(`api running on ${port}`);
});

server.use("", userRouter());
