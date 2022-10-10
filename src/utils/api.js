const baseUrl = "https://norma.nomoreparties.space/api/";

export async function loadIngredients() {
  const res = await fetch(`${baseUrl}ingredients`, { method: "GET" });
  return await res.json();
}

export async function makeOrder(ingredients) {
  const res = await fetch(`${baseUrl}orders`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients }),
  });
  return await res.json()
}
