const reactToComment = async (url: string, data: any) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization:
        "Bearer " + (await fetch("/api/auth/token").then((res) => res.json())),
      "Content-Type": "application/json", // Set the Content-Type header to specify JSON data
    },
    body: JSON.stringify(data), // Convert the data object to a JSON string
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

export default reactToComment;
