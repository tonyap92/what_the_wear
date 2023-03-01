// CONSTS
const startPage = document.querySelector("#start");
const letGoButton = document.querySelector("#btn-go");

const selectionPage = document.querySelector("#selection");

const seasonSelect = document.querySelector("#season");
const tempInput = document.querySelector("#temperature");
const weatherSelect = document.querySelector("#weather");

const resultPage = document.querySelector("#result");
const viewResultButton = document.querySelector("#btn-result");

let option;
tempInput.min = -50;
tempInput.max = 50;

selectionPage.style.display = "none";
resultPage.style.display = "none";

// LISTENERS
letGoButton.addEventListener("click", handleLetGoButtonClick);
viewResultButton.addEventListener("click", showResult);
tempInput.addEventListener("input", validateTempInput);

// FUNCTIONS
// обрабатываем клик по кнопке "Let's Go!"
function handleLetGoButtonClick() {
  selectionPage.style.display = "block";
  startPage.style.display = "none";
  resultPage.style.display = "none";
}

// валидация инпута с выбором температуры
function validateTempInput() {
  if (tempInput.value < -50) {
    tempInput.value = -50;
    alert("You can enter at least -50!");
  } else if (tempInput.value > 50) {
    tempInput.value = 50;
    alert("You can enter no more than 50");
  }
}

// получаем подходящий варианта одежды в зависимости от сезона, температуры и погоды
function getClothingOption(season, temperature, weather) {
  if (season === "Winter") {
    if (temperature < 0) {
      option = clothingOptions.Winter.belowZero;
    } else if (temperature < 10) {
      option = clothingOptions.Winter.cold;
    } else {
      option = clothingOptions.Winter.mild;
    }
  } else if (season === "Spring") {
    if (temperature < 10) {
      option = clothingOptions.Spring.cold;
    } else if (temperature < 20) {
      option = clothingOptions.Spring.mild;
    } else {
      option = clothingOptions.Spring.warm;
    }
  } else if (season === "Summer") {
    if (temperature < 25) {
      option = clothingOptions.Summer.mild;
    } else {
      option = clothingOptions.Summer.hot;
    }
  } else if (season === "Autumn") {
    if (temperature < 10) {
      option = clothingOptions.Autumn.cold;
    } else if (temperature < 20) {
      option = clothingOptions.Autumn.mild;
    } else {
      option = clothingOptions.Autumn.warm;
    }
  }

  if (weather === "Rainy") {
    option.name += ", raincoat";
  } else if (weather === "Cloudy") {
    option.name += ", light sweater";
  } else if (weather === "Windy") {
    option.name += ", windbreaker";
  }

  return option;
}

// отображаем результат
function showResult() {
  const season = seasonSelect.value;
  const temperature = parseInt(tempInput.value);
  const weather = weatherSelect.value;

  const option = getClothingOption(season, temperature, weather);

  const resultTitle = document.createElement("h1");
  resultTitle.textContent = "Your result:";

  const resultImage = document.createElement("img");
  resultImage.src = `${option.img}`;
  resultImage.alt = `${season} ${weather} ${temperature} degrees`;

  const resultParagraph = document.createElement("p");
  resultParagraph.textContent = option.name;

  const backButton = document.createElement("button");
  backButton.textContent = "Start Over";
  backButton.id = "btn-back";
  backButton.addEventListener("click", handleBackButtonClick);

  resultPage.appendChild(resultTitle);
  resultPage.appendChild(resultImage);
  resultPage.appendChild(resultParagraph);
  resultPage.appendChild(backButton);

  hideSelectionAndShowResult();
}

// скрываем Selection и показываем Result
function hideSelectionAndShowResult() {
  startPage.style.display = "none";
  selectionPage.style.display = "none";
  resultPage.style.display = "block";
}

// обрабатываем клик по кнопке "Start Over"
function handleBackButtonClick() {
  seasonSelect.value = "Winter";
  tempInput.value = 0;
  weatherSelect.value = "Sunny";
  resultPage.innerHTML = "";

  startPage.style.display = "block";
  selectionPage.style.display = "none";
  resultPage.style.display = "none";
}
