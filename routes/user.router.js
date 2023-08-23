import Router from "express"
import * as userController from "../controllers/user.controller.js"
import authMiddleware from "../middlewares/auth.js";
import { registerValidation } from '../validators/index.js';
import handleValidationError from '../middlewares/handleValidationError.js';

const router = new Router();

router.post('/create',handleValidationError(registerValidation), userController.create);
router.post('/login',userController.login);
router.get('/auth',authMiddleware, userController.check);

export default router;