import { cars } from "./data.js";

// html
const elBtn = document.getElementById("btn");
const elRoyhat = document.getElementById("royhat");
const elModal = document.getElementById("modal1");
const elModalOchish = document.getElementById("modalochish");
const elModalYopish = document.getElementById("modal-yopish");
const elSaqlash = document.getElementById("saqlash");

const inputNomi = document.getElementById("nomi");
const inputCountry = document.getElementById("country");
const inputTurkum = document.getElementById("turkumi");
const inputColor = document.getElementById("color");
const inputFikr = document.getElementById("fikr");

// dark mode
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

elBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// localstorage
let carsData = JSON.parse(localStorage.getItem("cars_data")) || cars;

let tahrirlashId = null;

function royhatChiqarish() {
  elRoyhat.innerHTML = "";
  carsData.forEach((car) => {
    const li = document.createElement("li");
    li.classList.add("car-item");
    li.innerHTML = `
  <b>Name: ${car.name}</b><br>
  Country: ${car.country}<br>
  Turkum: ${car.category}<br>
  Rang: ${car.colorName}<br>
  <button class="edit-btn">✏️</button>
  <button class="delete-btn">🗑️</button>
  <button class="view-btn">👁️</button>
`;

    li.querySelector(".edit-btn").addEventListener("click", () => {
      edit(car.id);
    });

    li.querySelector(".view-btn").addEventListener("click", () => {
      edit(car.id);
    });

    li.querySelector(".delete-btn").addEventListener("click", () => {
      if (confirm("O‘chirilsinmi?")) {
        carsData = carsData.filter((el) => el.id !== car.id);
        royhatChiqarish();
      }
    });

    elRoyhat.appendChild(li);
  });
  localStorage.setItem("cars_data", JSON.stringify(carsData));
}

elModalOchish.addEventListener("click", () => {
  elModal.style.display = "grid";
});

elModalYopish.addEventListener("click", () => {
  elModal.style.display = "none";
});

function openEditModal(id) {
  const car = carsData.find((el) => el.id === id);
  if (!car) return;
  tahrirlashId = id;
  inputNomi.value = car.name;
  inputCountry.value = car.country;
  inputTurkum.value = car.category;
  inputColor.value = car.colorName;
  inputFikr.value = car.description;
  elModal.style.display = "grid";
}
window.edit = openEditModal;

function randomId() {
  return Math.floor(Math.random() * 1000000);
}

function newCar(id = randomId()) {
  return {
    id,
    name: inputNomi.value,
    country: inputCountry.value,
    category: inputTurkum.value,
    colorName: inputColor.value,
    description: inputFikr.value,
  };
}

elSaqlash.addEventListener("click", () => {
  const index = carsData.findIndex((el) => el.id === tahrirlashId);
  if (index >= 0) {
    carsData[index] = newCar(tahrirlashId);
  } else {
    carsData.push(newCar());
  }
  royhatChiqarish();
  elModal.style.display = "none";
});

royhatChiqarish();
