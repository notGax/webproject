document.getElementById('todo-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskInput = document.getElementById('todo-input');
    const task = taskInput.value;
    taskInput.value = '';

    fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
    })
    .then(response => response.json())
    .then(data => {
        // The task was saved successfully
        console.log('Success:', data);

        // Create a new div for the task
        const taskDiv = document.createElement('div');
        taskDiv.textContent = data.task;

        // Append the new task to the todo-list div
        document.getElementById('todo-list').appendChild(taskDiv);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});