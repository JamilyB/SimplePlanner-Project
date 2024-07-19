// Array para armazenar as tarefas
let tasks = [];


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
