// import '../src/style/normolize.css';
// import '../src/style/style.css';

const taskInput = document.querySelector('.block-input__input');
const listToDo = document.querySelector('.task-box__list');
const controlsList = document.querySelector('.controls__list');
const radioButtons = document.querySelectorAll('.controls-item__radio-button');
const buttonClear = document.querySelector('.controls__clear-btn');

let todos = JSON.parse(localStorage.getItem('todo-list'));
let idTargetTask = undefined;
let idRadioButton = 'tasks';

window.addEventListener('load', renderTodo(todos));
taskInput.focus();

taskInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter' && taskInput.value) {
    createTask(idTargetTask);
  }
});

controlsList.addEventListener('change', (event) => {
  changeControls(event);
});

buttonClear.addEventListener('click', () => {
  clearAll();
});

listToDo.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('input')) {
    updateStatusTask(target);
  }
  if (target.classList.contains('delete')) {
    deleteTask(target);
  }
  if (target.classList.contains('edit')) {
    editTask(target);
  }
});

function createTask(id) {
  const userTask = taskInput.value.trim();
  if (!todos) {
    todos = [];
  }
  let taskInfo = {
    name: userTask,
    status: false,
  };
  id ? (todos[id] = taskInfo) : todos.push(taskInfo);
  idTargetTask = undefined;
  localStorage.setItem('todo-list', JSON.stringify(todos));
  taskInput.value = '';
  renderTodo(todos);
}

function updateStatusTask(target) {
  const text = target.nextElementSibling;
  target.checked ? text.classList.add('true') : text.classList.remove('true');
  todos[target.id].status = target.checked;
  localStorage.setItem('todo-list', JSON.stringify(todos));
  setTimeout(() => {
    toggleListTasks();
  }, 100);
}

function deleteTask(target) {
  const targetID = target.closest('.task-box-item').querySelector('.input').id;
  todos.splice(targetID, 1);
  localStorage.setItem('todo-list', JSON.stringify(todos));
  renderTodo(todos);
}

function renderTodo() {
  if (!todos) {
    return;
  }
  listToDo.innerHTML = '';
  // eslint-disable-next-line no-undef
  listToDo.appendChild(templateEngine(todos.map(todoItemTamplate)));
  toggleListTasks();
}

function editTask(target) {
  idTargetTask = target.closest('.task-box-item').querySelector('.input').id;
  const textTask = target.closest('.task-box-item').querySelector('.text');
  taskInput.value = textTask.textContent;
  taskInput.focus();
}

function changeControls(event) {
  idRadioButton = event.target.id;
  radioButtons.forEach((radioButton) => {
    radioButton.checked
      ? radioButton.previousElementSibling.classList.add('active')
      : radioButton.previousElementSibling.classList.remove('active');
  });
  toggleListTasks();
}

function clearAll() {
  const taskItems = document.querySelectorAll('.task-box-item');
  const arrTaskItems = Array.from(taskItems);
  let arrIDForClear = arrTaskItems
    .filter((item) => !item.classList.contains('hide'))
    .map((item) => item.querySelector('.input').id);
  arrIDForClear.reverse().map((id) => todos.splice(id, 1));
  localStorage.setItem('todo-list', JSON.stringify(todos));
  renderTodo(todos);
}

function toggleListTasks() {
  const tasks = document.querySelectorAll('.task-box-item__text');
  switch (idRadioButton) {
    case 'tasks':
      tasks.forEach((task) => {
        task.classList.contains('true')
          ? task.closest('.task-box-item').classList.add('hide')
          : task.closest('.task-box-item').classList.remove('hide');
      });
      break;
    case 'completed':
      tasks.forEach((task) => {
        task.classList.contains('true')
          ? task.closest('.task-box-item').classList.remove('hide')
          : task.closest('.task-box-item').classList.add('hide');
      });
      break;
    case 'all':
      tasks.forEach((task) => {
        task.closest('.task-box-item').classList.remove('hide');
      });
      break;
    default:
      break;
  }
  taskInput.focus();
}
