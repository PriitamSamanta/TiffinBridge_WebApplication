import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import {
  getPendingProvidersController,
  approveProviderController,
  rejectProviderController,
} from "../controllers/admin.controller";

const router = Router();

router.get(
  "/providers/pending",
  authenticate,
  authorize("ADMIN"),
  getPendingProvidersController
);

router.patch(
  "/providers/:id/approve",
  authenticate,
  authorize("ADMIN"),
  approveProviderController
);

router.patch(
  "/providers/:id/reject",
  authenticate,
  authorize("ADMIN"),
  rejectProviderController
);

export default router;