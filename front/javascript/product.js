/* ------ récuperation de l'url du kanap cliqué -----*/
let currentUrl = window.location.search;
let url = new URLSearchParams(currentUrl);
let id = url.get("id");

/* ------ récuperation des données de l'api -----*/
fetch(`http://localhost:3000/api/products/${id}`)
  .then((product) => product.json())
  .then((res) => products(res));
/* ------ récupération des données demander pour la page product ---------v */
function products(kanap) {
  console.log({ kanap });
  const imageUrl = kanap.imageUrl;
  const altTxt = kanap.altTxt;
  const colors = kanap.colors;
  const description = kanap.description;
  const name = kanap.name;
  const price = kanap.price;
  const id = kanap._id;

  makeImage(imageUrl, altTxt);
  makeH1(name);
  makePrice(price);
}
/* ---------- création de l'image ---------- */
function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;

  const item = document.querySelector(".item__img");
  if (item != null) item.appendChild(image);
}

/* ----------- création du h1 ---------- */
function makeH1(name) {
  const title = document.getElementById("title");
  if (title != null) title.textContent = name;
}

function makePrice(price) {
  const txtPrice = document.getElementById("price");
  if (txtPrice != null) txtPrice.textContent = price;
}
