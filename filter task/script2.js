document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
  const taskName = document.getElementById('taskName').value;
  const dueDate = document.getElementById('dueDate').value;
  const category = document.getElementById('category').value;

  if (taskName === '' || dueDate === '') {
    alert('Please enter a task name and due date');
    return;
  }

  const task = {
    name: taskName,
    dueDate: dueDate,
    category: category
  };

  saveTask(task);
  displayTask(task);

  document.getElementById('taskName').value = '';
  document.getElementById('dueDate').value = '';
  document.getElementById('category').value = 'Homework';
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(displayTask);
}

function displayTask(task) {
  const taskList = document.getElementById('taskList');
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');
  taskItem.setAttribute('data-category', task.category);
  taskItem.innerHTML = `
    <span>${task.name} - ${task.dueDate} (${task.category})</span>
    <button onclick="removeTask(this)">Remove</button>
  `;
  taskList.appendChild(taskItem);
}

function removeTask(button) {
  const taskItem = button.parentElement;
  const taskName = taskItem.querySelector('span').textContent.split(' - ')[0];
  taskItem.remove();

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.name !== taskName);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterTasks() {
  const filterCategory = document.getElementById('filterCategory').value;
  const taskItems = document.querySelectorAll('.task-item');

  taskItems.forEach(taskItem => {
    const taskCategory = taskItem.getAttribute('data-category');
    if (filterCategory === 'All' || taskCategory === filterCategory) {
      taskItem.style.display = 'flex';
    } else {
      taskItem.style.display = 'none';
    }
  });
}
