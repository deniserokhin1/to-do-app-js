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
  if (event.key === 'Enter' && (taskInput.value || idTargetTask)) {
    createTask(idTargetTask);
  }
});

controlsList.addEventListener('change', (event) => {
  changeControls(event);
});

buttonClear.addEventListener('click', () => {
  clearAll();
});

document.addEventListener('mouseup', (event) => {
  target = event.target;
  if (target.classList.contains('task-box-settings__icon')) {
    return;
  }
  const menuEdit = document.querySelectorAll('.task-box-menu');
  menuEdit.forEach((menu) => {
    menu.classList.remove('task-box-menu-click');
  });
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
  if (target.classList.contains('input-radio')) {
    hideAndShowMenu(event.target);
  }
});

function hideAndShowMenu() {
  const inputsRadio = document.querySelectorAll('.input-radio');
  inputsRadio.forEach((inputRadio) => {
    const menuEdit = inputRadio
      .closest('.task-box-settings')
      .querySelector('.task-box-menu');
    inputRadio.checked && !menuEdit.classList.contains('task-box-menu-click')
      ? menuEdit.classList.add('task-box-menu-click')
      : menuEdit.classList.remove('task-box-menu-click');
  });
}

function createTask(id) {
  const userTask = taskInput.value.trim();
  if (!userTask) {
    deleteAfterEditTask(id);
    return;
  }
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
  console.log(target);
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
  taskInput.value = '';
}

function deleteAfterEditTask(id) {
  todos.splice(id, 1);
  localStorage.setItem('todo-list', JSON.stringify(todos));
  renderTodo(todos);
  taskInput.value = '';
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
  taskInput.value = '';
  if (arrIDForClear.length !== 0) {
    clearAll();
  }
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
  taskInput.value = '';
  hideArrow();
}

function hideArrow() {
  const arrows = document.querySelectorAll('.task-box-menu__icon-arrow');
  console.log(arrows);
  const arrowsNotHide = [];
  arrows.forEach((arrow) => {
    if (!arrow.closest('.task-box-item').classList.contains('hide')) {
      arrowsNotHide.push(arrow);
    }
  });
  console.log(arrowsNotHide);

  for (let i = 0; i < arrowsNotHide.length; i++) {
    if (i === 0) {
      console.log(arrowsNotHide[i]);
      arrowsNotHide[i].classList.add('hide');
      arrowsNotHide[i].previousElementSibling.classList.add('icon-goup-item-not-margin');
    } else {
      arrowsNotHide[i].classList.remove('hide');
      arrowsNotHide[i].previousElementSibling.classList.remove('icon-goup-item-not-margin');
    }
  }
}
