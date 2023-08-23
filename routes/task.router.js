import Router from "express"
import * as taskController from "../controllers/task.controller.js"
import handleValidationError from "../middlewares/handleValidationError.js";
import checkTaskBody from '../middlewares/task/checkTaskBody.js';
import checkTaskQuery from '../middlewares/task/checkTaskQuery.js';
import checkTaskParams from '../middlewares/task/checkTaskParams.js';
import { taskValidation } from '../validators/index.js';

const router = new Router();

router.post('/',checkTaskBody, handleValidationError(taskValidation),taskController.create)
router.get('/',checkTaskQuery,taskController.getAll)
router.get('/:id',checkTaskParams,taskController.getOne)
router.delete('/:id',checkTaskParams, taskController.destroy)
router.put('/:id',checkTaskParams, taskController.edit)

export default router;