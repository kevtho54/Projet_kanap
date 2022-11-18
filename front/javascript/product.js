/* ------ récuperation de l'url du kanap cliqué -----*/
let currentUrl = window.location.search;
let url = new URLSearchParams(currentUrl);
let id = url.get("id");
let imgUrl, altText;

/* ------ récuperation des données de l'api -----*/
fetch(`http://localhost:3000/api/products/${id}`)
  .then((product) => product.json())
  .then((res) => products(res));

/* ------ récupération des données demander pour la page product --------- */
function products(kanap) {
  const imageUrl = kanap.imageUrl;
  const altTxt = kanap.altTxt;
  const colors = kanap.colors;
  const description = kanap.description;
  const name = kanap.name;
  const price = kanap.price;

  imgUrl = imageUrl;
  altText = altTxt;
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
}

/* ---------- ajout de la description ---------- */
function makeDescription(description) {
  const txtDescription = document.getElementById("description");
  if (txtDescription != null) txtDescription.textContent = description;
}

/* ---------- Création de option pour les couleurs ---------- */
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
/* ---------- Récuperation des données via le boutton panier ---------- */

const button = document.querySelector("#addToCart");
button.addEventListener("click", selection);

function selection() {
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;

  // // if (color == null || color === "" || quantity == null || quantity == 0) {
  // //   alert("veuillez selectionner une couleur et un nombre");
  //     return
  // // }
  data(color, quantity);
  pagePanier();
}

/* ---------- stockage des données dans le local storage ----------*/
function data(color, quantity) {
  const panier = {
    id: id,
    color: color,
    quantity: Number(quantity),
    imageUrl: imgUrl,
    altTxt: altText,
  };
  localStorage.setItem(id, JSON.stringify(panier));
}

/* ---------- redirection vers la page panier  -----------*/
function pagePanier() {
  window.location.href = "cart.html";
}
