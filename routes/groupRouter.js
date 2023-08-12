import Router from "express"
import * as groupController from "../controllers/groupController.js"
import handleValidationError from "../middlewares/handleValidationError.js";
import checkGroupBody from '../middlewares/group/checkGroupBody.js';
import checkGroupQuery from '../middlewares/group/checkGroupQuery.js';
import checkGroupParams from '../middlewares/group/checkGroupParams.js';

const router = new Router();

router.post('/',checkGroupBody,groupController.create)
router.get('/',checkGroupQuery,groupController.getAll)
router.get('/:id',checkGroupParams,groupController.getOne)
router.delete('/:id',checkGroupParams, groupController.destroy)
router.put('/:id',checkGroupParams, groupController.edit)

export default router;