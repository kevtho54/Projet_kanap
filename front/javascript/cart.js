/* ---------- innitialisation du tableau ----------*/
let array = [];

/* ---------- récuperation des données dans le localStorage ----------- */
dataStorage();
totalQuantity();

array.forEach((item) => item);

function dataStorage() {
  const itemCount = localStorage.length;
  // let totalPrice = document.querySelector("#totalPrice"); // Je selectionne l'id pour y inséré le prix total
  // const totalQuantity = document.querySelector("#totalQuantity"); // je fais de même pour la quantité

  for (let i = 0; i < itemCount; i++) {
    // pour chacun de mes éléments du localStorage
    let item = localStorage.getItem(localStorage.key(i)); // je récupère l'item correspondant
    let localObject = JSON.parse(item); // je vais avoir besoin de la quantité, elle est dans le localStorage et aussi de l'ID pour aller récupérer le prix via l'API
    array.push(localObject);
    /* ---------- récupération du prix via l'api ---------- */
    const apiPrice = fetch(
      "http://localhost:3000/api/products/" + localObject.id
    )
      .then((response) => response.json())
      .then((product) => {
        /* ---------- article ----------*/
        let article = document.createElement("article"); //création de l'element article
        document.querySelector("#cart__items").appendChild(article); //selection de la div ou y inseré l'article +ajout de article a cette div
        article.classList.add("cart__item"); //ajout d'une class a l'article
        article.dataset.id = localObject.id; // recuperation de l'id depuis le localStorage pour l'injecté dans le dataset.id
        article.dataset.color = localObject.color; // même chose que pour l'id mais avec la couleur

        /* ---------- création de l'image ---------- */
        const div = document.createElement("div"); //creation d'une div pour l'image
        div.classList.add("cart__item__img"); //création de la class pour la div image
        article.appendChild(div); // ajout de la div image en enfant de article

        const image = document.createElement("img"); //Je crée l'element img
        image.classList.add("cart__item__img"); //création de la class pour l'img
        image.src = product.imageUrl; // Je recupère la source de l'image via l'api avec product
        image.alt = product.altTxt; // Je recupère le alt depuis l'api avec product
        div.appendChild(image); // j'ajoute l'image a la div crée just au dessus

        /* ---------- Création de la div description ----------*/
        const cart = document.createElement("div"); //création de la div cart item content

        cart.classList.add("cart__item__content"); //ajout de la class a cette div

        const description = document.createElement("div"); // création d'une div qui sera dans "cart item content description"
        description.classList.add("cart__item__content__description"); //création d'une class pour cette div

        const h2 = document.createElement("h2"); //creation du "h2"
        h2.textContent = product.name; // ajout du nom du produit en allant le chercher dans l'api avec product

        const p = document.createElement("p"); //creation de l'element "p" pour y ajouter la couleur
        p.textContent = localObject.color; // récuperation de la couleur dans le localStorage avec "localObject"

        const p2 = document.createElement("p"); // création du second "p" pour y inseré le prix
        p2.textContent = product.price + "€"; // récuperation du prix depuis l'api
        console.log(p2);
        /* ---------- ajout des element enfants à la div description ----------*/
        description.appendChild(h2);
        description.appendChild(p);
        description.appendChild(p2);

        /* ----------- Ajout de la div description à la div principal "cart item content" ----------*/
        cart.appendChild(description);

        /*---------- création de la div setting "qté + input" ----------*/
        const settings = document.createElement("div"); //création de l'element "div"
        settings.classList.add("cart__item__content__settings"); //ajout de la class "cart item content setting"

        const settingsQuantity = document.createElement("div"); //creation de l'element div
        settingsQuantity.classList.add(
          "cart__item__content__settings__quantity"
        ); //ajout de la class pour la div

        const settingsP = document.createElement("p"); // creation de l'element "p"
        settingsP.textContent = "Qté :"; // ajout du text pour l'element "p"

        const input = document.createElement("input"); // création de l'input
        input.type = "number"; // selection du type de l'input
        input.classList.add("itemQuantity"); // création de la class pour l'input
        input.name = "itemQuantity"; // ajout du nom de l'input
        input.min = "1"; // ajout de la valeur minimum de selection pour l'input
        input.max = "100"; // ajout de la valeur maximum de l'input
        input.value = localObject.quantity; // dans value nous devont y mettre la quantité donc je vais chercher la quantité dans le local storage avec local object

        input.addEventListener("change", () =>
          newQuantity(localObject.id, input.value, localObject, product)
        );
        /* ---------- ajout des éléments enfants a la div settings ----------*/
        settings.appendChild(settingsQuantity);
        settings.appendChild(settingsP);
        settings.appendChild(input);

        /* ---------- boutton supprimer ----------*/
        const settingDelete = document.createElement("div"); // création de l'element "div"
        settingDelete.classList.add("cart__item__content__settings__delete"); // ajout de la class pour cette div
        settingDelete.addEventListener("click", deleteItem);
        const deleteP = document.createElement("p"); // création de l'element "p"
        deleteP.classList.add("deleteItem"); //ajout de la class pour l'element "p"
        deleteP.textContent = "Supprimer"; // ajout du text pour l'element "p"

        settingDelete.appendChild(deleteP); // ajout de l'enfant "p" dans la div
        /* ---------- ajout des enfants a la div principal "description" ----------*/
        cart.appendChild(settings); // ajout du qté + input a la div principal, je les mets en bas du document car si je les met en dessous de la div cart, le navigateur arrive pas a les executés car il ne les trouve pas.
        cart.appendChild(settingDelete); // ajout du boutton suprimé a la div principal
        article.appendChild(cart); // après avoir ajouter les enfants a cart, j'ajoute cart a l'element article

        /* ---------- Calcule du prix total des articles dans le panier --------- */

        // /* ---------- Calcule de la quantité total  dans le panier ----------*/

        // // j'incrémente le total, la quantité est dans le localObject
        // totalQuantity.textContent =
        //   parseInt(localObject.quantity) + parseInt(totalQuantity.textContent);
        // });
        // totalPrice.textContent =
        //   parseInt(product.price) * localObject.quantity +
        //   parseInt(totalPrice.textContent);

        newTotalPrice(product, localObject);
      });
  }
}
function newTotalPrice(product, localObject) {
  const totalPrice = document.querySelector("#totalPrice");
  totalPrice.textContent = 0; // je mets les totaux à zéro pour ensuite pouvoir additionner

  const newPrice = product.price * localObject.quantity;
  totalPrice.textContent = newPrice;
}

function totalQuantity() {
  const quantity = document.querySelector("#totalQuantity");
  quantity.textContent = 0;
  const total = array.reduce(
    (total, localObject) => total + localObject.quantity,
    0
  );
  quantity.textContent = total;
}

function newQuantity(id, newValue, localObject, product) {
  const newLocalObject = array.find((localObject) => localObject.id === id);
  newLocalObject.quantity = Number(newValue);
  saveLocalStorage(localObject);
  totalQuantity();
  newTotalPrice(product, localObject);
}

function saveLocalStorage(localObject) {
  const saveStorage = JSON.stringify(localObject);
  localStorage.setItem(localObject.id + localObject.color, saveStorage);
  console.log("data", saveStorage);
}
