import { Router } from 'express';
import {
  getProducts,
  createNewProduct,
  createProductsFromBulk,
  getProduct,
  onClick,
  getCurrentFilters,
  search,
} from '../handlers/products';

const router = Router();

router.get('/', getProducts);
router.get('/filters', getCurrentFilters);
router.post('/search', search);
router.get('/:id', getProduct);

router.post('/', createNewProduct);
router.post('/bulk', createProductsFromBulk);
router.post('/:id/click', onClick);

export default router;
