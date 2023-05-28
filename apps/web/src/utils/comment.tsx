const comment = async (url: string, data: any) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + (await fetch("/api/auth/token").then((res) => res.json())),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

export default comment;
