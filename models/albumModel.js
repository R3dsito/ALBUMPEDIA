import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const albumCollection = 'albums';

const albumSchema = new Schema({
    title: String,
    releaseDate: Date,
    composers: [{ type: Schema.Types.ObjectId, ref: 'composers' }],
    songs: [{ type: Schema.Types.ObjectId, ref: 'songs' }],
    genre: String,
    created: {
        type: Date,
        default: Date.now
    }
});

const albumModel = mongoose.model(albumCollection, albumSchema);
export default albumModel;
