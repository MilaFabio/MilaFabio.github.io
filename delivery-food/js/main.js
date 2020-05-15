"use strict";
//авторизация констант
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

const restaurantTitle = document.querySelector(".restaurant-title");
const rating = document.querySelector(".rating");
const minPrice = document.querySelector(".price");
const category = document.querySelector(".category");
const inputSearch = document.querySelector(".input-search");
const modalBody = document.querySelector(".modal-body");

const modalPrice = document.querySelector(".modal-pricetag");
const buttonClearCart = document.querySelector(".clear-cart");

let login = localStorage.getItem("gloDelivery");

const cart = [];

const loadCart = function () {
  if (localStorage.getItem(login)) {
    JSON.parse(localStorage.getItem(login)).forEach(function (item) {
      cart.push(item);
    });
  }
};

const saveCart = function () {
  localStorage.setItem(login, JSON.stringify(cart));
};

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

function returnMain() {
  containerPromo.classList.remove("hide");
  restaurants.classList.remove("hide");
  menu.classList.add("hide");
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
    buttonAuth.style.display = "";
    userName.style.display = "";
    buttonOut.style.display = "";
    cartButton.style.display = "";
    buttonOut.removeEventListener("click", logOut);

    checkAuth(); // проверка авторизации пользователя
    returnMain();
  }
  console.log("Авторизован:", login);
  userName.textContent = login;
  buttonAuth.style.display = "none";
  userName.style.display = "inline";
  buttonOut.style.display = "flex";
  cartButton.style.display = "flex";
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

function createCardRestaurant({
  image,
  kitchen,
  name,
  price,
  products,
  stars,
  time_of_delivery,
}) {
  // const {
  //   image,
  //   kitchen,
  //   name,
  //   price,
  //   products,
  //   stars,
  //   time_of_delivery,
  // } = restaurant;

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

function createCardGood({ id, name, description, price, image }) {
  // карточки продукто ресторана 
  //const { id, name, description, price, image } = goods;
  const card = document.createElement("div");
  card.className = "card";
  card.insertAdjacentHTML(
    "beforeend",
    `<img src="${image}" alt="${image}" class="card-image"/>
  <div class="card-text">
    <div class="card-heading">
      <h3 class="card-title card-title-reg">${name}</h3>
    </div>
    <div class="card-info">
      <div class="ingredients">${description}
      </div>
    </div>
    <div class="card-buttons">
      <button class="button button-primary button-add-cart" id="${id}">
        <span class="button-card-text">В корзину</span>
        <span class="button-cart-svg"></span>
      </button>
      <strong class="card-price card-price-bold">${price} ₽</strong>
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
      cardsMenu.textContent = '';
      containerPromo.classList.add("hide");
      restaurants.classList.add("hide");
      menu.classList.remove("hide");

      getData(`./db/${restaurant.dataset.products}`).then(function (data) {
        data.forEach(createCardGood);
      });
    } else { //если не авторизован, то вызываем модальное окно
      toggleModalAuth();
    }
  }
}

function addToCart(event) {
  const target = event.target;
  const buttonAddToCart = target.closest(".button-add-cart");
  if (buttonAddToCart) {
    const card = target.closest(".card");
    const title = card.querySelector(".card-title-reg").textContent;
    const cost = card.querySelector(".card-price").textContent;
    const id = buttonAddToCart.id;
    const food = cart.find(function (item) {
      return item.id === id;
    });
    if (food) {
      food.count += 1;
    } else {
      cart.push({
        id,
        title,
        cost,
        count: 1,
      });
    }
  }
  saveCart();
  console.log(cart);
}

function renderCart() {
  modalBody.textContent = "";
  cart.forEach(function ({ id, title, cost, count }) {
    const itemCart = `
        <div class="food-row">
            <span class="food-name">${title}</span>
            <strong class="food-price">${cost}</strong>
            <div class="food-counter">
              <button class="counter-button counter-minus" data-id=${id}>-</button>
              <span class="counter">${count}</span>
              <button class="counter-button counter-plus" data-id=${id}>+</button>
            </div>
          </div>
    `;

    modalBody.insertAdjacentHTML("afterbegin", itemCart);
  });

  const totalPrice = cart.reduce(function (result, item) {
    return result + parseFloat(item.cost) * item.count;
  }, 0);

  modalPrice.textContent = totalPrice + "₽";
}

function changeCount(event) {
  const target = event.target;

  if (target.classList.contains("counter-button")) {
    const food = cart.find(function (item) {
      return item.id === target.dataset.id;
    });

    if (target.classList.contains("counter-minus")) {
      food.count--;
      if (food.count === 0) {
        cart.splice(cart.indexOf(food), 1);
      }
    }
    if (target.classList.contains("counter-plus")) food.count++;
    renderCart();
  }
  saveCart();
}

function init() {
  getData("./db/partners.json").then((data) => {
    data.forEach(createCardRestaurant);
  });

  checkAuth();

  cartButton.addEventListener("click", renderCart);
  cartButton.addEventListener("click", toggleModal);

  buttonClearCart.addEventListener("click", () => {
    cart.length = 0;
    renderCart();
    localStorage.removeItem('cart');
  });

  modalBody.addEventListener("click", changeCount);
  cardsMenu.addEventListener("click", addToCart);
  close.addEventListener("click", toggleModal); // закрытие окна авторизации
  cardsRestaurants.addEventListener("click", openGoods); //перейти в определенный ресторан
  logo.addEventListener("click", function () {
    containerPromo.classList.remove("hide");
    restaurants.classList.remove("hide");
    menu.classList.add("hide");
  });

  inputSearch.addEventListener('keydown', function(event) {

		if (event.keyCode === 13) {
			const target = event.target;
			
			const value = target.value.toLowerCase().trim();

			target.value = '';

			if (!value || value.length < 3) {
				target.style.backgroundColor = 'tomato';
				setTimeout(function(){
					target.style.backgroundColor = '';
				}, 2000);
				return;
			}

			const goods = [];
			
			getData('./db/partners.json')
				.then(function(data) {
					
					const products = data.map(function(item){
						return item.products;
					});


					products.forEach(function(product){
						getData(`./db/${product}`)
							.then(function(data){
								
							goods.push(...data);

							const searchGoods = goods.filter(function(item) {
							return item.name.toLowerCase().includes(value)
							})

							console.log(searchGoods);
								
							cardsMenu.textContent = '';

								containerPromo.classList.add('hide');
								restaurants.classList.add('hide');
								menu.classList.remove('hide');

								restaurantTitle.textContent = 'Результат поиска';
								rating.textContent = '';
								minPrice.textContent = '';
								category.textContent = '';

								return searchGoods;
							})
							.then(function(data){
								data.forEach(createCardGood);
							})
					})
					
				});
		}
		
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
