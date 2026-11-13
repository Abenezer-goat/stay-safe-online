
const questions = [
    {
        question: "1. What should you do if a stranger asks for your password?",
        answers: [
            "Give it to them",
            "Ignore them and never share it",
            "Post it online"
        ],
        correct: 1
    },
    {
        question: "2. What should you do if you receive a suspicious link?",
        answers: [
            "Click it immediately",
            "Send it to everyone",
            "Avoid clicking and delete or report it"
        ],
        correct: 2
    },
    {
        question: "3. Which password is the strongest?",
        answers: [
            "123456",
            "password",
            "Blue!River92#Cloud"
        ],
        correct: 2
    },
    {
        question: "4. What should you do on a shopping website?",
        answers: [
            "Check that it is a trusted website",
            "Buy from every website",
            "Share your password"
        ],
        correct: 0
    },
    {
        question: "5. What should you do if something online makes you uncomfortable?",
        answers: [
            "Keep it a secret",
            "Tell a trusted adult",
            "Reply to the stranger"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function showQuestion() {
    answered = false;

    const q = questions[currentQuestion];

    document.getElementById("question").textContent =
        q.question;

    document.getElementById("feedback").textContent = "";

    document.getElementById("score").textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    const answers = document.getElementById("answers");
    answers.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.textContent = answer;

        button.onclick = () => checkAnswer(index);

        answers.appendChild(button);
    });

    document.getElementById("next").textContent =
        currentQuestion === questions.length - 1
        ? "See My Results"
        : "Next Question";
}

function checkAnswer(selected) {
    if (answered) return;

    answered = true;

    const correct = questions[currentQuestion].correct;
    const buttons = document.querySelectorAll("#answers button");

    if (selected === correct) {
        score++;
        document.getElementById("feedback").textContent =
            "✅ Correct! Great job!";
        document.getElementById("feedback").style.color = "green";
    } else {
        document.getElementById("feedback").textContent =
            "❌ Not quite! The correct answer is: " +
            questions[currentQuestion].answers[correct];
        document.getElementById("feedback").style.color = "red";
    }

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === correct) {
            button.style.background = "#c9f5d2";
            button.style.borderColor = "green";
        }
    });
}

function nextQuestion() {
    if (!answered) {
        document.getElementById("feedback").textContent =
            "Please choose an answer first!";
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const percentage = Math.round(
        (score / questions.length) * 100
    );

    document.getElementById("question").textContent =
        "🎉 Quiz Completed!";

    document.getElementById("answers").innerHTML =
        `<h2>${score} / ${questions.length}</h2>
         <p>You scored ${percentage}%!</p>`;

    document.getElementById("feedback").textContent =
        percentage >= 80
        ? "Excellent! You know how to stay safe online!"
        : "Good effort! Keep learning how to stay safe!";

    document.getElementById("next").textContent =
        "Try Again";

    document.getElementById("next").onclick = () => {
        currentQuestion = 0;
        score = 0;
        document.getElementById("next").onclick = nextQuestion;
        showQuestion();
    };

    document.getElementById("score").textContent =
        "Remember: Think before you click!";
}

showQuestion();
