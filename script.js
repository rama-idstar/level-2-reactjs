let tasks = [];

document.getElementById("addTaskButton").addEventListener("click", addTask);
document.getElementById("deleteAllTasksButton").addEventListener("click", deleteAllTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (!taskText) {
    alert("Masukkan tugas terlebih dahulu.");
    return;
  }

  tasks.push({ text: taskText, completed: false });
  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = createTaskListItem(task, index);
    taskList.appendChild(listItem);
  });

  updateRemainingTasksCount();
}

function createTaskListItem(task, index) {
  const listItem = document.createElement("li");
  listItem.className = "list-group-item d-flex justify-content-between align-items-center";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.className = "form-check-input me-2";
  checkbox.onchange = () => toggleTaskStatus(index);

  const taskText = document.createElement("span");
  taskText.textContent = task.text;
  if (task.completed) {
    taskText.classList.add("text-decoration-line-through");
  }

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Hapus";
  deleteButton.className = "btn btn-danger btn-sm";
  deleteButton.onclick = () => deleteTask(index);

  listItem.appendChild(checkbox);
  listItem.appendChild(taskText);
  listItem.appendChild(deleteButton);

  return listItem;
}

function toggleTaskStatus(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function deleteAllTasks() {
  tasks = [];
  renderTasks();
}

function updateRemainingTasksCount() {
  const remainingTasks = tasks.filter((task) => !task.completed).length;
  document.getElementById("remainingTasksCount").textContent = remainingTasks;

  if (remainingTasks === 0 && tasks.length > 0) {
    alert("Selamat! Anda telah menyelesaikan semua tugas.");
  }
}
