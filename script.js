
var city = "surat"
const api = 'b419d44e0369ee390b80eb2f91d9832d'
var lon;
var lat;

const search = document.querySelector('#search');
search.addEventListener("keyup", () => {
    var city = document.querySelector('#search').value
    console.log(city);
    $.ajax({
        url: `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api}`,
        type: 'GET',
        success: function (wData) {
            const ul = document.getElementById('listItems');
            ul.innerHTML = '';

            if (wData.length === 0) {
                li = document.createElement('li');
                li.innerHTML =
                    `<li class="list-group-item">
                    <div class="">
                        <p class="text-center mb-0">No Cities can be found!</P>
                    </div>
                </li>`;
                ul.appendChild(li);
            }

            for (let i = 0; i < wData.length; i++) {
                li = document.createElement('li');
                li.innerHTML =
                    `<li class="list-group-item d-flex justify-content-between align-items-center">
                    <div class="ms-2 me-auto">
                        <h5 class="fw-medium fs-6 mb-0">
                            ${wData[i].name}
                        </h5>
                        <p class="mb-1 fs-6">
                            ${wData[i].state}
                        </p>
                    </div>
                    <span class="badge bg-transparent border border-light text-white fs-6 rounded-pill">${wData[i].country}</span>
                </li>`;
                ul.appendChild(li);

                li.addEventListener('click', function () {
                    const cityIndex = Array.from(ul.children).indexOf(this);
                    getWeather(wData[cityIndex].lat, wData[cityIndex].lon)
                    ul.innerHTML = '';
                });
            }
        }
    })
});

function getWeather(lat, lon) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`,
        type: 'GET',
        success: function (wData) {
            console.log(wData);
            const ico = document.getElementById('icon')
            ico.src = `https://openweathermap.org/img/wn/${wData.weather[0].icon}@2x.png`;

            const weaMain = document.querySelector('#weaMain')
            const weaDes = document.querySelector('#weaDes')
            const windDeg = document.querySelector('#windDeg')
            const windSpeed = document.querySelector('#windSpeed')
            const humi = document.querySelector('#humi')
            const feels = document.querySelector('#feels')
            const press = document.querySelector('#press')
            const temp = document.querySelector('#temp')
            const tempMax = document.querySelector('#tempMax')
            const tempMin = document.querySelector('#tempMin')

            weaMain.textContent = wData.weather[0].main
            weaDes.textContent = wData.weather[0].description
            windDeg.textContent = wData.wind.deg
            windSpeed.textContent = wData.wind.speed
            humi.textContent = wData.main.humidity
            feels.textContent = Math.trunc(wData.main.feels_like - 273) + "°C"
            press.textContent = wData.main.pressure + ' hPa'
            temp.textContent = Math.trunc(wData.main.temp - 273) + "°C"
            tempMax.textContent = Math.trunc(wData.main.temp_max - 273) + "°C"
            tempMin.textContent = Math.trunc(wData.main.temp_min - 273) + "°C"
        }
    })
}
