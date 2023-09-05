import Router from "express"
import userRouter from "./user.router.js"
import groupRouter from "./group.router.js"
import categoryRouter from "./category.router.js"
import taskRouter from "./task.router.js"
import staticRouter from "./static.router.js"
import noteRouter from "./note.router.js"

const router = new Router();

router.use('/user', userRouter);
router.use('/group',groupRouter);
router.use('/category',categoryRouter);
router.use('/task', taskRouter);
router.use('/static', staticRouter);
router.use('/note', noteRouter)

export default router;