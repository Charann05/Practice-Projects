import {
    getTasks,
    createTask,
    deleteTask
} from '../services/taskService.js';

import { createTaskCard } from '../components/taskCard.js';

import { createTaskForm } from '../components/taskForm.js';


export async function renderTasksPage() {

    const app = document.querySelector('#app');

    app.innerHTML = `
        <header class="page-header">

            <h1>Task Management</h1>

            <p>Manage your tasks easily</p>

        </header>


        <section class="tasks-section">

            <div class="tasks-header">

                <h2>Your Tasks</h2>

                <div class="header-actions">

                    <span id="task-count"></span>

                    <button
                        id="open-form"
                        class="open-form-btn">
                        + Create Task
                    </button>

                </div>

            </div>


            <div id="task-list">
                Loading...
            </div>

        </section>


        <!-- Create Task Modal -->

        <div
            id="form-modal"
            class="modal-overlay hidden">

            <div class="modal">

                <div id="form-container"></div>

            </div>

        </div>


        <!-- Delete Confirmation Modal -->

        <div
            id="delete-modal"
            class="modal-overlay hidden">

            <div class="confirmation-modal">

                <div class="confirmation-icon">
                    !
                </div>

                <h2>Delete Task?</h2>

                <p>
                    Are you sure you want to delete this task?
                </p>

                <div class="confirmation-buttons">

                    <button
                        id="cancel-delete"
                        class="cancel-btn">
                        Cancel
                    </button>

                    <button
                        id="confirm-delete"
                        class="confirm-delete-btn">
                        Delete
                    </button>

                </div>

            </div>

        </div>
    `;


    // =========================
    // Create Form
    // =========================

    const formModal =
        document.querySelector('#form-modal');

    const formContainer =
        document.querySelector('#form-container');

    const form =
        createTaskForm();

    formContainer.appendChild(form);


    // Open form

    document
        .querySelector('#open-form')
        .addEventListener('click', () => {

            formModal.classList.remove('hidden');

        });


    // Close form

    document
        .querySelector('#close-form')
        .addEventListener('click', () => {

            formModal.classList.add('hidden');

        });


    // Cancel form

    document
        .querySelector('#cancel-task')
        .addEventListener('click', () => {

            form.reset();

            formModal.classList.add('hidden');

        });


    // =========================
    // Create Task
    // =========================

    form.addEventListener('submit', async (event) => {

        event.preventDefault();


        const title =
            document.querySelector('#title')
                .value
                .trim();


        const description =
            document.querySelector('#description')
                .value
                .trim();


        const status =
            document.querySelector('#status')
                .value;


        if (!title) {

            return;

        }


        try {

            const button =
                form.querySelector('.create-btn');

            button.disabled = true;

            button.textContent = 'Creating...';


            await createTask({
                title,
                description,
                status
            });


            form.reset();

            formModal.classList.add('hidden');

            await loadTasks();


        } catch (error) {

            console.error(error);

            alert('Failed to create task');

        } finally {

            const button =
                form.querySelector('.create-btn');

            button.disabled = false;

            button.textContent = 'Create Task';

        }

    });


    // =========================
    // Delete Modal
    // =========================

    const deleteModal =
        document.querySelector('#delete-modal');

    let taskToDelete = null;


    // Open delete modal

    document
        .querySelector('#task-list')
        .addEventListener('click', (event) => {

            if (
                !event.target.classList
                    .contains('delete-btn')
            ) {
                return;
            }


            taskToDelete =
                event.target.dataset.id;


            deleteModal.classList.remove('hidden');

        });


    // Cancel delete

    document
        .querySelector('#cancel-delete')
        .addEventListener('click', () => {

            taskToDelete = null;

            deleteModal.classList.add('hidden');

        });


    // Confirm delete

    document
        .querySelector('#confirm-delete')
        .addEventListener('click', async () => {

            if (!taskToDelete) {
                return;
            }


            const button =
                document.querySelector(
                    '#confirm-delete'
                );


            try {

                button.disabled = true;

                button.textContent = 'Deleting...';


                await deleteTask(taskToDelete);


                taskToDelete = null;

                deleteModal.classList.add('hidden');


                await loadTasks();


            } catch (error) {

                console.error(error);

                alert('Failed to delete task');

            } finally {

                button.disabled = false;

                button.textContent = 'Delete';

            }

        });


    // =========================
    // Load Tasks
    // =========================

    async function loadTasks() {

        const taskList =
            document.querySelector('#task-list');


        taskList.innerHTML =
            '<p>Loading tasks...</p>';


        try {

            const tasks =
                await getTasks();


            taskList.innerHTML = '';


            document
                .querySelector('#task-count')
                .textContent =
                `${tasks.length} task${tasks.length !== 1 ? 's' : ''}`;


            if (tasks.length === 0) {

                taskList.innerHTML = `
                    <div class="empty-state">

                        <h3>No tasks yet</h3>

                        <p>
                            Click "Create Task"
                            to add your first task.
                        </p>

                    </div>
                `;

                return;

            }


            tasks.forEach(task => {

                const card =
                    createTaskCard(task);

                taskList.appendChild(card);

            });

        } catch (error) {

            console.error(error);

            taskList.innerHTML = `
                <div class="error-state">
                    Failed to load tasks.
                </div>
            `;

        }

    }


    await loadTasks();
}