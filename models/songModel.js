import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const songCollection = 'songs';

const songSchema = new Schema({
    title: String,
    duration: Number,
    album: { type: Schema.Types.ObjectId, ref: 'albums' },
    composer: { type: Schema.Types.ObjectId, ref: 'composers' },
    created: {
        type: Date,
        default: Date.now
    }
});

const songModel = mongoose.model(songCollection, songSchema);
export default songModel;
