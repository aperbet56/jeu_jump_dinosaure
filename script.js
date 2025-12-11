// Récupération des éléments HTML5
const container = document.querySelector("#container");
const dino = document.querySelector("#dino");
const block = document.querySelector("#block");
const road = document.querySelector("#road");
const cloud = document.querySelector("#cloud");
const score = document.querySelector("#score");
const gameOver = document.querySelector("#gameOver");

// Création des variables
let interval = null;
let playerScore = 0;

// Création de la fonction scoreCounter qui va permettre la mise à jour automatique du score
const scoreCounter = () => {
  // Incrémentation du score
  playerScore++;
  score.innerHTML = `Votre score : <b>${playerScore}</b>`;
};

// DEMARRER LE JEU
// Ecoute de l'événement "keydown" sur la touche espace pour démarrer le jeu
window.addEventListener("keydown", (start) => {
  // console.log(start);
  if (start.code == "Space") {
    gameOver.style.display = "none";
    block.classList.add("blockActive");
    road.firstElementChild.style.animation = "roadAnimate 1.5s linear infinite";
    cloud.firstElementChild.style.animation =
      "cloudAnimate 30s linear infinite";

    // score
    playerScore = 0;
    //La méthode setInterval() appelle de manière répétée la fonction scoreCounter avec un délai fixe entre chaque appel de 200ms.
    interval = setInterval(scoreCounter, 200);
  }
});

// FAIRE SAUTER LE DINOSAURE
// Ecoute de l'événement "keydown" sur la touche flèche vers le haut
window.addEventListener("keydown", (e) => {
  //    console.log(e);

  // Condition if
  if (e.key == "ArrowUp")
    if (dino.classList != "dinoActive") {
      dino.classList.add("dinoActive");

      // La méthode setTimeout() définit un minuteur qui exécute une fonction ou un fragment de code spécifique une fois le minuteur arrivé à expiration : ici, Retrait de la classe après 0.5s
      setTimeout(() => {
        dino.classList.remove("dinoActive");
      }, 500);
    }
});

// "Game Over" si le dinosaure touche les cactus(block)
const result = setInterval(() => {
  let dinoBottom = parseInt(getComputedStyle(dino).getPropertyValue("bottom"));
  // console.log("dinoBottom" + dinoBottom);

  let blockLeft = parseInt(getComputedStyle(block).getPropertyValue("left"));
  // console.log("BlockLeft" + blockLeft);

  // Condition if
  if (dinoBottom <= 90 && blockLeft >= 20 && blockLeft <= 145) {
    // console.log("Game Over");

    // Apparition de la div gameOver
    gameOver.style.display = "block";
    block.classList.remove("blockActive");
    // Fin des animations
    road.firstElementChild.style.animation = "none";
    cloud.firstElementChild.style.animation = "none";

    //La méthode clearInterval() annule une action périodique et répétitive préalablement définie par un appel à setInterval().
    clearInterval(interval);

    // Remise à zéro du score
    playerScore = 0;
  }
}, 10);
