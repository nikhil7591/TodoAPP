let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("task-input");
const taskListDiv = document.getElementById("task-list");

function renderTasks() {
  taskListDiv.innerHTML = '';
  taskList.forEach((task, index) => {
    const taskEl = document.createElement('div');
    taskEl.className = `task ${task.completed ? 'completed' : ''}`;

    const taskText = document.createElement('span');
    taskText.innerText = task.name;

    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = () => toggleComplete(index);

    const icons = document.createElement('div');
    icons.className = 'icons';

    const edit = document.createElement('span');
    edit.innerText = "✏️";
    edit.onclick = () => editTask(index);

    const del = document.createElement('span');
    del.innerText = "❌";
    del.onclick = () => deleteTask(index);

    icons.appendChild(edit);
    icons.appendChild(del);

    taskEl.prepend(checkbox);
    taskEl.appendChild(taskText);
    taskEl.appendChild(icons);

    taskListDiv.appendChild(taskEl);
  });

  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function addTask(taskName) {
  if (taskName.trim() === "") return;
  taskList.push({ name: taskName.trim(), completed: false });
  renderTasks();
}

function toggleComplete(index) {
  taskList[index].completed = !taskList[index].completed;
  renderTasks();
}

function deleteTask(index) {
  taskList.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  const newName = prompt("Edit task name:", taskList[index].name);
  if (newName) {
    taskList[index].name = newName;
    renderTasks();
  }
}

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask(taskInput.value);
    taskInput.value = "";
  }
});

window.onload = renderTasks;
