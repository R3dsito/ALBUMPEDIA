import { Router } from 'express';
import { createComposer, getComposers, getComposerById, updateComposer, deleteComposer, getComposerByName } from '../controllers/composerController.js';

const router = Router();

router.get('/', getComposers);
router.get('/:id', getComposerById);
router.post('/', createComposer);
router.put('/:id', updateComposer);
router.delete('/:id', deleteComposer);
router.get('/name/:name', getComposerByName);

export default router;
