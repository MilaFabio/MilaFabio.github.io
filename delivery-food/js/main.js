const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
const cardsRestaurants = document.querySelector(".cards-restaurants");
const containerPromo = document.querySelector(".container-promo");
const restaurants = document.querySelector(".restaurants");
const menu = document.querySelector(".menu");
const logo = document.querySelector(".logo");
const cardsMenu = document.querySelector(".cards-menu");

let login = localStorage.getItem("gloDelivery");

function toggleModal() {
  modal.classList.toggle("is-open");
}

/** очищаем поля ввода */

function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");
  loginInput.style.borderColor = "";
}

function autorized() {
  function logOut() {
    login = null;
    localStorage.removeItem("gloDelivery"); //очистить хранение логина
    checkAuth(); // проверка авторизации пользователя
    buttonAuth.style.display = "";
    userName.style.display = "";
    buttonOut.style.display = "";
    buttonOut.removeEventListener("click", logOut);
  }
  console.log("Авторизован:", login);
  userName.textContent = login;
  buttonAuth.style.display = "none";
  userName.style.display = "inline";
  buttonOut.style.display = "block";
  buttonOut.addEventListener("click", logOut);
}

function notAutorized() {
  console.log("Не авторизован:");

  function logIn(event) {
    event.preventDefault(); // отменяем перезагрузку страницы

    if (loginInput.value) {
      login = loginInput.value; // получаем введенный логин и сохраняем в перменную
      localStorage.setItem("gloDelivery", login); //добавить свойство со значением для хранения логина
      console.log("логин: ", loginInput.value);
      toggleModalAuth(); // очищаем поля ввода
      buttonAuth.removeEventListener("click", toggleModalAuth);
      closeAuth.removeEventListener("click", toggleModalAuth);
      logInForm.removeEventListener("submit", logIn);
      logInForm.reset(); //очистить поле логин
      checkAuth(); // проверка авторизации пользователя
    } else {
      loginInput.style.borderColor = "red";
    }
  }
  buttonAuth.addEventListener("click", toggleModalAuth);
  closeAuth.addEventListener("click", toggleModalAuth);
  logInForm.addEventListener("submit", logIn);
}

/*** проверка авторизации пользователя */
function checkAuth() {
  if (login) {
    autorized();
  } else {
    notAutorized();
  }
}

function createCardRestaurant() {
  const card = `
  <a class="card card-restaurant">
  <img src="img/tanuki/preview.jpg" alt="image" class="card-image"/>
  <div class="card-text">
    <div class="card-heading">
      <h3 class="card-title">Тануки</h3>
      <span class="card-tag tag">60 мин</span>
    </div>
    <!-- /.card-heading -->
    <div class="card-info">
      <div class="rating">
        4.5
      </div>
      <div class="price">От 1 200 ₽</div>
      <div class="category">Суши, роллы</div>
    </div>
  </div>
</a>
  `;

  cardsRestaurants.insertAdjacentHTML("beforeend", card);
}

function createCardGood() {
  const card = document.createElement("div");
  card.className = "card";
  card.insertAdjacentHTML(
    "beforeend",
    `<img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
  <div class="card-text">
    <div class="card-heading">
      <h3 class="card-title card-title-reg">Пицца Классика</h3>
    </div>
    <div class="card-info">
      <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
        грибы.
      </div>
    </div>
    <div class="card-buttons">
      <button class="button button-primary button-add-cart">
        <span class="button-card-text">В корзину</span>
        <span class="button-cart-svg"></span>
      </button>
      <strong class="card-price-bold">510 ₽</strong>
    </div>
  </div>`
  );
  cardsMenu.insertAdjacentElement("beforeend", card);
}

function openGoods(event) {
  const target = event.target;
  const restaurant = target.closest(".card-restaurant");
  if (restaurant) {
    if (login) {
      cardsMenu.textContent = "";
      containerPromo.classList.add("hide");
      restaurants.classList.add("hide");
      menu.classList.remove("hide");

      createCardGood();
      createCardGood();
      createCardGood();
      createCardGood();
    } else {
      toggleModalAuth();
    }
  }
}

checkAuth();

createCardRestaurant();
createCardRestaurant();
createCardRestaurant();
createCardRestaurant();

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);
cardsRestaurants.addEventListener("click", openGoods);
logo.addEventListener("click", function () {
  containerPromo.classList.remove("hide");
  restaurants.classList.remove("hide");
  menu.classList.add("hide");
});

//формат текста shift+alt+F
