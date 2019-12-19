Game();
function Game() {
	//pantallas del juego:
	const introPage = document.querySelector('.intro-page');
	const gamePage = document.querySelector('.game-page');
	//boton para ir a pantalla del juego
	const gameButton = document.querySelector('.game-btn');
	// pasaje a pantalla del juego cuando se clikea el botón
	gameButton.addEventListener('click', () => {
		//desaparición progresiva de la intro page
		introPage.classList.add('disappearEffect');
		//aparición de la pagina del juego cuando termina la animación de desaparición:
		setTimeout(() => {
			introPage.classList.add('pageDisappear');
			gamePage.classList.replace('pageDisappear','appearEffect');
		}, 1200);
	});

	//elementos de la gamePage:

	//manos
	const playerHand = document.getElementById('hand-pl');
	const iaHand = document.getElementById('hand-ia');

	// manos seleccionadas
	let playerHandSelected;
	let iaHandSelected;
	
	//imagenes de manos
	const rockImg = './img/rock.png';
	const paperImg = './img/paper.png';
	const scissorsImg = './img/scissors.png';
	const handsArray = [ rockImg, paperImg, scissorsImg ];
	
	//Cajas contenedoras del score
	let playerScoreboardBox = document.querySelector('.score-pl');
	let iaScoreboardBox = document.querySelector('.score-ia');

	//contadorJS para el scoreboard:
	let playerScoreNum = 0;
	let iaScoreNum = 0;

	//botón de inicio
	const playButton = document.getElementById('play-button');

	//selección de la mano:

	selectPlayerHand();

	function selectPlayerHand() {
		// selección de una mano por parte del usuario al clickear el botón correspondiente a la misma
		const rockButton = document.querySelector('.rock-button');
		const paperButton = document.querySelector('.paper-button');
		const scissorsButton = document.querySelector('.scissors-button');

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

	//Procedimientos que dan inicio a la partida luego de clickear el playButton
	playButton.addEventListener('click', () => {
		selectIaHand();
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

		function selectIaHand() {
			let randomNum = Math.round(Math.random() * 3);
			iaHandSelected = handsArray[randomNum];
		}
		function animateHands() {
			playerHand.classList.add('upAndDownPlayerHand');
			iaHand.classList.add('upAndDownIaHand');

			//despues de 2 segundos, se saca clase que tiene la animación
			setTimeout(() => {
				playerHand.classList.remove('upAndDownPlayerHand');
				iaHand.classList.remove('upAndDownIaHand');
			}, 2000);
		}
		function changeHands() {
			playerHand.src = playerHandSelected;
			iaHand.src = iaHandSelected;
		}

		function evaluateWinnerAndAnimateScoreboardBox() {
			if (iaHand.getAttribute('src') == playerHand.getAttribute('src')) {
				//Caso de empate:se animan ambas cajas
				animateScoreboardBox(iaScoreboardBox);
				animateScoreboardBox(playerScoreboardBox);
			} else if (playerHand.getAttribute('src') == rockImg && iaHand.getAttribute('src') == paperImg) {
				iaScoreNum++;
				animateScoreboardBox(iaScoreboardBox);
			} else if (playerHand.getAttribute('src') == rockImg && iaHand.getAttribute('src') == scissorsImg) {
				playerScoreNum++;
				animateScoreboardBox(playerScoreboardBox);
			} else if (playerHand.getAttribute('src') == paperImg && iaHand.getAttribute('src') == rockImg) {
				playerScoreNum++;
				animateScoreboardBox(playerScoreboardBox);
			} else if (playerHand.getAttribute('src') == paperImg && iaHand.getAttribute('src') == scissorsImg) {
				iaScoreNum++;
				animateScoreboardBox(iaScoreboardBox);
			} else if (playerHand.getAttribute('src') == scissorsImg && iaHand.getAttribute('src') == rockImg) {
				iaScoreNum++;
				animateScoreboardBox(iaScoreboardBox);
			} else if (playerHand.getAttribute('src') == scissorsImg && iaHand.getAttribute('src') == paperImg) {
				playerScoreNum++;
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
			const iaScoreStr = iaScoreNum.toString();
			/*Asignación de contadores string al contenido de las cajas contenedoras del scoreboard*/
			playerScoreboardBox.textContent = playerScoreStr;
			iaScoreboardBox.textContent = iaScoreStr;
		}
		function resetHandsIftheresNotAWinner() {
			if (playerScoreNum < 5 || iaScoreNum < 5) {
				iaHand.setAttribute('src', handsArray[0]);
				playerHand.setAttribute('src', handsArray[0]);
			}
		}
		function showMessageIfTheresAWinner() {
			if (playerScoreNum == 5 || iaScoreNum == 5) {
				showMessage();
			}
			function showMessage() {
				//Primero desaparición de la game-page.
				gamePage.classList.add('disappearEffect','pageDisappear');
				//aparición del mensaje en pantalla:
				const body = document.getElementById('body');
				const msgSection = document.createElement('section');
				body.appendChild(msgSection); //se inserta la sección en html (en el body)
				if (playerScoreNum == 5) {
					msgSection.innerHTML = '<h1>You win!<br>It seems that you are smarter than me</h1>';
				} else if (iaScoreNum == 5) {
					msgSection.innerHTML = '<h1>Game over<br>You loose!</h1>';
				}
				//estilos del mensaje
				msgSection.classList.add('message','appearEffect');
			}
		}
	});
}
