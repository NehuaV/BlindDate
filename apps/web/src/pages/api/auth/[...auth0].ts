import { handleAuth, handleLogin, handleCallback } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "@/server/db";
import { env } from "@/env.mjs";

const afterCallback = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: any,
  state: any
) => {
  const isUser = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  if (!isUser) {
    const user = await prisma.user
      .create({
        data: {
          name: session.user.name,
          email: session.user.email,
          emailVerified: session.user.email_verified,
          image: session.user.picture,
        },
      })
      .catch((e) => {
        throw e;
      });
  }

  return session;
};

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error: any) {
      res.status(error?.status || 500).end(error?.message);
    }
  },
});
