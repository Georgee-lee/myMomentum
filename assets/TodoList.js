const todoForm = document.querySelector('.askTodo');
const todoInput = document.querySelector('.todoInput');
const ul = document.querySelector('.todoList');

const TODO_LS = 'userTodos';

let Todos = [];

function removeTodo(event) {
  const li = event.target.parentNode.parentNode;
  ul.removeChild(li);

  const cleanTodos = Todos.filter((obj) => {
    // 아래 콘솔에서 찍어 본 것처럼 li.id 는 "" 문자열 숫자 이기때문에 원하던 숫자 비교가 불가능하다!!
    // console.log(obj.id, li.id);
    // 그래서 Number메소드를 사용하여 스트링을 숫자로 바꾼다
    return obj.id !== Number(li.id);
  });
  Todos = cleanTodos;

  saveTodos();
}

function finishTodo(event) {
  const li = event.target;
  li.classList.toggle('done');
}

function saveTodos() {
  //  배열을 로컬스토리지에 저장하자
  //  localStorage.setItem(TODO_LS, Todos);  이렇게 저장하니까 브라우저는 [object Object]이렇게 저장한다. 
  //  이럴 땐 JSON.stringify를 사용! 스트링으로 바꾸어서 인식하도록 만든다!
  const parsedArr = JSON.stringify(Todos);

  localStorage.setItem(TODO_LS, parsedArr);
}

function createTodo(userTodo) {
  // 새로운 태그를 생성!
  const button = document.createElement('button'); // 삭제 버튼
  const span = document.createElement('span');
  const li = document.createElement('li');

  //  버튼에 아이콘 추가하고, 클릭이벤트 적용... 실험해 보니 event.target 하니 li태그가 나오는데 여기에도 id 가 필요할 것 같다.
  button.innerHTML = '<i class="far fa-trash-alt"></i>';
  button.firstChild.addEventListener('click', removeTodo);
  span.innerText = userTodo;
  span.addEventListener('click', finishTodo);

  li.appendChild(button);
  li.appendChild(span);
  li.id = Todos.length + 1;  // 그래서 여기에 id를 추가!!
  li.classList.add('todo');

  // 화면에 출력
  ul.appendChild(li);

  //  이걸 배열에 그대로 넣기 보다는, 지울 때 id값이 필요하니까 객체로 만들어 넣어 보자
  const newTodo = {
    id: Todos.length + 1,
    todo: userTodo,
  };
  Todos.push(newTodo);

  saveTodos();
}

function inputTodo(event) {
  event.preventDefault();

  //  입력한 값 받고
  const userTodo = todoInput.value;

  //  입력한 값 넘겨서 만들기
  createTodo(userTodo);

  // input창 지우기
  todoInput.value = '';
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODO_LS);

  if (loadedToDos) {
    const parsedTodo = JSON.parse(loadedToDos);
    parsedTodo.forEach(function(obj) {
      createTodo(obj.todo);
    });
  }
}

function init() {
  loadToDos();
  todoForm.addEventListener('submit', inputTodo);
}

init();
