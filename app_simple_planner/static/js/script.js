// Array para armazenar as tarefas
let tasks = [];

// Função para adicionar uma nova tarefa
function addTask() {
    const taskInput = document.getElementById("taskInput").value;
    const categorySelect = document.getElementById("categorySelect").value;

    if (taskInput.trim() === "") {
        alert("Por favor, insira uma tarefa.");
        return;
    }

    const task = {
        name: taskInput,
        category: categorySelect,
        completed: false,
        dateTimeAdded: new Date().toLocaleString(),
        dateTimeCompleted: null
    };

    tasks.push(task);
    renderTaskList();
    document.getElementById("taskInput").value = "";
}

// Função para renderizar a lista de tarefas com base no filtro selecionado
function renderTaskList() {
    const filter = document.getElementById("select-List").value;
    const taskList = document.getElementById("taskList");
    const completedTaskList = document.getElementById("completedTaskList");
    const allTaskList = document.getElementById("AllTaskList");

    taskList.innerHTML = "";
    completedTaskList.innerHTML = "";
    allTaskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `<div>${task.name} - ${task.category}</div>`;

        if (task.completed) {
            completedTaskList.appendChild(li);
        } else {
            taskList.appendChild(li);
        }

        allTaskList.appendChild(li.cloneNode(true));
    });

    updateNoTaskMessage();
}

// Função para marcar uma tarefa como concluída
function completeTask(index) {
    tasks[index].completed = true;
    tasks[index].dateTimeCompleted = new Date().toLocaleString();
    renderTaskList();
}

// Função para alternar entre as diferentes listas de tarefas
function TypeList() {
    const filter = document.getElementById("select-List").value;
    const taskLists = document.querySelectorAll(".ListPage");

    taskLists.forEach(function(taskList) {
        taskList.style.display = "none";
    });

    if (filter === "To-do") {
        document.getElementById("Todo-task").style.display = "block";
    } else if (filter === "Done") {
        document.getElementById("completed-Task").style.display = "block";
    } else if (filter === "All") {
        document.getElementById("All-Task").style.display = "block";
    }
}

// Função para atualizar a mensagem de "Sem tarefas" conforme necessário
function updateNoTaskMessage() {
    const noTaskMessage = document.getElementById("Text_NoTask");

    if (tasks.length === 0) {
        noTaskMessage.style.display = "block";
    } else {
        noTaskMessage.style.display = "none";
    }
}

// Inicializa a renderização da lista ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    renderTaskList();
    updateNoTaskMessage();
});
