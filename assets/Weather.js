// 날씨 API는 https://openweathermap.org/ 에서 사용!

const API_KEY = 'ffd6d94dcbac3691426e9420932a1201';
const COORDS = 'coords';
const weather = document.querySelector('.weather');


function getWeather(latitude, longitude) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  ).then((response) => {
    //  then을 사용하는 이유는 위에 썼던 fetch가 다 완료가 되면, 그러면, 여기를 실행해라 라는 의미이다.
    return response.json()
  }).then((json) => {
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature}° @ ${place}`;
  });
}

function getGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // 객체를 만들 때, key와 value가 같은 이름이라면 아래와 같이 표기 가능!!
  const coordsObj = {
    latitude,
    longitude
  };

  localStorage.setItem(COORDS, JSON.stringify(coordsObj));

  getWeather(latitude, longitude);
}

function getGeoFail() {
  console.log('위치정보를 가져올 수 없습니다.');
}

function askForCoords() {
  //  navigator API에 많은 기능들이 있으니 나중에 꼭 한번 살펴보자!
  navigator.geolocation.getCurrentPosition(getGeoSuccess, getGeoFail);
}

function loadCoords() {
  // 위치 정보를 로컬스토리지에 저장해 놓고, 있으면 불러온다. 새로고침 할 때마다 계속 서버에 접근할 필요가 없다!!
  const loadedCoords = localStorage.getItem(COORDS);

  if (loadedCoords === null) {
    askForCoords();
  } else {
    // 날씨 가져오기
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
