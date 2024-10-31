import express from 'express';

import authController from '../controllers/auth-controller.js';

import { authenticate, upload } from '../middlewares/index.js';

const authRouter = express.Router();

authRouter.post('/signup', upload.single('avatar'), authController.signup);
authRouter.get('/verify/:verificationToken', authController.verify);
authRouter.post('/verify', authController.resendVerify)
authRouter.post('/signin', authController.signin);
authRouter.get('/current', authenticate, authController.getCurrent);
authRouter.post('/signout', authenticate, authController.signout);
authRouter.patch('/users', authenticate, authController.userSubscription);
authRouter.patch('/users/avatars', authenticate, upload.single('avatar'), authController.updateAvatar);

export default authRouter;
