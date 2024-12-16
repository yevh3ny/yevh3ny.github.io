document.getElementById("start-game-btn").addEventListener("click", function() {
    document.querySelector(".welcome-screen").style.display = "none";
    document.querySelector(".game-screen").style.display = "block";
});

let balance = 100;  
let jackpot = 1000;  
let selectedNumbers = [];  
let selectedMultiplier = 1;  

const multiplierButtons = document.querySelectorAll('.multiplier-btn');
multiplierButtons.forEach(button => {
    button.addEventListener('click', function() {
        multiplierButtons.forEach(b => b.classList.remove('selected')); 
        
        if (this.getAttribute('data-multiplier') === '2') {
            selectedMultiplier = 2;  
        } else if (this.getAttribute('data-multiplier') === '10') {
            selectedMultiplier = 10;  
        } else {
            selectedMultiplier = 1;  
        }

        this.classList.add('selected'); 
    });
});

const numberButtons = document.querySelectorAll('.number-btn');
numberButtons.forEach(button => {
    button.addEventListener('click', function() {
        const number = parseInt(this.textContent);
        
        if (this.classList.contains('selected')) {
            this.classList.remove('selected');
            selectedNumbers = selectedNumbers.filter(n => n !== number);  
        } else {
            if (selectedNumbers.length < 4) {
                this.classList.add('selected');
                selectedNumbers.push(number);  
            }
        }
    });
});

document.getElementById('playButton').addEventListener('click', function() {
    if (balance >= selectedMultiplier) {
        balance -= selectedMultiplier;  

        jackpot += selectedMultiplier * 1.00;  

        document.getElementById('balance').textContent = balance;
        document.getElementById('jackpot').textContent = Math.round(jackpot);

        const winningNumbers = generateWinningNumbers();
        const numbersContainer = document.getElementById('winningNumbers');
        numbersContainer.innerHTML = '';

        winningNumbers.forEach(function(num) {
            const numberBox = document.createElement('div');
            numberBox.classList.add('number-box');
            numberBox.textContent = num;
            numbersContainer.appendChild(numberBox);
        });

        const matchedNumbers = selectedNumbers.filter(num => winningNumbers.includes(num));
        const matchedCount = matchedNumbers.length;

        if (matchedCount > 0) {
            let returnAmount = 0;
            if (matchedCount === 1) {
                returnAmount = selectedMultiplier;  
            } else if (matchedCount === 2) {
                returnAmount = selectedMultiplier * 5;  
            } else if (matchedCount === 3) {
                returnAmount = selectedMultiplier * 50;  
            } else if (matchedCount === 4) {
                returnAmount = jackpot;  
                jackpot = 0;  
            }

            balance += returnAmount;  
            document.getElementById('balance').textContent = balance;
        } else {
            document.getElementById('balance').textContent = balance;
        }
    } else {
        alert('Недостаточно средств на балансе!');
    }
});

function generateWinningNumbers() {
    const numbers = [];
    while (numbers.length < 4) {
        const num = Math.floor(Math.random() * 36) + 1;
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    return numbers;
}
