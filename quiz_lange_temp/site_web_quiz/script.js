const quizzes = [
    {
        text: "Lesen Sie den folgenden Text und entscheiden Sie, welches Wo (a, b oder c) in die jeweilige Lucke passt.",
        questions: [
            {
                question: "21) (21) ...",
                options: ["A) an", "B) bei", "C) in"],
                answer: "C"
            },
            {
                question: "22) (22) ...",
                options: ["A) in Betrag", "B) in Höhe", "C) in Summe"],
                answer: "B"
            },
            {
                question: "23) (23) ...",
                options: ["A) für", "B) zur", "C) Zwecks"],
                answer: "A"
            },
            {
                question: "24) (24) ...",
                options: ["A) angeschlossen", "B) anschließen", "C) anschließen an"],
                answer: "B"
            },
            {
                question: "25) (25) ...",
                options: ["A) anlässlich", "B) bezüglich", "C) mittels"],
                answer: "B"
            },
            {
                question: "26) (26) ...",
                options: ["A) als", "B) wenn", "C) wie"],
                answer: "A"
            },
            {
                question: "27) (27) ...",
                options: ["A) ein", "B) einem", "C) einer"],
                answer: "C"
            },
            {
                question: "28) (28) ...",
                options: ["A) Sobald", "B) Sofort", "C) Sooft"],
                answer: "A"
            },
            {
                question: "29) (29) ...",
                options: ["A) dafür", "B) damit", "C) dazu"],
                answer: "B"
            },
            {
                question: "30) (30) ...",
                options: ["A) bei", "B) für", "C) zu"],
                answer: "C"
            }
        ]
    },
    {
        text: "Voici un autre texte pour le prochain quiz.",
        questions: [
            {
                question: "1) (1) ...",
                options: ["A) option1", "B) option2", "C) option3"],
                answer: "A"
            },
            {
                question: "2) (2) ...",
                options: ["A) option1", "B) option2", "C) option3"],
                answer: "B"
            }
            // Ajoutez d'autres questions ici
        ]
    }
];

let currentQuizIndex = 0;
let currentQuestionIndex = 0;
let score = 0;
let timer;

const textEl = document.getElementById('text');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const submitBtn = document.getElementById('submit');
const timerEl = document.getElementById('timer');
const scoreContainer = document.getElementById('score-container');
const nextBtn = document.getElementById('next');
const restartBtn = document.getElementById('restart');

function loadQuiz() {
    const currentQuiz = quizzes[currentQuizIndex];
    textEl.textContent = currentQuiz.text;
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timer);
    timerEl.textContent = "Temps restant: 10 secondes";
    startTimer(10);

    const currentQuiz = quizzes[currentQuizIndex];
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => selectOption(option);
        li.appendChild(button);
        optionsEl.appendChild(li);
    });
}

function selectOption(selectedOption) {
    const currentQuiz = quizzes[currentQuizIndex];
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    if (selectedOption.charAt(0) === currentQuestion.answer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuiz.questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    clearInterval(timer);
    questionEl.style.display = 'none';
    optionsEl.style.display = 'none';
    submitBtn.style.display = 'none';
    scoreContainer.style.display = 'block';
    scoreContainer.querySelector('#score').textContent = `Votre score est: ${score}/${quizzes[currentQuizIndex].questions.length}`;
    nextBtn.style.display = currentQuizIndex < quizzes.length - 1 ? 'block' : 'none';
    restartBtn.style.display = currentQuizIndex === quizzes.length - 1 ? 'block' : 'none';
}

function startTimer(duration) {
    let timeLeft = duration;
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Temps écoulé!");
            selectOption(""); // Passer à la question suivante
        } else {
            timerEl.textContent = `Temps restant: ${timeLeft} secondes`;
            timeLeft--;
        }
    }, 1000);
}

nextBtn.onclick = () => {
    currentQuizIndex++;
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.style.display = 'none';
    questionEl.style.display = 'block';
    optionsEl.style.display = 'block';
    submitBtn.style.display = 'block';
    loadQuiz();
};

restartBtn.onclick = () => {
    currentQuizIndex = 0;
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.style.display = 'none';
    questionEl.style.display = 'block';
    optionsEl.style.display = 'block';
    submitBtn.style.display = 'block';
    loadQuiz();
};

// Démarre le quiz
loadQuiz();