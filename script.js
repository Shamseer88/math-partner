// https://github.com/aunyks/newton-api

const apiUrl = "https://newton.now.sh/api/v2";

let solvedProblemsArray = getSolvedProblems();

function addSolvedProblems(operation, expression, result) {
  solvedProblemsArray = [
    ...solvedProblemsArray,
    { operation, expression, result },
  ];
  addSolvedProblemsToLocalStorage(solvedProblemsArray);
}

function addSolvedProblemsToLocalStorage(solvedProblems) {
  const solvedProblemsJSON = JSON.stringify(solvedProblems);
  localStorage.setItem("solvedProblems", solvedProblemsJSON);
}

function getSolvedProblems() {
  const retrievedSolvedProblemsJSON = localStorage.getItem("solvedProblems");
  return retrievedSolvedProblemsJSON
    ? JSON.parse(retrievedSolvedProblemsJSON)
    : [];
}

async function getAnswer(op, exp) {
  try {
    const response = await fetch(`${apiUrl}/${op}/${exp}`);
    const result = await response.json();
    // console.log (result.result);
    // console.log(result);
    addSolvedProblems(result.operation, result.expression, result.result);
    return result.result;
  } catch (error) {
    console.log(error);
  }
}

const searchBtn = document.getElementById("search-btn");
const resultContainer = document.querySelector(".result");
const answerContainer = document.createElement("div");
answerContainer.classList.add("answer-container");

searchBtn.addEventListener("click", async function (e) {
  const problemInput = document.getElementById("problem");
  const operationCategory = document.getElementById("category");
  const operation = operationCategory.value;
  const capitalizedOperation =
    operation.charAt(0).toUpperCase() + operation.slice(1);
  const expression = problemInput.value;
  resultContainer.appendChild(answerContainer);

  if (expression === "") {
    alert("You have to enter a problem!");
  } else {
    try {
      const finalResult = await getAnswer(operation, expression);
      console.log(finalResult);
      answerContainer.innerHTML = `
                  <div class="result-section">
                    <h3>${capitalizedOperation}: ${expression}</h3>
                    <p>${finalResult}</p>
                    <i class="fa-solid fa-trash-can" id="delete-btn"></i>
                  </div>
            `;
    } catch (error) {
      console.log(error);
    }
    problemInput.value = "";
  }
});

// Getting result history
console.log(solvedProblemsArray[0].operation);
const solvedSolutionsBtn = document.querySelector(".solved-solutions-btn");
const tableBody = document.getElementById("table-body");

solvedSolutionsBtn.addEventListener("click", function () {
  solvedProblemsArray.forEach((solution) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
                    <td>${solution.expression}</td>
                    <td>${solution.operation}</td>
                    <td>${solution.result}</td>
                    <td class="close-btn-td"><i class="fa-regular fa-circle-xmark"></i></td>
                    `;
    tableBody.appendChild(tr);
  });
});

// Deleting the result div by clicking on the bin icon
resultContainer.addEventListener("click", function (event) {
  if (event.target && event.target.matches(".fa-trash-can")) {
    resultContainer.innerHTML = "";
  }
});

//Removing tr when click to close button, removing solution from local storage
tableBody.addEventListener("click", function (event) {
  if (event.target && event.target.matches(".fa-regular.fa-circle-xmark")) {
    const tr = event.target.closest("tr");
    if (tr) {
      tr.remove();
      const expression = tr.querySelector("td:first-child").textContent;
      removeSolutionFromLocalStorage(expression);
    }
  }
});
function removeSolutionFromLocalStorage(expression) {
  const solvedProblemsArray =
    JSON.parse(localStorage.getItem("solvedProblems")) || [];

  const solutionIndex = solvedProblemsArray.findIndex(
    (solution) => solution.expression === expression
  );

  if (solutionIndex !== -1) {
    solvedProblemsArray.splice(solutionIndex, 1);
    localStorage.setItem("solvedProblems", JSON.stringify(solvedProblemsArray));
  }
}
