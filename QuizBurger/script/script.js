'use strict';

window.addEventListener('DOMContentLoaded', () => {

	const modalBlock = document.getElementById('modalBlock'),
		questionTitle = document.getElementById('question'),
		formAnswers = document.getElementById('formAnswers'),
		menuButton = document.getElementById('burger');

	const handleWidth = () => {
		const clientWidth = document.documentElement.clientWidth;
		menuButton.style.display = clientWidth > 768 ? 'none' : 'flex';
	};

	handleWidth();

	const playTest = () => {
		const renderQuestions = () => {
			questionTitle.textContent = 'Какого цвета бургер вы хотите?';
			formAnswers.innerHTML = '';

			const data = [
				{ id: 'answerItem1', name: 'Стандарт', src: './image/burger.png' },
				{ id: 'answerItem2', name: 'Черный', src: './image/burgerBlack.png' }
			];

			data.forEach(data => {
				const blocks = `
					<div class="answers-item d-flex flex-column">
						<input type="radio" id="${data.id}" name="answer" class="d-none">
						<label for="answerItem1" class="d-flex flex-column justify-content-between">
							<img class="answerImg" src="${data.src}" alt="burger">
							<span>${data.name}</span>
						</label>
					</div>
					`;
				formAnswers.insertAdjacentHTML('beforeend', blocks);
			});
		};
		renderQuestions();
	};

	const showDialog = () => {
		menuButton.classList.add('active');
		modalBlock.classList.add('d-block');
		playTest();
	};

	const hideDialog = () => {
		menuButton.classList.remove('active');
		modalBlock.classList.remove('d-block');
	};

	window.addEventListener('resize', handleWidth);

	document.addEventListener('click', event => {
		let target = event.target;
		if (target.closest('.btnOpenModal') || target.closest('.burger')) {
			showDialog();
		} else if (target.closest('.close')) {
			hideDialog();
		} else {
			target = target.closest('.modal-dialog');
			if (!target) {
				hideDialog();
			}
		}
	});

});
