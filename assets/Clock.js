const clock = document.querySelector('#mainClock');

function getDate() {
  //  Date 객체를 만들어 시간을 가져온다
  const date = new Date();

  //  이제 시, 분, 초를 가져온다.
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  //  clock.innerHTML = `${hours}:${minutes}:${seconds}`;  이렇게 할 경우 자릿수가 달라져 보기 좋지않다! 수정해 보자

  //  아래와 같이 삼항연산자를 사용하여 표현 가능! 
  clock.innerHTML = `${hours < 10 ? `0${hours}`:`${hours}`}:${minutes < 10 ? `0${minutes}`:`${minutes}`}:${seconds < 10 ? `0${seconds}`:`${seconds}`}`;
}

function init() {
  //  시작하면서 한 번 호출한 후
  getDate();

  //  1초마다 시간을 갱신!
  setInterval(getDate, 1000);
}

init();
