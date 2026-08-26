import express from "express"
import {createNote, getNotes, deleteNote} from "../controller/note.controller.js"

const router = express.Router()

router.post("/create-note", createNote)
router.get("/get-notes", getNotes)
router.delete("/delete-note/:id", deleteNote)

export default router