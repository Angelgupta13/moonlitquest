// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Simple memory game
    const gameGrid = document.querySelector('.game-grid');
    const elements = ['🦁', '🌙🌸', '🥭', '🦁', '🌙🌸', '🥭', '🌴', '🌴'];
    let flippedCards = [];
    let matchedPairs = 0;

    // Shuffle elements
    elements.sort(() => Math.random() - 0.5);

    // Create game cells
    elements.forEach((element, index) => {
        const cell = document.createElement('div');
        cell.classList.add('game-cell');
        cell.dataset.index = index;
        cell.addEventListener('click', flipCard);
        gameGrid.appendChild(cell);
    });

    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
            this.textContent = elements[this.dataset.index];
            this.classList.add('flipped');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.textContent === card2.textContent) {
            matchedPairs++;
            if (matchedPairs === elements.length / 2) {
                alert('Congratulations! You found all the pairs!');
            }
        } else {
            card1.textContent = '';
            card2.textContent = '';
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }
        flippedCards = [];
    }

    // Form submission
    const form = document.getElementById('register-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = this.elements[0].value;
        const email = this.elements[1].value;
        alert(Thank you for registering, ${name}! We'll send more information to ${email} soon.);
        this.reset();
    });
});