const flashcardsContainer = document.getElementById('flashcards-container');
const genreSelect = document.getElementById('genre-select');
const startButton = document.getElementById('start-button');

const flashcards = {
    math: [
        { question: '1+1は？', answer: '2' },
        { question: '2×2は？', answer: '4' },
        { question: '3×3は？', answer: '9' },
        { question: '4×4は？', answer: '16' },
    ],
    science: [
        { question: '水の化学式は？', answer: 'H2O' },
        { question: '地球の大気の主成分は？', answer: '窒素' }
    ],
    history: [
        { question: '第一次世界大戦は何年に始まった？', answer: '1914年' },
        { question: '日本の鎌倉時代はいつからいつまで？', answer: '1185年から1333年まで' }
    ]
};

let currentGenre = '';
let remainingFlashcards = [];

function createFlashcardElement(flashcard) {
    const flashcardElement = document.createElement('div');
    flashcardElement.classList.add('flashcard');

    const front = document.createElement('div');
    front.classList.add('card', 'front');
    front.textContent = flashcard.question;

    const back = document.createElement('div');
    back.classList.add('card', 'back');
    back.textContent = flashcard.answer;

    flashcardElement.appendChild(front);
    flashcardElement.appendChild(back);

    flashcardElement.addEventListener('click', () => {
        if (flashcardElement.classList.contains('flip')) {
            setTimeout(() => {
                flashcardsContainer.innerHTML = '';
                setTimeout(() => {
                    showNextFlashcard();
                }, 100)
            }, 100);
        }
        flashcardElement.classList.toggle('flip');
    });

    return flashcardElement;
}

function showNextFlashcard() {
    if (remainingFlashcards.length === 0) {
        flashcardsContainer.innerHTML = '<p>全てのカードを表示しました！</p>';
        setTimeout(() => {
            flashcardsContainer.innerHTML = '';
            genreSelect.value = '';
        }, 2000);
    } else {
        flashcardsContainer.innerHTML = '';
        const randomIndex = Math.floor(Math.random() * remainingFlashcards.length);
        const nextFlashcard = remainingFlashcards.splice(randomIndex, 1)[0];
        const flashcardElement = createFlashcardElement(nextFlashcard);
        flashcardsContainer.appendChild(flashcardElement);
    }
}

startButton.addEventListener('click', () => {
    currentGenre = genreSelect.value;
    remainingFlashcards = [...flashcards[currentGenre]];
    showNextFlashcard();
});