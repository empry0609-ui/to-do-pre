let items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");
const templateElement = document.getElementById("to-do__item-template");

function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');

  if (savedTasks) {
    return JSON.parse(savedTasks);
  }

  return items;
}

function createItem(item) {
  const clone = templateElement.content.querySelector(".to-do__item").cloneNode(true);
  
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;

  deleteButton.addEventListener('click', function () {
    clone.remove();
    saveTasks(getTasksFromDOM());
  });

  duplicateButton.addEventListener('click', function () {
    const newItem = createItem(textElement.textContent);
    listElement.prepend(newItem);
    saveTasks(getTasksFromDOM());
  });

  editButton.addEventListener('click', function () {
    textElement.setAttribute('contenteditable', 'true');
    textElement.focus();
  });

  textElement.addEventListener('blur', function () {
    textElement.setAttribute('contenteditable', 'false');
    saveTasks(getTasksFromDOM());
  });

  return clone;
}

function getTasksFromDOM() {
  const itemsText = listElement.querySelectorAll('.to-do__item-text');
  const tasks = [];

  itemsText.forEach(function (element) {
    tasks.push(element.textContent);
  });

  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  const taskText = inputElement.value;
  const newItem = createItem(taskText);

  listElement.prepend(newItem);
  saveTasks(getTasksFromDOM());

  inputElement.value = '';
}

const initialTasks = loadTasks();

initialTasks.forEach(function (item) {
  listElement.append(createItem(item));
});

formElement.addEventListener('submit', handleFormSubmit);
