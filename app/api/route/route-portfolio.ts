import { Router } from "express";
import * as controller from "../controller/controller-portfolio";

const router = Router();

router.post("/create", controller.createPortfolio);
router.post("/update", controller.updatePortfolio);
router.get("/pid", controller.findPortfolioByPortfolioId);
router.get("/id", controller.findPortfolioByUserId);
router.get("/tags", controller.findPortfoliosByTags);

export default router;
