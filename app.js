document.addEventListener('DOMContentLoaded', game);
function game() {
	//pantallas del juego:
	const introSection = document.querySelector('.introPage');
	const inputSection = document.querySelector('.inputPage');
	const gameSection = document.querySelector('.gamePage');

	//botones para ir de una pantalla a otra
	const introButton = document.getElementById('introBtn');
	const inputButton = document.getElementById('inputBtn');

	//elementos de la gamePage:

	//manos
	const playerHandContainer = document.getElementById('playerHandContainer');
	const computerHandContainer = document.getElementById('computerHandContainer');
	const playerHand = playerHandContainer.firstElementChild;
	const computerHand = computerHandContainer.firstElementChild;

	//botones
	const rockButton = document.querySelector('.rockBtn');
	const paperButton = document.querySelector('.paperBtn');
	const scissorsButton = document.querySelector('.scissorsBtn');

	//botón de inicio de la ronda
	const playButton = document.getElementById('playBtn');

	//OBJETOS
	const game = {
		playerScore: 0,
		computerScore: 0,
		options: [ 'rock', 'paper', 'scissors' ],
		playerHandSelected: 'rock', //boton seleccionado
		computerHandSelected: undefined,
		selectComputerHand() {
			let randomNum = Math.round(Math.random() * 2);
			this.computerHandSelected = this.options[randomNum];
		},
		get theresAGameWinner() {
			return game.playerScore == 5 || game.computerScore == 5;
		},
		getRoundWinner() {
			let roundWinner;
			if (game.playerHandSelected == 'rock' && game.computerHandSelected == game.options[2]) {
				roundWinner = 'player';
			} else if (game.playerHandSelected == 'rock' && game.computerHandSelected == game.options[1]) {
				roundWinner = 'computer';
			} else if (game.playerHandSelected == 'paper' && game.computerHandSelected == game.options[0]) {
				roundWinner = 'player';
			} else if (game.playerHandSelected == 'paper' && game.computerHandSelected == game.options[2]) {
				roundWinner = 'computer';
			} else if (game.playerHandSelected == 'scissors' && game.computerHandSelected == game.options[0]) {
				roundWinner = 'computer';
			} else if (game.playerHandSelected == 'scissors' && game.computerHandSelected == game.options[1]) {
				roundWinner = 'player';
			} else if (game.playerHandSelected == game.computerHandSelected) {
				roundWinner = 'No one';
			}
			return roundWinner;
		}
	};
	const UI = {
		scoreboardAnimationDuration: 1000,
		handsAnimationDuration: 1700,
		goToTheNextSection(actualSection, nextSection) {
			actualSection.classList.add('hide');
			nextSection.classList.replace('hide', 'appearEffect');
		},
		addButtonBorder(button) {
			button.classList.add('selectedButton');
		},
		removeButtonBorder(button1, button2) {
			button1.classList.remove('selectedButton');
			button2.classList.remove('selectedButton');
		},
		animateHands() {
			playerHandContainer.classList.add('playerHandAnimation');
			computerHandContainer.classList.add('handAnimation');
		},
		changeHands() {
			playerHandContainer.firstElementChild.src = `./img/${game.playerHandSelected}.png`;
			computerHandContainer.firstElementChild.src = `./img/${game.computerHandSelected}.png`;
		},
		resetHands() {
			computerHand.src = './img/rock.png';
			playerHand.src = './img/rock.png';
		},
		changeScoreboardContent() {
			document.getElementById(`playerScore`).textContent = game.playerScore.toString();
			document.getElementById('computerScore').textContent = game.computerScore.toString();
		},
		animateScoreboardBox(winner) {
			if (winner == 'No one') {
				return;
			}
			let winnerBox = document.getElementById(`${winner}Score`);
			winnerBox.classList.add('flip-scale-down-ver');
			winnerBox.addEventListener('animationend', () => {
				winnerBox.classList.remove('flip-scale-down-ver');
			});
		},
		showMessage() {
			//Primero desaparición de la game-page.
			gameSection.classList.add('hide');
			//aparición del mensaje en pantalla:
			const body = document.getElementById('body');
			const msgSection = document.createElement('section');
			body.appendChild(msgSection); //se inserta la sección en html (en el body)
			if (game.playerScore == 5) {
				msgSection.innerHTML = '<h1>You win!<br>It seems that you are smarter than me</h1>';
			} else if (game.computerScore == 5) {
				msgSection.innerHTML = '<h1>Game over<br>You loose!</h1>';
			}
			//estilos del mensaje
			msgSection.classList.add('message', 'appearEffect');
		}
	};

	// EVENTOS
	introButton.addEventListener('click', () => {
		UI.goToTheNextSection(introSection, inputSection);
	});
	inputButton.addEventListener('click', () => {
		game.playerName = document.getElementById('input').value;
		document.getElementById('playerName').textContent = game.playerName;
		UI.goToTheNextSection(inputSection, gameSection);
	});

	//... en la sección del juego
	rockButton.addEventListener('click', () => {
		//rock button ya tiene el borde por defecto, mostrando al jugador que si no elige nada, elige piedra.
		UI.addButtonBorder(rockButton);
		game.playerHandSelected = 'rock';
		UI.removeButtonBorder(paperButton, scissorsButton);
	});
	paperButton.addEventListener('click', () => {
		game.playerHandSelected = 'paper';
		UI.addButtonBorder(paperButton);
		UI.removeButtonBorder(rockButton, scissorsButton);
	});
	scissorsButton.addEventListener('click', () => {
		game.playerHandSelected = 'scissors';
		UI.addButtonBorder(scissorsButton);
		UI.removeButtonBorder(paperButton, rockButton);
	});

	playButton.addEventListener('click', () => {
		//para este entonces la mano del player ya está seleccionada
		game.selectComputerHand();
		UI.animateHands();
		setTimeout(() => {
			playerHandContainer.classList.remove('playerHandAnimation');
			computerHandContainer.classList.remove('handAnimation');
			UI.changeHands();
			let roundWinner = game.getRoundWinner();
			if (roundWinner == 'player') {
				game.playerScore += 1;
			} else if (roundWinner == 'computer') {
				game.computerScore += 1;
			}
			UI.animateScoreboardBox(roundWinner);
			setTimeout(() => {
				UI.changeScoreboardContent();
				if (game.theresAGameWinner == false) {
					UI.resetHands();
					return;
				}
				UI.showMessage();
			}, UI.scoreboardAnimationDuration);
		}, UI.handsAnimationDuration);
	});
}
