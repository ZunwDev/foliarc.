import { Router } from "express";
import * as controller from "../controller/controller-user";

const router = Router();

router.post("/create", controller.createUser);
router.post("/update", controller.updateUser);
router.get("/id/:id", controller.findUserById);
router.get("/username/:username", controller.findUsersByUsername);
router.get("/email/:email", controller.findUsersByEmail);
router.get("/name/:name", controller.findUsersByName);

export default router;
