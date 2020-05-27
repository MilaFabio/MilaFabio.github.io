const leftMenu = document.querySelector('.left-menu'),
    hamburger = document.querySelector('.hamburger'),
    showsList = document.querySelector('.tv-shows__list'),
    modal = document.querySelector('.modal');

const API_KEY = '378351d23fe83be06463f1c187a12b01';
const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2',
    DEFAULT_IMG = './img/no-poster.jpg';

hamburger.addEventListener('click', () => {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
});

document.body.addEventListener('click', ({ target }) => {
    if (!target.closest('.left-menu')) {
        leftMenu.classList.remove('openMenu')
        hamburger.classList.remove('open');
    }
});

leftMenu.addEventListener('click', event => {
    const target = event.target;
    const dropdown = target.closest('.dropdown');

    if (dropdown) {
        dropdown.classList.toggle(('active'));
        leftMenu.classList.add('openMenu');
        hamburger.classList.add('open');
    }
});

const showCardBackdrop = ({ target }) => {
    const tvCard = target.closest('.tv-card');

    if (!tvCard) return;

    const image = tvCard.querySelector('.tv-card__img');
    const backdropLink = image.dataset.backdrop;

    if (backdropLink) {
        [image.src, image.dataset.backdrop] = [backdropLink, image.src];
        image.classList.toggle('tv-card__img_back');
    }
}

showsList.addEventListener('mouseover', showCardBackdrop, false);
showsList.addEventListener('mouseout', showCardBackdrop, false);

showsList.addEventListener('click', e => {
    e.preventDefault();

    const { target } = e;
    const tvCard = target.closest('.tv-card');

    if (tvCard) {
        document.body.style.overflow = 'hidden';
        modal.classList.remove('hide');
    }
}, false);

modal.addEventListener('click', ({ target }) => {
    const isModal = target.classList.contains('modal'),
        isCross = target.closest('.cross');

    if (isModal || isCross) {
        document.body.style.overflow = '';
        modal.classList.add('hide');
    }
});

class DBService {
    async getData(url) {
        const response = await fetch(url);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Error ${response.status}`);
        }
    }

    getTestData() {
        return this.getData('test.json');
    }

    // async downloadAPIKey() {
    //     const response = await fetch('config/api.key');
    //     API_KEY = await response.text();
    // }
}

const renderCards = ({ results }) => {
    results.forEach(({
        vote_average: vote,
        poster_path: poster,
        backdrop_path: backdrop,
        name: title
    }) => {

        const posterURI = poster ? `${IMG_URL + poster}` : DEFAULT_IMG;
        const backdropURI = backdrop ? `${IMG_URL + backdrop}` : '';
        const voteEl = vote ? `<span class="tv-card__vote">${vote}</span>` : '';

        const card = document.createElement('li');
        card.classList.add('tv-shows__item');
        card.innerHTML = `
            <a href="#" class="tv-card">
                ${voteEl}
                <img class="tv-card__img"
                     src="${posterURI}"
                     data-backdrop="${backdropURI}"
                     alt="${title}">
                <h4 class="tv-card__head">${title}</h4>
            </a>
        `;

        showsList.append(card);
    });
}

const main = () => {
    new DBService().getTestData().then(renderCards);
};

// new DBService().downloadAPIKey().then(main);