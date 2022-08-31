/* eslint-disable no-undef */
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

window.addEventListener('load', () => {
  renderTodo(todos);
  taskInput.focus();
});

taskInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter' && (taskInput.value || idTargetTask)) {
    createTask(taskInput.value, idTargetTask);
  }
});

controlsList.addEventListener('change', (event) => {
  changeControls(event);
});

buttonClear.addEventListener('click', () => {
  clearAll();
});

document.addEventListener('mouseup', (event) => {
  const target = event.target;
  clickOnDocument(target);
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
    pasteTextTaskInInput(target);
  }
  if (target.classList.contains('input-radio')) {
    hideAndShowMenu(event.target);
  }
  if (target.classList.contains('task-box-menu__icon-arrow')) {
    moveArrow(target);
  }
});

function hideAndShowMenu() {
  const inputsRadio = document.querySelectorAll('.input-radio');
  inputsRadio.forEach((inputRadio) => {
    let menuEdit = inputRadio
      .closest('.task-box-settings')
      .querySelector('.task-box-menu');
    inputRadio.checked && !menuEdit.classList.contains('task-box-menu-click')
      ? menuEdit.classList.add('task-box-menu-click')
      : menuEdit.classList.remove('task-box-menu-click');
    menuEdit = null;
  });
}

function createTask(valueInput, id) {
  valueInput.trim();
  if (!valueInput) {
    deleteAfterEditTask(id);
    return;
  }
  if (!todos) {
    todos = [];
  }
  let taskInfo = {
    name: valueInput,
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
  listToDo.appendChild(templateEngine(todos.map(todoItemTamplate)));
  toggleListTasks();
}

function pasteTextTaskInInput(target) {
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
}

function clickOnDocument(target) {
  if (
    target.classList.contains('task-box-settings__icon') ||
    target.classList.contains('block-input__input') ||
    target.classList.contains('task-box-menu__icon-arrow') ||
    target.classList.contains('updatestatus') ||
    target.classList.contains('delete')
  ) {
    return;
  }
  const menuEdit = document.querySelectorAll('.task-box-menu');
  menuEdit.forEach((menu) => {
    menu.classList.remove('task-box-menu-click');
  });

  if (idTargetTask && taskInput.value) {
    idTargetTask = undefined;
    taskInput.value = '';
  }
  taskInput.focus();
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
  // taskInput.focus();
  taskInput.value = '';
  hideAndShowArrows();
}

function moveArrow(target) {
  const taskItems = document.querySelectorAll('.task-box-item');
  const taskItemsNotHide = [];

  taskItems.forEach((item) => {
    if (!item.classList.contains('hide')) {
      taskItemsNotHide.push(item);
    }
  });

  if (!(target.closest('.task-box-item') === taskItemsNotHide[0])) {
    return;
  }

  const parentTaskItem = target.closest('.task-box__list');
  const firstItemTask = taskItemsNotHide[0];
  const thirdItemTask = firstItemTask.nextElementSibling.nextElementSibling;
  parentTaskItem.insertBefore(firstItemTask, thirdItemTask);

  idTaskDown = target.id;
  idTaskUp = taskItemsNotHide[1].querySelector('.task-box-menu__icon-arrow').id;

  firstelElementNotHideArray = todos[idTaskDown];
  todos[idTaskDown] = todos[idTaskUp];
  todos[idTaskUp] = firstelElementNotHideArray;

  localStorage.setItem('todo-list', JSON.stringify(todos));
  hideAndShowArrows();
  renderTodo(todos);
}

function hideAndShowArrows() {
  const arrayVisibleArrows = findVisibleArrows();
  toggleFirstArrow(arrayVisibleArrows);

  if (arrayVisibleArrows.length === 1) {
    hideSingleArrow(arrayVisibleArrows);
    return;
  } else {
    showAllArrow(arrayVisibleArrows);
  }
}

function findVisibleArrows() {
  const allArrows = document.querySelectorAll('.task-box-menu__icon-arrow');
  const arrowsNotHide = [];

  allArrows.forEach((arrow) => {
    if (!arrow.closest('.task-box-item').classList.contains('hide')) {
      arrowsNotHide.push(arrow);
    }
  });
  return arrowsNotHide;
}

function toggleFirstArrow(arrayVisibleArrows) {
  for (let i = 0; i < arrayVisibleArrows.length; i++) {
    if (i === 0) {
      arrayVisibleArrows[i].classList.remove('fa-arrow-up');
      arrayVisibleArrows[i].classList.add('fa-arrow-down');
    } else {
      arrayVisibleArrows[i].classList.add('fa-arrow-up');
      arrayVisibleArrows[i].classList.remove('fa-arrow-down');
    }
  }
  return;
}

function hideSingleArrow(arrayVisibleArrows) {
  arrayVisibleArrows[0].classList.add('hide');
  arrayVisibleArrows[0].previousElementSibling.classList.add(
    'icon-goup-item-not-margin'
  );
  return;
}

function showAllArrow(arrayVisibleArrows) {
  arrayVisibleArrows.forEach((element) => {
    element.classList.remove('hide');
    element.previousElementSibling.classList.remove(
      'icon-goup-item-not-margin'
    );
  });
}
