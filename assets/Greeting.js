const form = document.querySelector('.askName');
const input = document.querySelector('.nameInput');
const greetMsg = document.querySelector('.greeting');

const LS_KEY = 'userName';
const greetBoxClass = 'show';

function saveName(event) {
  event.preventDefault();
  const name = input.value;
  sayHello(name);
  localStorage.setItem(LS_KEY, name);
}

function askForName() {
  form.addEventListener('submit', saveName);
}

function sayHello(name) {
  form.classList.add('hidden');
  greetMsg.classList.add(greetBoxClass);
  greetMsg.innerHTML = `Hello, ${name}!`;
}

function checkLocalStorage() {
  const userName = localStorage.getItem(LS_KEY);

  if (userName) {
    sayHello(userName);
  } else {
    //  로컬스토리지에 값이 없을 경우 물어보러 가자!
    askForName();
  }
}

function init() {
  //  LocalStroage에 접근하여 해당 키값에 value가 있는 지 확인 후 있으면 이름출력, 없으면 input을 보여주고 데이터 받기!
  checkLocalStorage();
}

init();
