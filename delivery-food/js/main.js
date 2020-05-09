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

const getData = async function (url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, 
    статус ошибки ${response.status}`);
  }
  return await response.json();
};

const valid = function (str) {
  const nameReg = /^[A-Za-z ][A-Za-z0-9- \.]{1,20}$/;
  if (!nameReg.test(str)) {
    if (str.length > 20) {
      console.log("длинная");
    }
  }
  return nameReg.test(str);
};

const toggleModal = function () {
  modal.classList.toggle("is-open");
};

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

    if (valid(loginInput.value)) {
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

function createCardRestaurant(restaurant) {
  const {
    image,
    kitchen,
    name,
    price,
    products,
    stars,
    time_of_delivery,
  } = restaurant;

  const card = `
  <a class="card card-restaurant" data-products="${products}">
  <img src="${image}" alt="${name}" class="card-image"/>
  <div class="card-text">
    <div class="card-heading">
      <h3 class="card-title">${name}</h3>
      <span class="card-tag tag">${time_of_delivery} мин</span>
    </div>
    <div class="card-info">
      <div class="rating">
        ${stars}
      </div>
      <div class="price">От ${price} ₽</div>
      <div class="category">${kitchen}</div>
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

      getData(`./db/${restaurant.dataset.products}`).then(function (data) {
        data.forEach(createCardGood);
      });

      createCardGood();
    } else {
      toggleModalAuth();
    }
  }
}

function init() {
  getData("./db/partners.json").then(function (data) {
    data.forEach(createCardRestaurant);
  });

  checkAuth();

  cartButton.addEventListener("click", toggleModal);
  close.addEventListener("click", toggleModal);
  cardsRestaurants.addEventListener("click", openGoods);
  logo.addEventListener("click", function () {
    containerPromo.classList.remove("hide");
    restaurants.classList.remove("hide");
    menu.classList.add("hide");
  });

  new Swiper(".container-promo", {
    loop: true,
    autoplay: {
      delay: 3000,
    },
    slidePerView: 1,
    sliderPerColumn: 1,
  });
}

init();
//формат текста shift+alt+F
