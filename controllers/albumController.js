import albumModel from '../models/albumModel.js';

const createAlbum = async (req, res) => {
    const { title, releaseDate, composers } = req.body;
    try {
        const album = new albumModel({ title, releaseDate, composers });
        const result = await album.save();
        res.status(200).json({ msg: 'success', data: result });
    } catch (error) {
        res.status(500).json({ msg: 'error', data: [] });
        console.error(error);
    }
};

const getAlbums = async (req, res) => {
    try {
        const albums = await albumModel.find().populate('composers');
        res.status(200).json({ msg: 'success', data: albums });
    } catch (error) {
        res.status(500).json({ msg: 'error', data: [] });
        console.error(error);
    }
};

const getAlbumById = async (req, res) => {
    const { id } = req.params;
    try {
        const album = await albumModel.findById(id).populate('composer');
        res.status(200).json({ msg: 'success', data: album });
    } catch (error) {
        res.status(500).json({ msg: 'error', data: [] });
        console.error(error);
    }
};

const updateAlbum = async (req, res) => {
    const { id } = req.params;
    const { title, releaseDate, composer } = req.body;
    try {
        const album = await albumModel.findByIdAndUpdate(id, { title, releaseDate, composer }, { new: true }).populate('composer');
        res.status(200).json({ msg: 'success', data: album });
    } catch (error) {
        res.status(500).json({ msg: 'error', data: [] });
        console.error(error);
    }
};

const deleteAlbum = async (req, res) => {
    const { id } = req.params;
    try {
        const album = await albumModel.findByIdAndDelete(id);
        res.status(200).json({ msg: 'success', data: album });
    } catch (error) {
        res.status(500).json({ msg: 'error', data: [] });
        console.error(error);
    }
};

const getAlbumByTitle = async (req, res) => {
    const { title } = req.params;

    if (!title) {
        return res.status(400).json({ msg: 'Error: Titulo no especificado.' });
    }

    try {
        const albums = await albumModel.findOne({ title: new RegExp(title, 'i') });
        if (!albums) {
            return res.status(404).json({ msg: 'Song not found', data: null });
        }
        res.status(200).json({ msg: 'success', data: albums });
    } catch (error) {
        res.status(500).json({ msg: 'error', data: [] });
        console.error(error);
    }
};

export { createAlbum, getAlbums, getAlbumById, updateAlbum, deleteAlbum, getAlbumByTitle };
