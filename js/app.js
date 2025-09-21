// app.js
import { cars } from "./data.js"; // data.js fayldan mashinalarni import qilamiz

const container = document.getElementById("carsContainer");
const elBtn = document.getElementById("btn");
elBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Mashinalarni chiqarish
cars.forEach((car) => {
  // div yaratamiz
  const card = document.createElement("div");
  card.className = "bg-white p-4 rounded-lg shadow";

  // card ichiga mashina ma'lumotlarini yozamiz
  card.innerHTML = `
  <div></div>
    <h2 class="text-lg font-bold">${car.name}</h2>
    <p><strong>Trim:</strong> ${car.trim}</p>
    <p><strong>Mamlakat:</strong> ${car.country}</p>
    <p><strong>Turkum:</strong> ${car.type}</p>
    <p><strong>Rang:</strong> ${car.color}</p>
  `;

  // containerga qo‘shamiz
  container.appendChild(card);
});
