import express from 'express';
import * as todoController from '../controllers/todo-controller';

const router = express.Router();

router.get('/', todoController.find);
router.post('/', todoController.create);
router.get("/:_id", todoController.findById);
router.put("/:_id", todoController.update);
router.delete("/:_id",todoController.deleteById);

export default router;