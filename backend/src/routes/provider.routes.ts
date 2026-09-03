import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { registerProvider, getProviders, } from "../controllers/provider.controller";

const router = Router();

router.get("/", getProviders);

router.post(
  "/register",
  authenticate,
  authorize("PROVIDER"),
  registerProvider
);

export default router;