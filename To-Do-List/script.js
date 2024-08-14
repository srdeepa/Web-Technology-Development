// In-memory storage for tasks
let tasks = [];

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask('${task.id}')">
            <span>${task.text}</span>
            <button class="btn-edit" onclick="editTask('${task.id}')">Edit</button>
            <button class="btn-delete" onclick="deleteTask('${task.id}')">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value;
    if (text) {
        const task = { id: Date.now().toString(), text, completed: false };
        tasks.push(task);
        taskInput.value = '';
        renderTasks();
    }
}

// Function to toggle a task's completion status
function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

// Function to edit a task
function editTask(id) {
    const newText = prompt('Edit task text:');
    if (newText) {
        const task = tasks.find(task => task.id === id);
        if (task) {
            task.text = newText;
            renderTasks();
        }
    }
}

// Function to delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

// Initial rendering of tasks
renderTasks();
