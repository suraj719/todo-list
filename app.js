const container = document.querySelector(".container");
const lists = document.querySelector(".lists");
const taskinput = document.querySelector(".taskinput");
const tasks = document.querySelector(".tasks");
let n = 0;
let tasksarray = JSON.parse(localStorage.getItem("tasksarray")) || [];
if(localStorage.getItem('tasksarray').length>0) {
    tasksarray.map((ta) => {
        createtask(ta)
    })
}
function addtask() {
    let taskinp=taskinput.value
    if(taskinp == '') {
        swal("nothing extra added","add another task")
    } else {
        const task= {
            id: new Date().getTime(),
            val:taskinp
        }
        tasksarray.push(task)
        localStorage.setItem('tasksarray',JSON.stringify(tasksarray))
        createtask(task)
    }
    taskinput.value=''
}

function createtask(task) {
    tasks.innerHTML += `
    <div id="${task.id}" class="rounded-pill text-center pb-2">
    <span>${task.val}</span>
    <i class="fa-sharp fa-regular fa-circle-xmark" onclick="removetask(${task.id})"></i>
    </div>
    `
}
function removetask(taskid) {
    const tasknoo = document.getElementById(`${taskid}`);
    tasksarray = tasksarray.filter((task) => task.id != parseInt(taskid))
    localStorage.setItem('tasksarray',JSON.stringify(tasksarray))
    tasknoo.remove();
    swal("deleted a task","","success")
}