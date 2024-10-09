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
    const { sortBy, order, page = 1, limit = 10 } = req.query;

    try {
        // Configura el ordenamiento
        const sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === 'desc' ? -1 : 1; // 1 para ascendente, -1 para descendente
        }

        // Paginación
        const skip = (page - 1) * limit;
        const albums = await albumModel.find()
            .populate('composers')
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit));

        // Contar el total de documentos
        const total = await albumModel.countDocuments();

        res.status(200).json({ 
            msg: 'success', 
            data: albums, 
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ msg: 'error', data: [] });
        console.error(error);
    }
};

const getAlbumById = async (req, res) => {
    const { id } = req.params;
    try {
        const album = await albumModel.findById(id).populate('composers');
        res.status(200).json({ msg: 'success', data: album });
    } catch (error) {
        res.status(500).json({ msg: 'error', data: [] });
        console.error(error);
    }
};

const updateAlbum = async (req, res) => {
    const { id } = req.params;
    const { title, releaseDate, composers } = req.body;
    try {
        const album = await albumModel.findByIdAndUpdate(id, { title, releaseDate, composers }, { new: true }).populate('composers');
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
            return res.status(404).json({ msg: 'Album not found', data: null });
        }
        res.status(200).json({ msg: 'success', data: albums });
    } catch (error) {
        res.status(500).json({ msg: 'error', data: [] });
        console.error(error);
    }
};

// Exporta todas las funciones
export { createAlbum, getAlbums, getAlbumById, updateAlbum, deleteAlbum, getAlbumByTitle };
