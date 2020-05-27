//menu
const leftmenu = document.querySelector(".left-menu");
const hamburger = document.querySelector(".hamburger");
//const main = document.querySelector('main');
const tvShowsList = document.querySelector(".tv-shows__list");
const modal = document.querySelector(".modal");


const API_KEY = '378351d23fe83be06463f1c187a12b01';
const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2',
    DEFAULT_IMG = 'img/no-poster.jpg';

// открытие и закрытие меню
hamburger.addEventListener("click", () => {
    leftmenu.classList.toggle("openMenu"); //toggle добавляет если класса нет и убират если есть
    hamburger.classList.toggle("open");
});

// document.body.addEventListener("click", (event) => {
//     const target = event.target;
//     if (!target.closest(".left-menu")) {
//         leftmenu.classList.toggle("openMenu");
//         hamburger.classList.toggle("open");
//     }
// });

document.addEventListener("click", (event) => {
    const target = event.target;
    if (!target.closest(".left-menu")) {
        leftmenu.classList.remove("openMenu");
        hamburger.classList.remove("open");
    }
});

leftmenu.addEventListener("click", (event) => {
    const target = event.target;
    const dropdown = target.closest(".dropdown");
    if (dropdown) {
        dropdown.classList.toggle("active");
        leftmenu.classList.add("openMenu");
        hamburger.classList.add("open");
    }
});

//изменить постер при наведении мышки
/*
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
*/

//открытие модального окна
tvShowsList.addEventListener("click", (event) => {
    event.preventDefault();
    const target = event.target;
    const card = target.closest(".tv-card");
    if (card) {
        document.body.style.overflow = "hidden";
        modal.classList.remove("hide");
        modal.style.background = "rgba(28, 174, 218, 0.8)";
    }
});

//закрытие модального окна
modal.addEventListener("click", (event) => {
    if (
        event.target.closest(".cross") ||
        event.target.classList.contains("modal")
    ) {
        document.body.style.overflow = "";
        modal.classList.add("hide");
    }
});

//смена карточки
const changeImage = (event) => {
    const card = event.target.closest(".tv-shows__item");

    if (card) {
        const img = card.querySelector(".tv-card__img");
        const changeImg = img.dataset.backdrop;
        if (changeImg) {
            // img.dataset.backdrop = img.src;
            // img.src = changeImg;
            [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src];
        }
    }
};

tvShowsList.addEventListener("mouseover", changeImage);
tvShowsList.addEventListener("mouseout", changeImage);

class DBService {
    async getData(url) {
        const res = await fetch(url);
        if (res.ok) {
            //console.log('Полученные данные: ', res.json());
            return res.json();

        } else {
            throw new Error(`не удалось получить данные по адресу ${url}`);
        }
    };

    getTestData() {
        return this.getData("test.json");
    };
};

const renderCard = (response) => {
    console.log('response: ', response);
    response.results.forEach(item => {
        const {
            backdrop_path: backdrop,
            name: title,
            poster_path: poster,
            vote_average: vote
        } = item;
        const posterIMG = poster ? IMG_URL + poster : DEFAULT_IMG;
        const backdropIMG = backdrop ? IMG_URL + backdrop : '';
        const voteElem = vote ? `<span class="tv-card__vote">${vote}</span>` : '';
        //DEFAULT_IMG
        const card = document.createElement('li'); // создаем элемент списка
        card.className = 'tv-shows__item';
        //card.classList.add('tv-shows__item');
        card.innerHTML = `
        <a href="#" class="tv-card">
                            ${voteElem}
                            <img class="tv-card__img" src="${posterIMG}" 
                            data-backdrop="${backdropIMG}" 
                            alt="${title}">
                            <h4 class="tv-card__head">${title}</h4>
                        </a>
        `;

        tvShowsList.prepend(card);
    });

};

new DBService().getTestData().then(renderCard);