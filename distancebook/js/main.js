const menuBtn = document.querySelector(".mmenu");
const menu = document.querySelector('.menu-sidebar');

menuBtn.addEventListener('click', function () {
	menu.classList.toggle('active')
});	