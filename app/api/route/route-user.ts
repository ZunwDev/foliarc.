import { Router } from 'express';
import * as controller from '../controller/controller-user';

const router = Router();

router.post('/create', controller.createUser);
router.post('/update', controller.updateUser);
router.get('/id', controller.findUserById);
router.get('/username', controller.findUsersByUsername);
router.get('/email', controller.findUsersByEmail);
router.get('/name', controller.findUsersByName);

export default router;