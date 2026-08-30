const API_URL = 'http://localhost:3000';

export async function getTasks() {
    const response = await fetch(`${API_URL}/tasks`);

    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }

    return response.json();
}

export async function createTask(task) {
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });

    if (!response.ok) {
        const error = await response.text();
        console.error('Create task error:', error);
        throw new Error('Failed to create task');
    }

    return response.json();
}

export async function deleteTask(id) {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const error = await response.text();
        console.error('Delete task error:', error);
        throw new Error('Failed to delete task');
    }

    return response.json();
}