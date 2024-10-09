import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Definimos la colleccion
const taskCollection = 'Tasks';

const taskSchema = new Schema({
    name: String,
    completed: Boolean,
    created: {
        type: Date,
        default: Date.now
    }
})

const taskModel = mongoose.model(taskCollection, taskSchema);
export default taskModel;