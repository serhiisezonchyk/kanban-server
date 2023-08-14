import Router from "express"
import * as categoryController from "../controllers/categoryController.js"
import handleValidationError from "../middlewares/handleValidationError.js";
import checkCategoryBody from '../middlewares/category/checkCategoryBody.js';
import checkCategoryQuery from '../middlewares/category/checkCategoryQuery.js';
import checkCategoryParams from '../middlewares/category/checkCategoryParams.js';
import { categoryValidation } from '../validators/index.js';

const router = new Router();

router.post('/',checkCategoryBody,handleValidationError(categoryValidation), categoryController.create)
router.get('/',checkCategoryQuery,categoryController.getAll)
router.get('/:id',checkCategoryParams,categoryController.getOne)
router.delete('/:id',checkCategoryParams, categoryController.destroy)
router.put('/:id',checkCategoryParams, categoryController.edit)

export default router;