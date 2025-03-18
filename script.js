let character = "";
let score = 0;
let mistakes = 0;
let currentQuestion = 0;

let memoryCards = [
    { text: "Mutluluk", pair: "Sevgi" },
    { text: "Özgüven", pair: "Kendini kabul" },
    { text: "Neşe", pair: "Hayatın tadını çıkarmak" }
];

function selectCharacter(name) {
    character = name;
    document.getElementById("character-selection").style.display = "none";
    document.getElementById("game").style.display = "block";
}

function startMemoryGame() {
    document.getElementById("memoryGame").style.display = "block";
    let shuffledCards = [...memoryCards, ...memoryCards].sort(() => Math.random() - 0.5);
    document.getElementById("cards").innerHTML = shuffledCards.map((card, index) => `
        <div class="card" onclick="selectCard(${index})">${card.text}</div>
    `).join("");
}

let selectedCards = [];

function selectCard(index) {
    if (selectedCards.length < 2) {
        selectedCards.push({ index, text: memoryCards[index % memoryCards.length].text });
    }
}

function checkMemoryGame() {
    if (selectedCards.length === 2) {
        let [first, second] = selectedCards;
        let correctPair = memoryCards.find(c => c.text === first.text || c.text === second.text);
        if (correctPair && (correctPair.text === first.text && correctPair.pair === second.text ||
                            correctPair.pair === first.text && correctPair.text === second.text)) {
            alert("Doğru Eşleştirme! Jeton kazandın.");
            score += 5;
        } else {
            alert("Yanlış! Tekrar dene.");
            mistakes++;
            if (mistakes >= 3) {
                alert("🤖 Chatbot devreye giriyor...");
                window.open("https://piga-ai.onrender.com/", "_blank");
            }
        }
        selectedCards = [];
    }
}



