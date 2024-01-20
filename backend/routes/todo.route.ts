import express from 'express'
import { isLoggedIn } from '../middlewares/auth'
import { createTodo, hardDeleteTodo, softDeleteTodo, updateTodo } from '../controllers/todo.controller'
const router = express.Router()

router.post('/', isLoggedIn, createTodo)
router.put('/:id', isLoggedIn, updateTodo)
router.delete('/soft/:id', isLoggedIn, softDeleteTodo)
router.delete('/hard/:id', isLoggedIn, hardDeleteTodo)


export default router