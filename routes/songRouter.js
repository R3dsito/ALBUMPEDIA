import { Router } from 'express';
import { createSong, getSongs, getSongById, updateSong, deleteSong, getSongByTitle } from '../controllers/songController.js';

const router = Router();

router.get('/', getSongs);
router.get('/:id', getSongById);
router.post('/', createSong);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);
router.get('/title/:title', getSongByTitle);

export default router;
