import { cars as initialCars } from "./data.js";
// html
const elBtn = document.getElementById("btn");
const elRoyhat = document.getElementById("royhat");
const elModal = document.getElementById("modal1");
const elModalQoshish = document.getElementById("modal-qoshish");
const elBatafsil = document.getElementById("batafsil");
const elBatafsilMalumot = document.getElementById("batafsil-malumot");
const elModalOchish = document.getElementById("modalochish");
const elModalYopish = document.getElementById("modal-yopish");
const elSaqlash = document.getElementById("saqlash");
const inputNomi = document.getElementById("nomi");
const inputCountry = document.getElementById("country");
const inputTurkum = document.getElementById("turkumi");
const inputColor = document.getElementById("color");
const inputFikr = document.getElementById("fikr");
// dark
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
let cars = JSON.parse(localStorage.getItem("cars_data")) || initialCars;

let tahrirlashId = null;
let batafsilId = null;

function royhatChiqarish() {
  elRoyhat.innerHTML = "";
  cars.forEach((car) => {
    const li = document.createElement("li");
    li.classList.add("car-item");
    li.innerHTML = `
  <b>Name: ${car.name}</b><br>
  Country: ${car.country}<br>
  Turkum: ${car.category}<br>
  Rang: ${car.color}<br>
  <button class="view-btn">👁️</button>
  <button class="edit-btn">✏️</button>
  <button class="delete-btn">🗑️</button>
`;
    li.querySelector(".view-btn").addEventListener("click", () => {
      batafsil(car.id);
    });

    li.querySelector(".edit-btn").addEventListener("click", () => {
      edit(car.id);
    });

    li.querySelector(".delete-btn").addEventListener("click", () => {
      const answer = prompt("O‘chirilsinmi? (ha/yo‘q)");
      if (answer === "ha") {
        cars = cars.filter((el) => el.id !== car.id);
        royhatChiqarish();
      }
    });
    elRoyhat.appendChild(li);
  });
  localStorage.setItem("cars_data", JSON.stringify(cars));
}
// modal
elModalOchish.addEventListener("click", () => {
  tahrirlashId = null;
  elModalQoshish.style.display = "block";
  elSaqlash.style.display = "inline-block";
  elModal.style.display = "grid";
});
elModalYopish.addEventListener("click", () => {
  elModal.style.display = "none";
});
function openEditModal(id) {
  const car = cars.find((el) => el.id === id);
  if (!car) return;
  tahrirlashId = id;
  elModalQoshish.style.display = "block";
  elSaqlash.style.display = "inline-block";
  inputNomi.value = car.name;
  inputCountry.value = car.country;
  inputTurkum.value = car.category;
  inputColor.value = car.colorName;
  inputFikr.value = car.description;
  elModal.style.display = "grid";
}
window.edit = openEditModal;

function modalochish(id) {
  const car = cars.find((el) => el.id === id);
  if (!car) return;
  batafsilId = id;
  tahrirlashId = null;
  elModalQoshish.style.display = "none";
  elBatafsil.style.display = "block";
  elSaqlash.style.display = "none";
  elBatafsilMalumot.innerHTML = `
    <p><b>Nomi:</b> ${car.name}</p>
    <p><b>Trim:</b> ${car.trim}</p>
    <p><b>Generation:</b> ${car.generation}</p>
    <p><b>Yil:</b> ${car.year}</p>
    <p><b>Rangi:</b> ${car.color}</p>
    <p><b>Turkumi:</b> ${car.category}</p>
    <p><b>Eshik/ o'rindiq:</b> ${car.doorCount} / ${car.seatCount}</p>
    <p><b>Maks tezlik:</b> ${car.maxSpeed}</p>
    <p><b>0-100:</b> ${car.acceleration}</p>
    <p><b>Dvigatel:</b> ${car.engine}</p>
    <p><b>Quvvat (hp):</b> ${car.horsepower}</p>
    <p><b>Yoqilg'i turi:</b> ${car.fuelType}</p>
    <p><b>Yoqilg'i (city/highway/combined):</b> ${car.fuelConsumption}</p>
    <p><b>Mamlakat:</b> ${car.country}</p>
    <p><b>Tavsif:</b> ${car.description}</p>
  `;

  elModal.style.display = "grid";
}
window.batafsil = modalochish;

function newCar(id = Date.now()) {
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
  const index = cars.findIndex((el) => el.id === tahrirlashId);

  if (index !== -1) {
    cars[index] = newCar(tahrirlashId);
  } else {
    cars.push(newCar());
  }
  royhatChiqarish();
  elModal.style.display = "none";
});

function tozalash() {
  inputNomi.value = "";
  inputCountry.value = "";
  inputTurkum.value = "";
  inputColor.value = "";
  inputFikr.value = "";
}
royhatChiqarish();
