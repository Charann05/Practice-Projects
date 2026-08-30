export function createTaskForm() {

    const form = document.createElement('form');

    form.id = 'task-form';

    form.innerHTML = `
        <div class="form-header">
            <h2>Create a Task</h2>

            <button
                type="button"
                class="close-form-btn"
                id="close-form">
                ×
            </button>
        </div>

        <div class="form-group">

            <label for="title">
                Title
            </label>

            <input
                type="text"
                id="title"
                placeholder="Enter task title"
                required
            >

        </div>

        <div class="form-group">

            <label for="description">
                Description
            </label>

            <textarea
                id="description"
                placeholder="Enter task description">
            </textarea>

        </div>

        <div class="form-group">

            <label for="status">
                Status
            </label>

            <select id="status">

                <option value="TODO">
                    TODO
                </option>

                <option value="IN_PROGRESS">
                    IN PROGRESS
                </option>

                <option value="COMPLETED">
                    COMPLETED
                </option>

            </select>

        </div>

        <div class="form-buttons">

            <button
                type="button"
                class="cancel-btn"
                id="cancel-task">
                Cancel
            </button>

            <button
                type="submit"
                class="create-btn">
                Create Task
            </button>

        </div>
    `;

    return form;
}