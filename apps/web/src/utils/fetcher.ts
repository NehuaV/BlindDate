export const fetcher = async (url: string): Promise<any> => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + (await fetch("/api/auth/token").then((res) => res.json())),
    },
  });
  return await response.json();
};
