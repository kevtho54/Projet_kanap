/* ----------recuperation de l'api -----------*/

fetch("http://localhost:3000/api/products")
  .then((products) => products.json())
  .then((data) => apiProducts(data));

/* ---------- récupération des données kanap de l'api ---------- */
function apiProducts(data) {
  data.forEach((kanap) => {
    /* console.log("canape", kanap);*/
    const id = kanap._id;
    const imageUrl = kanap.imageUrl;
    const altTxt = kanap.altTxt;
    const name = kanap.name;
    const description = kanap.description;

    /* ---------- création de "a, article, img, p" ----------*/
    const anchor = makeAnchor(id);
    const article = makeArticle();
    const image = makeImage(imageUrl, altTxt);
    const h3 = makeH3(name);
    const p = makeP(description);

    /* -------------- Ajout des enfants "img h3 p" à l'article ----------- */
    article.appendChild(image);
    article.appendChild(h3);
    article.appendChild(p);

    /* ----- Ajout de l'enfant "article" à anchor -----*/
    appendChild(anchor, article);
  });
}
/* ---------- Création du premier anchor ---------- */
function makeAnchor(id) {
  let anchor = document.createElement("a");
  anchor.href = "./product.html?id=" + id;
  return anchor;
}
/* ----- Ajout de anchor et article a #items -----*/
function appendChild(anchor, article) {
  document.querySelector("#items");
  items.appendChild(anchor);
  anchor.appendChild(article);
}
/* ----- fabrication de l'article -----*/
function makeArticle() {
  const article = document.createElement("article");
  /*console.log(article);*/
  return article;
}

/* ----- fabrication de la première image ------ */
function makeImage(imageUrl, alt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = alt;
  return image;
}

/* ------ fabrication du h3 -----*/
function makeH3(name) {
  const h3 = document.createElement("h3");
  h3.textContent = name;
  h3.classList.add("productName");
  return h3;
}
/* ----- fabrication du p -----*/
function makeP(description) {
  const p = document.createElement("p");
  p.textContent = description;
  p.classList.add("productDescription");
  return p;
}
