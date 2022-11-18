let array = [];

// fetch("http://localhost:3000/api/products")
//   .then((products) => products.json())
//   .then((data) => {
//     apiProducts(data);
//     console.log(data);
//   });

dataStorage();

array.forEach((item) => itemHtml(item));
console.log(array);

function dataStorage() {
  const key = localStorage.length;
  for (let i = 0; i < key; i++) {
    const item = localStorage.getItem(localStorage.key(i));
    const object = JSON.parse(item);
    array.push(object);
  }
}
// function apiProducts(data) {
//   data.forEach((données) => {
//     const imageUrl = données.imageUrl;
//     const altTxt = données.altTxt;
//     const name = données.name;
//     const description = données.description;
//     const price = données.price;

//     const image = makeImage(imageUrl, altTxt);
//   });
// }
function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article);
}
function itemHtml(item) {
  const article = makeArticle(item);
  displayArticle(article);
  const div = makeImage(item);
  article.appendChild(div);
  console.log(article);
}

function makeArticle(item) {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = item.id;
  article.dataset.color = item.color;
  return article;
}

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
