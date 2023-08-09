// https://github.com/aunyks/newton-api

const apiUrl = 'https://newton.now.sh/api/v2';

const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', function () {
    const problemInput = document.getElementById('problem');
    const operationCategory = document.getElementById('category');
    const operation = operationCategory.value;
    const expression = problemInput.value;

    if (expression === '') {
        alert("You have to enter a problem!");
    }
    else {
        const resultContainer = document.querySelector('.result');
        const answerContainer = document.createElement('div');
        answerContainer.classList.add('answer-container');
        resultContainer.appendChild(answerContainer);
        const h3 = document.createElement('h3');
        h3.textContent = `${operation}: ${expression}`;
        answerContainer.appendChild(h3);
    }
})