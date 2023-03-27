const container = document.querySelector(".container");
const lists = document.querySelector(".lists");
const taskinput = document.querySelector(".taskinput");
const tasks = document.querySelector(".tasks");
const total = document.querySelector(".total");
let tasksarray = JSON.parse(localStorage.getItem("tasksarray")) || [];
if (localStorage.getItem("tasksarray").length > 0) {
  tasksarray.map((ta) => {
    createtask(ta);
  });
  showtaskno();
}
function showtaskno() {
  if (tasksarray.length == 0) {
    total.innerHTML = `no tasks found`;
  } else {
    total.innerHTML = `total tasks: ${tasksarray.length}`;
  }
}
function addtask() {
  let taskinp = taskinput.value;
  if (taskinp == "") {
    swal("nothing extra added", "enter some text");
  } else {
    const task = {
      id: new Date().getTime(),
      val: taskinp,
    };
    tasksarray.push(task);
    localStorage.setItem("tasksarray", JSON.stringify(tasksarray));
    showtaskno();
    createtask(task);
  }
  taskinput.value = "";
}

function createtask(task) {
  showtaskno();
  tasks.innerHTML += `
    <div id="${task.id}" class="rounded-pill text-center pb-2">
    <span>${task.val}</span>
    <lord-icon
    src="https://cdn.lordicon.com/jmkrnisz.json"
    trigger="hover"
    style="width:32px;height:32px"
    onclick="removetask(${task.id})"
    >
    </lord-icon>
    `;
}
function removetask(taskid) {
  const tasknoo = document.getElementById(`${taskid}`);
  tasksarray = tasksarray.filter((task) => task.id != parseInt(taskid));
  localStorage.setItem("tasksarray", JSON.stringify(tasksarray));
  tasknoo.remove();
  swal("deleted a task", "", "success");
  showtaskno();
}
