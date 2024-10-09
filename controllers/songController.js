import songModel from '../models/songModel.js';

const createSong = async (req, res) => {
    const { title, duration, album, composer } = req.body;
    try {
        const song = new songModel({ title, duration, album, composer });
        const result = await song.save();
        res.status(200).json({ msg: 'success', data: result });
    } catch (error) {
        res.status(500).json({ msg: 'error', data: [] });
        console.error(error);
    }
};

const getSongs = async (req, res) => {
    const { sortBy, order, page = 1, limit = 10 } = req.query;

    try {
        // Configura el ordenamiento
        const sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === 'desc' ? -1 : 1; // 1 para ascendente, -1 para descendente
        }

        // Paginación
        const skip = (page - 1) * limit;
        const songs = await songModel.find()
            .populate('composer album')
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit));

        // Contar el total de documentos
        const total = await songModel.countDocuments();

        res.status(200).json({ 
            msg: 'success', 
            data: songs, 
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ msg: 'error', data: [] });
        console.error(error);
    }
};

const getSongById = async (req, res) => {
    const { id } = req.params;
    try {
        const song = await songModel.findById(id).populate('composer album');
        res.status(200).json({ msg: 'success', data: song });
    } catch (error) {
        res.status(500).json({ msg: 'error', data: [] });
        console.error(error);
    }
};

const updateSong = async (req, res) => {
    const { id } = req.params;
    const { title, duration, album, composer } = req.body;
    try {
        const song = await songModel.findByIdAndUpdate(id, { title, duration, album, composer }, { new: true }).populate('composer album');
        res.status(200).json({ msg: 'success', data: song });
    } catch (error) {
        res.status(500).json({ msg: 'error', data: [] });
        console.error(error);
    }
};

const deleteSong = async (req, res) => {
    const { id } = req.params;
    try {
        const song = await songModel.findByIdAndDelete(id);
        res.status(200).json({ msg: 'success', data: song });
    } catch (error) {
        res.status(500).json({ msg: 'error', data: [] });
        console.error(error);
    }
};

const getSongByTitle = async (req, res) => {
    const { title } = req.params;

    if (!title) {
        return res.status(400).json({ msg: 'Error: Titulo no especificado.' });
    }

    try {
        const songs = await songModel.findOne({ title: new RegExp(title, 'i') });
        if (!songs) {
            return res.status(404).json({ msg: 'Song not found', data: null });
        }
        res.status(200).json({ msg: 'success', data: songs });
    } catch (error) {
        res.status(500).json({ msg: 'error', data: [] });
        console.error(error);
    }
};

// Exporta todas las funciones
export { createSong, getSongs, getSongById, updateSong, deleteSong, getSongByTitle };
