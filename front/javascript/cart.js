/* ---------- innitialisation du tableau ----------*/
let array = [];

/* ---------- récuperation des données dans le localStorage ----------- */
dataStorage();
totalQuantity();
const btnOrder = document.querySelector("#order");
btnOrder.addEventListener("click", (e) => submitForm(e));
array.forEach((item) => item); // Je parcours mon tableau

function dataStorage() {
  const itemCount = localStorage.length;
  const totalPrice = document.querySelector("#totalPrice");
  totalPrice.textContent = 0;
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

        /* ---------- J'utilise addEventListenner pour modifié la quantité et les prix quand j'utilise les flèches ----------*/
        input.addEventListener(
          "change",
          () => newQuantity(localObject.id, input.value, localObject, product) // j'appelle la fonction "newQuantity" je lui ajout l'id, la valeur de l'input et le prix de l'api
        );
        // /* ---------- ajout des éléments enfants a la div settings ----------*/
        settings.appendChild(settingsQuantity);
        settings.appendChild(settingsP);
        settings.appendChild(input);

        /* ---------- boutton supprimer ----------*/
        const settingDelete = document.createElement("div"); // création de l'element "div"
        settingDelete.classList.add("cart__item__content__settings__delete"); // ajout de la class pour cette div
        settingDelete.addEventListener("click", () =>
          deletekanap(localObject, product)
        ); // permet de supprimé le canapé cliqué. (localObject permet de chercher l'id du canapé en question)

        const deleteP = document.createElement("p"); // création de l'element "p"
        deleteP.classList.add("deleteItem"); //ajout de la class pour l'element "p"
        deleteP.textContent = "Supprimer"; // ajout du text pour l'element "p"

        settingDelete.appendChild(deleteP); // ajout de l'enfant "p" dans la div

        /* ---------- ajout des enfants a la div principal "description" ----------*/
        cart.appendChild(settings); // ajout du qté + input a la div principal, je les mets en bas du document car si je les met en dessous de la div cart, le navigateur arrive pas a les executés car il ne les trouve pas.
        cart.appendChild(settingDelete); // ajout du boutton suprimé a la div principal
        article.appendChild(cart); // après avoir ajouter les enfants a cart, j'ajoute cart a l'element article

        totalPrice.textContent =
          parseInt(product.price) * localObject.quantity +
          parseInt(totalPrice.textContent);
      });
  }
}
/* ------ Supression des données du kanap voulant être supprimé ---------- */
function deletekanap(localObject, product) {
  const canapDelete = array.findIndex(
    (item) => item.id === localObject.id && item.color === localObject.color
  ); //utilisation de findIndex pour que les données de l'objet complet sois supprimés du tableau
  if (canapDelete >= 0) {
    array.splice(canapDelete, 1); // splice permet de supprimé un element du tableau, ici il retire un element de la variable

    /* ----- J'appelle les fonctions pour que les données de ses fonctions sois supprimé également ------ */
    saveLocalStorage(localObject);
    totalQuantity();
    deleteKanapFromLs(localObject);
    deleteKanapFromPage(localObject);
    newTotalPrice(product, localObject);
  }
}

/* ---------- fonction permet de modifier le prix total après avoir modifier la quantité avec les fleches ----------*/
function newTotalPrice(product, localObject) {
  let tPrice = 0; // je mets les totaux à zéro pour ensuite pouvoir additionner
  if (localStorage.length == 0)
    document.querySelector("#totalPrice").textContent = 0;
  for (let i = 0; i < localStorage.length; i++) {
    fetch(
      "http://localhost:3000/api/products/" +
        JSON.parse(localStorage.getItem(localStorage.key(i))).id
    )
      .then((response) => response.json())
      .then((product) => {
        let currentObject = JSON.parse(
          localStorage.getItem(localStorage.key(i))
        ); // Je fais un fetch de l'api + le localStorage pour pouvoir mettre a jours dinamiquement le prix et la quantité
        tPrice = parseInt(currentObject.quantity) * product.price + tPrice; // je prend la quantité de mon LS que je multiplie par le prix du produit + tprice qui est a 0
        document.querySelector("#totalPrice").textContent = tPrice; //je selectionne le prix total
      });
  }
}
/* ---------- Calcule de la quantité total ----------*/
function totalQuantity() {
  const quantity = document.querySelector("#totalQuantity"); // je selectionne la quantité total
  quantity.textContent = 0; //je mets les totaux à zero pour ensuite pouvoir additionner
  const total = array.reduce(
    (total, localObject) => total + localObject.quantity,
    0
  ); //reduce permet d'accumuler  au fur et a mesure des appelle ensuite je calcule le total de l'array + la quantité du local storage
  quantity.textContent = total; // j'affiche la quantité total
}

