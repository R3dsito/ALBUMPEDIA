import { Router } from "express";
import { createTask, getTasksById, getTasks, updateTasks, deleteTasksById } from "../controllers/tasksController.js";

const router = Router();

router.get('/', getTasks);
router.get('/:id', getTasksById);
router.post('/', createTask);
router.put('/:id', updateTasks);
router.delete('/:id', deleteTasksById);

export default router;