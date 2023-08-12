import Router from "express"
import * as userController from "../controllers/userController.js"
import authMiddleware from "../middlewares/auth.js";
import handleValidationError from "../middlewares/handleValidationError.js";

const router = new Router();

router.post('/create',userController.create);
router.post('/login',userController.login);
router.get('/auth',authMiddleware, userController.check);

export default router;