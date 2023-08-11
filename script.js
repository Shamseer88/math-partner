// https://github.com/aunyks/newton-api

const apiUrl = 'https://newton.now.sh/api/v2';

async function getAnswer (op, exp) {
    try {
        const response = await fetch(`${apiUrl}/${op}/${exp}`);
        const result = await response.json();
        // console.log (result.result);
        return result.result
    } catch (error) {
        console.log(error);
    }
}


const searchBtn = document.getElementById('search-btn');
const resultContainer = document.querySelector('.result');
const answerContainer = document.createElement('div');
answerContainer.classList.add('answer-container');

searchBtn.addEventListener('click', async function (e) {
    const problemInput = document.getElementById('problem');
    const operationCategory = document.getElementById('category');
    const operation = operationCategory.value;
    const capitalizedOperation = operation.charAt(0).toUpperCase() + operation.slice(1);
    const expression = problemInput.value;
    resultContainer.appendChild(answerContainer);

    if (expression === '') {
        alert("You have to enter a problem!");
    }
    else {
        const finalResult = await getAnswer(operation, expression);
        console.log(finalResult)
        answerContainer.innerHTML = `
            <h3>${capitalizedOperation}: ${expression}</h3>
            <p>${finalResult}</p>
            <i class="fa-solid fa-trash-can"></i>
        `       
    }
})