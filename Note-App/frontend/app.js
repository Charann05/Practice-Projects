const API = "http://localhost:8080/api/v1/noteapp"

document.addEventListener("DOMContentLoaded", function() {

    const addNoteBtn = document.getElementById("addNoteBtn")
    const addNoteOverlay = document.getElementById("addNote")
    const closeBtn = document.getElementById("closeBtn")

    const form = document.querySelector("#addNote form")
    const titleInput = document.getElementById("title")
    const contentInput = document.getElementById("noteContent")

    const notesContainer = document.getElementById("notesContainer")
    const noNotes = document.getElementById("noNotes")
    const searchBar = document.getElementById("searchBar")

    const deletionOverlay = document.querySelector(".overlay:last-child")
    const cancelBtn = document.getElementById("cancelBtn")
    const deleteBtn = document.getElementById("deleteBtn")

    let noteToDelete = null
    let allNotes = []

    getNotes()

    addNoteBtn.addEventListener("click", () => {
        console.log("button clicked!")
        addNoteOverlay.style.opacity = '1'
        addNoteOverlay.style.visibility = 'visible'
        
    })
    closeBtn.addEventListener("click", () => {
        addNoteOverlay.style.opacity = '0'
        addNoteOverlay.style.visibility = 'hidden'
        form.reset()
    })

    form.addEventListener("submit", async(event) => {
        event.preventDefault()

        const title = titleInput.value.trim()
        const content = contentInput.value.trim()

        if(!title || !content){
            return
        }

        try{
            const response = await fetch(`${API}/create-note`, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },

                body : JSON.stringify({
                    title : title,
                    content : content
                })
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.message)
            }

            console.log("Note created")
            addNoteOverlay.style.opacity = "0"
            addNoteOverlay.style.visibility = "hidden"

            form.reset()
            getNotes()
        }
        catch(error){
            console.error("Error creating the note : ", error)
        }
    })

    async function getNotes() {
        try{
            const response = await fetch(`${API}/get-notes`, {
                method : "GET"
            })

            const data = await response.json()

            if(!response.ok){
                throw Error(data.message)
            }
            allNotes = data

            notesContainer.innerHTML = ""

            if (allNotes.length === 0) {
                noNotes.style.display = "block"
                return
            }

            noNotes.style.display = "none"

            allNotes.forEach(note => {
                const noteElement = document.createElement("div")

                noteElement.classList.add("note")

                noteElement.innerHTML = `
                    <h3>${note.title}</h3>
                    <p>${note.content}</p>

                    <button class="delete-note-btn" data-id="${note._id}">
                        Delete
                    </button>
                `

                notesContainer.appendChild(noteElement)
            })
        }
        catch(error){
            console.error("Error creating the note : ", error)
        }
    }

    deleteBtn.addEventListener("click", async () => {

        if (!noteToDelete) {
            console.log("No note ID found")
            return
        }
        try{
            const response = await fetch(`${API}/delete-note/${noteToDelete}`, {
                method : "DELETE",
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message)
            }

            console.log("Note deleted")
            deletionOverlay.style.opacity = "0"
            deletionOverlay.style.visibility = "hidden"
            noteToDelete = null

            getNotes()
        }
        catch(error) {
            console.error("Error deleting the note : ", error)
        }

    })

    notesContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-note-btn")) {

            noteToDelete = event.target.dataset.id
            console.log("Note ID:", noteToDelete)
            deletionOverlay.style.opacity = "1"
            deletionOverlay.style.visibility = "visible"
        }
    })

    cancelBtn.addEventListener("click", () => {
        deletionOverlay.style.opacity = "0"
        deletionOverlay.style.visibility = "hidden"

        noteToDelete = null
    })

})