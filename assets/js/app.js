const questions = [
    {
        question: "Fecha de inicio de la Segunda Guerra Mundial",
        answers: [
            { text: "3 de marzo de 1950", correct: false},
            { text: "1 de septiembre de 1939", correct: true},
            { text: "6 de diciembre de 1900", correct: false},
            { text: "8 de octubre de 1860", correct: false}
        ],
        difficulty: "medium"
    },
    {
        question: "Fecha de fin de la Segunda Guerra Mundial",
        answers: [
            { text: "20 de junio de 1950", correct: false},
            { text: "15 de febero de 1880", correct: false},
            { text: "6 de enero 1970", correct: false},
            { text: "2 de septiembre de 1945", correct: true}
        ],
        difficulty: "medium"
    },
    {
        question: "Cual fue el motivo del inicio de la Segunda Guerra Mundial?",
        answers: [
            { text: "La invasion de Polonia", correct: true},
            { text: "La caída de la Unión Soviética", correct: false},
            { text: "La Revolución Industrial", correct: false},
            { text: "La Guerra Civil Española", correct: false}
        ],
        difficulty: "easy"
    },
    {
        question: "Quién era el líder de Alemania durante la Segunda Guerra Mundial?",
        answers: [
            { text: "Winston Churchill", correct: false},
            { text: "Joseph Stalin", correct: false},
            { text: "Adolf Hitler", correct: true},
            { text: "Franklin D. Roosevelt", correct: false}
        ],
        difficulty: "easy"
    },
    {
        question: "¿Cuál fue el nombre del proyecto para desarrollar la primera bomba atómica durante la Segunda Guerra Mundial?",
        difficulty: "hard",
        answers: [
            { text: "Proyecto Manhattan", correct: true},
            { text: "Proyecto Mercury", correct: false},
            { text: "Proyecto Apolo", correct: false},
            { text: "Proyecto Trinity", correct: false}
        ]
    },
    {
        question: "¿Cuál fue la operación militar más grande de la Segunda Guerra Mundial?",
        difficulty: "hard",
        answers: [
            { text: "Operación Barbarroja", correct: true},
            { text: "Operación Overlord", correct: false},
            { text: "Operación Market Garden", correct: false},
            { text: "Operación Torch", correct: false}
        ]
    }
]

const questionElement = document.getElementById("question")
const answerButton = document.getElementById("answer__btn")
const nextButton = document.getElementById("next")
const difficultySelector = document.getElementById("difficulty")

let currentQuestionIndex = 0
let score = 0
let selectedDifficulty = 'easy'
let filteredQuestions = []

function startQuiz() {
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    filterQuestionsByDifficulty()
    showQuestion()
}

function filterQuestionsByDifficulty() {
    filteredQuestions = questions.filter(question => question.difficulty === selectedDifficulty)
}

function showQuestion() {
    resetState()
    let currentQuestion = filteredQuestions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerButton.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState() {
    nextButton.style.display = "none"
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if (isCorrect) {
        selectedBtn.classList.add("correct")
        score++
    } else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = true
    })
    nextButton.style.display = "block"
}

function showScore() {
    resetState()
    questionElement.innerHTML = `You scored ${score} out of ${filteredQuestions.length}!`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}

function handleNextButton() {
    currentQuestionIndex++
    if (currentQuestionIndex < filteredQuestions.length) {
        showQuestion()
    } else {
        showScore()
    }
}

nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < filteredQuestions.length) {
        handleNextButton();
    } else {
        startQuiz()
    }
})

difficultySelector.addEventListener("change", (e) => {
    selectedDifficulty = e.target.value
    startQuiz()
})

startQuiz()
