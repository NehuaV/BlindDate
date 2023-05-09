import { createServer } from "./server";
import { log } from "logger";
import { postRouter } from "./routes";

const port = process.env.NEXT_PUBLIC_POST_SERVICE_URL || 3003;
const endPoint = process.env.NODE_ENV === "production" ? "/" : "/post";
const server = createServer();

// Start the server
server.listen(port, () => {
  log(`api running on ${port}`);
});

server.use(endPoint, postRouter());