/* ------- nouvelle quantité en utilisant les flèches de l'input ----------*/
function newQuantity(id, newValue, localObject, product) {
  const newLocalObject = array.find((localObject) => localObject.id === id); // je renvois la valeur du kanap trouver avec l'id correspondant
  newLocalObject.quantity = Number(newValue); // cette valeur deviens la nouvelle valeur du addeventlistener de l'input

  /* ----- J'appelle les fonction pour que celle si s'ajoute à newquantity --------*/
  saveLocalStorage(localObject);
  totalQuantity();
  newTotalPrice(product, localObject);
}
/* ------ suppression du kanap dans le local Storage -----------*/
function deleteKanapFromLs(localObject) {
  const key = localObject.id + localObject.color; //je selectionne l'id et la couleur correspondante
  localStorage.removeItem(key); // je supprime le canapé selectionné du local storage
}
/*---------- Suppression du kanap coté client ( visuel) ----------*/
function deleteKanapFromPage(localObject) {
  const kanapDelete = document.querySelector(
    `article[data-id="${localObject.id}"][data-color="${localObject.color}"]`
  ); // je selection le data id et le color id pour supprimé uniquement le kanap selectionné
  kanapDelete.remove(); // J'utilise remove sur la variable pour supprimé le kanap selectionné
}
/* ----------- sauvegarde dans le local storage en modifiant la quantité  ---------*/
function saveLocalStorage(localObject) {
  const saveStorage = JSON.stringify(localObject); //je passe mon localstorage en string
  localStorage.setItem(localObject.id + localObject.color, saveStorage); // je sauvegarde mon kanap selectionné dans le local storage
}

/*----------- formulaire ----------*/
function submitForm(e) {
  // const form = document.querySelector(".cart__order__form");// je selectionne mon formulaire
  e.preventDefault(); // permet de ne pas rafraichir la page a chaque fois qu'on click sur le button
  if (array.length === 0) {
    alert("Merci de selectionné un article au panier"); //envois une alert si il n'y a rien dans le panier
    return; // n'exectute pas la suite tant qu'il n'y a pas de produit au panier
  }
  /* ----- test que les fonction remplisse les condition sinon return pour ne pas executé la fonction suivante */
  if (firstNameControle()) return;
  if (lastNameControle()) return;
  if (addressControle()) return;
  if (cityControle()) return;
  if (emailControle()) return;
  /* ------- fin des test -------*/

  const Body = formBody();
  /* ---------- Fetch pour renvoyer les donné du formulaire dans l'api ----------*/
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(Body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const orderId = data.orderId;
      window.location.href = "confirmation.html" + "?orderId=" + orderId;
    })
    .catch((err) => console.error(err)); // renvois une erreur si il y a un probleme
}
/* ------- Champs du formulaire ----------*/
function formBody() {
  let listProduct = []; //création d'un tableau pour l'id product
  for (let i = 0; i < localStorage.length; i++) {
    listProduct.push(JSON.parse(localStorage.getItem(localStorage.key(i))).id);
  } //Récuperation des données dans le local storage

  const form = document.querySelector(".cart__order__form"); // Je selectionne le formulaire
  /* ---------- Je recupère les valeurs des champs du formulaire ----------*/
  const firstName = form.elements.firstName.value;
  const lastName = form.elements.lastName.value;
  const address = form.elements.address.value;
  const city = form.elements.city.value;
  const email = form.elements.email.value;
  const Body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: listProduct,
  }; // Pour product je lui inject l'id recuperé dans le local storage
  return Body;
  /* ---------- Fin de la récuperation des valeurs ----------*/
}

/* --------------------Controle du formulaire avec des regex -------------------- */

/* ---------- Controle du prénom ---------- */
const firstName = document.querySelector("#firstName"); //  Je selectionne l'input
firstName.addEventListener("keydown", () => firstNameControle()); // J'utilise keydown pour que le message d'erreur s'affiche directement si un chiffre est taper au lieu d'une lettre pour le nom par exemple

