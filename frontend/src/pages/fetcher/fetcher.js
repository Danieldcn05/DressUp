export const fetcher = (finalUrl, method, body) => {
    const url = `http://localhost:8000/${finalUrl}`;
    const authToken = localStorage.getItem("authToken");

    const response = fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(body),
    });
     
    return response;
};

