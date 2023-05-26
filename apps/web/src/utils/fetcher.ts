export const fetcher = async (url: string): Promise<any> => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "ngrok-skip-browser-warning": "true",
      Authorization:
        "Bearer " + (await fetch("/api/auth/token").then((res) => res.json())),
    },
  });
  return await response.json();
};
