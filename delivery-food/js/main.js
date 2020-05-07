const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");

let login = localStorage.getItem('gloDelivery');

/** очищаем поля ввода */

function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");
}

function autorized() {
  function logOut() {
    login = null;
    localStorage.removeItem('gloDelivery'); //очистить хранение логина
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
    login = loginInput.value; // получаем введенный логин и сохраняем в перменную
    localStorage.setItem('gloDelivery', login); //добавить свойство со значением для хранения логина
    console.log("логин: ",loginInput.value);
    toggleModalAuth(); // очищаем поля ввода


      if (loginInput.value == "") {
      console.log('пусто поле');
      
      loginInput.style.borderColor = "red";
      logInForm.addEventListener("submit", logIn);
  
    } else {
      buttonAuth.removeEventListener("click", toggleModalAuth);
      closeAuth.removeEventListener("click", toggleModalAuth);
      logInForm.removeEventListener("submit", logIn);
    }


    
    logInForm.reset(); //очистить поле логин
    checkAuth(); // проверка авторизации пользователя
  }
  buttonAuth.addEventListener("click", toggleModalAuth);
  closeAuth.addEventListener("click", toggleModalAuth);
  logInForm.addEventListener("submit", logIn);
}

/*** проверка авторизации пользователя */
function checkAuth() {
  if (login != '') {
    autorized();
  } else {    
      notAutorized();    
  }
}

checkAuth();
