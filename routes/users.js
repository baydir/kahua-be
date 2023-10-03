import { Router } from 'express';
import passport from 'passport';
import { getUsers, getUserFavorites, toggleFavorite } from '../handlers/users';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), getUsers);
router.get(
  '/favorites/:userId',
  passport.authenticate('jwt', { session: false }),
  getUserFavorites
);
router.post(
  '/favorite/toggle',
  passport.authenticate('jwt', { session: false }),
  toggleFavorite
);

export default router;
