import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const composerCollection = 'composers';

const composerSchema = new Schema({
    name: String,
    birthDate: Date,
    nationality: String,
    created: {
        type: Date,
        default: Date.now
    }
});

const composerModel = mongoose.model(composerCollection, composerSchema);
export default composerModel;
