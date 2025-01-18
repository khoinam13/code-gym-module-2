const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
const scoreBoard = document.getElementById('score-board');

let score = 0;
let zombies = [];
let bullets = [];
let gameInterval;

// Move player
window.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    player.style.left = `${x - player.offsetWidth / 2}px`;
});

// Spawn zombie
function spawnZombie() {
    const zombie = document.createElement('div');
    zombie.classList.add('zombie');
    zombie.style.top = `0px`;
    zombie.style.left = `${Math.random() * gameContainer.offsetWidth}px`;
    gameContainer.appendChild(zombie);
    zombies.push(zombie);
}

// Fire bullet
window.addEventListener('click', () => {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.left = `${player.offsetLeft + player.offsetWidth / 2}px`;
    bullet.style.bottom = `${gameContainer.offsetHeight - player.offsetTop - player.offsetHeight}px`;
    gameContainer.appendChild(bullet);
    bullets.push(bullet);
});

// Game loop
function updateGame() {
    // Move zombies
    zombies.forEach((zombie, index) => {
        const top = parseFloat(zombie.style.top);
        if (top > gameContainer.offsetHeight) {
            gameContainer.removeChild(zombie);
            zombies.splice(index, 1);
        } else {
            zombie.style.top = `${top + 2}px`;
        }
    });

    // Move bullets
    bullets.forEach((bullet, index) => {
        const bottom = parseFloat(bullet.style.bottom);
        if (bottom > gameContainer.offsetHeight) {
            gameContainer.removeChild(bullet);
            bullets.splice(index, 1);
        } else {
            bullet.style.bottom = `${bottom + 5}px`;
        }
    });

    // Detect collisions
    zombies.forEach((zombie, zombieIndex) => {
        bullets.forEach((bullet, bulletIndex) => {
            const zombieRect = zombie.getBoundingClientRect();
            const bulletRect = bullet.getBoundingClientRect();

            if (
                bulletRect.left < zombieRect.right &&
                bulletRect.right > zombieRect.left &&
                bulletRect.top < zombieRect.bottom &&
                bulletRect.bottom > zombieRect.top
            ) {
                gameContainer.removeChild(zombie);
                gameContainer.removeChild(bullet);
                zombies.splice(zombieIndex, 1);
                bullets.splice(bulletIndex, 1);
                score++;
                scoreBoard.textContent = `Score: ${score}`;
            }
        });
    });
}

// Start game
function startGame() {
    gameInterval = setInterval(() => {
        spawnZombie();
        updateGame();
    }, 50);
}

startGame();
