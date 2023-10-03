import { Router } from 'express';
import { getBrands, createNewBrand, getBrand } from '../handlers/brands';

const router = Router();

router.get('/', getBrands);
router.post('/', createNewBrand);
router.get('/:id', getBrand);

export default router;
