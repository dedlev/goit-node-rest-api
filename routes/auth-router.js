import express from 'express';

import authController from '../controllers/auth-controller.js';

import { authenticate, upload } from '../middlewares/index.js';

const authRouter = express.Router();

// upload.filds([{name: "avatar", maxCount: 1}]);
// upload.array("avatar", 8)
authRouter.post('/signup', upload.single('avatar'), authController.signup);
authRouter.post('/signin', authController.signin);
authRouter.get('/current', authenticate, authController.getCurrent);
authRouter.post('/signout', authenticate, authController.signout);
authRouter.patch('/users', authenticate, authController.userSubscription);

export default authRouter;
