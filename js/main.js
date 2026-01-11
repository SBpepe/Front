function updateDate() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    document.getElementById('date').textContent = now.toLocaleDateString('ru-RU', options);
}
updateDate(); // первый вызов при загрузке
setInterval(updateDate, 60000); // обновление каждую минуту

//API
const API_URL = "https://localhost:7265/api/metrostations/random";

document.getElementById("getRandomStationBtn").addEventListener("click", async ()=> {
    try{
        const response = await fetch(API_URL);

        if (!response.ok){
            throw new Error("Ошибка запроса: "+ response.status);
        }

        const station = await response.json();
        console.log("Ответ сервера:", station);

        

        if (!station || typeof station.name !== "string") {
            document.getElementById("station").textContent =
                "Некорректный ответ сервера";
            return;
        }

        document.getElementById("station").textContent =
                "Станция метро: " + station.name;
    }
    catch (error) {
        console.error(error);
        document.getElementById("station").textContent =
            "Ошибка подключения к серверу";
    }
})