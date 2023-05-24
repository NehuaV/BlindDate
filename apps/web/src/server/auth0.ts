// utils/auth0.js
import { initAuth0 } from "@auth0/nextjs-auth0";
import { env } from "@/env.mjs";

export default initAuth0({
  baseURL: env.AUTH0_BASE_URL,
  issuerBaseURL: env.AUTH0_ISSUER_BASE_URL,
});
