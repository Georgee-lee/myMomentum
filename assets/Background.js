const body = document.querySelector('body');

const IMAGE_NUM = 5;
const IMAGE_CLASS = 'bgImg';

function paintBackGround(number) {
  const img = new Image();
  img.src = `assets/images/${number}.jpg`;
  img.classList.add(IMAGE_CLASS);
  body.prepend(img);
}

function getRanNumber() {
  //  5라고 쓰면 0~4까지만 나온다. 그래서 1부터 5까지 나오게 하기 위해 결과에 +1을 해 준다
  const result = Math.floor((Math.random() * IMAGE_NUM) + 1);
  return result;
}

function init() {
  const randomNumber = getRanNumber();
  paintBackGround(randomNumber);
}

init();
