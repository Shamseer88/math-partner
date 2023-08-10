// https://github.com/aunyks/newton-api

const apiUrl = 'https://newton.now.sh/api/v2';

async function getAnswer (op, exp) {
    try {
        const response = await fetch(`${apiUrl}/${op}/${exp}`);
        const result = await response.json();
        console.log(result.result);
    } catch (error) {
        console.log(error);
    }
}

getAnswer('abs', -5);

const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', function (e) {
    const problemInput = document.getElementById('problem');
    const operationCategory = document.getElementById('category');
    const operation = operationCategory.value;
    const capitalizedOperation = operation.charAt(0).toUpperCase() + operation.slice(1);
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
        h3.textContent = `${capitalizedOperation}: ${expression}`;
        answerContainer.appendChild(h3);
    }
})