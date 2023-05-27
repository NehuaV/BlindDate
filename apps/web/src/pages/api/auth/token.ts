import { env } from "@/env.mjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { access_token } = await fetch(
      `${env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: env.AUTH0_CLIENT_ID,
          client_secret: env.AUTH0_CLIENT_SECRET,
          audience: `${env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
          grant_type: "client_credentials",
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        res.status(500).json(error);
      });

    res.status(200).json(access_token);
  }
  res.status(405).end();
}
