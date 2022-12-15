const orderId = recupOrderId();
const clearLs = clearLocalStorage();
/* ---------- Récuperation de l'orderId ----------*/
function recupOrderId() {
  let currentUrl = window.location.search; // j'effectue une recherche dans l'url
  let url = new URLSearchParams(currentUrl); // je fais une recherche de param dans l'url
  let orderId = url.get("orderId"); // Je recupère l'order id de cette même url
  const order = document.querySelector("#orderId"); // je selectionne l'id orderId
  order.textContent = orderId; // j'envois l'orderId dans le texte de l'id orderId
}
/* ---------- une fois la commande passé, je supprime le local storage ----------*/
function clearLocalStorage() {
  const clearLs = window.localStorage; // je selectionne le local storage
  clearLs.clear(); // je supprime le local storage
}
