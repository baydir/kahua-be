import { Router } from 'express';
import { getColors, createNewColor, getColor } from '../handlers/colors';

const router = Router();

router.get('/', getColors);
router.post('/', createNewColor);
router.get('/:id', getColor);

export default router;
