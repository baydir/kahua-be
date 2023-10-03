import { Router } from 'express';
import passport from 'passport';
import { registerUser, loginUser, logoutUser } from '../handlers/auth';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  logoutUser
);

export default router;
