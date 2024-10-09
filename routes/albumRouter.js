import { Router } from 'express';
import { createAlbum, getAlbums, getAlbumById, updateAlbum, deleteAlbum, getAlbumByTitle } from '../controllers/albumController.js';

const router = Router();

router.get('/', getAlbums);
router.get('/:id', getAlbumById);
router.post('/', createAlbum);
router.put('/:id', updateAlbum);
router.delete('/:id', deleteAlbum);
router.get('/title/:title', getAlbumByTitle);

export default router;