function firstNameControle() {
  const firstName = document.querySelector("#firstName").value; // Je recupère la valeur du champ "prénom"

  const regex = new RegExp("^[a-zA-Z àâäéèêëïîôöùûüç,.'-]+$"); // Je crée un regex qui va controler que le champs et bon
  if (regex.test(firstName) === false) {
    document.querySelector("#firstNameErrorMsg").innerHTML =
      "Veuillez entrée un prénom valide"; // J' affiche un message dans l'html si il y a une erreur
    return true; // Je test le champ. Si il y a une erreur, il me retourne true car il est vrai que le champ n'est pas bon
  }

  document.querySelector("#firstNameErrorMsg").innerHTML = " "; // aucun message si tout est bon
  return false; // si tout est ok il me retourne false car c'est faux, le champ na pas de problème.
}

/* ---------- Controle du Nom ---------- */
const lastName = document.querySelector("#lastName"); //  Je selectionne l'input
lastName.addEventListener("keydown", () => lastNameControle()); // J'utilise keydown pour que le message d'erreur s'affiche directement si un chiffre est taper au lieu d'une lettre pour le nom par exemple

function lastNameControle() {
  const lastName = document.querySelector("#lastName").value; //Je recupère la valeur du champ "prénom"

  const regex = new RegExp("^[a-zA-Z àâäéèêëïîôöùûüç,.'-]+$"); //Je crée un regex qui va controler que le champs et bon
  if (regex.test(lastName) === false) {
    document.querySelector("#lastNameErrorMsg").innerHTML =
      "Veuillez entrée un nom valide"; // J' affiche un message dans l'html si il y a une erreur
    return true; //Je test le champ. Si il y a une erreur, il me retourne true car il est vrai que le champ n'est pas bon
  }

  document.querySelector("#lastNameErrorMsg").innerHTML = " "; // aucun message si tout est bon
  return false; // si tout est ok il me retourne false car c'est faux, le champ na pas de problème.
}

/* ---------- controle de l'adresse -----*/
const address = document.querySelector("#address"); //  Je selectionne l'input
address.addEventListener("keydown", () => addressControle()); // J'utilise keydown pour que le message d'erreur s'affiche directement si un chiffre est taper au lieu d'une lettre pour le nom par exemple

function addressControle() {
  const address = document.querySelector("#address").value;

  const regex = new RegExp("^[a-zA-Z0-9 àâäéèêëïîôöùûüç,.'-]+$");
  if (regex.test(address) === false) {
    document.querySelector("#addressErrorMsg").innerHTML =
      "Veuillez entrée une adresse valide "; // J' affiche un message dans l'html si il y a une erreur
    return true;
  }

  document.querySelector("#addressErrorMsg").innerHTML = " "; // aucun message si tout est bon
  return false;
}
/* ---------- controle de la ville ----------*/
const city = document.querySelector("#city"); //  Je selectionne l'input
city.addEventListener("keydown", () => cityControle()); // J'utilise keydown pour que le message d'erreur s'affiche directement si un chiffre est taper au lieu d'une lettre pour le nom par exemple

function cityControle() {
  const city = document.querySelector("#city").value;

  const regex = new RegExp("^[a-zA-Z àâäéèêëïîôöùûüç,.'-]+$");
  if (regex.test(city) === false) {
    document.querySelector("#cityErrorMsg").innerHTML =
      "Veuillez entrée une ville valide "; // J' affiche un message dans l'html si il y a une erreur
    return true;
  }

  document.querySelector("#cityErrorMsg").innerHTML = " ";
  return false;
}
/* ---------- Controle de l'email -----------*/
const email = document.querySelector("#email"); //  Je selectionne l'input
email.addEventListener("keydown", () => emailControle()); // J'utilise keydown pour que le message d'erreur s'affiche directement si un chiffre est taper au lieu d'une lettre pour le nom par exemple

function emailControle() {
  const email = document.querySelector("#email").value; // Je selectionne la valeur de l'id "email"

  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // Je crée une regex afin de controler que l'email sois valide
  if (regex.test(email) === false) {
    document.querySelector("#emailErrorMsg").innerHTML =
      "Veuillez entrée un email valide "; // J' affiche un message dans l'html si il y a une erreur
    return true;
  } // Je test la valeur inscrite dans l'id "email" si il est vide ou comporte une erreur,je retourne true car il est vrai que le mail est invalide et une alert apparait.

  document.querySelector("#emailErrorMsg").innerHTML = " ";
  return false; // Si il n'y a pas d'erreur je retourne false car c'est faux l'email est correct.
}
