let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");

  const task = {
    name: taskInput.value,
    category: "Processo",
    completed: false,
    dateTimeAdded: null,
    dateTimeCompleted: null
  };

  tasks.push(task);
  renderTaskList();
  taskInput.value = "";
  NoTasks();
}

function NoTasks()
{
  const No=document.getElementById("Text_NoTask");
  No.style.display="none";
}

function renderTaskList() {
  const taskList = document.getElementById("taskList");
  const completedTaskList = document.getElementById("completedTaskList");

  taskList.innerHTML = "";
  completedTaskList.innerHTML = "";
  tasks.forEach(function (task, index) {
    const li = document.createElement("li");
    li.id = "task-" + index;
    li.className = "task-container";
    li.innerHTML = "<div class='task-name'>" + task.name + " - " + task.category + "</div>";

    if (task.completed) {
      li.classList.add("completed");
      completedTaskList.appendChild(li);
    } 
    else {
      const completeButton = document.createElement("button");
      completeButton.innerHTML = "Concluir";

      completeButton.onclick = function (e) {
        e.stopPropagation();
        completeTask(index);
      };

      li.appendChild(completeButton);
      taskList.appendChild(li);
    }
  }); 
}

function completeTask(index) {
  const task = tasks[index];
  if (!task.completed) {
    task.completed = true;
    task.dateTimeCompleted = new Date().toLocaleString();
  } else {
    task.completed = false;           
    task.dateTimeCompleted = null;
  }
  renderTaskList();
}

function TypeList(){
  const Status=document.getElementById("select-List");
  const List_ToDo=document.getElementById("Todo-task");
  const List_Completed=document.getElementById("completed-Task");
  const List_All=document.getElementById("All-Task");

  List_ToDo.style.display = "none"; 
  List_Completed.style.display = "none"; 
  List_All.style.display="none";

  if(Status.value==="To-do")
  {
    List_ToDo.style.display = "block"; 
  }
  else if(Status.value==="Done")
  {
    List_Completed.style.display = "block"; 
  }
  else{
    List_All.style.display="block";
  }
}