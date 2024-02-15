document.getElementById('click-me-btn').addEventListener('click', function () {
    this.style.display = 'none'; // Disparaître le bouton "Click Me" lorsqu'il est cliqué
    document.getElementById('parchment-container').style.display = 'block';
    const parchmentContainer = document.getElementById('parchment-container');
    parchmentContainer.classList.remove('disappear-animation');
    parchmentContainer.classList.add('appear-animation');// Affichage du parchemin
    document.body.classList.add('overflow-hidden'); // Appeler la fonction pour faire tomber des coeurs
    setTimeout(function () {
        showPhrases(); // Appeler la fonction pour afficher les phrases
        setTimeout(function () {
            createEmojis(); // Appeler la fonction pour afficher les phrases
        }, 3000);
    }, 3000);
});

function createEmojis() {
    setInterval(() => {
        const emojisContainer = document.getElementById('emojis-container');
        const emojis = ['❤️','😊', '🥰', '💖', '💕', '🌈']; // Liste d'autres emojis ajoutés

        const emoji = document.createElement('span');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)]; // Sélectionner un emoji aléatoire parmi la liste
        emoji.classList.add('emoji');
        // Position horizontale et verticale aléatoire
        emoji.style.left = Math.random() * (window.innerWidth - 100) + 'px'; // -40 pour éviter que les emojis ne sortent de l'écran
        emoji.style.top = Math.random() * (window.innerHeight - 100) + 'px'; 
        // Animation de bondissement aléatoire
        emoji.style.animation = 'bounce ' + (Math.random() * 3 + 1) + 's infinite alternate'; 
        emojisContainer.appendChild(emoji);

        setTimeout(() => {
            emojisContainer.removeChild(emoji); // Supprimer l'emoji après un certain délai
        }, Math.random() * 5000 + 2000); // Délai aléatoire entre 2000 et 7000 millisecondes (2 et 7 secondes)
    }, 1500); // Générer un nouvel emoji toutes les secondes
}


// Fonction pour générer une position unique
function generateUniquePosition(usedPositions) {
    let left, top;
    do {
        left = Math.random() * (window.innerWidth - 40); // -40 pour éviter que les emojis ne sortent de l'écran
        top = Math.random() * (window.innerHeight - 40);
    } while (isPositionOccupied(left, top, usedPositions));

    return { left: left, top: top };
}

// Fonction pour vérifier si une position est déjà occupée
function isPositionOccupied(left, top, positions) {
    for (let i = 0; i < positions.length; i++) {
        if (Math.abs(positions[i].left - left) < 40 && Math.abs(positions[i].top - top) < 40) {
            return true; // La position est occupée
        }
    }
    return false; // La position est libre
}



function hideHeartsAndShowButton() {
    const heartsContainer = document.getElementById('hearts-container');
    heartsContainer.innerHTML = ''; // Effacer les cœurs
    document.body.classList.remove('overflow-hidden'); // Retirer la classe pour afficher le défilement
    document.getElementById('parchment-container').style.display = 'none';
    document.getElementById('click-me-btn').style.display = 'block'; // Afficher à nouveau le bouton
}


function showPhrases() {
    const phrasesContainer = document.getElementById('phrases-container');
    const phrases = ["Je t'aime", "Tu es magnifique", "Mon amour pour toi est infini", "Tu rends ma vie meilleure"];

    phrases.forEach((phrase, index) => {
        setTimeout(() => {
            const phraseElement = document.createElement('div');
            phraseElement.textContent = phrase;
            phraseElement.classList.add('phrase');
            phrasesContainer.innerHTML = ''; // Effacer les anciennes phrases
            phrasesContainer.appendChild(phraseElement);

            setTimeout(() => {
                phraseElement.remove();
                // Réafficher le bouton après que toutes les phrases ont été affichées et disparues
                if (index === phrases.length - 1) {
                    const parchmentContainer = document.getElementById('parchment-container');
                    parchmentContainer.classList.remove('appear-animation');
                    parchmentContainer.classList.add('disappear-animation');

                    setTimeout(function () {
                        document.getElementById('parchment-container').style.display = 'none';
                        document.getElementById('click-me-btn').style.display = 'block';
                    }, 5000);
                }
            }, 10000);
        }, index * 7500); // Chaque phrase apparaît après 2 secondes et disparaît après 2 secondes
    });
}
