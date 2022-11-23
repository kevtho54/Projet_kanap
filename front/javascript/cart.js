/* ---------- innitialisation du tableau ----------*/
let array = [];
let apiProduct = [];

/* ---------- récuperation des données dans le localStorage ----------- */
dataStorage();

array.forEach((item) => itemHtml(item));
console.log(array);

function dataStorage() {
  const key = localStorage.length;
  for (let i = 0; i < key; i++) {
    const item = localStorage.getItem(localStorage.key(i));
    const object = JSON.parse(item);

    array.push(object);

    /* ----------- appel de l'api -----------*/
  }
}
function fetchApi() {
  const api = dataStorage();
  for (const item of api) {
    fetch("http://localhost:3000/api/products/" + item.id)
      .then((response) => response.json())
      .then((product) => itemHtml(product, item));
  }
}
/* ---------- affichage de l'article ---------*/
function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article);
}
/* ----------- affichage des item html dans article ---------- */
function itemHtml(item, data) {
  const article = makeArticle(item);
  const div = makeImage(item);
  article.appendChild(div);

  const cart = makeCart(item);
  article.appendChild(cart);
  displayArticle(article);
  displayTotalQuantity(item);
  displayTotalPrice(data);

  console.log(article);
}
/* ---------- création de l'article ----------*/
function makeArticle(item) {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = item.id;
  article.dataset.color = item.color;
  return article;
}
/* ----------- création de l'image ---------- */
function makeImage(item) {
  const div = document.createElement("div");
  div.classList.add("cart__item__img");

  const image = document.createElement("img");
  image.classList.add("cart__item__img");
  image.src = item.imageUrl;
  image.alt = item.altTxt;
  div.appendChild(image);
  return div;
}
/* ---------- creation de la div qui contient le details des produits ---------- */
function makeCart(item) {
  const cart = document.createElement("div");
  cart.classList.add("cart__item__content");

  const description = makeDescription(item);
  const settings = makeSettings(item);
  const settingDelete = settingsDelete();

  cart.appendChild(description);
  cart.appendChild(settings);
  cart.appendChild(settingDelete);
  return cart;
}
/* ----------- creation de la description ---------- */
function makeDescription(item) {
  const description = document.createElement("div");
  description.classList.add("cart__item__content__description");

  const h2 = document.createElement("h2");
  h2.textContent = item.name;

  const p = document.createElement("p");
  p.textContent = item.color;

  const p2 = document.createElement("p");
  p2.textContent = item.price;

  description.appendChild(h2);
  description.appendChild(p);
  description.appendChild(p2);

  return description;
}
/* ---------- Création de la div settings ---------- */
function makeSettings(item) {
  const settings = document.createElement("div");
  settings.classList.add("cart__item__content__settings");

  const settingsQuantity = document.createElement("div");
  settingsQuantity.classList.add("cart__item__content__settings__quantity");

  const settingsP = document.createElement("p");
  settingsP.textContent = "Qté :";

  const input = document.createElement("input");
  input.type = "number";
  input.classList.add("itemQuantity");
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = item.quantity;

  settings.appendChild(settingsQuantity);
  settings.appendChild(settingsP);
  settings.appendChild(input);
  return settings;
}
/* ---------- création du boutton supprimer ----------*/
function settingsDelete() {
  const settingDelete = document.createElement("div");
  settingDelete.classList.add("cart__item__content__settings__delete");

  const p = document.createElement("p");
  p.classList.add("deleteItem");
  p.textContent = "Supprimer";

  settingDelete.appendChild(p);
  return settingDelete;
}
function displayTotalQuantity(item) {
  const totalQuantity = document.querySelector("#totalQuantity");
  totalQuantity.textContent = item.quantity;
}
function displayTotalPrice() {
  const totalPrice = document.querySelector("#totalPrice");
  totalPrice.textContent = "€";
}
