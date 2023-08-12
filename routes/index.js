import Router from "express"
import userRouter from "./userRouter.js"
import groupRouter from "./groupRouter.js"
import categoryRouter from "./categoryRouter.js"
import taskRouter from "./taskRouter.js"
import staticRouter from "./staticRouter.js"

const router = new Router();

router.use('/user', userRouter);
router.use('/group',groupRouter);
router.use('/category',categoryRouter);
router.use('/task', taskRouter);
router.use('/static', staticRouter);

export default router;