function updateDate() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const [firstLetter, ...letters] = now.toLocaleDateString("ru-RU", options);

  document.getElementById("date").textContent =
    firstLetter.toUpperCase() + letters.join("");
}
updateDate(); // первый вызов при загрузке
setInterval(updateDate, 60000); // обновление каждую минуту

//API
const API_URL = "https://localhost:7265/api/metrostations/random";
const errorContainer = document.querySelector(".metro__error");
const labelContainer = document.querySelector(".metro__info-label");

document
  .getElementById("getRandomStationBtn")
  .addEventListener("click", async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Ошибка запроса: " + response.status);
      }
      const station = await response.json();
      console.log("Ответ сервера:", station);
      if (!station || typeof station.name !== "string") {
        document.getElementById("station").textContent =
          "Некорректный ответ сервера";
        return;
      }
      document.getElementById("station").textContent = station.name;
      labelContainer.classList.remove("hidden");
      errorContainer.classList.add("hidden");
    } catch (error) {
      console.error(error);
      labelContainer.classList.add("hidden");
      errorContainer.classList.remove("hidden");
    }
  });
