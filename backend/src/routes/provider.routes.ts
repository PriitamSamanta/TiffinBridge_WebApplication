import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { registerProvider } from "../controllers/provider.controller";

const router = Router();

router.post(
  "/register",
  authenticate,
  authorize("PROVIDER"),
  registerProvider
);

export default router;