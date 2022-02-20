
let tasks = [];
const tasksList = document.getElementById('list');
const addTaskinput = document.getElementById('add');
const taskCounter = document.getElementById('tasks-counter');


console.log("working")
// fetch api
async function fetchTodos() {
    // get respoinse
    //    fetch('https://jsonplaceholder.typicode.com/todos')
    //    .then(function(response){
    //        console.log(response);
    //        return response.json();
    //    }).then(function(data){
    //        tasks = data.slice(0 , 10);
    //        renderList();
    //        console.log(data);
    //    })
    //    .catch(function(error){
    //        console.log('Error' , error);
    //    });
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        tasks = data.slice(0, 10);
        renderList();
    } catch (error) {
        console.log('Error', error);
    }
}
function addTaskToDOM(task) {
    const li = document.createElement('li');

    li.innerHTML = `

            <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''}  class="custom-checkbox">
            <label for="${task.id}">${task.title}</label>
            <i class="fas fa-trash delete" data-id="${task.id}"></i>
    `;

    tasksList.append(li);
}

function renderList() {
    tasksList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        addTaskToDOM(tasks[i]);
    }

    taskCounter.innerHTML = tasks.length;
}

function toggleTask(taskId) {
    const task = tasks.filter(function (task) {
        return task.id === Number(taskId);
    });

    if (task.length > 0) {
        const currenttask = task[0];

        currenttask.completed = !currenttask.completed;
        renderList();
        showNotification('Task toggled successfully');
        return;
    }

    showNotification('could not toggle the task');
}

function deleteTask(taskId) {
    const newTasks = tasks.filter(function (task) {
        return task.id !== Number(taskId);
    });

    tasks = newTasks;
    renderList()
    showNotification('Task delete Sucessfully');
}

function addTask(task) {
    if (task) {
        // get respoinse
       /*
        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
            .then(function (response) { 
                return response.json();
            }).then(function (data) {
                tasks = data.slice(0, 10);
                console.log(data);
                tasks.push(task);
                renderList();
                showNotification('Task added Sucessfully');
                return;
            })
            .catch(function (error) {
                console.log('Error', error);
            });
            */
        }
    tasks.push(task);
    renderList();
    showNotification('Task added Sucessfully');
    return;
}

function showNotification(text) {
    alert(text);
}

function handleInputKeypress(e) {
    if (e.key === 'Enter') {
        const text = e.target.value;
        console.log('text', text)

        if (!text) {
            showNotification('Task text can not be empty');
            return;
        }

        const task = {
            title: text,
            id: Date.now(),
            completed: false
        };

        e.target.value = '';
        addTask(task);
    }
}

addTaskinput.addEventListener('keyup', handleInputKeypress);

function handleClickListener(e) {
    const target = e.target;
    console.log(target)
    if (target.className === 'delete') {
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    } else if (target.className === 'custom-checkbox') {
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
}

function intializeApp() {
    fetchTodos();
    addTaskinput.addEventListener('keyup', handleInputKeypress);
    document.addEventListener('click', handleClickListener);
}

intializeApp();