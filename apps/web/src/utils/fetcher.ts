export const fetcher = async (url: string): Promise<any> => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "69420",
      Authorization:
        "Bearer " + (await fetch("/api/auth/token").then((res) => res.json())),
    },
  });
  return await response.json();
};
