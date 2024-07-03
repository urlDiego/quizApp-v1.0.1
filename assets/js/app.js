const questions = [
    {
        question: "Fecha de inicio de la Segunda Guerra Mundial",
        answers: [
            { text: "3 de marzo de 1950", correct: false},
            { text: "1 de septiembre de 1939", correct: true},
            { text: "6 de diciembre de 1900", correct: false},
            { text: "8 de octubre de 1860", correct: false}
        ]

    },
    {
        question: "Fecha de fin de la Segunda Guerra Mundial",
        answers: [
            { text: "20 de junio de 1950", correct: false},
            { text: "15 de febero de 1880", correct: false},
            { text: "6 de enero 1970", correct: false},
            { text: "2 de septiembre de 1945", correct: true}
        ]

    },
    {
        question: "Cual fue el motivo del inicio de la Segunda Guerra Mundial?",
        answers: [
            { text: "La invasion de Polonia", correct: true},
            { text: "La caída de la Unión Soviética", correct: false},
            { text: "La Revolución Industrial", correct: false},
            { text: "La Guerra Civil Española", correct: false}
        ]

    },
    {
        question: "Quién era el líder de Alemania durante la Segunda Guerra Mundial?",
        answers: [
            { text: "Winston Churchill", correct: false},
            { text: "Joseph Stalin", correct: false},
            { text: "Adolf Hitler", correct: true},
            { text: "Franklin D. Roosevelt", correct: false}
        ]
    }
]

const questionElement = document.getElementById("question")
const answerButton = document.getElementById("answer__btn")
const nextButton = document.getElementById("next")

let currentQuestionIndex = 0
let score = 0

function startQuiz() {
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion()
}

function showQuestion() {
    resetState()
    let currenQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + ". " +currenQuestion.
    question;

    currenQuestion.answers.forEach(answer => {
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
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}

function handleNextButton() {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore()
    }
}

nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz()
    }
})

startQuiz()
