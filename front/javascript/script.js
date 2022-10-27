/* ----------recuperation de l'api -----------*/
let kanapData = [];
fetch("http://localhost:3000/api/products")
  .then((products) => products.json())
  .then((data) => apiProducts(data));

function apiProducts(data) {
  console.log(data);
  const imageUrl = data[0].imageUrl;
  console.log("url de l'image", imageUrl);

  let anchor = document.createElement("a");
  anchor.href = imageUrl;
  anchor.text = "Kanap Sinopé";
  document.querySelector("#items");
  items.appendChild(anchor);
  console.log("ajout du lien");
}
