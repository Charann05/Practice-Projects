export function createTaskCard(task) {
    const card = document.createElement('div');

    card.classList.add('task-card');

    card.innerHTML = `
        <div class="task-content">

            <h3>${task.title}</h3>

            <p class="description">
                ${task.description || 'No description'}
            </p>

            <span class="status status-${task.status.toLowerCase()}">
                ${task.status}
            </span>

        </div>

        <button
            class="delete-btn"
            data-id="${task.id}">
            Delete
        </button>
    `;

    return card;
}