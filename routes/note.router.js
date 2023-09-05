import Router from "express"
import * as noteController from "../controllers/note.controller.js"
import checkNoteBody from '../middlewares/note/checkNoteBody.js';

const router = new Router();

router.get('/',checkNoteBody,noteController.getOne);
router.put('/',checkNoteBody, noteController.edit);


export default router;