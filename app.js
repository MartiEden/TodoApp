//DEFINE UI VARS

const form = document.querySelector('#task-form');

const tasksList = document.querySelector('.collection');

const clearButton = document.querySelector('.clear-tasks');

const filter = document.querySelector('#filter');

const taskInput = document.querySelector('#task');

// LOAD EVENT LISTENERS CONTAINER

loadEventListeners();

// ADD EVENT LISTENERS CONTAINER

function loadEventListeners () {

    //LOAD DOM EVENT
    document.addEventListener('DOMContentLoaded', getTasks)

    //Add TASK event 
    form.addEventListener('submit', addTask)

    //Add REMOVE event
    tasksList.addEventListener('click', removeTask)

    //Add CLEAR event
    clearButton.addEventListener('click', clearTasks);

    //Filter TASKS event
    filter.addEventListener('keyup', filterTasks);
}

//CREATE DOM (task)
function createFullTask (value) {

    //Create LI for new task
    const newLi = document.createElement('li')

    //Add class to LI
    newLi.className = 'collection-item'

    //Create textNode and append to LI
    newLi.appendChild(document.createTextNode(value))

    //Create NEW LINK for deleting task
    const newLink = document.createElement('a');

    //Add CLASS
    newLink.className = 'delete-item secondary-content'

    //Add icon to HTML(link)
    newLink.innerHTML = '<i class="fa fa-remove"></i>';

    //Append LINK to LI
    newLi.appendChild(newLink);

    //Append LI to UL
    tasksList.appendChild(newLi);
}

//ADD TASK FUNC with ADDING TO STORE
function addTask (e) {


    if (taskInput.value === '') {
        alert('Add a task')
    }

    //Create task(DOM)
    createFullTask(taskInput.value)

    //ADD TO STORE
    addToStore(taskInput.value);

    //Clear INPUT
    taskInput.value = '';

    e.preventDefault();
}

//REMOVE TASK FUNC
function removeTask (e) {

    if (e.target.parentElement.classList.contains('delete-item')) {

        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
        }
    }

    //REMOVE from STORE
    removeTaskFromStore(e.target.parentElement.parentElement)
}

//CLEAR TASKS FUNC
function clearTasks (e) {

    if (confirm('Are you sure?')) {
        tasksList.innerHTML = ''

        // or

        // while(tasksList.firstChild){
        //     tasksList.removeChild(tasksList.firstChild);
        // }
    }
}

//FILTER TASKS FUNC
function filterTasks (e) {

    const inputText = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {

        let item = task.firstChild.textContent;

        if (item.toLowerCase().indexOf(inputText) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}




//////////////////////////////////////////////////////////////////////
//                    LOCALSTORAGE 


//ADD TO LS
function addToStore (task) {

    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//GET TASKS from LS
function getTasks () {

    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function (task) {
        //Create task(DOM)
        createFullTask(task)
    })
}

//REMOVE TASK FROM STORE
function removeTaskFromStore (item) {

    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function (task, i) {
        if (item.textContent === task) {
            tasks.splice(i, 1)
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
}