Game();
function Game() {
	//pantallas del juego:
	const introPage = document.querySelector('.introPage');
	const inputPage = document.querySelector('.inputPage');
	const gamePage = document.querySelector('.gamePage');

	//botones para ir de una pantalla a otra
	const introButton = document.getElementById('introBtn');
	const inputButton = document.getElementById('inputBtn');

	// pasaje a inputPage cuando se clikea el botón de la introPage
	introButton.addEventListener('click', () => {
		goToTheNextPage(introPage, inputPage);
	});

	//pasaje a gamePage cuando se clikea botón de la inputPage:
	inputButton.addEventListener('click', () => {
		goToTheNextPage(inputPage, gamePage);
		//almacenamiento en el scoreboard del nombre insertado :
		const insertedName = document.getElementById('input').value;
		const playerName = document.getElementById('playerName');
		playerName.textContent = insertedName;
	});

	//función llamada ante el click en botones para iquerySelector:
	function goToTheNextPage(actualPage, nextPage) {
		actualPage.classList.add('disappearEffect');
		setTimeout(() => {
			actualPage.classList.add('pageDisappear');
			nextPage.classList.replace('pageDisappear', 'appearEffect');
		}, 1200);
	}

	//elementos de la gamePage:

	//manos
	const playerHand = document.getElementById('playerHandList');
	const computerHand = document.getElementById('computerHandList');
	const playerHandContainer = document.getElementById('playerHandListContainer');
	const computerHandContainer = document.getElementById('computerHandListContainer');

	// manos seleccionadas
	let playerHandSelected;
	let computerHandSelected;

	//opciones de manos

	const rockImg = 'rock';
	const paperImg = 'paper';
	const scissorsImg = 'scissors';
	const handsArray = [ 'rockComputer', 'paperComputer', 'scissorsComputer' ];

	//Cajas contenedoras del score
	let playerScoreboardBox = document.getElementById('playerScore');
	let computerScoreboardBox = document.getElementById('computerScore');

	//contadorJS para el scoreboard:
	let playerScoreNum = 0;
	let computerScoreNum = 0;

	//botón de inicio
	const playButton = document.getElementById('playBtn');

	//selección de la mano:

	selectPlayerHand();

	function selectPlayerHand() {
		// selección de una mano por parte del usuario al clickear el botón correspondiente a la misma
		const rockButton = document.querySelector('.rockBtn');
		const paperButton = document.querySelector('.paperBtn');
		const scissorsButton = document.querySelector('.scissorsBtn');

		//eventos de seleción de mano del jugador. No implica cambio en la imagen mostrada en pantalla
		rockButton.addEventListener('click', () => {
			//rock button ya tiene el borde por defecto, mostrando al jugador que si no elige nada, elige piedra.
			addButtonBorder(rockButton);
			playerHandSelected = rockImg;
			removeButtonBorder(paperButton);
			removeButtonBorder(scissorsButton);
		});
		paperButton.addEventListener('click', () => {
			playerHandSelected = paperImg;
			addButtonBorder(paperButton);
			removeButtonBorder(rockButton);
			removeButtonBorder(scissorsButton);
		});
		scissorsButton.addEventListener('click', () => {
			playerHandSelected = scissorsImg;
			addButtonBorder(scissorsButton);
			removeButtonBorder(paperButton);
			removeButtonBorder(rockButton);
		});
		//funciones llamadas ante el click en rockButton,paperButton y scissorsButton:
		function addButtonBorder(button) {
			button.classList.add('selectedButton');
		}
		function removeButtonBorder(button) {
			button.classList.remove('selectedButton');
		}
	}

	//inicio de la partida:
	playButton.addEventListener('click', () => {
		selectComputerHand();
		animateHands();
		setTimeout(() => {
			//empiezan a ejecutarse estas funciones 100 milisegundos antes de que termine la animacion de las manos para que puedan cambiar más rápido
			changeHands();
			evaluateWinnerAndAnimateScoreboardBox();
			changeScoreboard();
			setTimeout(() => {
				// set time out mas largo que 1900mil para que suceda todo lo de arriba y luego se ejecute esto
				resetHandsIftheresNotAWinner();
				showMessageIfTheresAWinner();
			}, 2500);
		}, 1900);

		//funciones llamadas en el evento click del play button:

		function selectComputerHand() {
			let randomNum = Math.round(Math.random() * 3);
			computerHandSelected = handsArray[randomNum];
		}
		function animateHands() {
			playerHandContainer.classList.add('handAnimation');
			computerHandContainer.classList.add('handAnimation');

			//despues de 2 segundos, se saca clase que tiene la animación
			setTimeout(() => {
				playerHandContainer.classList.remove('handAnimation');
				computerHandContainer.classList.remove('handAnimation');
			}, 2000);
		}
		function changeHands() {
			playerHand.classList.replace('rock', playerHandSelected);
			computerHand.classList.replace('rockComputer', computerHandSelected);
		}

		function evaluateWinnerAndAnimateScoreboardBox() {
			if (playerHand.classList.contains(rockImg) && computerHand.classList.contains('paperComputer')) {
				computerScoreNum++;
				animateScoreboardBox(computerScoreboardBox);
			} else if (playerHand.classList.contains(rockImg) && computerHand.classList.contains('scissorsComputer')) {
				playerScoreNum++;
				animateScoreboardBox(playerScoreboardBox);
			} else if (playerHand.classList.contains(paperImg) && computerHand.classList.contains('rockComputer')) {
				playerScoreNum++;
				animateScoreboardBox(playerScoreboardBox);
			} else if (playerHand.classList.contains(paperImg) && computerHand.classList.contains('scissorsComputer')) {
				computerScoreNum++;
				animateScoreboardBox(computerScoreboardBox);
			} else if (playerHand.classList.contains(scissorsImg) && computerHand.classList.contains('rockComputer')) {
				computerScoreNum++;
				animateScoreboardBox(computerScoreboardBox);
			} else if (playerHand.classList.contains(scissorsImg) && computerHand.classList.contains('paperComputer')) {
				playerScoreNum++;
				animateScoreboardBox(playerScoreboardBox);
			} else {
				//CASO DE EMPATE:se animan ambas cajas
				animateScoreboardBox(computerScoreboardBox);
				animateScoreboardBox(playerScoreboardBox);
			}
			function animateScoreboardBox(box) {
				box.classList.add('flip-scale-down-ver');
				//acá quito la clase que tiene la animación del scoreboard box una vez que se ejecuta dicha animación
				setTimeout(() => {
					box.classList.remove('flip-scale-down-ver');
				}, 1100);
			}
		}

		function changeScoreboard() {
			/*pasaje a string de los contadores del scoreboard*/
			const playerScoreStr = playerScoreNum.toString();
			const iaScoreStr = computerScoreNum.toString();
			/*Asignación de contadores string al contenido de las cajas contenedoras del scoreboard*/
			playerScoreboardBox.textContent = playerScoreStr;
			computerScoreboardBox.textContent = iaScoreStr;
		}
		function resetHandsIftheresNotAWinner() {
			if (playerScoreNum < 5 || computerScoreNum < 5) {
				//computerHand
				computerHand.classList.remove('paperComputer', 'scissorsComputer');
				computerHand.classList.add('rockComputer');
				//playerHand
				playerHand.classList.remove(paperImg, scissorsImg);
				playerHand.classList.add(rockImg);
			}
		}
		function showMessageIfTheresAWinner() {
			if (playerScoreNum == 5 || computerScoreNum == 5) {
				showMessage();
			}
			function showMessage() {
				//Primero desaparición de la game-page.
				gamePage.classList.add('disappearEffect', 'pageDisappear');
				//aparición del mensaje en pantalla:
				const body = document.getElementById('body');
				const msgSection = document.createElement('section');
				body.appendChild(msgSection); //se inserta la sección en html (en el body)
				if (playerScoreNum == 5) {
					msgSection.innerHTML = '<h1>You win!<br>It seems that you are smarter than me</h1>';
				} else if (computerScoreNum == 5) {
					msgSection.innerHTML = '<h1>Game over<br>You loose!</h1>';
				}
				//estilos del mensaje
				msgSection.classList.add('message', 'appearEffect');
			}
		}
	});
}

