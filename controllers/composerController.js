import composerModel from '../models/composerModel.js';

const createComposer = async (req, res) => {
    const { name, birthDate, nationality } = req.body;
    try {
        const composer = new composerModel({ name, birthDate, nationality });
        const result = await composer.save();
        res.status(200).json({ msg: 'success', data: result });
    } catch (error) {
        res.status(500).json({ msg: 'error', data: [] });
        console.error(error);
    }
};

const getComposers = async (req, res) => {
    try {
        const composers = await composerModel.find();
        res.status(200).json({ msg: 'success', data: composers });
    } catch (error) {
        res.status(500).json({ msg: 'error', data: [] });
        console.error(error);
    }
};

const getComposerById = async (req, res) => {
    const { id } = req.params;
    try {
        const composer = await composerModel.findById(id);
        res.status(200).json({ msg: 'success', data: composer });
    } catch (error) {
        res.status(500).json({ msg: 'error', data: [] });
        console.error(error);
    }
};

const updateComposer = async (req, res) => {
    const { id } = req.params;
    const { name, birthDate, nationality } = req.body;
    try {
        const composer = await composerModel.findByIdAndUpdate(id, { name, birthDate, nationality }, { new: true });
        res.status(200).json({ msg: 'success', data: composer });
    } catch (error) {
        res.status(500).json({ msg: 'error', data: [] });
        console.error(error);
    }
};

const deleteComposer = async (req, res) => {
    const { id } = req.params;
    try {
        const composer = await composerModel.findByIdAndDelete(id);
        res.status(200).json({ msg: 'success', data: composer });
    } catch (error) {
        res.status(500).json({ msg: 'error', data: [] });
        console.error(error);
    }
};

const getComposerByName = async (req, res) => {
    const { name } = req.params;

    if (!name) {
        return res.status(400).json({ msg: 'Error: Nombre no especificado.' });
    }

    try {
        const composers = await composerModel.findOne({ name: new RegExp(name, 'i') });
        if (!composers) {
            return res.status(404).json({ msg: 'Composer not found', data: null });
        }
        res.status(200).json({ msg: 'success', data: composers });
    } catch (error) {
        res.status(500).json({ msg: 'error', data: [] });
        console.error(error);
    }
};

export { createComposer, getComposers, getComposerById, updateComposer, deleteComposer, getComposerByName };
