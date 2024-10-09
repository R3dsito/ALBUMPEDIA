import taskModel from "../models/tasksModel.js";

const createTask = async (req, res) => {
    const { name } = req.body;
    try {
        const task = new taskModel({ name, completed: false });
        const result = await task.save();
        res.status(200).json({ msg: "success", data: result });
    } catch (error) {
        res.status(500).json({ msg: "error", data: [] });
        console.error(error);
    }
};

const getTasksById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await taskModel.findById(id);
        res.status(200).json({ msg: "success", data: task });
    } catch (error) {
        res.status(500).json({ msg: "error", data: [] });
        console.error(error);
    }
};

const getTasks = async (req, res) => {
    const { name, sortBy, order = 'asc', page = 1, limit = 10 } = req.query;
    const query = {};
    if (name) {
        query.name = new RegExp(name, 'i'); // Filtrar por nombre (insensible a mayúsculas/minúsculas)
    }

    try {
        const tasks = await taskModel.find(query)
            .sort({ [sortBy]: order === 'asc' ? 1 : -1 }) // Ordenar
            .skip((page - 1) * limit) // Paginado
            .limit(parseInt(limit)); // Paginado
        res.status(200).json({ msg: "success", data: tasks });
    } catch (error) {
        res.status(500).json({ msg: "error", data: [] });
        console.error(error);
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTask = await taskModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ msg: "success", data: updatedTask });
    } catch (error) {
        res.status(500).json({ msg: "error", data: [] });
        console.error(error);
    }
};

const deleteTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await taskModel.findByIdAndDelete(id);
        res.status(200).json({ msg: "success", data: task });
    } catch (error) {
        res.status(500).json({ msg: "error", data: [] });
        console.error(error);
    }
};

export { createTask, getTasksById, getTasks, updateTask, deleteTaskById };
