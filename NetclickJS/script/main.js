//menu
const leftmenu = document.querySelector(".left-menu");
const hamburger = document.querySelector(".hamburger");
const main = document.querySelector('main');


// открытие и закрытие меню
hamburger.addEventListener("click", () => {
    leftmenu.classList.toggle("openMenu");
    hamburger.classList.toggle("open");
});

document.body.addEventListener("click", (event) => {
    const target = event.target;
    if (!target.closest(".left-menu")) {
        leftmenu.classList.toggle("openMenu");
        hamburger.classList.toggle("open");
    }
});

leftmenu.addEventListener("click", (event) => {
    const target = event.target;
    const dropdown = target.closest(".dropdown");
    if (dropdown) {
        dropdown.classList.toggle('active');
        leftmenu.classList.add('openMenu');
        hamburger.classList.add('open');
    }
});


//изменить постер при наведении мышки
let imageSrc, imageBackdrop;
main.onmouseover = main.onmouseout = handler;

function handler(event) {

    const target = event.target;
    const tvCardImg = target.closest('.tv-card__img');
    if (tvCardImg && event.type == 'mouseover') {
        imageSrc = tvCardImg.src;
        imageBackdrop = tvCardImg.dataset.backdrop;
        tvCardImg.src = imageBackdrop;
    } else if (tvCardImg && event.type == 'mouseout') {
        tvCardImg.src = imageSrc;
        tvCardImg.dataset.backdrop = imageBackdrop;

    }
}