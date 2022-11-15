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
  const imageUrl = kanap.imageUrl;
  const altTxt = kanap.altTxt;
  const colors = kanap.colors;
  const description = kanap.description;
  const name = kanap.name;
  const price = kanap.price;

  makeImage(imageUrl, altTxt);
  makeH1(name);
  makePrice(price);
  makeDescription(description);
  makeColors(colors);
}

/* ---------- création de l'image ---------- */
function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;

  const item = document.querySelector(".item__img");
  if (item != null) item.appendChild(image);
}

/* ----------- Ajout du h1 ---------- */
function makeH1(name) {
  const title = document.getElementById("title");
  if (title != null) title.textContent = name;
}

/* ----------- Ajout du prix ---------- */
function makePrice(price) {
  const txtPrice = document.getElementById("price");
  if (txtPrice != null) txtPrice.textContent = price;
  console.log(txtPrice);
}

/* ---------- ajout de la description ---------- */
function makeDescription(description) {
  const txtDescription = document.getElementById("description");
  if (txtDescription != null) txtDescription.textContent = description;
}

/* ---------- Création de option pour les coouleurs ---------- */
function makeColors(colors) {
  const select = document.getElementById("colors");
  if (select != null) {
    colors.forEach((color) => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      select.appendChild(option);
    });
  }
}
