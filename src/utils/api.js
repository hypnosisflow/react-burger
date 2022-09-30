const baseUrl = "https://norma.nomoreparties.space/api/";

export async function loadIngredients() {
  const res = await fetch(`${baseUrl}ingredients`, { method: "GET" });
  return await res.json();
}

export function makeOrder(data) {
  console.log("DATA", data, JSON.stringify({data}));

  return fetch(`${baseUrl}orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });
}
