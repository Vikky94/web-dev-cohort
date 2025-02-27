const addButton = document.getElementById("addButton"),
    taskInput = document.getElementById("taskInput"),
    totalTasks = document.getElementById("totalTasks"),
    completedTasks = document.getElementById("completedTasks"),
    taskList = document.getElementById("taskList");
function updateTask() {
    let totalTasksCount = 0, completedTasksCount = 0;
    for (let i = 0; i < taskList.childElementCount; i++) {
        const liItem = taskList.children[i].className;
        if (liItem.includes('task-item')) totalTasksCount++;
        if (liItem.includes('completed')) completedTasksCount++;
    }
    if( totalTasksCount === 0 ){
        const li = document.createElement('li');
        li.classList.add('empty-list');
        li.innerText = 'No tasks yet. Add one above!';
        taskList.appendChild(li);
    }
    totalTasks.innerText = `Total tasks: ${totalTasksCount}`;
    completedTasks.innerText = `Completed: ${completedTasksCount}`;
}
addButton.addEventListener('click', function (e) {
    console.log(`childElementCount -> ${taskList.childElementCount}`)
    if (taskInput.value !== "") {
        if (taskList.children[0].className.includes('empty-list')) {
            taskList.children[0].remove();
        }
        const liElement = document.createElement('li'),
            buttonElement = document.createElement('button'),
            checkboxElement = document.createElement('input'),
            pElement = document.createElement('p'),
            labelElement = document.createElement('label');

        buttonElement.innerText = "Delete";
        buttonElement.classList.add("delete-button");

        buttonElement.addEventListener('click', function (e) {
            liElement.remove();
            updateTask();
        });

        checkboxElement.addEventListener('click', function (e) {
            liElement.classList.toggle('completed');
            updateTask();
        });

        checkboxElement.setAttribute('type', 'checkbox')
        checkboxElement.id = `checkbox-${taskList.childElementCount}`;
        labelElement.setAttribute('for', checkboxElement.id)
        labelElement.appendChild(checkboxElement);
        liElement.classList.add('task-item');

        pElement.classList.add('task-text');
        pElement.innerText = taskInput.value;

        liElement.appendChild(labelElement);
        liElement.appendChild(pElement);
        liElement.appendChild(buttonElement);
        taskList.appendChild(liElement);
        taskInput.value = "";

        updateTask();
    }
})